import { render, screen, fireEvent } from '@testing-library/react';
import CheckboxList from './TodoContainer';

test('renders the checkbox list', () => {
  render(<CheckboxList />);
  
  // Assert that the checkbox list is rendered
  const checkboxList = screen.getByRole('list');
  expect(checkboxList).toBeInTheDocument();
});

test('toggles the checkbox when clicked', () => {
  render(<CheckboxList />);
  
  // Get the first checkbox
  const checkbox = screen.getByRole('checkbox', { name: /learn react/i });
  
  // Assert that the checkbox is initially unchecked
  expect(checkbox).not.toBeChecked();
  
  // Click the checkbox
  fireEvent.click(checkbox);
  
  // Assert that the checkbox is now checked
  expect(checkbox).toBeChecked();
  
  // Click the checkbox again
  fireEvent.click(checkbox);
  
  // Assert that the checkbox is now unchecked
  expect(checkbox).not.toBeChecked();
});