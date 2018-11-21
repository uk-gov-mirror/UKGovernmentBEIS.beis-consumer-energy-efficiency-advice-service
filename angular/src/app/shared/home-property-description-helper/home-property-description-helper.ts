import {
    getHomeTypeDescription,
    HomeType,
    isHouseOrBungalow
} from "../../questionnaire/questions/home-type-question/home-type";
import {
    getHouseBuiltFormDescription,
    HouseBuiltForm
} from "../../questionnaire/questions/house-built-form-question/house-built-form";

export function getHomePropertyDescription(homeType: HomeType, houseBuiltForm: HouseBuiltForm): string {
    let description = getHomeTypeDescription(homeType);
    if (description !== null && isHouseOrBungalow(homeType)) {
        const builtFormDescription = getHouseBuiltFormDescription(houseBuiltForm);
        description = builtFormDescription
            ? builtFormDescription + ' ' + description
            : description;
    }

    return description;
}
