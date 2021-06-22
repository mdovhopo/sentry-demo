import express from 'express';
import cookieParser from 'cookie-parser';
import * as Sentry from "@sentry/node";
import * as Tracing from "@sentry/tracing";

const app = express();

const SENTRY_KEY = '<sentry_key>';
const SENTRY_PROJECT_ID = '<sentry_project_id>';

Sentry.init({
  dsn: `https://${SENTRY_KEY}@o866123.ingest.sentry.io/${SENTRY_PROJECT_ID}`,
  release: 'backend@v1.0.0',
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Tracing.Integrations.Express({ app }),
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

app.use(cookieParser());

app.use(Sentry.Handlers.requestHandler());
// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());

app.use(express.json());

app.get('/api/lottery', (req, res) => {
  const { guess } = req.query;

  if (!guess) {
    return res.status(400).send({ error: 'query parameter `guess` is required.' });
  }

  if (guess === '101') {
    throw new Error('Critical unhandled exception');
  }

  if (guess === '42' || Math.floor(Math.random() * 10) === +guess) {
    return res.status(200).send({
      response: 'you win',
    })
  }
  return res.status(418).send({
    response: 'wroooooooong',
  })
});

// catch 404 and forward to error handler
app.use((req, res) => {
  res.status(404).send({
    error: 'wrong way, samurai'
  });
});

// The error handler must be before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());

// error handler
app.use((err, req, res, next) => {
  res.status(500).send({
    error: 'keep trying, samurai',
    error_description: err.stack,
  });
});

app.listen(8080, () => {
  console.log('App started on 8080');
});
