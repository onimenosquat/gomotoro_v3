Pomodoro = new Meteor.Collection("pomodoro");
Project = new Meteor.Collection("project");
Notify = new Meteor.Collection("notify");
Events = new Meteor.Collection("events");

var timers = {},
	app = {};

app.setting = {
	// timeout hide notif (ms)
	timerNotif : 9000
};

app.helper = {
		
	// Restart current pomodoro
	restartPmdr : function () {
		var u = Meteor.users.find({}).fetch();

		_.each(u, function ( item ) {
			if ( !item.profile.is_working ) return false;
			Pomodoro.findOne( item.profile.pomodoro_id ) ? Meteor.call('pomodoro_timer', item._id) : false;
		});
	},
	
	// timeout hide notif
	timeoutNotif : function () {
		Meteor.setInterval( function (){
			var n = Notify.find({ active: true }).fetch();
			
			_.each(n, function ( item ) {
				item.active = ((Date.now() - item.timestamp) >= app.setting.timerNotif) ? false : true;
				Notify.update(item._id, item);
			});

		}, 1000);
	},

	resetCollections : function () {
		Meteor.users.remove({});
		Pomodoro.remove({});
		Project.remove({});
		Notify.remove({});
		Events.remove({});
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
};


Meteor.startup(function () {
	// reset all collection
	// app.helper.resetCollections();

	// timeout hide notif
	app.helper.timeoutNotif();

	// restart current pomodoro
	app.helper.restartPmdr();
});

Meteor.methods({

	reset: function( pwd ) {
		if ( pwd != "spip" ) return false;
		app.helper.resetCollections();
	},

	// create and start a new pomodoro
    pomodoro_start: function( id ) {

    	// if timer already exist, stop here
    	if ( timers[ id ] ) {
    		Meteor.call('pomodoro_stop', id);
    		return false;
    	}

    	var user = Meteor.users.findOne( id ),
    		model = {
	    		user_id : id,
	    		timestamp : Date.now(),
	    		timer : Meteor.user().profile.timer,
	    		current : Meteor.user().profile.timer,
	    		complete : false,
	    		cancel : false
	    	};

	    // Creat new pomodoro
    	Pomodoro.insert( model, function( error, id) {
    		if ( error ) return false;

    		// user is working
    		user.profile.is_working = true;

    		// link user with pomodoro
    		user.profile.pomodoro_id = id;

    		// update collection
    		Meteor.users.update( Meteor.userId(), { $set: { profile : user.profile} } );

    		// Start timer
    		Meteor.call('pomodoro_timer', user._id);

    		// create event new pmdr
    		Events.insert({
    			user_id : Meteor.userId(),
				is_pomodoro : true,
				type : "event-warning",
				timestamp : model.timestamp,
				date : app.helper.date( model.timestamp ),
				title : "Pomodoro start <small>working up " + app.helper.date( model.timestamp + model.timer * 1000 ) + "</small>"
			});
    	});
    },

    // stop a pomodoro
    pomodoro_stop: function( id ) {
    	var user = Meteor.users.findOne( id ),
    		pmdr = Pomodoro.findOne( user.profile.pomodoro_id );

    	// clear pomodoro
    	Meteor.clearInterval( timers[ id ] );

    	// reset timer
    	delete timers[ id ];

    	// if is not complete, is canceled
    	pmdr.cancel = pmdr.complete ? false : true ;

    	// user is free
    	user.profile.is_working = false;
    	user.profile.pomodoro_id = null;

    	// update collection
    	Meteor.users.update( Meteor.userId(), { $set: { profile : user.profile} } );
    	Pomodoro.update( pmdr._id, pmdr );

    	// create event pmdr cancel
		if( pmdr.cancel ) {
			Events.insert({
				user_id : Meteor.userId(),
				is_pomodoro : true,
				type : "event-error",
				timestamp : Date.now(),
				date : app.helper.date( Date.now() ),
				title : "Pomodoro stop <small>at " + app.helper.timer( pmdr.current ) + "</small>"
			});
		}
    },

    pomodoro_timer: function( id ) {
    	var user = Meteor.users.findOne( id ),
    		pmdr = Pomodoro.findOne( user.profile.pomodoro_id );

		timers[ id ] = Meteor.setInterval( function() {


            // if pomodoro is finish, reset params user and pomodoro 
            if ( pmdr.current <= 0 ) {
            	
            	//reset params
            	pmdr.current = 0;
            	pmdr.complete = true;
	            
	            // update collection
	            Pomodoro.update( pmdr._id, pmdr );

	            // stop pmdr
            	Meteor.call('pomodoro_stop', pmdr.user_id);

	            // create event pmdr complete
            	Events.insert({
            		user_id : user._id,
            		is_pomodoro : true,
            		type : "event-success",
            		timestamp : Date.now(),
            		date : app.helper.date( Date.now() ),
            		title : "Pomodoro complete"
            	});
            } else {
				
				// render current time
	            pmdr.current = parseInt(( 1000 + pmdr.timestamp + ( pmdr.timer * 1000 ) - Date.now() ) / 1000);

	            // update collection
	            Pomodoro.update( pmdr._id, pmdr );
	        }

        }, 1000);
    },

});
