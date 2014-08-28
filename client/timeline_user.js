Template.timeline_user.notif = function ( type ) {
	return this.notif == type;
};

Template.timeline_user.events({
	'click .user-pomodoro-start' : function (e) {
		e.preventDefault();
		Meteor.call('pomodoro_start', Meteor.userId());
	}
});