export type AppTheme = 'light-classic' | 'electric-velocity';

export interface DocumentState {
  id: string;
  title: string;
  description: string;
  icon: string;
  imageUrl: string; // The hotlink image URL
  status: 'empty' | 'scanning' | 'valid' | 'invalid';
  errorMessage?: string;
  extractedData?: Record<string, string>;
}

export interface CreditCardData {
  number: string;
  expiry: string;
  cvv: string;
  brand: string;
  secured: boolean;
}

export interface ContactData {
  phone: string;
  email: string;
}

export interface AddressDocData {
  type: string;
  issuedWithin3Months: boolean;
}

export interface OnboardingState {
  license: DocumentState;
  creditCardDoc: DocumentState;
  creditCardDetails: CreditCardData;
  contact: ContactData;
  addressDoc: DocumentState;
  addressDetails: AddressDocData;
}
