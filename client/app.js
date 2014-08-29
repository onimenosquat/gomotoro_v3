Template.app.helpers({

	getPage : function () {

		app.router.changePage();

		var tmpl = app.router.route[ Session.get('router').name ]
		if ( Meteor.userId() && Template[ tmpl ] ){
			return { template: Template[ tmpl ] };
		} else if ( Meteor.userId() ){
			return { template: Template[ app.router.route.home ] };
		} else {
			return { template: Template[ app.router.route.index ] };
		}
	},
	
});