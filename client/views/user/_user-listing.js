Template._user_listing.helpers({

	pomodoro_timer : function () {
		var pmdr = Pomodoro.find({
			user_id : this._id
		}, {
			sort : { timestamp : -1}
		}).fetch()[0];

		var timer = pmdr && !pmdr.complete && !pmdr.cancel ? pmdr.current : ( ( Meteor.users.findOne( this._id ) ) ? Meteor.users.findOne( this._id ).profile.timer : app.setting.timer ) ;

		return app.helper.timer( timer );
	},

	pomodoro_timer_progress_1 : function () {
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
	},

	pomodoro_timer_progress_2 : function () {
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
	},

});