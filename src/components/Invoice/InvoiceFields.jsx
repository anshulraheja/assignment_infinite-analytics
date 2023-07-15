import React from 'react';

const InvoiceFields = ({
  formState,
  handleInputChange,
  isEditMode,
  handleCancel,
  handleEdit,
  handleClose,
}) => {
  return (
    <>
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
    </>
  );
};

export default InvoiceFields;
