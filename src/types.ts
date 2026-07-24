export type SubscriptionTier = 'free' | 'pro' | 'business' | 'enterprise';

export interface Plan {
  id: SubscriptionTier;
  name: string;
  price: string;
  period: string;
  popular: boolean;
  tagline: string;
  features: string[];
  cta: string;
}

export interface CalculatorOperation {
  symbol: string;
  label: string;
  type: 'operator' | 'function' | 'digit' | 'action';
  tierRequired: SubscriptionTier;
}

export interface FakeLoadingStep {
  message: string;
  duration: number; // in milliseconds
}
