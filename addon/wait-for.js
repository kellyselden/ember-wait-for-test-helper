import Ember from 'ember';

const {
  $,
  Test: {
    registerAsyncHelper,
    _helpers: { find: { method: find } }
  },
  RSVP: { Promise }
} = Ember;

function _waitFor(
  app,
  selector,
  context,
  {
    count = 1,
    interval = 1
  } = {}
) {
  let _find;
  if (app) {
    _find = find;
  } else {
    _find = (app, selector, context) => $(selector, context);
  }

  return new Promise(resolve => {
    (function restart() {
      setTimeout(() => {
        if (_find(app, selector, context).length === count) {
          resolve();
        } else {
          restart();
        }
      }, interval);
    })();
  });
}

export function waitFor(selector, context, options) {
  return _waitFor(null, selector, context, options);
}

export default registerAsyncHelper('waitFor', _waitFor);
