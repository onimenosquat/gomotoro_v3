Template.user_listing.pomodoro_timer = function () {
	var pmdr = Pomodoro.find({
		user_id : this._id
	}, {
		sort : { timestamp : -1}
	}).fetch()[0];

	var timer = pmdr && !pmdr.complete && !pmdr.cancel ? pmdr.current : ( ( Meteor.users.findOne( this._id ) ) ? Meteor.users.findOne( this._id ).profile.timer : app.setting.timer ) ;

	return app.helper.timer( timer );
};

Template.user_listing.status = function () {
	var u = Meteor.users.findOne( this._id );
	return u.profile.is_working ? "Work" : "Free";
};

Template.user_listing.pomodoro_timer_progress_1 = function () {
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

Template.user_listing.pomodoro_timer_progress_2 = function () {
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

Template.user_listing.user_selected = function () {
	return (Session.get('user_selected') == this._id) ? "is-selected" : ""; 
};

Template.user_listing.user_occuped = function () {
	return ( Meteor.users.findOne( this._id ) && Meteor.users.findOne( this._id ).profile.is_working ) ? "is-working" : "is-free";
};

Template.user_listing.isLogged = function () {
	return ( Meteor.userId() == this._id ) ? "is-logged" : false;
};

Template.user_listing.events({
	'click' : function ( e ) {
		e.preventDefault();
		Session.set('user_selected', this._id);
	},

	'click .circle_pmdr-timer' : function ( e ) {
		e.preventDefault();
		if ( this._id != Meteor.userId() ) return false;
		Meteor.call('pomodoro_start', Meteor.userId());
	}
});

Template.user.timeline_item = function () {
	console.log( Session.get('user_selected') );
	var id = Session.get('user_selected') || Meteor.userId();
	var filter = Session.get('filter_timeline_user') || {};
	filter.user_id = id;
	console.log( filter );
	return Events.find( filter , {sort : {timestamp : -1}}).fetch();  
};

Template.user.isLogged = function () {
	return ( Meteor.userId() == this._id ) ? "is-logged" : false; 
};

Template.user.pomodoro_timer = function () {
	var pmdr = Pomodoro.find({
		user_id : Meteor.userId()
	}, {
		sort : { timestamp : -1}
	}).fetch()[0];

	var timer = pmdr && !pmdr.complete && !pmdr.cancel ? pmdr.current : ( ( Meteor.user() ) ? Meteor.user().profile.timer : app.setting.timer ) ;

	return app.helper.timer( timer );
};

Template.timeline_user.events({
	'click .filter-timeline-user' : function ( e ) {
		e.preventDefault();
		var $el = $(e.currentTarget),
			type = $el.data('type');
		
		Session.set('filter_timeline_user', { notif : type });
	},
});

Template.timeline_user.events({
	'click .user-pomodoro-start' : function (e) {
		e.preventDefault();
		Meteor.call('pomodoro_start', Meteor.userId());
	}
})