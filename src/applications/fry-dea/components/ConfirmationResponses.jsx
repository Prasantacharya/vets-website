import React from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import GetFormHelp from './GetFormHelp';

const NeedHelpComponent = () => {
  return (
    <div className="help-footer-box">
      <h2 className="help-heading">Need help?</h2>
      <GetFormHelp />
    </div>
  );
};

const ConfirmationReceiptBox = ({ name }) => {
  return (
    <div className="inset">
      <h4>Application for VA education benefits (Form 22-5490)</h4>
      {name ? (
        <p>
          For {name.first} {name.middle} {name.last} {name.suffix}
        </p>
      ) : null}

      {/* {response ? ( */}
      {/*  <> */}
      <dl>
        <dt>
          <strong>Date received</strong>
        </dt>
        <dd>{format(new Date(), 'MMM d, yyyy')}</dd>
      </dl>

      <button
        type="button"
        onClick={() => window.print()}
        className="usa-button vads-u-width--auto"
      >
        Print this page
      </button>
      {/*  </> */}
      {/* ) : null} */}
    </div>
  );
};

ConfirmationReceiptBox.propTypes = {
  name: PropTypes.object,
};

export function UnderReview(response, name) {
  return (
    <>
      <div>
        <va-alert
          close-btn-aria-label="Close notification"
          status="success"
          visible
        >
          <h2 id="track-your-status-on-mobile" slot="headline">
            We’ve received your application
          </h2>
          <div>
            <p className="vads-u-margin-y--0">
              Your application requires additional review. Once we have reviewed
              your application, we will reach out to notify you about next
              steps.
            </p>
          </div>
        </va-alert>
        <ConfirmationReceiptBox name={name} />
      </div>
      <div className="vads-u-margin-bottom--4">
        <h2>When will I hear back about my application?</h2>
        <va-alert
          background-only
          close-btn-aria-label="Close notification"
          status="continue"
          visible
        >
          <div>
            <h2 className="vads-u-margin-y--0">In 1 month</h2>
            <hr className="custom-fry-hr" />
            If more than a month has passed since you gave us your application
            and you haven’t heard back, please don’t apply again. Call our
            toll-free Education Call Center at{' '}
            <a href="tel:888-442-4551">1-888-442-4551</a> or{' '}
            <a href="tel:001-918-781-5678">001-918-781-5678</a> if you are
            outside the U.S.
          </div>
        </va-alert>
      </div>
      <div className="vads-u-margin-bottom--4">
        <h2>What happens next?</h2>
        <ul>
          <li>We will review your eligibility for the Fry Scholarship.</li>
          <li>We may reach out with questions about your application.</li>
          <li>There is no further action required by you at this time.</li>
        </ul>
      </div>
      <div className="vads-u-margin-bottom--4">
        <h2>What can I do while I wait?</h2>
        <ul>
          <li>
            If you need to submit documentation to VA, such as service records,
            please send this through our{' '}
            <a target="_blank" href="https://ask.va.gov/ " rel="noreferrer">
              Ask VA feature.
            </a>
          </li>
          <li>
            <a target="_blank" href="/profile">
              Review and/or update your direct deposit information on your{' '}
              VA.gov profile.
            </a>
          </li>
          <li>
            <a target="_blank" href="/education/gi-bill-comparison-tool/">
              Use our GI Bill Comparison Tool to help you decide which education
              program and school is best for you.
            </a>
          </li>
          <li>
            <a
              target="_blank"
              href="https://blogs.va.gov/VAntage/78073/new-guide-series-provides-gi-bill-benefits-information/"
              rel="noreferrer"
            >
              Learn more about VA benefits and programs through the Building
              Your Future with the GI Bill Series.
            </a>
          </li>
          <li>
            <a
              target="_blank"
              href="https://www.benefits.va.gov/gibill/careerscope.asp"
              rel="noreferrer"
            >
              Measure your interests and skill levels and help figure out your
              career path with CareerScope®.
            </a>
          </li>
        </ul>
      </div>
      <NeedHelpComponent />
    </>
  );
}

UnderReview.prototype = {
  name: PropTypes.object,
  response: PropTypes.object || PropTypes.bool,
};

export function NotEligible(name) {
  return (
    <>
      <div>
        <va-alert
          close-btn-aria-label="Close notification"
          status="info"
          visible
        >
          <h2 id="track-your-status-on-mobile" slot="headline">
            You’re not eligible for this benefit
          </h2>
          <div>
            <p className="vads-u-margin-top--0 vads-u-margin-bottom--3">
              Unfortunately, based on the information you provided and
              Department of Defense records, we have determined you’re not
              eligible for the Survivors’ and Dependents’ Educational Assistance
              (DEA, Chapter 35) benefit at this time. You can now download your
              decision letter, which explains why you're not eligible. We'll
              also mail a physical copy to your mailing address.
            </p>
            <va-link
              download
              filetype="PDF"
              href="https://www.va.gov"
              text="Download your decision letter"
            />
          </div>
        </va-alert>
        <ConfirmationReceiptBox name={name} />
      </div>
      <div className="vads-u-margin-bottom--4">
        <h2>What happens next?</h2>
        <ul>
          <li>
            Download a copy of your decision letter. This can also be found at{' '}
            <va-link
              href="https://va.gov/vso/"
              text="Download your VA education letters."
            />
          </li>
          <li>We don’t require further action required by you at this time.</li>
        </ul>
      </div>
      <NeedHelpComponent />
    </>
  );
}

NotEligible.prototype = {
  name: PropTypes.object,
  response: PropTypes.object || PropTypes.bool,
};

export function LoadingResults() {
  return (
    <div className="vads-u-margin-y--5">
      <va-loading-indicator
        label="Loading"
        message="Loading your results"
        set-focus
      />
    </div>
  );
}