package uk.gov.beis.dceas.config;

import liquibase.integration.spring.SpringLiquibase;
import org.quartz.JobDetail;
import org.quartz.Scheduler;
import org.quartz.SimpleTrigger;
import org.quartz.Trigger;
import org.quartz.spi.JobFactory;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.beans.factory.config.PropertiesFactoryBean;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.scheduling.quartz.CronTriggerFactoryBean;
import org.springframework.scheduling.quartz.JobDetailFactoryBean;
import org.springframework.scheduling.quartz.SchedulerFactoryBean;
import uk.gov.beis.dceas.job.BoilerPcdfDatabaseUpdateJob;
import uk.gov.beis.dceas.job.LocalAuthoritiesCheckJob;
import uk.gov.beis.dceas.job.UserStateDatabaseCleanJob;
import uk.gov.beis.dceas.spring.AutowiringSpringBeanJobFactory;

import javax.sql.DataSource;
import java.io.IOException;
import java.util.Properties;

import static java.util.Collections.singleton;

/**
 * Configuration related to the Quartz scheduler.
 *
 * See https://github.com/davidkiss/spring-boot-quartz-demo
 */
@Configuration
@ConditionalOnProperty(name = "quartz.enabled")
public class SchedulerConfig {

    @Bean
    public JobFactory jobFactory(
        ApplicationContext applicationContext,
        // injecting SpringLiquibase to ensure liquibase is already initialized and created the quartz tables:
        SpringLiquibase springLiquibase) {
        AutowiringSpringBeanJobFactory jobFactory = new AutowiringSpringBeanJobFactory();
        jobFactory.setApplicationContext(applicationContext);
        return jobFactory;
    }

    @Bean
    public Scheduler schedulerFactoryBean(
        DataSource dataSource,
        JobFactory jobFactory,
        @Qualifier("boilerPcdfDatabaseUpdateTrigger") Trigger boilerPcdfDatabaseUpdateTrigger,
        @Qualifier("localAuthoritiesCheckTrigger") Trigger localAuthoritiesCheckTrigger,
        @Qualifier("userStateDatabaseCleanTrigger") Trigger userStateDatabaseCleanTrigger) throws Exception {

        SchedulerFactoryBean factory = new SchedulerFactoryBean();
        // this allows to update triggers in DB when updating settings in config file:
        factory.setOverwriteExistingJobs(true);
        factory.setDataSource(dataSource);
        factory.setJobFactory(jobFactory);

        factory.setQuartzProperties(quartzProperties());
        factory.afterPropertiesSet();

        Scheduler scheduler = factory.getScheduler();
        scheduler.setJobFactory(jobFactory);

        scheduler.scheduleJob(
            (JobDetail) boilerPcdfDatabaseUpdateTrigger
                .getJobDataMap().get("jobDetail"),
            singleton(boilerPcdfDatabaseUpdateTrigger),
            true);

        scheduler.scheduleJob(
            (JobDetail) localAuthoritiesCheckTrigger
                    .getJobDataMap().get("jobDetail"),
            singleton(localAuthoritiesCheckTrigger),
            true);

        scheduler.scheduleJob(
            (JobDetail) userStateDatabaseCleanTrigger
                    .getJobDataMap().get("jobDetail"),
            singleton(userStateDatabaseCleanTrigger),
            true);

        scheduler.start();
        return scheduler;
    }

    @Bean
    public Properties quartzProperties() throws IOException {
        PropertiesFactoryBean propertiesFactoryBean = new PropertiesFactoryBean();
        propertiesFactoryBean.setLocation(new ClassPathResource("/quartz.properties"));
        propertiesFactoryBean.afterPropertiesSet();
        return propertiesFactoryBean.getObject();
    }

    @Bean
    public JobDetailFactoryBean boilerPcdfDatabaseUpdateJobDetail() {
        return createJobDetail(BoilerPcdfDatabaseUpdateJob.class);
    }

    @Bean(name = "boilerPcdfDatabaseUpdateTrigger")
    public CronTriggerFactoryBean boilerPcdfDatabaseUpdateTrigger(
        @Qualifier("boilerPcdfDatabaseUpdateJobDetail") JobDetail jobDetail,
        @Value("${dceas.boiler-pcdf-database-update-cron}") String cronExpression) {

        return createCronTrigger(jobDetail, cronExpression);
    }

    @Bean
    public JobDetailFactoryBean localAuthoritiesCheckJobDetail() {
        return createJobDetail(LocalAuthoritiesCheckJob.class);
    }

    @Bean(name = "localAuthoritiesCheckTrigger")
    public CronTriggerFactoryBean localAuthoritiesCheckTrigger(
        @Qualifier("localAuthoritiesCheckJobDetail") JobDetail jobDetail,
        @Value("${dceas.local-authorities-check-cron}") String cronExpression) {

        return createCronTrigger(jobDetail, cronExpression);
    }

    @Bean
    public JobDetailFactoryBean userStateDatabaseCleanJobDetail() {
        return createJobDetail(UserStateDatabaseCleanJob.class);
    }

    @Bean(name = "userStateDatabaseCleanTrigger")
    public CronTriggerFactoryBean userStateDatabaseCleanTrigger(
        @Qualifier("userStateDatabaseCleanJobDetail") JobDetail jobDetail,
        @Value("${dceas.user-state-database-clean-cron}") String cronExpression) {

        return createCronTrigger(jobDetail, cronExpression);
    }

    private static JobDetailFactoryBean createJobDetail(Class<?> jobClass) {
        JobDetailFactoryBean factoryBean = new JobDetailFactoryBean();
        factoryBean.setJobClass(jobClass);
        // job has to be durable to be stored in DB:
        factoryBean.setDurability(true);
        return factoryBean;
    }

    private static CronTriggerFactoryBean createCronTrigger(
        JobDetail jobDetail,
        String cronExpression) {

        CronTriggerFactoryBean factoryBean = new CronTriggerFactoryBean();
        factoryBean.setJobDetail(jobDetail);
        factoryBean.setCronExpression(cronExpression);
        factoryBean.setMisfireInstruction(SimpleTrigger.MISFIRE_INSTRUCTION_FIRE_NOW);
        return factoryBean;
    }
}
