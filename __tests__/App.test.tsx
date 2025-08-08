import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../src/App';

// Use a simplified test approach for the App component
describe('App', () => {
  test('renders welcome page initially', () => {
    render(<App />);
    
    // Check that the welcome text is present
    expect(screen.getByText(/Welcome to Our Platform/i)).toBeInTheDocument();
    
    // Check for the next button
    expect(screen.getByRole('button', { name: /continue to next page/i })).toBeInTheDocument();
    
    // No back button on first page
    expect(screen.queryByRole('button', { name: /go back to previous page/i })).not.toBeInTheDocument();
  });
});
