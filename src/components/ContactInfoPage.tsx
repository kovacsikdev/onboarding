import React, { useState } from 'react';
import type { RefObject } from 'react';

interface ContactInfoPageProps {
  direction: string;
  formData: {
    email: string;
    phone: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  nextPage: () => void;
  emailRef: RefObject<HTMLInputElement>;
  phoneRef: RefObject<HTMLInputElement>;
}

const ContactInfoPage: React.FC<ContactInfoPageProps> = ({ 
  direction, 
  formData, 
  handleInputChange, 
  nextPage,
  emailRef,
  phoneRef
}) => {
  const [errors, setErrors] = useState({
    email: '',
    phone: ''
  });

  // Validate email format
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  // Validate phone format (xxx-xxx-xxxx)
  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
    return phoneRegex.test(phone);
  };

  // Custom input handler with validation
  const handleValidatedInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Clear error when user starts typing
    setErrors(prev => ({
      ...prev,
      [name]: ''
    }));

    // Call the parent's handleInputChange
    handleInputChange(e);
    
    // Validate on input change, but only if there's a value
    if (value) {
      if (name === 'email' && !validateEmail(value)) {
        setErrors(prev => ({
          ...prev,
          email: 'Please enter a valid email address'
        }));
      } else if (name === 'phone' && !validatePhone(value)) {
        setErrors(prev => ({
          ...prev,
          phone: 'Please use format: xxx-xxx-xxxx'
        }));
      }
    }
  };

  // Validate both fields before allowing to proceed
  const canProceed = (): boolean => {
    return validateEmail(formData.email) && validatePhone(formData.phone);
  };

  // Handle enter key with validation
  const handleEnterKey = (e: React.KeyboardEvent, field: string) => {
    if (e.key === 'Enter') {
      if (field === 'email' && validateEmail(formData.email)) {
        phoneRef.current?.focus();
      } else if (field === 'phone' && canProceed()) {
        e.preventDefault();
        nextPage();
      }
    }
  };
  return (
    <div className={`page ${direction}`} role="region" aria-label="Contact Information">
      <h2 tabIndex={0}>Contact Information</h2>
      <div className="form-group">
        <label htmlFor="email">Email Address</label>
        <input
          ref={emailRef}
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleValidatedInput}
          placeholder="Enter your email address"
          required
          aria-required="true"
          aria-invalid={errors.email ? "true" : "false"}
          aria-describedby={errors.email ? "email-error" : undefined}
          onKeyDown={(e) => handleEnterKey(e, 'email')}
        />
        {errors.email && (
          <div className="error-message" id="email-error" role="alert">
            {errors.email}
          </div>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="phone">Phone Number</label>
        <input
          ref={phoneRef}
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleValidatedInput}
          placeholder="Format: xxx-xxx-xxxx"
          required
          aria-required="true"
          aria-invalid={errors.phone ? "true" : "false"}
          aria-describedby={errors.phone ? "phone-error" : undefined}
          onKeyDown={(e) => handleEnterKey(e, 'phone')}
        />
        {errors.phone && (
          <div className="error-message" id="phone-error" role="alert">
            {errors.phone}
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactInfoPage;
