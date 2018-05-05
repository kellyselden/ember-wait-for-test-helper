# ember-wait-for-test-helper

### Deprecated

This helper is now built-in:

```js
import { waitFor, waitUntil } from '@ember/test-helpers';
```

[![Greenkeeper badge](https://badges.greenkeeper.io/kellyselden/ember-wait-for-test-helper.svg)](https://greenkeeper.io/)
[![npm version](https://badge.fury.io/js/ember-wait-for-test-helper.svg)](https://badge.fury.io/js/ember-wait-for-test-helper)
[![Build Status](https://travis-ci.org/kellyselden/ember-wait-for-test-helper.svg?branch=master)](https://travis-ci.org/kellyselden/ember-wait-for-test-helper)
[![Ember Version](https://img.shields.io/badge/ember-1.13%2B-brightgreen.svg)](https://www.emberjs.com/)

Wait for your application to be in a specific state before continuing the test runner.

Useful for certain jquery plugins that take time to load. You can now avoid race conditions with a hard-coded wait time.

Add this line to `tests/helpers/start-app.js` in your app:

```js
import 'ember-wait-for-test-helper/wait-for';
```

Now you can do something like:

```js
import { selectorToExist } from 'ember-wait-for-test-helper/wait-for';

test('it should wait before asserting', function(assert) {
  click('.button');

  waitFor(selectorToExist('.a-slow-jquery-plugin'));

  andThen(() => {
    assert.ok(find('.a-slow-jquery-plugin').length === 1);
  });
});
```

### Custom waiters

You can define your own waiters. A waiter is a function that will continuously
run until it returns true. Once the waiter returns true your test will continue
running. It supports Promises.


```js
test('it should wait before asserting', function(assert) {
  visit('/');

  waitFor(() => {
    let result = getAnswerFromSomewhere();
    return result === 42; // only continue when result is 42
  });
  // or
  waitFor(() => {
    return getAnswerFromSomewhere(result => {
      return result === 42; // only continue when result is 42
    });
  });

  andThen(() => {
    // ...
  });
});
```
