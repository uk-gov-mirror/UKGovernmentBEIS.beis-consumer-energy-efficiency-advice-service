import {Component} from '@angular/core';

interface State {
    prompt: string;
    helpText?: string;
    actions: { text: string, action: () => void }[];
}

type StateName = 'initial'
    | 'notDomestic'
    | 'propertyValid'
    | 'propertyInScope'
    | 'tenancyInScope'
    | 'epcBelowE'
    | 'improvementsAtNoExtraCost'
    | 'tenantConsent'
    | 'propertyNotDevalued'
    | 'noTemporaryExemptions'
    | 'noActionRequired'
    | 'registerExemption'
    | 'propertyCompliant';

type StateDefinitions = { [name in StateName]: State };

@Component({
    selector: 'app-mees-page',
    templateUrl: './mees-page.component.html',
    styleUrls: ['./mees-page.component.scss']
})
export class MeesPageComponent {
    public currentState: State;
    // TODO BEISDEAS-209 Should we pull this copy from WordPress?
    private states: StateDefinitions = {
        initial: {
            // TODO BEISDEAS-209 Is there a difference between letting and granting tenancy?
            prompt: 'Will you be letting a domestic property after 1st April 2018?',
            helpText: 'This can be to either new or existing tenants.',
            actions: [
                {text: 'Yes', action: () => this.setState('propertyValid')},
                {text: 'No', action: () => this.setState('notDomestic')},
            ],
        },
        notDomestic: {
            prompt: 'Will you be letting any property after 1st April 2020?',
            helpText: 'This can be either domestic or commercial property.',
            actions: [
                {text: 'Yes', action: () => this.setState('propertyValid')},
                {text: 'No', action: () => this.setState('noActionRequired')},
            ],
        },
        propertyValid: {
            prompt: 'Is the property required to have an EPC?',
            helpText: `Find out more
            <a href="https://www.gov.uk/buy-sell-your-home/energy-performance-certificates" target="_blank">
                here</a>.`,
            actions: [
                {text: 'Yes', action: () => this.setState('propertyInScope')},
                {text: 'No', action: () => this.setState('noActionRequired')},
            ],
        },
        propertyInScope: {
            prompt: 'What type of tenancy are you granting?', // TODO BEISDEAS-209 more information?
            actions: [
                {text: 'Assured Tenancy', action: () => this.setState('tenancyInScope')},
                {text: 'Regulated Tenancy', action: () => this.setState('tenancyInScope')},
                {text: 'Agricultural Tenancy', action: () => this.setState('tenancyInScope')},
                {text: 'Other', action: () => this.setState('noActionRequired')},
            ],
        },
        tenancyInScope: {
            prompt: 'Does the property have an EPC rating of F or G?',
            actions: [
                {text: 'Yes', action: () => this.setState('epcBelowE')},
                {text: 'No', action: () => this.setState('noActionRequired')},
            ],
        },
        epcBelowE: {
            prompt: 'Are there any recommended improvements that can be installed at no cost to the landlord?',
            helpText: 'The recommendations can be from an EPC recommendations report, a Green Deal advice report, a surveyor report '
            + 'or this website.', // TODO BEISDEAS-209 is our site valid for recommendations?
            actions: [
                {text: 'Yes', action: () => this.setState('improvementsAtNoExtraCost')},
                {text: 'No', action: () => this.setState('registerExemption')},
            ],
        },
        improvementsAtNoExtraCost: {
            prompt: 'Do the tenants and / or relevant third parties consent to the improvements?',
            actions: [
                {text: 'Yes', action: () => this.setState('tenantConsent')},
                {text: 'No', action: () => this.setState('registerExemption')},
            ],
        },
        tenantConsent: {
            prompt: 'Will the improvements result in devaluation of the property?',
            actions: [
                {text: 'Yes', action: () => this.setState('registerExemption')},
                {text: 'No', action: () => this.setState('propertyNotDevalued')},
            ],
        },
        propertyNotDevalued: {
            prompt: 'Are there any other "temporary exclusions" from improvement?',
            // TODO BEISDEAS-209 more information? Should we separate these questions?
            helpText: 'These can be if you recently became a landlord or if wall insulation cannot be installed.',
            actions: [
                {text: 'Yes', action: () => this.setState('registerExemption')},
                {text: 'No', action: () => this.setState('noTemporaryExemptions')},
            ],
        },
        noTemporaryExemptions: {
            prompt: `You are required to install the relevant improvements.
            <br/>
            <br/>
            After the measures are installed, does the property still have an EPC rating of F or G?`,
            actions: [
                {text: 'Yes', action: () => this.setState('registerExemption')},
                {text: 'No', action: () => this.setState('propertyCompliant')},
            ],
        },
        noActionRequired: {
            prompt: 'No action required.',
            helpText: 'You are not affected by the Minimum Standards Regulations and may let the property.',
            actions: [
                {text: 'Start again', action: () => this.setState('initial')},
            ],
        },
        registerExemption: {
            prompt: 'Register your exemption on the PRS Exemptions register.',
            helpText: `Follow the instructions
            <a
                href="https://www.gov.uk/government/publications/the-private-rented-property-minimum-standard-landlord-guidance-documents"
                target="_blank"
            >
                here</a>.
            Once your exemption is registered, you may let the property.`,
            actions: [
                {text: 'Start again', action: () => this.setState('initial')},
            ],
        },
        propertyCompliant: {
            prompt: 'You property is compliant with the Minimum Energy Efficiency Standards.',
            helpText: 'No further action is required.',
            actions: [
                {text: 'Start again', action: () => this.setState('initial')},
            ],
        },
    };

    constructor() {
        this.setState('initial');
    }

    private setState(stateName: StateName) {
        this.currentState = this.states[stateName];
    }
}
