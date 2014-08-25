Template.home.pomodoro_timer = function () {

	var pmdr = Pomodoro.find({
		user_id : Meteor.userId()
	}, {
		sort : { timestamp : -1}
	}).fetch()[0];

	var timer = pmdr && !pmdr.complete && !pmdr.cancel ? pmdr.current : ( ( Meteor.user() ) ? Meteor.user().profile.timer : app.setting.timer ) ;

	return app.helper.timer( timer );
}

Template.home.user_occuped = function () {
	return ( Meteor.user() && Meteor.user().profile.occuped ) ? "OCCUPER" : "FREE";
}

Template.home.events({
	'click .pomodoro_start' : function ( e ) {
		e.preventDefault();
		Meteor.call('pomodoro_start', Meteor.userId());
	},

	'click .pomodoro_stop' : function ( e ) {
		e.preventDefault();
		Meteor.call('pomodoro_stop', Meteor.userId());
	}
})