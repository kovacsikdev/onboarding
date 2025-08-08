import React from 'react';

interface SummaryPageProps {
  direction: string;
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
}

const SummaryPage: React.FC<SummaryPageProps> = ({ direction, formData }) => {
  return (
    <div className={`page ${direction}`} role="region" aria-label="Summary">
      <h2 tabIndex={0}>Summary</h2>
      <div className="summary" tabIndex={0} aria-label="Your information summary">
        <div className="summary-item">
          <span className="label">First Name:</span>
          <span className="value">{formData.firstName}</span>
        </div>
        <div className="summary-item">
          <span className="label">Last Name:</span>
          <span className="value">{formData.lastName}</span>
        </div>
        <div className="summary-item">
          <span className="label">Email:</span>
          <span className="value">{formData.email}</span>
        </div>
        <div className="summary-item">
          <span className="label">Phone:</span>
          <span className="value">{formData.phone}</span>
        </div>
      </div>
      <p className="confirmation-text">Please confirm your information is correct.</p>
    </div>
  );
};

export default SummaryPage;
