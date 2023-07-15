import React, { useState, useEffect } from 'react';

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
    // Set today's date as the default value for invoiceDate
    const today = new Date().toISOString().split('T')[0];
    setFormState({ ...formState, invoiceDate: today });
  }, []);

  useEffect(() => {
    if (selectedInvoice) {
      setFormState(selectedInvoice);
    }
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

    // Perform validation
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
    // Use a simple regex pattern to validate the email format
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  };

  console.log(formState);
  console.log('isEditMode', isEditMode);

  return (
    <div>
      <form onSubmit={handleSaveInvoice}>
        <div>
          {isEditMode ? (
            <>
              <button type="submit">Save</button>
              <button onClick={handleCancel}>Cancel</button>
            </>
          ) : (
            <>
              <button type="button" onClick={handleEdit}>
                Edit
              </button>
              <button onClick={handleClose}>Close</button>
            </>
          )}
        </div>
        <label htmlFor="date">Invoice Date</label>
        <input
          id="date"
          type="date"
          name="invoiceDate"
          value={formState?.invoiceDate}
          onChange={handleInputChange}
          disabled={!isEditMode}
        />
        <label htmlFor="billTo">Bill To</label>
        <input
          id="billTo"
          type="text"
          name="billTo"
          value={formState?.billTo}
          onChange={handleInputChange}
          disabled={!isEditMode}
        />
        <label htmlFor="paymentDueDate">Payment Due Date</label>
        <input
          id="paymentDueDate"
          type="date"
          name="paymentDueDate"
          value={formState?.paymentDueDate}
          onChange={handleInputChange}
          disabled={!isEditMode}
        />
        <label htmlFor="status">Status</label>
        <select
          name="status"
          id="status"
          value={formState?.status}
          onChange={handleInputChange}
          disabled={!isEditMode}
        >
          <option value="" disabled>
            Select a value
          </option>
          <option value="paid">Paid</option>
          <option value="outstanding">Outstanding</option>
          <option value="late">Late</option>
        </select>

        <label htmlFor="sentTo">Send To</label>
        <input
          id="sentTo"
          type="email"
          name="sentTo"
          value={formState?.sentTo}
          onChange={handleInputChange}
          disabled={!isEditMode}
        />

        <h3>Line Items</h3>

        {formState.lineItems.map((item, index) => (
          <div key={index}>
            <label htmlFor={`ratePerHour${index}`}>
              Rate per Hour
            </label>
            <input
              id={`ratePerHour${index}`}
              type="text"
              name="ratePerHour"
              value={item.ratePerHour}
              onChange={(e) => handleLineItemChange(e, index)}
              disabled={!isEditMode}
            />
            <label htmlFor={`expenses${index}`}>Expenses</label>
            <input
              id={`expenses${index}`}
              type="number"
              name="expenses"
              min="0"
              value={item.expenses}
              onChange={(e) => handleLineItemChange(e, index)}
              disabled={!isEditMode}
            />

            {index > 0 && isEditMode && (
              <button
                type="button"
                onClick={() => handleDeleteLineItem(index)}
              >
                Delete
              </button>
            )}
          </div>
        ))}

        {isEditMode && (
          <div>
            <button type="button" onClick={handleAddLineItem}>
              Add line item
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default InvoiceForm;
