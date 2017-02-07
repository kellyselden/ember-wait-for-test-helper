import Ember from 'ember';
import { cleanup } from 'ember-wait-for-test-helper/wait-for';

export default function destroyApp(application) {
  cleanup();
  Ember.run(application, 'destroy');
}
