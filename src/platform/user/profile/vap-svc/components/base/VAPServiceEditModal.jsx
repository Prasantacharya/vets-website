import React from 'react';
import PropTypes from 'prop-types';

import Modal from '@department-of-veterans-affairs/component-library/Modal';

import LoadingButton from 'platform/site-wide/loading-button/LoadingButton';
import {
  isFailedTransaction,
  isPendingTransaction,
} from 'platform/user/profile/vap-svc/util/transactions';
import VAPServiceEditModalActionButtons from './VAPServiceEditModalActionButtons';
import VAPServiceEditModalErrorMessage from './VAPServiceEditModalErrorMessage';

export default class VAPServiceEditModal extends React.Component {
  static propTypes = {
    analyticsSectionName: PropTypes.string.isRequired,
    clearErrors: PropTypes.func,
    getInitialFormValues: PropTypes.func.isRequired,
    field: PropTypes.shape({
      value: PropTypes.object,
      validations: PropTypes.object,
    }),
    hasValidationError: PropTypes.func,
    isEmpty: PropTypes.bool.isRequired,
    onCancel: PropTypes.func.isRequired,
    onChangeFormDataAndSchemas: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    render: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    transactionRequest: PropTypes.object,
    useSchemaForm: PropTypes.bool,
  };

  componentDidMount() {
    this.props.onChangeFormDataAndSchemas(
      this.props.getInitialFormValues(),
      this.props.formSchema,
      this.props.uiSchema,
    );
  }

  componentWillUnmount() {
    // Errors returned directly from the API request (as opposed through a transaction lookup) are
    // displayed in this modal, rather than on the page. Once the modal is closed, reset the state
    // for the next time the modal is opened by removing any existing transaction request from the store.
    if (this.props.clearErrors && this.props.transactionRequest?.error) {
      this.props.clearErrors();
    }
  }

  onSubmit = () => {
    this.props.onSubmit(this.props.field.value);
  };

  isInitialized = () =>
    this.props.isInitialized ? this.props.isInitialized() : !!this.props.field;

  render() {
    const {
      onSubmit,
      isInitialized,
      props: {
        isEmpty,
        onCancel,
        title,
        render,
        onDelete,
        transaction,
        transactionRequest,
        analyticsSectionName,
        deleteDisabled,
      },
    } = this;

    const isFormReady = isInitialized();
    const isLoading =
      transactionRequest?.isPending || isPendingTransaction(transaction);
    const error =
      transactionRequest?.error ||
      (isFailedTransaction(transaction) ? {} : null);

    const actionButtons = (
      <VAPServiceEditModalActionButtons
        onCancel={onCancel}
        onDelete={onDelete}
        title={title}
        analyticsSectionName={analyticsSectionName}
        transactionRequest={transactionRequest}
        deleteEnabled={!isEmpty && !deleteDisabled}
      >
        <LoadingButton data-action="save-edit" isLoading={isLoading}>
          Update
        </LoadingButton>
        <button
          type="button"
          className="usa-button-secondary"
          onClick={onCancel}
        >
          Cancel
        </button>
      </VAPServiceEditModalActionButtons>
    );

    return (
      <Modal id="profile-edit-modal" onClose={onCancel} visible={isFormReady}>
        <h3>Edit {title.toLowerCase()}</h3>
        {error && (
          <div className="vads-u-margin-bottom--1">
            <VAPServiceEditModalErrorMessage error={error} />
          </div>
        )}
        {isFormReady && render(actionButtons, onSubmit)}
      </Modal>
    );
  }
}
