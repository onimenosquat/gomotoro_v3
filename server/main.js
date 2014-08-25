Pomodoro = new Meteor.Collection("pomodoro");
Project = new Meteor.Collection("project");
Notify = new Meteor.Collection("notify");

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

	// create and start a new pomodoro
    pomodoro_start: function( id ) {

    	// if timer already exist, stop here
    	if ( timers[ id ] ) return false;

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
    		Meteor.users.update(user._id, user);

    		// Start timer
    		Meteor.call('pomodoro_timer', user._id);
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

    	// update collection
    	Meteor.users.update(id, user);
    	Pomodoro.update( pmdr._id, pmdr );
    },

    pomodoro_timer: function( id ) {
    	var user = Meteor.users.findOne( id ),
    		pmdr = Pomodoro.findOne( user.profile.pomodoro_id );

    		console.log( "POMODORO" );
    		console.log( pmdr );

		timers[ id ] = Meteor.setInterval( function() {


            // if pomodoro is finish, reset params user and pomodoro
            if ( pmdr.current <= 0 ) {
            	
            	//reset params
            	pmdr.current = 0;
            	pmdr.complete = true;
	            
	            // update collection
	            Pomodoro.update( pmdr._id, pmdr );

            	Meteor.call('pomodoro_stop', pmdr.user_id);
            } else {
				
				// render current time
	            pmdr.current = parseInt(( 1000 + pmdr.timestamp + ( pmdr.timer * 1000 ) - Date.now() ) / 1000);

	            // update collection
	            Pomodoro.update( pmdr._id, pmdr );
	        }

        }, 1000);
    },
});
