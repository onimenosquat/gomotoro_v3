Template.user_detail.helpers({

	timeline_item : function () {
		var id = Session.get('user_selected') || Meteor.userId(),
		filter = ( Session.get('user_selected') == Meteor.userId() ) ? Session.get('filter_timeline_user') || {} : { notif : { $in: ['project', 'message'] }};

		filter.user_id = id;
		return Events.find( filter , {sort : {timestamp : -1}}).fetch();  
	},

	user_logged : function () {
		return ( Meteor.userId() == this._id ) ? "is-logged" : false; 
	},

	pomodoro_timer : function () {
		var pmdr = Pomodoro.find({
			user_id : Meteor.userId()
		}, {
			sort : { timestamp : -1}
		}).fetch()[0];

		var timer = pmdr && !pmdr.complete && !pmdr.cancel ? pmdr.current : ( ( Meteor.user() ) ? Meteor.user().profile.timer : app.setting.timer ) ;

		return app.helper.timer( timer );
	},

});