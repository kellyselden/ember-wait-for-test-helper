/*jshint node:true*/

var existsSync = require('exists-sync');

module.exports = {
  normalizeEntityName: function() {
    // this prevents an error when the entityName is
    // not specified (since that doesn't actually matter
    // to us
  },

  afterInstall: function() {
    var addon = this;

    if (existsSync('tests/helpers/destroy-app.js')) {
      return addon.insertIntoFile(
        'tests/helpers/destroy-app.js',
        "import { cleanup } from 'ember-wait-for-test-helper/wait-for';",
        {
          after: "import Ember from 'ember';\n"
        }
      ).then(function() {
        return addon.insertIntoFile(
          'tests/helpers/destroy-app.js',
          "  cleanup();",
          {
            before: "  Ember.run(application, 'destroy');"
          });
      });
    }

  }
};
