import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { PersonalInfoPage } from '../src/components';

describe('PersonalInfoPage', () => {
  const mockFormData = {
    firstName: '',
    lastName: ''
  };
  const mockHandleInputChange = jest.fn();
  const mockNextPage = jest.fn();
  const firstNameRef = React.createRef<HTMLInputElement>() as React.RefObject<HTMLInputElement>;
  const lastNameRef = React.createRef<HTMLInputElement>() as React.RefObject<HTMLInputElement>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders personal info form fields', () => {
    // Arrange
    render(
      <PersonalInfoPage
        direction="next"
        formData={mockFormData}
        handleInputChange={mockHandleInputChange}
        nextPage={mockNextPage}
        firstNameRef={firstNameRef}
        lastNameRef={lastNameRef}
      />
    );
    
    // Assert
    expect(screen.getByText("What's Your Name?")).toBeInTheDocument();
    expect(screen.getByLabelText('First Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Last Name')).toBeInTheDocument();
    
    // Check accessibility attributes
    const formRegion = screen.getByRole('region');
    expect(formRegion).toHaveAttribute('aria-label', 'Personal Information');
  });

  test('calls handleInputChange when input values change', () => {
    // Arrange
    render(
      <PersonalInfoPage
        direction="next"
        formData={mockFormData}
        handleInputChange={mockHandleInputChange}
        nextPage={mockNextPage}
        firstNameRef={firstNameRef}
        lastNameRef={lastNameRef}
      />
    );
    
    // Act
    const firstNameInput = screen.getByLabelText('First Name');
    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    
    // Assert
    expect(mockHandleInputChange).toHaveBeenCalled();
  });

  test('moves to next field when Enter is pressed on first name', () => {
    // Arrange
    const updatedFormData = {
      firstName: 'John',
      lastName: ''
    };
    
    render(
      <PersonalInfoPage
        direction="next"
        formData={updatedFormData}
        handleInputChange={mockHandleInputChange}
        nextPage={mockNextPage}
        firstNameRef={firstNameRef}
        lastNameRef={lastNameRef}
      />
    );
    
    // Mock the focus function
    const focusMock = jest.fn();
    Object.defineProperty(lastNameRef, 'current', {
      value: { focus: focusMock },
      writable: true
    });
    
    // Act
    const firstNameInput = screen.getByLabelText('First Name');
    fireEvent.keyDown(firstNameInput, { key: 'Enter' });
    
    // Assert
    expect(focusMock).toHaveBeenCalled();
  });

  test('calls nextPage when Enter is pressed with both fields filled', () => {
    // Arrange
    const filledFormData = {
      firstName: 'John',
      lastName: 'Doe'
    };
    
    render(
      <PersonalInfoPage
        direction="next"
        formData={filledFormData}
        handleInputChange={mockHandleInputChange}
        nextPage={mockNextPage}
        firstNameRef={firstNameRef}
        lastNameRef={lastNameRef}
      />
    );
    
    // Act
    const lastNameInput = screen.getByLabelText('Last Name');
    fireEvent.keyDown(lastNameInput, { key: 'Enter' });
    
    // Assert
    expect(mockNextPage).toHaveBeenCalled();
  });
});
