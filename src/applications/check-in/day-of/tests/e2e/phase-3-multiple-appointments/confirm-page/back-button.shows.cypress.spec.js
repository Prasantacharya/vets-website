import { generateFeatureToggles } from '../../../../api/local-mock-api/mocks/feature.toggles';
import '../../support/commands';
import Timeouts from 'platform/testing/e2e/timeouts';

describe('Check In Experience -- ', () => {
  describe('phase 3 -- ', () => {
    beforeEach(function() {
      cy.authenticate();
      cy.getAppointments();
      cy.successfulCheckin();
      cy.intercept(
        'GET',
        '/v0/feature_toggles*',
        generateFeatureToggles({
          checkInExperienceUpdateInformationPageEnabled: false,
        }),
      );
    });
    afterEach(() => {
      cy.window().then(window => {
        window.sessionStorage.clear();
      });
    });
    it('confirm page toggles -- on', () => {
      cy.visitWithUUID();
      cy.get('h1', { timeout: Timeouts.slow })
        .should('be.visible')
        .and('have.text', 'Check in at VA');
      cy.injectAxe();
      cy.axeCheck();
      cy.signIn();
      cy.get('h1', { timeout: Timeouts.slow })
        .should('be.visible')
        .and('have.text', 'Your appointments');
      cy.get('.appointment-list').should('have.length', 1);
      cy.injectAxe();
      cy.axeCheck();
      cy.get(':nth-child(2) > [data-testid=check-in-button]').click();

      cy.get('[data-testid=multiple-appointments-confirm]', {
        timeout: Timeouts.slow,
      }).should('be.visible');

      cy.get('va-alert > h1', { timeout: Timeouts.slow })
        .should('be.visible')
        .and('include.text', 'checked in');
      cy.injectAxe();
      cy.axeCheck();

      cy.get('[data-testid=go-to-appointments-button]', {
        timeout: Timeouts.slow,
      })
        .should('be.visible')
        .and('include.text', 'Go to another appointment');
    });
  });
});