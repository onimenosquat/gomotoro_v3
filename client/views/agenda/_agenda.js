Template._agenda.helpers({

	cal : function () {
		Meteor.defer(function () {
			app.userCalRender();
		})
	}

});

Template._agenda.events({
	
});