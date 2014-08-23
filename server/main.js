Pomodoro = new Meteor.Collection("pomodoro");
Project = new Meteor.Collection("project");
Notify = new Meteor.Collection("notify");

var timers = {};

Meteor.startup(function () {
	Meteor.users.remove({});
	Pomodoro.remove({});
	Project.remove({});
	Notify.remove({});
});

Meteor.methods({
    pomodoro_start: function( id ) {
    	var t = {
    		user_id : id,
    		timestamp : Date.now(),
    		timer : Meteor.users.findOne( id ).profile.timer,
    		timer_now : function () {
    			console.log( this );
    		},
    		active : true,
    		complete : false,
    		cancel : false
    	};

    	Pomodoro.insert( t, function() {

    		// var pmdr = Pomodoro.find({ user_id : id }, {sort: { timestamp : -1 }}).fetch()[0];

	    	// timers[ id ] = Meteor.setInterval( function() {
	     //        pmdr.timer_now = Date.now() - pmdr.timestamp;
	            
	     //        if ( pmdr.timer_now >= pmdr.timer ) {
	     //        	pmdr.complete = true;
	     //        };

	     //        Pomodoro.update( pmdr._id, pmdr );

	            
	     //    }, 1000);

	    });
    },

    pomodoro_stop: function( id ) {
    	// Meteor.clearInterval( timers[ id ] );
    },
});
