Template.topbar.user = function () {
	return Meteor.user();
};

Template.topbar.events({
	'click .app-logout' : function () {
		Meteor.logout();

		Notify.insert({
			user_id : Meteor.userId() || Session.get('this'),
			active : true,
			timestamp : Date.now(),
			message : 'Session closed' ,
			status : 'success'
		});
	}
})