Pomodoro = new Meteor.Collection("pomodoro");
Project = new Meteor.Collection("project");
Notify = new Meteor.Collection("notify");
Events = new Meteor.Collection("events");

// init router fn & obj
Session.set('router', {});
Session.set('team_user_selected', Meteor.userId() || null);

app = {

	setting : {
		timer : 1500,
		// timer : 30,
	},

	router : {
		changePage : function() {
			var dataUrl = window.location.hash.toLowerCase().split('/');
			Session.set('router', {
				name : dataUrl[1] || null,
				id : dataUrl[2] || null,
			});
		},

		goTo : function( page ) {
			if ( !page ) return false;
			window.location.hash = "#/" + page;
		},
	},

	helper : {
		firstUp : function ( str ) {
			var words = str.split(' '),
				texte = "";
			
			for (var i = 0; i < words.length; i++) {
				texte += words[i].charAt(0).toUpperCase() + words[i].slice(1) + " "
			};

			return texte;
		},

		timer : function ( s ) {
			var s = ( s >= 0 ) ? s : 0;
			hours = parseInt( s / 3600 ) % 24,
			minutes = parseInt( s / 60 ) % 60,
			seconds = s % 60;

			return (hours > 0 ? (hours < 10 ? "0" + hours : hours) + ":" : "" ) + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds  < 10 ? "0" + seconds : seconds);
		},

		date : function ( time ) {
			var a = new Date( time );
			var now = new Date();
			var now_year = now.getFullYear();
			var now_month = now.getMonth();
			var now_date= now.getDate();
			var months = ['an', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
			var days = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
			var year = a.getFullYear();
			var monthInt = a.getMonth();
			var month = months[a.getMonth() - 1];
			var day = days[ a.getDay() - 1 ];
			var date = a.getDate();
			var hour = a.getHours();
			var min = a.getMinutes();
			var sec = a.getSeconds();
			var time = (hour < 10 ? "0" + hour : hour ) + ':' + (min < 10 ? "0" + min : min ) + (date == now_date ? '' : ' - ' + day + ' ') + (date >= now_date - 7 ? '' : date + ' ') + ' ' + (now_month == monthInt ? '' : months + ' ') + (now_year == year ? '' : year + ' ');

			return time;
		}
	},

};


// hashchange
Meteor.startup( function () {

	Session.set('team_user_selected', Meteor.userId() || null);
	
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
