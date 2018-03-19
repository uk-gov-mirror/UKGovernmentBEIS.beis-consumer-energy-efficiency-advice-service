package uk.gov.beis.dceas.job;

import org.jooq.exception.DataAccessException;
import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.beans.factory.annotation.Autowired;
import uk.gov.beis.dceas.service.UserStateDatabaseCleanService;

/**
 * A scheduled job which clears old user data from the database
 */
public class UserStateDatabaseCleanJob implements Job {

    @Autowired
    private UserStateDatabaseCleanService service;

    @Autowired
    public UserStateDatabaseCleanJob() {}

    @Override
    public void execute(JobExecutionContext context) throws JobExecutionException {
        try {
            // TODO BEISDEAS-183 Remove console log
            System.out.println("Running database clean");
            service.cleanDatabase();
        } catch (DataAccessException e) {
            throw new JobExecutionException(e);
        }
    }
}
