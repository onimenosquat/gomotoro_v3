Pomodoro = new Meteor.Collection("pomodoro");
Project = new Meteor.Collection("project");
Project_type = new Meteor.Collection("project_type");
Events = new Meteor.Collection("events");

// init router fn & obj
Session.set('router', {});
Session.set('user_selected', Meteor.userId() || null);
Session.set('project_selected', null);
Session.set('this', Date.now());
Session.set('filter_timeline_user', {})
Session.set('filter_timeline_project', {})

app = {

	setting : {
		timer : 1500,
		// timer : 30,
	},

	router : {

		route : {
			index : 'index',
			home : 'users',
			projects : 'projects',
		},

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
				texte += words[i].charAt(0).toUpperCase() + words[i].slice(1) + ( words[i+1] ? " " : "");
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



// helper

Handlebars.registerHelper('user_is_working', function () {
    return Meteor.users.findOne( this._id ).profile.is_working;
});

Handlebars.registerHelper('user_is_free', function () {
    return !Meteor.users.findOne( this._id ).profile.is_working;
});

Handlebars.registerHelper('user_is_selected', function () {
    return Session.get('user_selected') == this._id;
});

Handlebars.registerHelper('user_is_logged', function () {
    return Meteor.userId() == this._id;
});

Handlebars.registerHelper('user_is_connected', function () {
    return Meteor.userId();
});

Handlebars.registerHelper('project_is_selected', function () {
	return (Session.get('project_selected') == this._id) ? "is-selected" : false; 
});