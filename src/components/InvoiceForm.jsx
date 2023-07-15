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
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  };

  console.log(formState);
  console.log('isEditMode', isEditMode);

  return (
    <div className="invoice-form-wrapper">
      <h2>{isEditMode ? 'Add Invoice' : 'Edit Invoice'}</h2>
      <form onSubmit={handleSaveInvoice}>
        <div className="btn-container">
          {isEditMode ? (
            <>
              <button type="submit" className="btn-save">
                Save
              </button>
              <button onClick={handleCancel} className="btn-cancel">
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                className="btn-save"
                type="button"
                onClick={handleEdit}
              >
                Edit
              </button>
              <button className="btn-cancel" onClick={handleClose}>
                Close
              </button>
            </>
          )}
        </div>
        <div className="form-fields">
          <div>
            <label htmlFor="date">Invoice Date</label>
            <input
              id="date"
              type="date"
              name="invoiceDate"
              value={formState?.invoiceDate}
              onChange={handleInputChange}
              disabled={!isEditMode}
            />
          </div>
          <div>
            <label htmlFor="billTo">Bill To</label>
            <input
              id="billTo"
              type="text"
              name="billTo"
              value={formState?.billTo}
              onChange={handleInputChange}
              disabled={!isEditMode}
            />
          </div>
          <div>
            <label htmlFor="paymentDueDate">Payment Due Date</label>
            <input
              id="paymentDueDate"
              type="date"
              name="paymentDueDate"
              value={formState?.paymentDueDate}
              onChange={handleInputChange}
              disabled={!isEditMode}
            />
          </div>
          <div>
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
              <option value="pending">Pending</option>
              <option value="late">Late</option>
            </select>
          </div>
          <div>
            <label htmlFor="sentTo">Send To</label>
            <input
              id="sentTo"
              type="email"
              name="sentTo"
              value={formState?.sentTo}
              onChange={handleInputChange}
              disabled={!isEditMode}
            />
          </div>
        </div>
        <div className="line-item-wrapper">
          <h3 className="line-item-header">Line Items</h3>
          {isEditMode && (
            <div>
              <button
                className="btn-add-item"
                type="button"
                onClick={handleAddLineItem}
              >
                + Add item
              </button>
            </div>
          )}
        </div>

        <div className="item-wrapper">
          {formState.lineItems.map((item, index) => (
            <div key={index} className="line-item">
              <div>
                <input
                  id={`ratePerHour${index}`}
                  placeholder="Rate per Hour"
                  type="text"
                  name="ratePerHour"
                  value={item.ratePerHour}
                  onChange={(e) => handleLineItemChange(e, index)}
                  disabled={!isEditMode}
                />
              </div>
              <div>
                <input
                  id={`expenses${index}`}
                  type="number"
                  name="expenses"
                  min="0"
                  placeholder="Expenses"
                  value={item.expenses}
                  onChange={(e) => handleLineItemChange(e, index)}
                  disabled={!isEditMode}
                />
              </div>
              {index > 0 && isEditMode && (
                <button
                  className="btn-delete-item"
                  type="button"
                  onClick={() => handleDeleteLineItem(index)}
                >
                  Delete
                </button>
              )}
            </div>
          ))}
        </div>
      </form>
    </div>
  );
};

export default InvoiceForm;
