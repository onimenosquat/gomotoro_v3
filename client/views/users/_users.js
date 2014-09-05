Template._users.helpers({

	pomodoro_timer : function () {

		var pmdr = Pomodoro.find({
			user_id : Meteor.userId()
		}, {
			sort : { timestamp : -1}
		}).fetch()[0];

		var timer = pmdr && !pmdr.complete && !pmdr.cancel ? pmdr.current : ( ( Meteor.user() ) ? Meteor.user().profile.timer : app.setting.timer ) ;

		return app.helper.timer( timer );
	},

	users : function () {
		return _.sortBy( Meteor.users.find({}, {sort : {"profile.name" : 1}}).fetch(), function ( user ) { return !( user._id == Meteor.userId()) });
	},

	user : function () {
		return  Meteor.users.findOne( Session.get('router').id || Meteor.userId() );
	},

});


Template._users.events({

	// TIMER
	// -------
	'click .pomodoro_less' : function ( e ) {
		e.preventDefault();
		if ( Meteor.users.findOne( this._id ).profile.is_working ) return false;
		var u = Meteor.users.findOne( this._id );
		u.profile.timer -= ( u.profile.timer - 300 >= 1500 ) ? 300 : 0 ;
		Meteor.users.update( this._id, { $set : { profile : u.profile }});
	},

	'click .pomodoro_more' : function ( e ) {
		e.preventDefault();
		if ( Meteor.users.findOne( this._id ).profile.is_working ) return false;
		var u = Meteor.users.findOne( this._id );
		u.profile.timer += ( u.profile.timer + 300 <= 2700 ) ? 300 : 0 ;
		Meteor.users.update( this._id, { $set : { profile : u.profile }});
	},

	// TIMELINE
	// -------
	'click .filter-timeline' : function ( e ) {
		e.preventDefault();
		var $el = $(e.currentTarget),
			type = $el.data('type');
		
		Session.set('filter_timeline_user', { notif : type });
	},

	'click .reset-timeline' : function ( e ) {
		e.preventDefault();
		Session.set('filter_timeline_user', null);
	},

	// USER
	// -------
	'change .user_image' : function ( e ) {
		var u = Meteor.user();
		u.profile.image = e.currentTarget.value || "";
		Meteor.users.update( Meteor.userId(), { $set: { profile : u.profile }} );

		Events.insert({
			active : true,
			user_id : Meteor.userId(),
			notif : "user",
			type : "primary",
			timestamp : Date.now(),
			date : app.helper.date( Date.now() ),
			title : "Update",
			message : "Avatar was changed",
			media : u.profile.image,
		});
	},

	'change .user_job' : function ( e ) {
		var u = Meteor.user();
		u.profile.job = e.currentTarget.value || "";
		Meteor.users.update( Meteor.userId(), { $set: { profile : u.profile }} );

		Events.insert({
			active : true,
			user_id : Meteor.userId(),
			notif : "user",
			type : "primary",
			timestamp : Date.now(),
			date : app.helper.date( Date.now() ),
			title : "Update",
			message : "New job : <strong>" + u.profile.job + "</strong>",
		});
	},

	'change .user_name' : function ( e ) {
		var u = Meteor.user();
		u.profile.name = app.helper.firstUp(e.currentTarget.value) || "";
		Meteor.users.update( Meteor.userId(), { $set: { profile : u.profile }} );

		Events.insert({
			active : true,
			user_id : Meteor.userId(),
			notif : "user",
			type : "primary",
			timestamp : Date.now(),
			date : app.helper.date( Date.now() ),
			title : "Update",
			message : "New name : <strong>" + u.profile.name + "</strong>",
		});
	}

});