import React from 'react';
import { render, screen } from '@testing-library/react';
import AddItemForm from '../AddItemForm'; // Adjust the import path as needed
import '@testing-library/jest-dom'

test('renders the Add Item form', () => {
  render(<AddItemForm />);
  const addButton = screen.getAllByText('Add Item'); // Use getAllByText to handle multiple matches
  expect(addButton.length).toBeGreaterThan(0); // Check that at least one element with text "Add Item" is found
});
