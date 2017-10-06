import {Injectable} from "@angular/core";
import {EpcApiResult} from "../api-service/epc-api-result";
import {DisplayEpcRow} from "./display-epc-row";

@Injectable()
export class EpcParserService {
    private static readonly displayLabels: { [columnName: string]: string } = {
        'lmk-key': 'LMK key',
        'address1': 'address, line 1',
        'address2': 'address, line 2',
        'address3': 'address, line 3',
        'postcode': 'postcode',
        'building-reference-number': 'building reference number',
        'current-energy-rating': 'current energy rating',
        'potential-energy-rating': 'potential energy rating',
        'current-energy-efficiency': 'current energy efficiency',
        'potential-energy-efficiency': 'potential energy efficiency',
        'property-type': 'property type',
        'built-form': 'built form',
        'inspection-date': 'inspection date',
        'local-authority': 'local authority',
        'constituency': 'constituency',
        'county': 'county',
        'lodgement-date': 'lodgement date',
        'transaction-type': 'transaction type',
        'environment-impact-current': 'environmental impact: current',
        'environment-impact-potential': 'environmental impact: potential',
        'energy-consumption-current': 'energy consumption: current',
        'energy-consumption-potential': 'energy consumption: potential',
        'co2-emissions-current': 'CO2 emissions: current',
        'co2-emiss-curr-per-floor-area': 'CO2 emissions: current per floor area',
        'co2-emissions-potential': 'CO2 emissions: potential',
        'lighting-cost-current': 'lighting cost: current',
        'lighting-cost-potential': 'lighting cost: potential',
        'heating-cost-current': 'heating cost: current',
        'heating-cost-potential': 'heating cost: potential',
        'hot-water-cost-current': 'hot water cost: current',
        'hot-water-cost-potential': 'hot water cost: potential',
        'total-floor-area': 'total floor area (metres squared)',
        'energy-tariff': 'energy tariff',
        'mains-gas-flag': 'mains gas?',
        'floor-level': 'floor level',
        'flat-top-storey': 'flat - top storey?',
        'flat-storey-count': 'flat storey count',
        'main-heating-controls': 'main heating controls',
        'multi-glaze-proportion': 'multi glaze proportion',
        'glazed-type': 'glazed type',
        'glazed-area': 'glazed area',
        'extension-count': 'extension count',
        'number-habitable-rooms': 'number of habitable rooms',
        'number-heated-rooms': 'number of heated rooms',
        'low-energy-lighting': 'perecentage of low energy lighting',
        'number-open-fireplaces': 'number of open fireplaces',
        'hotwater-description': 'hot water description',
        'hot-water-energy-eff': 'hot water energy efficiency',
        'hot-water-env-eff': 'hot water environmental efficiency',
        'floor-description': 'floor description',
        'floor-energy-eff': 'floor energy efficiency',
        'floor-env-eff': 'floor environmental efficiency',
        'windows-description': 'windows description',
        'windows-energy-eff': 'windows energy efficiency',
        'windows-env-eff': 'windows environmental efficiency',
        'walls-description': 'walls description',
        'walls-energy-eff': 'walls energy efficiency',
        'walls-env-eff': 'walls environmental efficiency',
        'secondheat-description': 'secondary heating description',
        'sheating-energy-eff': 'secondary heating energy efficiency',
        'sheating-env-eff': 'secondary heating environmental-eff',
        'roof-description': 'roof description',
        'roof-energy-eff': 'roof energy efficiency',
        'roof-env-eff': 'roof environmental efficiency',
        'mainheat-description': 'main heating description',
        'mainheat-energy-eff': 'main heating-energy-eff',
        'mainheat-env-eff': 'main heating environmental efficiency',
        'mainheatcont-description': 'main heating continued, description',
        'mainheatc-energy-eff': 'main heating continued, energy efficiency',
        'mainheatc-env-eff': 'main heating continued, environmental efficiency',
        'lighting-description': 'lighting description',
        'lighting-energy-eff': 'lighting energy efficiency',
        'lighting-env-eff': 'lighting environmental efficiency',
        'main-fuel': 'main fuel',
        'wind-turbine-count': 'wind turbine count',
        'heat-loss-corridoor': 'heat loss corridoor',
        'unheated-corridor-length': 'unheated corridor length',
        'floor-height': 'floor height (metres)',
        'photo-supply': 'photovoltaic supply (percentage of total roof area)',
        'solar-water-heating-flag': 'solar water heating?',
        'mechanical-ventilation': 'mechanical ventilation',
        'address': 'address',
        'local-authority-label': 'local authority label',
        'constituency-label': 'constituency label',
        'certificate-hash': 'certificate hash',
    };

    constructor() {
    }

    parseToArray(epcResult: EpcApiResult): DisplayEpcRow[] {
        let row = epcResult.rows[0];
        return epcResult['column-names']
            .map(column => {
                return {
                    label: EpcParserService.displayLabels[column],
                    value: row[column]
                };
            });
    }
}
