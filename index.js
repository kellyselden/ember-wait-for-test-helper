/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-wait-for-test-helper',

  included: function(app) {
    this.app = app;

    return this._super.included.apply(this, arguments);
  },

  treeFor: function() {
    if (this.app.env === 'production') {
      return;
    }

    return this._super.treeFor.apply(this, arguments);
  }
};
