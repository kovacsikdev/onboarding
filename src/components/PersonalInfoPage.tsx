import React from 'react';
import type { RefObject } from 'react';

interface PersonalInfoPageProps {
  direction: string;
  formData: {
    firstName: string;
    lastName: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  nextPage: () => void;
  firstNameRef: RefObject<HTMLInputElement>;
  lastNameRef: RefObject<HTMLInputElement>;
}

const PersonalInfoPage: React.FC<PersonalInfoPageProps> = ({ 
  direction, 
  formData, 
  handleInputChange, 
  nextPage,
  firstNameRef,
  lastNameRef
}) => {
  return (
    <div className={`page ${direction}`} role="region" aria-label="Personal Information">
      <h2 tabIndex={0}>What's Your Name?</h2>
      <div className="form-group">
        <label htmlFor="firstName">First Name</label>
        <input
          ref={firstNameRef}
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
          placeholder="Enter your first name"
          required
          aria-required="true"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && formData.firstName) {
              lastNameRef.current?.focus();
            }
          }}
        />
      </div>
      <div className="form-group">
        <label htmlFor="lastName">Last Name</label>
        <input
          ref={lastNameRef}
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
          placeholder="Enter your last name"
          required
          aria-required="true"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && formData.firstName && formData.lastName) {
              e.preventDefault();
              nextPage();
            }
          }}
        />
      </div>
    </div>
  );
};

export default PersonalInfoPage;
