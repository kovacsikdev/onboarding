import { useState, useEffect, useRef } from 'react'
import type { KeyboardEvent } from 'react'
import './App.css'
import { 
  WelcomePage, 
  PersonalInfoPage, 
  ContactInfoPage, 
  SummaryPage 
} from './components'

function App() {
  const [currentPage, setCurrentPage] = useState(0)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  })
  const [direction, setDirection] = useState('next')
  
  // Validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
    return phoneRegex.test(phone);
  };
  
  // Refs for focusing elements
  const firstNameRef = useRef<HTMLInputElement>(null)
  const lastNameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const phoneRef = useRef<HTMLInputElement>(null)
  const nextButtonRef = useRef<HTMLButtonElement>(null)
  const backButtonRef = useRef<HTMLButtonElement>(null)
  const submitButtonRef = useRef<HTMLButtonElement>(null)
  
  // Handle keyboard navigation
  const handleKeyDown = (e: KeyboardEvent) => {
    // Allow Enter key to move to next page when not in an input field
    if (e.key === 'Enter' && 
        !(e.target instanceof HTMLInputElement) && 
        currentPage < 3 && 
        !((currentPage === 1 && (!formData.firstName || !formData.lastName)) ||
          (currentPage === 2 && (!validateEmail(formData.email) || !validatePhone(formData.phone))))) {
      e.preventDefault()
      nextPage()
    }
    
    // Alt+Right Arrow to move forward
    if (e.altKey && e.key === 'ArrowRight' && currentPage < 3 &&
        !((currentPage === 1 && (!formData.firstName || !formData.lastName)) ||
          (currentPage === 2 && (!validateEmail(formData.email) || !validatePhone(formData.phone))))) {
      e.preventDefault()
      nextPage()
    }
    
    // Alt+Left Arrow to move backward
    if (e.altKey && e.key === 'ArrowLeft' && currentPage > 0) {
      e.preventDefault()
      prevPage()
    }
  }
  
  // Focus management when page changes
  useEffect(() => {
    // Set focus to the appropriate element when page changes
    setTimeout(() => {
      switch(currentPage) {
        case 0:
          nextButtonRef.current?.focus()
          break
        case 1:
          firstNameRef.current?.focus()
          break
        case 2:
          emailRef.current?.focus()
          break
        case 3:
          submitButtonRef.current?.focus()
          break
      }
    }, 100) // Small delay to allow page transition
  }, [currentPage])
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const nextPage = () => {
    // Validate current page before proceeding
    if (currentPage === 1 && (!formData.firstName || !formData.lastName)) {
      return; // Don't proceed if personal info is incomplete
    }
    
    if (currentPage === 2) {
      // Validate email and phone format
      if (!validateEmail(formData.email)) {
        emailRef.current?.focus();
        return;
      }
      if (!validatePhone(formData.phone)) {
        phoneRef.current?.focus();
        return;
      }
    }
    
    setDirection('next')
    if (currentPage < 3) {
      setCurrentPage(currentPage + 1)
    }
  }

  const prevPage = () => {
    setDirection('prev')
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    alert('Onboarding completed successfully!')
    setCurrentPage(0)
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: ''
    })
  }

  const renderPage = () => {
    switch (currentPage) {
      case 0:
        return <WelcomePage direction={direction} />
      case 1:
        return (
          <PersonalInfoPage 
            direction={direction}
            formData={formData}
            handleInputChange={handleInputChange}
            nextPage={nextPage}
            firstNameRef={firstNameRef as React.RefObject<HTMLInputElement>}
            lastNameRef={lastNameRef as React.RefObject<HTMLInputElement>}
          />
        )
      case 2:
        return (
          <ContactInfoPage 
            direction={direction}
            formData={formData}
            handleInputChange={handleInputChange}
            nextPage={nextPage}
            emailRef={emailRef as React.RefObject<HTMLInputElement>}
            phoneRef={phoneRef as React.RefObject<HTMLInputElement>}
          />
        )
      case 3:
        return <SummaryPage direction={direction} formData={formData} />
      default:
        return null
    }
  }

  return (
    <div 
      className="onboarding-container" 
      onKeyDown={handleKeyDown}
      role="application"
      aria-label="Onboarding Application"
    >
      <div 
        className="progress-bar" 
        role="progressbar" 
        aria-valuemin={0} 
        aria-valuemax={100} 
        aria-valuenow={(currentPage / 3) * 100}
      >
        <div 
          className="progress" 
          style={{ width: `${(currentPage / 3) * 100}%` }}
        ></div>
      </div>
      <div className="page-indicator" role="tablist" aria-label="Onboarding steps">
        {[0, 1, 2, 3].map(pageNum => (
          <div 
            key={pageNum} 
            className={`indicator ${currentPage === pageNum ? 'active' : ''}`}
            role="tab"
            aria-selected={currentPage === pageNum}
            aria-label={`Step ${pageNum + 1} of 4`}
            tabIndex={-1}
          ></div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <div className="page-container">
          {renderPage()}
        </div>
        <div className="button-container">
          {currentPage > 0 && (
            <button 
              ref={backButtonRef}
              type="button" 
              className="btn btn-back" 
              onClick={prevPage}
              aria-label="Go back to previous page"
            >
              Back
            </button>
          )}
          {currentPage < 3 ? (
            <button 
              ref={nextButtonRef}
              type="button" 
              className="btn btn-next" 
              onClick={(e) => {
                e.preventDefault(); // Prevent default form submission
                nextPage();
              }}
              disabled={
                (currentPage === 1 && (!formData.firstName || !formData.lastName)) ||
                (currentPage === 2 && (!formData.email || !formData.phone))
              }
              aria-label="Continue to next page"
            >
              Next
            </button>
          ) : (
            <button 
              ref={submitButtonRef}
              type="submit" 
              className="btn btn-submit"
              aria-label="Submit the form"
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

export default App
