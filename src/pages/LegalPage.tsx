import React from 'react';
import { LEGAL_DOCUMENTS } from '../data/legal';
import { LegalPageTemplate } from '../components/legal/LegalPageTemplate';

export const LegalPage: React.FC<{ docKey: keyof typeof LEGAL_DOCUMENTS }> = ({ docKey }) => {
  const doc = LEGAL_DOCUMENTS[docKey];
  return <LegalPageTemplate doc={doc} />;
};
