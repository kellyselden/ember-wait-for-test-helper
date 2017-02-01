import Ember from 'ember';

const {
  $,
  Test: {
    registerAsyncHelper,
  },
  RSVP: { Promise }
} = Ember;

function _waitFor(app, selectorOrFn, contextOrOptions, selectorOptions) {
  let waitForFn;
  let options;

  // find the options argument
  if (typeof contextOrOptions === "string") {
    options = selectorOptions;
  } else {
    options = contextOrOptions;
  }

  // option defaults
  options = options || {};
  options.interval = options.interval || 1;

  // Support old API where you can pass in a selector as
  // a string and we'll wait for that to exist. Can also
  // pass along context and count option.
  if (typeof selectorOrFn === "string") {
    let selector;
    let count = options.count || 1;

    // if context is a string we'll use it to scope the
    // selector
    if (typeof contextOrOptions === "string") {
      let context = contextOrOptions;
      selector = `${context} ${selectorOrFn}`;
    } else {
      selector = selectorOrFn;
    }

    waitForFn = selectorToExist(selector, count);
  } else {
    // new style, selectorOrFn is a function
    waitForFn = selectorOrFn;
  }

  return new Promise(resolve => {
    (function restart() {
      setTimeout(() => {
        if (waitForFn()) {
          resolve();
        } else {
          restart();
        }
      }, options.interval);
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
