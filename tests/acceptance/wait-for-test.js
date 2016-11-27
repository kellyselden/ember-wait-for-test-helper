import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

import { selectorToExist } from 'ember-wait-for-test-helper/wait-for';

moduleForAcceptance('Acceptance | wait for');

test('If given a string it should wait for a selector to exist', function(assert) {
  visit("/");

  click(".show-div");

  waitFor(".div-exists");

  andThen(() => {
    assert.equal(find(".div-exists").length, 1);
  });

});

test('If given a function it should wait for that function to return true', function(assert) {
  let loops = 0;

  visit("/");

  waitFor(function() {
    loops = loops + 1;
    return loops === 100;
  });

  andThen(() => {
    assert.equal(loops, 100);
  });
});

test('Using the selectorToExist helper', function(assert) {
  visit("/");

  click(".show-div");

  waitFor(selectorToExist(".div-exists"));

  andThen(() => {
    assert.equal(find(".div-exists").length, 1);
  });
});
