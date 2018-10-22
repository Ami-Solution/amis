import React from 'react';

const HeaderStepsComponent = (props) => {
  const handleLink = (event) => {
    event.preventDefault();
  };
  const renderStep = (step, label, handler) => (
    <li className={step < props.currenStep ? 'prev' : step === props.currenStep ? 'active' : null}>
      <span>
        <i className="ico-check" />
      </span>
      <p>{label}</p>
    </li>
  );
  return (
    <header className="section-head">
      <ul className="list-links">
        {renderStep(1, 'Online I.D', handleLink)}
        {renderStep(2, 'Account Creation', handleLink)}
        {renderStep(3, 'Employment Verification', handleLink)}
        {renderStep(4, 'Coverage Selection', handleLink)}
        {renderStep(5, 'Self Assessment', handleLink)}
      </ul>
    </header>
  );
};

export default HeaderStepsComponent;
