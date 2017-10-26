import { run } from '@ember/runloop';
import { cleanup } from 'ember-wait-for-test-helper/wait-for';

export default function destroyApp(application) {
  cleanup();
  run(application, 'destroy');
}
