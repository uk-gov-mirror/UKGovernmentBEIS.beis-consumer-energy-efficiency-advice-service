package uk.gov.beis.dceas.job;

import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.client.RestClientException;
import uk.gov.beis.dceas.service.LocalAuthoritiesCheckService;

/**
 * A scheduled job which checks Local Authorities by example postcodes against http://postcodes.io/
 * This alerts us when a local authority code change is made, e.g.
 * http://geoportal.statistics.gov.uk/datasets/local-authority-districts-april-2019-names-and-codes-in-the-united-kingdom
 */
public class LocalAuthoritiesCheckJob implements Job {

    @Autowired
    private LocalAuthoritiesCheckService service;

    @Autowired
    public LocalAuthoritiesCheckJob() {
    }

    @Override
    public void execute(JobExecutionContext jobExecutionContext) throws JobExecutionException {
        try {
            service.checkLocalAuthorities();
        } catch (RestClientException e) {
            throw new JobExecutionException(e);
        }
    }
}
