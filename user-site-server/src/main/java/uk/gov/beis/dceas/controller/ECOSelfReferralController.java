package uk.gov.beis.dceas.controller;

import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Builder;
import lombok.Value;
import org.jooq.DSLContext;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR;
import static uk.gov.beis.dceas.db.gen.Tables.ECO_SELF_REFERRAL;

@RestController
@RequestMapping("/api/eco-self-referral")
public class ECOSelfReferralController {

    private final DSLContext dslContext;

    public ECOSelfReferralController(DSLContext dslContext) {
        this.dslContext = dslContext;
    }

    @PostMapping
    public ResponseEntity<?> createECOSelfReferral(@RequestBody ECOSelfReferral body) {
        int recordsCreated = dslContext.insertInto(ECO_SELF_REFERRAL)
                .set(ECO_SELF_REFERRAL.LMK_KEY, body.getLmkKey())
                .set(ECO_SELF_REFERRAL.NAME, body.getName())
                .set(ECO_SELF_REFERRAL.EMAIL, body.getEmail())
                .set(ECO_SELF_REFERRAL.PHONE_NUMBER, body.getPhoneNumber())
                .set(ECO_SELF_REFERRAL.RECEIVE_PENSION_GUARANTEE_CREDIT, body.getReceivePensionGuaranteeCredit())
                .set(ECO_SELF_REFERRAL.RECEIVE_INCOME_RELATED_BENEFITS, body.getReceiveIncomeRelatedBenefits())
                .set(ECO_SELF_REFERRAL.RECEIVE_SOCIETAL_BENEFITS, body.getReceiveSocietalBenefits())
                .set(ECO_SELF_REFERRAL.RECEIVE_DEFENSE_RELATED_BENEFITS, body.getReceiveDefenseRelatedBenefits())
                .set(ECO_SELF_REFERRAL.RECEIVE_CHILD_BENEFITS, body.getReceiveChildBenefits())
                .set(ECO_SELF_REFERRAL.INCOME, body.getIncome())
                .set(ECO_SELF_REFERRAL.ADDRESS1, body.getAddress1())
                .set(ECO_SELF_REFERRAL.ADDRESS2, body.getAddress2())
                .set(ECO_SELF_REFERRAL.ADDRESS3, body.getAddress3())
                .set(ECO_SELF_REFERRAL.POSTCODE, body.getPostcode())
                .set(ECO_SELF_REFERRAL.TENURE_TYPE, body.getTenureType())
                .set(ECO_SELF_REFERRAL.HOME_TYPE, body.getHomeType())
                .set(ECO_SELF_REFERRAL.NUMBER_OF_STOREYS, body.getNumberOfStoreys())
                .set(ECO_SELF_REFERRAL.NUMBER_OF_STOREYS_IN_BUILDING, body.getNumberOfStoreysInBuilding())
                .set(ECO_SELF_REFERRAL.BUILT_FORM, body.getBuiltForm())
                .set(ECO_SELF_REFERRAL.FLAT_EXPOSED_WALL_TYPE, body.getFlatExposedWallType())
                .set(ECO_SELF_REFERRAL.HOME_AGE_BAND, body.getHomeAgeBand())
                .set(ECO_SELF_REFERRAL.NUMBER_OF_BEDROOMS, body.getNumberOfBedrooms())
                .set(ECO_SELF_REFERRAL.HAS_LOFT, body.getHasLoft())
                .set(ECO_SELF_REFERRAL.HAS_LOFT_INSULATION, body.getHasLoftInsulation())
                .set(ECO_SELF_REFERRAL.IS_LOFT_ACCESSIBLE_AND_CLEAR_OF_CLUTTER, body.getIsLoftAccessibleAndClearOfClutter())
                .set(ECO_SELF_REFERRAL.HAS_LOFT_HISTORY_OF_INFESTATION, body.getHasLoftHistoryOfInfestation())
                .set(ECO_SELF_REFERRAL.HAS_LOFT_HISTORY_OF_WATER_DAMAGE, body.getHasLoftHistoryOfWaterDamage())
                .set(ECO_SELF_REFERRAL.WALL_TYPE, body.getWallType())
                .set(ECO_SELF_REFERRAL.FUEL_TYPE, body.getFuelType())
                .set(ECO_SELF_REFERRAL.HAS_HOT_WATER_CYLINDER, body.getHasHotWaterCylinder())
                .set(ECO_SELF_REFERRAL.HAS_CONDENSING_BOILER, body.getHasCondensingBoiler())
                .execute();

        if (recordsCreated == 0) {
            return ResponseEntity.status(INTERNAL_SERVER_ERROR).body("Could not save ECO self-referral.");
        }

        return ResponseEntity.noContent().build();
    }

    @Value
    @Builder
    @JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
    @SuppressWarnings("checkstyle:visibilitymodifier")
    public static class ECOSelfReferral {
        // EPC
        String lmkKey;
        // Contact details
        String name;
        String email;
        String phoneNumber;
        // Eligibility information
        Boolean receivePensionGuaranteeCredit;
        Boolean receiveIncomeRelatedBenefits;
        Boolean receiveSocietalBenefits;
        Boolean receiveDefenseRelatedBenefits;
        Boolean receiveChildBenefits;
        Integer income;
        // Address
        String address1;
        String address2;
        String address3;
        String postcode;
        // General property information
        Integer tenureType;
        Integer homeType;
        Integer numberOfStoreys;
        Integer numberOfStoreysInBuilding;
        Integer builtForm;
        Integer flatExposedWallType;
        Integer homeAgeBand;
        Integer numberOfBedrooms;
        Boolean hasLoft;
        Boolean hasLoftInsulation;
        Boolean isLoftAccessibleAndClearOfClutter;
        Boolean hasLoftHistoryOfInfestation;
        Boolean hasLoftHistoryOfWaterDamage;
        Integer wallType;
        Integer fuelType;
        Boolean hasHotWaterCylinder;
        Boolean hasCondensingBoiler;
    }
}
