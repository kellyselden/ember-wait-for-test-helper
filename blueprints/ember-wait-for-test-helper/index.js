/* eslint-env node */
'use strict';

const existsSync = require('fs').existsSync;

module.exports = {
  normalizeEntityName() {},

  afterInstall() {
    if (existsSync('tests/helpers/destroy-app.js')) {
      return this.insertIntoFile(
        'tests/helpers/destroy-app.js',
        "import { cleanup } from 'ember-wait-for-test-helper/wait-for';",
        {
          after: "import Ember from 'ember';\n"
        }
      ).then(() => {
        return this.insertIntoFile(
          'tests/helpers/destroy-app.js',
          "  cleanup();",
          {
            before: "  Ember.run(application, 'destroy');"
          }
        );
      });
    }
  }
};
