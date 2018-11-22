import {
    getHomeTypeDescription,
    HomeType,
    isHouseOrBungalow
} from "../../questionnaire/questions/home-type-question/home-type";
import {
    BuiltFormAnswer,
    getBuiltFormDescription
} from "../../questionnaire/questions/built-form-question/built-form-answer";

export function getHomePropertyDescription(homeType: HomeType, builtForm: BuiltFormAnswer): string {
    let description = getHomeTypeDescription(homeType);
    if (description !== null && isHouseOrBungalow(homeType)) {
        const builtFormDescription = getBuiltFormDescription(builtForm);
        description = builtFormDescription
            ? builtFormDescription + ' ' + description
            : description;
    }

    return description;
}
