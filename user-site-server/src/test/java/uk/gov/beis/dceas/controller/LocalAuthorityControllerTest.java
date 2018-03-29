package uk.gov.beis.dceas.controller;

import com.google.common.collect.Lists;
import org.junit.Test;

import static org.assertj.core.api.Assertions.assertThat;
import static uk.gov.beis.dceas.controller.LocalAuthorityController.deserializePhpStringArray;

public class LocalAuthorityControllerTest {

    @Test
    public void testDeserializePhpStringArray() {

        assertThat(deserializePhpStringArray(
            "a:4:{i:0;s:4:\"8480\";i:1;s:4:\"8481\";i:2;s:4:\"8482\";i:3;s:4:\"8483\";}"))
            .isEqualTo(Lists.newArrayList(8480, 8481, 8482, 8483));
    }
}
