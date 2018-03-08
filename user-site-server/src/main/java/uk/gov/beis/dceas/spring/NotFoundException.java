package uk.gov.beis.dceas.spring;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class NotFoundException extends RuntimeException {

    public static <T> T notFoundIfNull(T obj) {
        if (obj == null) {
            throw new NotFoundException();
        }
        return obj;
    }
}
