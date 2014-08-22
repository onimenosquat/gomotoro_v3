Pomodoro = new Meteor.Collection("pomodoro");
Project = new Meteor.Collection("project");
Notify = new Meteor.Collection("notify");

// init router fn & obj
Session.set('router', {});

// hashchange
Meteor.startup( function () {
	
	// JQUERY
	$( window ).on( 'hashchange', function( event ) {
		app.router.changePage();
	});

});

Template.app.islogged = function () {
	return Meteor.userId() ? true : false;
};

Template.app.getPage = function () {

	app.router.changePage();

    if ( Meteor.userId() && Template[ Session.get('router').name ] ){

        return { template: Template[ Session.get('router').name ] };

    } else if ( Meteor.userId() ){

        return { template: Template[ 'home' ] };

    } else {

        return { template: Template[ 'index' ] };

    }
};
