Template.topbar.user = function () {
	return Meteor.user();
};

Template.topbar.events({
	'click .app-logout' : function () {
		Meteor.logout();
	}
})