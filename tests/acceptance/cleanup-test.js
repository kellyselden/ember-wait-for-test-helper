import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

import { cleanup, activeCount } from 'ember-wait-for-test-helper/wait-for';

moduleForAcceptance('Acceptance | cleanup');

test('I should be able to cancel waiters', function(assert) {
  assert.expect(4);

  visit('/');

  // make sure that when this test starts there are 0 waiters running.
  // The rest of the tests will be counting the total number of waiters.
  andThen(() => {
    assert.equal(activeCount(), 0);
  });

  // in order to test this will manually trigger a clear in a
  // second. at that point our waiter should stop and then andThen
  // below should kick off.
  andThen(() => {
    setTimeout(() => {
      assert.equal(activeCount(), 1);

      cleanup();
    }, 1000);
  });

  // this should cause our test to freeze until the runner
  // times out. at the point the suite will move on to the
  // next test, so we want to make sure we cancel this timer.
  waitFor(() => {
    assert.ok(false);
  }, { interval: 2000 }).catch(() => {
    assert.ok(true);
  });

  andThen(() => {
    // there should be no waiters running since we cleaned them
    // up. That means this andThen block should start running
    // once the cleanup completes.
    assert.equal(activeCount(), 0);
  });
});
