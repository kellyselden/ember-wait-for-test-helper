import { run } from '@ember/runloop';
import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    show(n) {
      // normally we would use Ember.run.later for this. However,
      // Ember.Testing has a waiter that checks the run loop and will
      // wait for all queues to finish. In order to test waitFor we're
      // going to use setTimeout because Ember.Testing has no insight
      // into this queue.

      setTimeout(() => {
        run(() => {
          this.set(`isShowing${n}`, true);
        });
      }, 2000);
    }
  }
});
