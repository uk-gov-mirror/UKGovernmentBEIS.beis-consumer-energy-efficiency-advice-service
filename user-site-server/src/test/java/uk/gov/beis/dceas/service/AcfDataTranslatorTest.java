package uk.gov.beis.dceas.service;

import com.google.common.collect.Lists;
import org.junit.Test;

import static org.assertj.core.api.Assertions.assertThat;

public class AcfDataTranslatorTest {

    @Test
    public void testDeserializePhpStringArray() {

        assertThat(AcfDataTranslator.deserializePhpStringArrayOfInts(
            "a:4:{i:0;s:4:\"8480\";i:1;s:4:\"8481\";i:2;s:4:\"8482\";i:3;s:4:\"8483\";}"))
            .isEqualTo(Lists.newArrayList(8480, 8481, 8482, 8483));
    }
}
