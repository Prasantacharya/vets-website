import { generateFeatureToggles } from '../../../../api/local-mock-api/mocks/feature.toggles';
import mockCheckIn from '../../../../api/local-mock-api/mocks/v2/check.in.responses';
import mockSession from '../../../../api/local-mock-api/mocks/v2/sessions.responses';
import mockPatientCheckIns from '../../../../api/local-mock-api/mocks/v2/patient.check.in.responses';
import Timeouts from 'platform/testing/e2e/timeouts';

describe('Check In Experience -- ', () => {
  beforeEach(function() {
    let hasValidated = false;
    cy.intercept('GET', '/check_in/v2/sessions/*', req => {
      req.reply(
        mockSession.createMockSuccessResponse('some-token', 'read.basic'),
      );
    });
    cy.intercept('POST', '/check_in/v2/sessions', req => {
      hasValidated = true;
      req.reply(
        mockSession.createMockSuccessResponse('some-token', 'read.full'),
      );
    });
    cy.intercept('GET', '/check_in/v2/patient_check_ins/*', req => {
      req.reply(
        mockPatientCheckIns.createMockSuccessResponse({}, hasValidated),
      );
    });
    cy.intercept('POST', '/check_in/v2/patient_check_ins/', req => {
      req.reply(mockCheckIn.createMockFailedResponse({}));
    });
    cy.intercept(
      'GET',
      '/v0/feature_toggles*',
      generateFeatureToggles({
        checkInExperienceMultipleAppointmentSupport: true,
        checkInExperienceUpdateInformationPageEnabled: false,
      }),
    );
  });
  afterEach(() => {
    cy.window().then(window => {
      window.sessionStorage.clear();
    });
  });
  it('C5722 - Check in failed with a 200 and error message in the body', () => {
    const featureRoute =
      '/health-care/appointment-check-in/?id=46bebc0a-b99c-464f-a5c5-560bc9eae287';
    cy.visit(featureRoute);
    cy.get('h1', { timeout: Timeouts.slow })
      .should('be.visible')
      .and('have.text', 'Check in at VA');
    cy.injectAxe();
    cy.axeCheck();
    cy.get('[label="Your last name"]')
      .shadow()
      .find('input')
      .type('Smith');
    cy.get('[label="Last 4 digits of your Social Security number"]')
      .shadow()
      .find('input')
      .type('4837');
    cy.get('[data-testid=check-in-button]').click();
    cy.get('h1', { timeout: Timeouts.slow })
      .should('be.visible')
      .and('have.text', 'Your appointments');
    cy.get('.appointment-list').should('have.length', 1);
    cy.injectAxe();
    cy.axeCheck();
    cy.get('.usa-button').click();
    cy.get('h1', { timeout: Timeouts.slow })
      .should('be.visible')
      .and('contain', 'We couldn’t check you in');
  });
});