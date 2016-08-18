# ember-wait-for-test-helper
[![npm version](https://badge.fury.io/js/ember-wait-for-test-helper.svg)](https://badge.fury.io/js/ember-wait-for-test-helper)

Wait for css selectors to show up on screen. Useful for certain jquery plugins that take time to load. You can now avoid race conditions with a hard-coded wait time.

Add this line to `tests/helpers/start-app.js` in your app:
```js
import 'ember-wait-for-test-helper/wait-for';
```

Now you can do something like:
```js
click('.button');

waitFor('.a-slow-jquery-plugin');

andThen(() => {
  assert.ok(find('.a-slow-jquery-plugin').length);
});
```
