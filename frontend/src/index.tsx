import ReactDOM from 'react-dom';
import { CommonProviders } from '@hiiretail/core';
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

import App from './App';
import reportWebVitals from './reportWebVitals';
import intlMessages from './i18n';

const SENTRY_KEY = 'eb92699246554a7585812beb559e3501';
const SENTRY_PROJECT_ID = '5829357';

Sentry.init({
  dsn: `https://${SENTRY_KEY}@o866123.ingest.sentry.io/${SENTRY_PROJECT_ID}`,
  integrations: [new Integrations.BrowserTracing()],
  release: 'frontend@v1.0.0',

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

ReactDOM.render(
  <CommonProviders intlMessages={intlMessages}>
    <App/>
  </CommonProviders>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
