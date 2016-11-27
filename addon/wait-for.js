import Ember from 'ember';

const {
  $,
  Test: {
    registerAsyncHelper,
  },
  RSVP: { Promise }
} = Ember;

function _waitFor(app, selectorOfFn, interval = 1) {
  let waitForFn;

  // Support old API where you can pass in a selector as
  // a string and we'll wait for that to exist.
  if (typeof selectorOfFn === "string") {
    waitForFn = selectorToExist(selectorOfFn);
  } else {
    waitForFn = selectorOfFn;
  }

  return new Promise(resolve => {
    (function restart() {
      setTimeout(() => {
        if (waitForFn()) {
          resolve();
        } else {
          restart();
        }
      }, interval);
    })();
  });
}

export function selectorToExist(selector, count) {
  return function() {
    let existsCount = $(selector).length;

    if (count) {
      return existsCount === count;
    } else {
      return existsCount > 0;
    }
  };
}

export function waitFor(selector, context, options) {
  return _waitFor(null, selector, context, options);
}

export default registerAsyncHelper('waitFor', _waitFor);
