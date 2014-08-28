Template.home.helpers({

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
		return Meteor.users.find({});
	},


	user_selected : function () {
		//RENAME
		return  Meteor.users.findOne( Session.get('user_selected') || Meteor.userId() );
	},

});


Template.home.events({

	'click .pomodoro_start' : function ( e ) {
		e.preventDefault();
		Meteor.call('pomodoro_start', Meteor.userId());
	},

	'click .pomodoro_stop' : function ( e ) {
		e.preventDefault();
		Meteor.call('pomodoro_stop', Meteor.userId());
	},

	'click .pomodoro_less' : function ( e ) {
		e.preventDefault();
		var u = Meteor.users.findOne( this._id );
		u.profile.timer -= ( u.profile.timer - 300 >= 1500 ) ? 300 : 0 ;
		Meteor.users.update( this._id, { $set : { profile : u.profile }});
	},

	'click .pomodoro_more' : function ( e ) {
		e.preventDefault();
		var u = Meteor.users.findOne( this._id );
		u.profile.timer += ( u.profile.timer + 300 <= 2700 ) ? 300 : 0 ;
		Meteor.users.update( this._id, { $set : { profile : u.profile }});
	},

	'click .filter-timeline_user' : function ( e ) {
		e.preventDefault();
		var $el = $(e.currentTarget),
			type = $el.data('type');
		
		Session.set('filter_timeline_user', { notif : type });
	},

	'click .reset-timeline_user' : function ( e ) {
		e.preventDefault();
		Session.set('filter_timeline_user', null);
	},

	'click .user_listing > a' : function ( e ) {
		e.preventDefault();
		Session.set('user_selected', this._id);
	}
});