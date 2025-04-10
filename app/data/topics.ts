import { Question } from '../types';

export interface Topic {
  id: string;
  name: string;
  description: string;
  questions?: Question[];
}

export const topics: Topic[] = [
  {
    id: 'Enterprise & Equity Value',
    name: 'Enterprise & Equity Value',
    description: 'Understanding enterprise value, equity value, and their components including debt, cash, and other considerations'
  },
  {
    id: 'Valuation',
    name: 'Valuation',
    description: 'Valuation methodologies including comparable companies, precedent transactions, DCF, and other specialized approaches'
  },
  {
    id: 'Accounting',
    name: 'Accounting',
    description: 'Financial statements, accounting principles, and financial reporting concepts'
  },  
  {
    id: 'DCF',
    name: 'Discounted Cash Flow',
    description: 'Discounted Cash Flow concepts, including terminal value, WACC, and other valuation techniques'
  },
  {
    id: 'Merger Model (M&A)',
    name: 'Merger Models',
    description: 'Merger models, including LBOs, EBITDA, and other valuation techniques'
  },
  {
    id: 'Leveraged Buyouts (LBO)',
    name: 'LBO Model',
    description: 'LBO models, including EBITDA, terminal value, and other valuation techniques'
  },
  {
    id: 'Brain Teasers/Misc.',
    name: 'Brain Teaser',
    description: 'Brain teasers, including case study questions, and other valuation techniques'
  }
]; 