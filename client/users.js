
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
	'click .pomodoro_start' : function ( e ) {
		e.preventDefault();

		var t = {
    		user_id : Meteor.userId(),
    		timestamp : Date.now(),
    		timer : Meteor.user().profile.timer,
    		complete : false,
    		cancel : false
    	};

    	Pomodoro.insert( t, function( error, id) {
    		console.log( Pomodoro.find( id ).fetch() );
    	})

		// Meteor.call('pomodoro_start', Meteor.userId());
	},

	'click .pomodoro_stop' : function ( e ) {
		e.preventDefault();

		// Meteor.call('pomodoro_stop', Meteor.userId());
	}
})