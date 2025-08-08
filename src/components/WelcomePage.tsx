import React from 'react';

interface WelcomePageProps {
  direction: string;
}

const WelcomePage: React.FC<WelcomePageProps> = ({ direction }) => {
  return (
    <div className={`page ${direction}`} role="region" aria-label="Welcome">
      <h2 tabIndex={0}>Welcome to Our Platform</h2>
      <p>We're excited to have you on board! Let's get you set up.</p>
      <p>This quick onboarding process will only take a minute.</p>
      <div className="illustration">
        <div className="welcome-icon" aria-hidden="true">👋</div>
      </div>
    </div>
  );
};

export default WelcomePage;
