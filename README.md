# Invoice App
The Invoice App is a simple web application that allows users to manage and track their invoices. It provides an easy-to-use interface for adding, editing, and deleting invoices, along with the ability to filter invoices based on their status.

## Features
- Add new invoices with details such as invoice date, bill-to, payment due date, status, and line items.
- Edit existing invoices and update their details.
- Delete invoices that are no longer needed.
- Filter invoices based on their status (Paid, Pending, Late, or view all).
- Automatic date selection for new invoices, set to the current date by default.
- Validation to ensure all required fields are filled and valid before saving an invoice.

## Technologies Used
- React: A JavaScript library for building user interfaces.
- Redux: A state management library for managing application state.
- React-Redux: Official React bindings for Redux, to connect React components to the Redux store.
- UUID: A library for generating unique IDs, used for creating invoice IDs.
- React Icons: A library of popular icons for use in React applications.

## Getting Started
Follow the steps below to set up and run the Invoice App on your local machine:

### Clone the repository:

```bash
git clone <repository_url>
```
Install dependencies:
```bash
cd invoice-app
npm install
```
Run the application:

```bash
npm start
```
This will start the development server, and you can view the app in your browser at `http://localhost:3000`.

## Usage

### Viewing Invoices:

- On the homepage, you will see a list of all invoices.
- The total number of invoices is displayed at the top.
- You can filter invoices based on their status by selecting an option from the dropdown list.

### Adding a New Invoice:

- Click on the "New Invoice" button on the top right corner.
- A modal will appear with a form to add invoice details.
- Fill in all the required information, such as invoice date, bill-to, payment due date, status, and line items.
- Click on the "Save" button to add the invoice.
- Click on the "Cancel" button to discard changes and close the modal.

### Editing an Invoice:

- Click on the "Edit" icon (pencil icon) next to an existing invoice.
- The invoice details will appear in the modal.
- Modify the required information and click on the "Save" button to update the invoice.
- Click on the "Cancel" button to discard changes and close the modal.

### Deleting an Invoice:

- Click on the "Delete" icon (trash bin icon) next to an existing invoice.
- A confirmation message will appear.
- Click on "Delete" to remove the invoice permanently or "Cancel" to keep it.
