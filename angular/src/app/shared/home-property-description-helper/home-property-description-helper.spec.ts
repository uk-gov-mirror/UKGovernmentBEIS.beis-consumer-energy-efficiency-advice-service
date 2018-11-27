import {BuiltFormAnswer} from "../../questionnaire/questions/built-form-question/built-form-answer";
import {getHomePropertyDescription} from "./home-property-description-helper";
import {HomeType} from "../../questionnaire/questions/home-type-question/home-type";

describe('HomePropertyDescriptionHelper', () => {

   describe('#getHomePropertyDescription', () => {
       it('should return null when homeType is null', () => {
           // given
           const homeType = null;
           const builtForm = BuiltFormAnswer.Detached;

           // when
           const description = getHomePropertyDescription(homeType, builtForm);

           // then
           expect(description).toEqual(null);
       });

       it('should return null when homeType is undefined', () => {
           // given
           const homeType = undefined;
           const builtForm = BuiltFormAnswer.Detached;

           // when
           const description = getHomePropertyDescription(homeType, builtForm);

           // then
           expect(description).toEqual(null);
       });

       it('should return home type only when homeType is flat', () => {
           // given
           const homeType = HomeType.FlatDuplexOrMaisonette;
           const builtForm = BuiltFormAnswer.Detached;

           // when
           const description = getHomePropertyDescription(homeType, builtForm);

           // then
           expect(description).toEqual('flat, duplex or maisonette');
       });

       it('should return home type only when homeType is park home', () => {
           // given
           const homeType = HomeType.ParkHomeOrMobileHome;
           const builtForm = BuiltFormAnswer.Detached;

           // when
           const description = getHomePropertyDescription(homeType, builtForm);

           // then
           expect(description).toEqual('park-home or mobile home');
       });

       it('should return home type and built form when homeType is house', () => {
           // given
           const homeType = HomeType.House;
           const builtForm = BuiltFormAnswer.Detached;

           // when
           const description = getHomePropertyDescription(homeType, builtForm);

           // then
           expect(description).toEqual('detached house');
       });

       it('should return home type and built form when homeType is bungalow', () => {
           // given
           const homeType = HomeType.Bungalow;
           const builtForm = BuiltFormAnswer.EndTerrace;

           // when
           const description = getHomePropertyDescription(homeType, builtForm);

           // then
           expect(description).toEqual('end-terrace bungalow');
       });

       it('should return home type only when homeType is house but builtForm is null', () => {
           // given
           const homeType = HomeType.House;
           const builtForm = null;

           // when
           const description = getHomePropertyDescription(homeType, builtForm);

           // then
           expect(description).toEqual('house');
       });

       it('should return home type only when homeType is house but builtForm is undefined', () => {
           // given
           const homeType = HomeType.House;
           const builtForm = undefined;

           // when
           const description = getHomePropertyDescription(homeType, builtForm);

           // then
           expect(description).toEqual('house');
       });

       it('should return home type only when homeType is bungalow but builtForm is null', () => {
           // given
           const homeType = HomeType.Bungalow;
           const builtForm = null;

           // when
           const description = getHomePropertyDescription(homeType, builtForm);

           // then
           expect(description).toEqual('bungalow');
       });

       it('should return home type only when homeType is bungalow but builtForm is undefined', () => {
           // given
           const homeType = HomeType.Bungalow;
           const builtForm = undefined;

           // when
           const description = getHomePropertyDescription(homeType, builtForm);

           // then
           expect(description).toEqual('bungalow');
       });
   });
});
