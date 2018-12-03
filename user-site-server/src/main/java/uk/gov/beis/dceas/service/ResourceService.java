package uk.gov.beis.dceas.service;

import com.google.common.base.Charsets;
import org.apache.commons.io.IOUtils;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class ResourceService {

    public String getFileAsString(String path) throws IOException {
        ClassLoader classLoader = getClass().getClassLoader();
        return IOUtils.toString(classLoader.getResourceAsStream(path), Charsets.UTF_8);
    }
}
