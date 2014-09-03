Template.user_detail.helpers({

	pmdr : function () {

		var pmdr = {};
		pmdr.total = Pomodoro.find({ user_id : this._id }).fetch().length;
		pmdr.current = Pomodoro.find({ user_id : this._id, complete : false, cancel : false }).fetch().length;
		pmdr.complete = Pomodoro.find({ user_id : this._id, complete : true }).fetch().length;
		pmdr.uncomplete = Pomodoro.find({ user_id : this._id, cancel : true }).fetch().length;
		pmdr.percent_complete = pmdr.complete * 100 / pmdr.current;
		pmdr.percent_uncomplete = pmdr.uncomplete * 100 / pmdr.current;

		return pmdr;
	},

});

Template.user_detail.rendered = function ( e ) {
	userCalRender();
};

Template.user_detail.events({
	'click .change-view-cal' : function ( e ) {
		e.preventDefault();

		var $el = $(e.currentTarget),
			view = $el.data('view');

		Session.set('viewCal', view);
		userCalRender();
	}
});

userCalRender = function () {

	var $user_cal = $('.user-calendar');

	$user_cal.fullCalendar({
		weekends: false,
		minTime: '07:00:00',
		maxTime: '20:00:00',
		axisFormat: 'HH:mm',
		dayClick: function(date, jsEvent, view) {
			alert('Clicked on: ' + date.format());
		},
		events: function (start, end, timezone, callback) {
			var pmdr = Pomodoro.find({ user_id : Session.get('router').id || Meteor.userId() }).fetch(),
				events = [];

			_.each( pmdr, function ( item ) {
				if ( !item.complete && !item.cancel ) return false;
				events.push({
					title: 'Pomodoro',
					start: new Date( item.timestamp ).toISOString(),
					// end: new Date( item.timestamp + item.timer - item.current ).toISOString()
				})
			});

			console.log( events );

			callback( events );
		},
	});

	$user_cal.fullCalendar( 'changeView', Session.get('viewCal') );

};