import { MemoryRouter } from 'react-router';
import { CommonProviders } from '@hiiretail/core';
import intlMessages from '../src/i18n';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
};

export const decorators = [
  (Story) => (
    <CommonProviders intlMessages={intlMessages}>
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    </CommonProviders>
  ),
];
