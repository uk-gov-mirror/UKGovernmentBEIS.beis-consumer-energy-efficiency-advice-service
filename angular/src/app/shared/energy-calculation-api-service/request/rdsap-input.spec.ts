import {RdSapInput} from './rdsap-input';
import {ResponseData} from '../../response-data/response-data';
import {HomeType} from '../../../questionnaire/questions/home-type-question/home-type';
import {TenureType} from '../../../questionnaire/questions/tenure-type-question/tenure-type';
import toString from 'lodash-es/toString';
import {Epc} from "../../postcode-epc-service/model/epc";

describe('RdsapInput', () => {

    describe('#construct', () => {
        const responseData: ResponseData = new ResponseData();

        it('should set rented to true for private tenancy', () => {
            // given
            responseData.tenureType = TenureType.PrivateTenancy;

            // when
            const rdSapInput = new RdSapInput(responseData);

            // then
            expect(rdSapInput.rented).toEqual(true);
        });

        it('should set rented to true for social tenancy', () => {
            // given
            responseData.tenureType = TenureType.SocialTenancy;

            // when
            const rdSapInput = new RdSapInput(responseData);

            // then
            expect(rdSapInput.rented).toEqual(true);
        });

        it('should set rented to false for owner occupancy', () => {
            // given
            responseData.tenureType = TenureType.OwnerOccupancy;

            // when
            const rdSapInput = new RdSapInput(responseData);

            // then
            expect(rdSapInput.rented).toEqual(false);
        });

        it('should set property_type to undefined if there is epc', () => {
            // given
            responseData.epc = {} as Epc;

            // when
            const rdSapInput = new RdSapInput(responseData);

            // then
            expect(rdSapInput.property_type).toEqual(undefined);
        });

        it('should set property_type to home type if there is no epc', () => {
            // given
            responseData.epc = null;
            responseData.homeType = HomeType.FlatDuplexOrMaisonette;

            // when
            const rdSapInput = new RdSapInput(responseData);

            // then
            expect(rdSapInput.property_type).toEqual(toString(HomeType.FlatDuplexOrMaisonette));
        });
    });
});
