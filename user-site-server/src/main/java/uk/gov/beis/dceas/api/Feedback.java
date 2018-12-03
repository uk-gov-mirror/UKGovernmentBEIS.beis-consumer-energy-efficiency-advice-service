package uk.gov.beis.dceas.api;

import lombok.Builder;
import lombok.Value;
import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotBlank;

@Value
@Builder
@SuppressWarnings("checkstyle:visibilitymodifier")
public class Feedback {
    @NotBlank
    @Length(max = 255)
    String name;

    @NotBlank
    @Email
    @Length(max = 255)
    String email;

    @NotBlank
    @Length(max = 255)
    String subject;

    @NotBlank
    @Length(max = 5000)
    String message;
}
