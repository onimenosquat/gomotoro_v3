Template._agenda.helpers({

	cal : function () {
		Meteor.defer(function () {
			app.userCalRender();
		})
	}

});

Template._agenda.rendered = function ( e ) {
	app.userCalRender();
};

Template._agenda.events({
	'click .change-view-cal' : function ( e ) {
		e.preventDefault();

		var $el = $(e.currentTarget),
			view = $el.data('view');

		Session.set('viewCal', view);
		app.userCalRender();
	},
});