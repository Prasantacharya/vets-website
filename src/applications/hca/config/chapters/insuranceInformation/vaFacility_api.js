import fullSchemaHca from 'vets-json-schema/dist/10-10EZ-schema.json';
import constants from 'vets-json-schema/dist/constants.json';
import { statesWithoutService } from '../../../constants';
import {
  EssentialCoverageDescription,
  FacilityLocatorDescription,
} from '../../../components/FormDescriptions';
import { ShortFormAlert } from '../../../components/FormAlerts';
import VaMedicalCenter from '../../../components/FormFields/VaMedicalCenter';
import {
  emptyObjectSchema,
  NotHighDisabilityOrNotCompensationTypeHigh,
} from '../../../helpers';

// define default schema properties
const {
  isEssentialAcaCoverage,
  wantsInitialVaContact,
} = fullSchemaHca.properties;

// define states/territories with health care facilities
const healthcareStates = constants.states.USA.filter(state => {
  return !statesWithoutService.includes(state.value);
});

export default {
  uiSchema: {
    'view:facilityShortFormMessage': {
      'ui:description': ShortFormAlert,
      'ui:options': {
        hideIf: NotHighDisabilityOrNotCompensationTypeHigh,
      },
    },
    'view:vaFacilityTitle': {
      'ui:title': 'VA facility',
    },
    isEssentialAcaCoverage: {
      'ui:title':
        'I’m enrolling to get minimum essential coverage under the Affordable Care Act.',
    },
    'view:isEssentialCoverageDesc': {
      'ui:description': EssentialCoverageDescription,
    },
    'view:preferredFacility': {
      'ui:title': 'Select your preferred VA medical facility',
      'view:facilityState': {
        'ui:title': 'State',
        'ui:required': () => true,
      },
      vaMedicalFacility: {
        'ui:title': 'Center or clinic',
        'ui:widget': VaMedicalCenter,
        'ui:required': () => true,
        'ui:options': {
          hideLabelText: true,
        },
      },
    },
    'view:locator': {
      'ui:description': FacilityLocatorDescription,
    },
    wantsInitialVaContact: {
      'ui:title':
        'Do you want VA to contact you to schedule your first appointment?',
      'ui:widget': 'yesNo',
    },
  },
  schema: {
    type: 'object',
    properties: {
      'view:facilityShortFormMessage': emptyObjectSchema,
      'view:vaFacilityTitle': emptyObjectSchema,
      isEssentialAcaCoverage,
      'view:isEssentialCoverageDesc': emptyObjectSchema,
      'view:preferredFacility': {
        type: 'object',
        properties: {
          'view:facilityState': {
            type: 'string',
            enum: healthcareStates.map(object => object.value),
            enumNames: healthcareStates.map(object => object.label),
          },
          vaMedicalFacility: {
            type: 'string',
          },
        },
      },
      'view:locator': emptyObjectSchema,
      wantsInitialVaContact,
    },
  },
};