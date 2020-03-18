package uk.gov.beis.dceas.job;

import org.jooq.exception.DataAccessException;
import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.beans.factory.annotation.Autowired;
import uk.gov.beis.dceas.service.ECOSelfReferralDatabaseCleanService;

/**
 * A scheduled job which clears old user data from the database
 */
public class ECOSelfReferralDatabaseCleanJob implements Job {

    @Autowired
    private ECOSelfReferralDatabaseCleanService service;

    @Autowired
    public ECOSelfReferralDatabaseCleanJob() {
    }

    @Override
    public void execute(JobExecutionContext context) throws JobExecutionException {
        try {
            service.cleanDatabase();
        } catch (DataAccessException e) {
            throw new JobExecutionException(e);
        }
    }
}
