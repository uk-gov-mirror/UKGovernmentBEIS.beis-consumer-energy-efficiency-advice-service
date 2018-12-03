package uk.gov.beis.dceas.rule;

import com.icegreen.greenmail.util.GreenMail;
import com.icegreen.greenmail.util.ServerSetup;
import org.junit.rules.ExternalResource;

import javax.mail.internet.MimeMessage;

public class SmtpServerRule extends ExternalResource {
    private GreenMail smtpServer;
    private int port;

    public SmtpServerRule(int port) {
        this.port = port;
    }

    @Override
    protected void before() throws Throwable {
        super.before();
        smtpServer = new GreenMail(new ServerSetup(port, null, "smtp"));
        smtpServer.start();
    }

    @Override
    protected void after() {
        super.after();
        smtpServer.stop();
    }

    public MimeMessage getLastMessage() {
        MimeMessage[] messages = getMessages();
        if (messages.length == 0) {
            return null;
        }
        return messages[messages.length - 1];
    }

    private MimeMessage[] getMessages() {
        return smtpServer.getReceivedMessages();
    }
}
