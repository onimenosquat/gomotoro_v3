Template.team.users = function () {
	return Meteor.users.find({});
};


Template.team.user_selected = function () {
	return  Meteor.users.findOne( Session.get('team_user_selected') || Meteor.userId() );
};

Template.team_user.pomodoro_timer = function () {
	var pmdr = Pomodoro.find({
		user_id : this._id
	}, {
		sort : { timestamp : -1}
	}).fetch()[0];

	var timer = pmdr && !pmdr.complete && !pmdr.cancel ? pmdr.current : ( ( Meteor.users.findOne( this._id ) ) ? Meteor.users.findOne( this._id ).profile.timer : app.setting.timer ) ;

	return app.helper.timer( timer );
};

Template.team_user.status = function () {
	var u = Meteor.users.findOne( this._id );
	return u.profile.occuped ? "Work" : "Free";
};

Template.team_user.pomodoro_timer_progress_1 = function () {
	var pmdr = Pomodoro.find({
		user_id : this._id
	}, {
		sort : { timestamp : -1}
	}).fetch()[0];

	var timer_current = pmdr && !pmdr.complete && !pmdr.cancel ? pmdr.current : 0;
	var timer = ( Meteor.users.findOne( this._id ) ) ? Meteor.users.findOne( this._id ).profile.timer : app.setting.timer;

	var progress = ( timer - timer_current ) * 100 / timer;

	var deg = 0;

	if ( progress <= 50 ) {
		var deg = parseInt(( progress * 180 / 50 ) - 180);
	}

	return deg;
};

Template.team_user.pomodoro_timer_progress_2 = function () {
	var pmdr = Pomodoro.find({
		user_id : this._id
	}, {
		sort : { timestamp : -1}
	}).fetch()[0];

	var timer_current = pmdr && !pmdr.complete && !pmdr.cancel ? pmdr.current : 0;
	var timer = ( Meteor.users.findOne( this._id ) ) ? Meteor.users.findOne( this._id ).profile.timer : app.setting.timer;

	var progress = ( timer - timer_current ) * 100 / timer;

	var deg = 180;

	if ( progress >= 50 ) {
		var deg = parseInt(( progress * 180 / 50 ));
	}

	return deg;
};

Template.team_user.user_selected = function () {
	return (Session.get('team_user_selected') == this._id) ? "is-selected" : ""; 
};

Template.team_user.user_occuped = function () {
	return ( Meteor.users.findOne( this._id ) && Meteor.users.findOne( this._id ).profile.is_working ) ? "is-working" : "is-free";
};

Template.team_user.user_logged = function () {
	return ( Meteor.userId() == this._id ) ? "is-logged" : false;
};

Template.team_user.events({
	'click' : function ( e ) {
		e.preventDefault();
		Session.set('team_user_selected', this._id);
	},

	'click .circle_pmdr-timer' : function ( e ) {
		e.preventDefault();
		if ( this._id != Meteor.userId() ) return false;
		Meteor.call('pomodoro_start', Meteor.userId());
	}
});

Template.user.timeline_item = function () {
	var id = Session.get('team_user_selected') || Meteor.userId();
	return Events.find({user_id: id}, {sort : {timestamp : -1}}).fetch();  
};