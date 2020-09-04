package uk.gov.beis.dceas.exception;

import org.springframework.http.HttpStatus;

public class InstallerSearchException extends Exception {
    private final HttpStatus statusCode;

    public InstallerSearchException(HttpStatus statusCode, String message) {
        super(message);
        this.statusCode = statusCode;
    }

    public HttpStatus getStatusCode() {
        return statusCode;
    }
}
