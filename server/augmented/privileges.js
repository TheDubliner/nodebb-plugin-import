
(function(module) {
  var nbbRequire = require('nodebb-plugin-require');
  var _ = require('underscore');
  var async = require('async');

  // nbb-core
  var privileges = nbbRequire('src/privileges');
  var moderatorsOnlyPrivileges = ['purge', 'moderate'];
  var generalUserPrivileges = _.without.apply(_, [privileges.userPrivilegeList].concat(moderatorsOnlyPrivileges));

  privileges.categories.allowGroupOnCategory = function (groupName, cid, callback) {
    privileges.categories.give(generalUserPrivileges, cid, groupName, callback);
  };

  privileges.categories.disallowGroupOnCategory = function (groupName, cid, callback) {
    async.parallel([
      async.apply(privileges.categories.rescind, privileges.groupPrivilegeList, cid, groupName),
      async.apply(privileges.categories.rescind, privileges.userPrivilegeList, cid, groupName)
    ], callback);
  };

  module.exports = privileges;

}(module));
