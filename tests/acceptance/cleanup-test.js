import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

import { selectorToExist, cleanup, activeCount } from 'ember-wait-for-test-helper/wait-for';

moduleForAcceptance('Acceptance | cleanup');

test('I should be able to cancel waiters', function(assert) {
  assert.expect(2);

  visit('/');

  // this should cause our test to freeze until the runner
  // times out. at the point the suite will move on to the
  // next test, so we want to make sure we cancel this timer.
  waitFor(selectorToExist('.this-will-never-exist'));

  // in order to test this will manually trigger a clear in a few
  // seconds. at that point our waiter should stop and then andThen
  // below should kick off.
  setTimeout(function() {

    assert.ok(activeCount() === 1);

    cleanup();

  }, 2000);

  andThen(() => {
    // there should be no waiters running since we cleaned them
    // up. That means this andThen block should start running
    // once the cleanup compltes.
    assert.ok(activeCount() === 0);
  });
});
