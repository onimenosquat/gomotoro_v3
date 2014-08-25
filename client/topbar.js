Template.topbar.user_name = function () {
	return Meteor.user() ? Meteor.user().username : "";
};

Template.topbar.events({
	'click .app-logout' : function () {
		Meteor.logout();

		Notify.insert({
			active : true,
			timestamp : Date.now(),
			message : 'Session closed' ,
			status : 'success'
		});
	}
})