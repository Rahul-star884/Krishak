




import React from 'react';

const schemes = [
  {
    name: 'PM-KISAN',
    description: 'Every eligible farmer gets ₹6000 annually in 3 installments directly in his bank account.',
    eligibility: 'Land-holding farmers',
    applyLink: 'https://pmkisan.gov.in/',
  },
  {
    name: 'PM Fasal Bima Yojana',
    description: 'You get the benefit of insurance from the government in case of crop loss.',
    eligibility: 'Registered farmers with insured crops',
    applyLink: 'https://pmfby.gov.in/',
  },
  {
    name: 'Kisan Credit Card (KCC)',
    description: 'Loan is available at low interest for agriculture.',
    eligibility: 'All farmers',
    applyLink: 'https://www.pmkisan.gov.in/Documents/KCC.pdf',
  },
];

const SchemesDetail = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ marginBottom: '1rem' }}>Government Scheme</h2>
      {schemes.map((scheme, index) => (
        <div
          key={index}
          style={{
            border: '1px solid #ccc',
            padding: '1rem',
            borderRadius: '8px',
            marginBottom: '1rem',
            backgroundColor: '#eefdf0',
          }}
        >
          <h3>{scheme.name}</h3>
          <p><strong>Description:</strong> {scheme.description}</p>
          <p><strong>Eligibility:</strong> {scheme.eligibility}</p>
          <a href={scheme.applyLink} target="_blank" rel="noopener noreferrer">
            Apply Now
          </a>
        </div>
      ))}
    </div>
  );
};

export default SchemesDetail;