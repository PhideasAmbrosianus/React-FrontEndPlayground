import Raven from 'raven-js';

function init() {
  Raven.config('https://max.the.cat', {
    release: "1-0-0",
    environment: "development"
  }).install();
}

function log(error) {
  Raven.captureException(error);  //Setup sentry.io and connect Raven for this to work
}

export default {
  init,
  log
}