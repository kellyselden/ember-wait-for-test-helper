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
  options.interval = options.interval || 10;

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

  return new Promise((resolve) => {
    let label = waitForFn;

    let isComplete = waitForFn;

    let stopTrying = function() {
      return !_isActive(label);
    };

    let loop = function() {
      let timer = setTimeout(peek, options.interval);
      _track(label, timer);
    };

    let peek = function() {
      if (isComplete() || stopTrying()) {
        resolve(_done(label));
      } else {
        loop();
      }
    };

    loop();
  });
}

const _runningWaiters = new Map();

function _track(label, timer) {
  _runningWaiters.set(label, timer);
}

function _cancel(label) {
  _runningWaiters.delete(label);
}

function _isActive(label) {
  return _runningWaiters.has(label);
}

function _done(label) {
  _cancel(label);
}

export function activeCount() {
  return _runningWaiters.size;
}

export function cleanup() {
  return _runningWaiters.clear();
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
