import {Epc} from "../../../shared/postcode-epc-service/model/epc";
import {getHomeTypeFromEpc, HomeType} from "./home-type";

describe('HomeType', () => {

    describe('#getHomeTypeFromEpc', () => {
        let epc: Epc;

        beforeEach(() => {
            epc = {} as Epc;
        });

        it('should return FlatDuplexOrMaisonette when EPC property type is flat', () => {
            // given
            epc.propertyType = 'flat';

            // when
            const homeType = getHomeTypeFromEpc(epc);

            // then
            expect(homeType).toEqual(HomeType.FlatDuplexOrMaisonette);
        });

        it('should return FlatDuplexOrMaisonette when EPC property type is maisonette', () => {
            // given
            epc.propertyType = 'maisonette';

            // when
            const homeType = getHomeTypeFromEpc(epc);

            // then
            expect(homeType).toEqual(HomeType.FlatDuplexOrMaisonette);
        });

        it('should return House when EPC property type is house', () => {
            // given
            epc.propertyType = 'house';

            // when
            const homeType = getHomeTypeFromEpc(epc);

            // then
            expect(homeType).toEqual(HomeType.House);
        });

        it('should return Bungalow when EPC property type is bungalow', () => {
            // given
            epc.propertyType = 'bungalow';

            // when
            const homeType = getHomeTypeFromEpc(epc);

            // then
            expect(homeType).toEqual(HomeType.Bungalow);
        });

        it('should return undefined when EPC property type is not recognised', () => {
            // given
            epc.propertyType = 'unknown';

            // when
            const homeType = getHomeTypeFromEpc(epc);

            // then
            expect(homeType).toEqual(undefined);
        });
    });
});
