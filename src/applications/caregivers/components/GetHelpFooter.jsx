import React from 'react';
import { CONTACTS } from '@department-of-veterans-affairs/component-library/contacts';
import { links } from '../definitions/content';

const GetHelpFooter = () => {
  return (
    <>
      <p>
        You can call the VA Caregiver Support Line at{' '}
        <va-telephone contact={CONTACTS.CAREGIVER} />. We’re here Monday through
        Friday, 8:00 a.m. to 10:00 p.m. ET, and Saturday, 8:00 a.m. to 5:00 p.m.
        ET.
      </p>

      <p>
        You can also call{' '}
        <va-telephone contact={CONTACTS.HEALTHCARE_ELIGIBILITY_CENTER} /> if you
        if you have questions about completing your application, or contact your
        local Caregiver Support Coordinator.
      </p>

      <p>
        <a
          href={links.caregiverSupportCoordinators.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          {links.caregiverSupportCoordinators.label}
        </a>
      </p>

      <p>
        If this form isn’t working right for you, please call us at{' '}
        <va-telephone contact={CONTACTS.HELP_DESK} />.<br />
        <span>
          If you have hearing loss, call{' '}
          <va-telephone contact={CONTACTS['711']} tty />.
        </span>
      </p>
    </>
  );
};

export default GetHelpFooter;
