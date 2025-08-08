import React from 'react';
import { render, screen } from '@testing-library/react';
import { WelcomePage } from '../src/components';

describe('WelcomePage', () => {
  test('renders welcome message and icon', () => {
    // Arrange
    render(<WelcomePage direction="next" />);
    
    // Assert
    expect(screen.getByText('Welcome to Our Platform')).toBeInTheDocument();
    expect(screen.getByText("We're excited to have you on board! Let's get you set up.")).toBeInTheDocument();
    expect(screen.getByText('This quick onboarding process will only take a minute.')).toBeInTheDocument();
    
    // Check for the welcome icon (emoji)
    const iconElement = screen.getByText('👋');
    expect(iconElement).toBeInTheDocument();
    expect(iconElement).toHaveAttribute('aria-hidden', 'true');
    
    // Check accessibility attributes
    const welcomeRegion = screen.getByRole('region');
    expect(welcomeRegion).toHaveAttribute('aria-label', 'Welcome');
    expect(welcomeRegion).toHaveClass('page next');
  });

  test('renders with prev direction', () => {
    // Arrange
    render(<WelcomePage direction="prev" />);
    
    // Assert
    const pageElement = screen.getByRole('region');
    expect(pageElement).toHaveClass('page prev');
  });
});
