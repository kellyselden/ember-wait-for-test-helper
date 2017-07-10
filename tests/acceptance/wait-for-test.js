import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';
import Ember from 'ember';
import { selectorToExist } from 'ember-wait-for-test-helper/wait-for';

moduleForAcceptance('Acceptance | wait for');

// support the old string based API
test('If given a string it should wait for a selector to exist', function(assert) {
  visit('/');

  click('.show1');

  waitFor('.div1-exists');

  andThen(() => {
    assert.equal(find('.div1-exists').length, 1);
  });
});

// support string based API w/ string context
test('If given a string and a context, it should use the context into selectorToExist', function(assert) {
  visit('/');

  click('.show2');

  waitFor('.div2-exists', '.div2-context');

  andThen(() => {
    assert.equal(find('.div2-exists', '.div2-context').length, 1);
  });
});

// support string based API w/ options hash
test('If given a string and options hash, it should pass the options to selectorToExist', function(assert) {
  visit('/');

  click('.show3');

  waitFor('.div3-exists', { count: 2 });

  andThen(() => {
    assert.equal(find('.div3-exists').length, 2);
  });
});

test('If given a function it should wait for that function to return true', function(assert) {
  let loops = 0;

  visit('/');

  waitFor(() => {
    loops = loops + 1;
    return loops === 100;
  });

  andThen(() => {
    assert.equal(loops, 100);
  });
});

test('If given a function that returns a promise it should wait for that promise to resolve true', function(assert) {
  let loops = 0;

  visit("/");

  waitFor(() => {
    return new Ember.RSVP.Promise(resolve => {
      loops += 1;
      return resolve(loops === 100);
    });
  });

  andThen(() => {
    assert.equal(loops, 100);
  });
});

test('Using the selectorToExist helper', function(assert) {
  visit('/');

  click('.show1');

  waitFor(selectorToExist('.div1-exists'));

  andThen(() => {
    assert.equal(find('.div1-exists').length, 1);
  });
});
