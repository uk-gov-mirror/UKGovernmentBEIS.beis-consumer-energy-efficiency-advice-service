import {Epc} from "../../../shared/postcode-epc-service/model/epc";
import {BuiltFormAnswer, getBuiltFormFromEpc} from "./built-form-answer";

describe('BuiltFormAnswer', () => {

    describe('#getBuiltFormFromEpc', () => {
        let epc: Epc;

        beforeEach(() => {
            epc = {} as Epc;
        });

        it('should return detached when EPC property type is house and built form is detached', () => {
            // given
            epc.propertyType = 'house';
            epc.builtForm = 'detached';

            // when
            const builtForm = getBuiltFormFromEpc(epc);

            // then
            expect(builtForm).toEqual(BuiltFormAnswer.Detached);
        });

        it('should return semi-detached when EPC property type is house and built form is semi-detached', () => {
            // given
            epc.propertyType = 'house';
            epc.builtForm = 'semi-detached';

            // when
            const builtForm = getBuiltFormFromEpc(epc);

            // then
            expect(builtForm).toEqual(BuiltFormAnswer.SemiDetached);
        });

        it('should return detached when EPC property type is bungalow and built form is detached', () => {
            // given
            epc.propertyType = 'bungalow';
            epc.builtForm = 'detached';

            // when
            const builtForm = getBuiltFormFromEpc(epc);

            // then
            expect(builtForm).toEqual(BuiltFormAnswer.Detached);
        });

        it('should return semi-detached when EPC property type is bungalow and built form is semi-detached', () => {
            // given
            epc.propertyType = 'bungalow';
            epc.builtForm = 'semi-detached';

            // when
            const builtForm = getBuiltFormFromEpc(epc);

            // then
            expect(builtForm).toEqual(BuiltFormAnswer.SemiDetached);
        });

        it('should return undefined when EPC property type is not house or bungalow', () => {
            // given
            epc.propertyType = 'flat';

            // when
            const builtForm = getBuiltFormFromEpc(epc);

            // then
            expect(builtForm).toEqual(undefined);
        });

        it('should return undefined when EPC property type is house and built form is not detached or semi-detached', () => {
            // given
            epc.propertyType = 'house';
            epc.builtForm = 'mid-terrace';

            // when
            const builtForm = getBuiltFormFromEpc(epc);

            // then
            expect(builtForm).toEqual(undefined);
        });

        it('should return undefined when EPC property type is bungalow and built form is not detached or semi-detached', () => {
            // given
            epc.propertyType = 'bungalow';
            epc.builtForm = 'mid-terrace';

            // when
            const builtForm = getBuiltFormFromEpc(epc);

            // then
            expect(builtForm).toEqual(undefined);
        });
    });
});
