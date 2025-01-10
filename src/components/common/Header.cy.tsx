import { Header } from '@/components/common';
import React from 'react';

describe('<Header />', () => {
  it('renders', () => {
    cy.mount(<Header />);
  });
});
