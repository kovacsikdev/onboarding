import React from 'react';
import { render, screen } from '@testing-library/react';
import { SummaryPage } from '../src/components';

describe('SummaryPage', () => {
  const mockFormData = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '123-456-7890'
  };

  test('renders summary information correctly', () => {
    // Arrange
    render(
      <SummaryPage
        direction="next"
        formData={mockFormData}
      />
    );
    
    // Assert
    expect(screen.getByText('Summary')).toBeInTheDocument();
    expect(screen.getByText('First Name:')).toBeInTheDocument();
    expect(screen.getByText('Last Name:')).toBeInTheDocument();
    expect(screen.getByText('Email:')).toBeInTheDocument();
    expect(screen.getByText('Phone:')).toBeInTheDocument();
    
    // Check the values
    expect(screen.getByText(mockFormData.firstName)).toBeInTheDocument();
    expect(screen.getByText(mockFormData.lastName)).toBeInTheDocument();
    expect(screen.getByText(mockFormData.email)).toBeInTheDocument();
    expect(screen.getByText(mockFormData.phone)).toBeInTheDocument();
    
    // Check confirmation text
    expect(screen.getByText('Please confirm your information is correct.')).toBeInTheDocument();
    
    // Check accessibility attributes
    const summaryRegion = screen.getByRole('region');
    expect(summaryRegion).toHaveAttribute('aria-label', 'Summary');
    
    const summarySection = screen.getByLabelText('Your information summary');
    expect(summarySection).toBeInTheDocument();
  });

  test('renders with prev direction', () => {
    // Arrange
    render(
      <SummaryPage
        direction="prev"
        formData={mockFormData}
      />
    );
    
    // Assert
    const pageElement = screen.getByRole('region');
    expect(pageElement).toHaveClass('page prev');
  });
});
