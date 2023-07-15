import React, { useState, useEffect } from 'react';
import InvoiceFields from './InvoiceFields';
import InvoiceLineItems from './InvoiceLineItems';

const InvoiceForm = ({ onSave, onCancel, selectedInvoice }) => {
  const [formState, setFormState] = useState({
    invoiceDate: '',
    billTo: '',
    paymentDueDate: '',
    status: '',
    lineItems: [
      {
        ratePerHour: '',
        expenses: '',
      },
    ],
    sentTo: '',
  });

  const [isEditMode, setIsEditMode] = useState(
    selectedInvoice ? false : true
  );

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setFormState(
      selectedInvoice || { ...formState, invoiceDate: today }
    );
  }, [selectedInvoice]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleLineItemChange = (e, index) => {
    const { name, value } = e.target;
    const updatedLineItems = [...formState.lineItems];
    updatedLineItems[index] = {
      ...updatedLineItems[index],
      [name]: value,
    };
    setFormState({ ...formState, lineItems: updatedLineItems });
  };

  const handleAddLineItem = () => {
    const lastLineItem =
      formState.lineItems[formState.lineItems.length - 1];
    if (
      lastLineItem.ratePerHour === '' ||
      lastLineItem.expenses === ''
    ) {
      alert(
        'Please fill in the previous line item before adding a new one.'
      );
      return;
    }

    setFormState({
      ...formState,
      lineItems: [
        ...formState.lineItems,
        { ratePerHour: '', expenses: '' },
      ],
    });
  };

  const handleDeleteLineItem = (index) => {
    const updatedLineItems = [...formState.lineItems];
    updatedLineItems.splice(index, 1);
    setFormState({ ...formState, lineItems: updatedLineItems });
  };

  const handleSaveInvoice = (e) => {
    debugger;
    e.preventDefault();

    const {
      invoiceDate,
      billTo,
      paymentDueDate,
      status,
      lineItems,
      sentTo,
    } = formState;
    if (
      invoiceDate === '' ||
      billTo === '' ||
      paymentDueDate === '' ||
      status === '' ||
      lineItems.some(
        (item) => item.ratePerHour === '' || item.expenses === ''
      ) ||
      !validateEmail(sentTo)
    ) {
      alert('Please fill in all the form fields with valid values.');
      return;
    }

    onSave(formState);
  };

  const handleCancel = () => {
    onCancel();
  };

  const handleEdit = (e) => {
    e.preventDefault();
    setIsEditMode(true);
  };

  const handleClose = () => {
    onCancel();
  };

  const validateEmail = (email) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  };

  return (
    <div className="invoice-form-wrapper">
      <h2>{isEditMode ? 'Add Invoice' : 'Edit Invoice'}</h2>
      <form onSubmit={handleSaveInvoice}>
        <InvoiceFields
          isEditMode={isEditMode}
          formState={formState}
          handleInputChange={handleInputChange}
          handleCancel={handleCancel}
          handleEdit={handleEdit}
          handleClose={handleClose}
        />

        <InvoiceLineItems
          isEditMode={isEditMode}
          handleAddLineItem={handleAddLineItem}
          formState={formState}
          handleLineItemChange={handleLineItemChange}
          handleDeleteLineItem={handleDeleteLineItem}
        />
      </form>
    </div>
  );
};

export default InvoiceForm;
