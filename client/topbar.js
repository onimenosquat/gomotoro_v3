Template.topbar.user_name = function () {
	return Meteor.user() ? Meteor.user().username : "";
};