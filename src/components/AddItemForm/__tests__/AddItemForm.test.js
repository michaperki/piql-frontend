import React from 'react';
import { render, screen } from '@testing-library/react';
import AddItemForm from '../AddItemForm'; // Import your component

test('renders the Add Item form', () => {
  render(<AddItemForm />);
  const addButton = screen.getByText('Add Item'); // Adjust this selector based on your component's content
  expect(addButton).toBeInTheDocument();
});
