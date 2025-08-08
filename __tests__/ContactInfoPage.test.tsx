import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ContactInfoPage } from '../src/components';

describe('ContactInfoPage', () => {
  const mockFormData = {
    email: '',
    phone: ''
  };
  const mockHandleInputChange = jest.fn();
  const mockNextPage = jest.fn();
  const emailRef = React.createRef<HTMLInputElement>() as React.RefObject<HTMLInputElement>;
  const phoneRef = React.createRef<HTMLInputElement>() as React.RefObject<HTMLInputElement>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders contact info form fields', () => {
    // Arrange
    render(
      <ContactInfoPage
        direction="next"
        formData={mockFormData}
        handleInputChange={mockHandleInputChange}
        nextPage={mockNextPage}
        emailRef={emailRef}
        phoneRef={phoneRef}
      />
    );
    
    // Assert
    expect(screen.getByText('Contact Information')).toBeInTheDocument();
    expect(screen.getByLabelText('Email Address')).toBeInTheDocument();
    expect(screen.getByLabelText('Phone Number')).toBeInTheDocument();
    
    // Check accessibility attributes
    const formRegion = screen.getByRole('region');
    expect(formRegion).toHaveAttribute('aria-label', 'Contact Information');
  });

  test('calls handleInputChange when input values change', () => {
    // Arrange
    render(
      <ContactInfoPage
        direction="next"
        formData={mockFormData}
        handleInputChange={mockHandleInputChange}
        nextPage={mockNextPage}
        emailRef={emailRef}
        phoneRef={phoneRef}
      />
    );
    
    // Act
    const emailInput = screen.getByLabelText('Email Address');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    
    // Assert
    expect(mockHandleInputChange).toHaveBeenCalled();
  });

  test('moves to next field when Enter is pressed on email', () => {
    // Arrange
    const updatedFormData = {
      email: 'test@example.com',
      phone: ''
    };
    
    render(
      <ContactInfoPage
        direction="next"
        formData={updatedFormData}
        handleInputChange={mockHandleInputChange}
        nextPage={mockNextPage}
        emailRef={emailRef}
        phoneRef={phoneRef}
      />
    );
    
    // Mock the focus function
    const focusMock = jest.fn();
    Object.defineProperty(phoneRef, 'current', {
      value: { focus: focusMock },
      writable: true
    });
    
    // Act
    const emailInput = screen.getByLabelText('Email Address');
    fireEvent.keyDown(emailInput, { key: 'Enter' });
    
    // Assert
    expect(focusMock).toHaveBeenCalled();
  });

  test('calls nextPage when Enter is pressed with both fields filled', () => {
    // Arrange
    const filledFormData = {
      email: 'test@example.com',
      phone: '123-456-7890'
    };
    
    render(
      <ContactInfoPage
        direction="next"
        formData={filledFormData}
        handleInputChange={mockHandleInputChange}
        nextPage={mockNextPage}
        emailRef={emailRef}
        phoneRef={phoneRef}
      />
    );
    
    // Act
    const phoneInput = screen.getByLabelText('Phone Number');
    fireEvent.keyDown(phoneInput, { key: 'Enter' });
    
    // Assert
    expect(mockNextPage).toHaveBeenCalled();
  });
});
