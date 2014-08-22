
Session.set('team_user_selected', null);

Template.team.users = function () {
	return Meteor.users.find({});
};

Template.team.timeline_items = function () {
	// return  Meteor.users.findOne( Session.get('team_user_selected') );
};

Template.team_user.events({
	'click' : function ( e ) {
		e.preventDefault();
		Session.set('team_user_selected', this._id);
	}
})

Template.home.pomodoro_timer = function () {
	if ( !Meteor.user() ) return false ;
	return app.helper.timer( Meteor.user().profile.timer );
}

Template.home.events({
	'click .start_pomodoro' : function ( e ) {
		e.preventDefault();

		var t = {
			user_id : Meteor.userId(),
			timer : Meteor.user().profile.timer,
			time_start : Date.now(),
			time_end : Date.now() + Meteor.user().profile.timer,
			timer_current : 0,
			complete : false,
			cancel : false
		};

		Pomodoro.insert( t );
	}
})