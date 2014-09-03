Template._user_detail.helpers({

	pmdr : function () {

		var pmdr = {};
		pmdr.current = parseInt( Pomodoro.find({ user_id : this._id, complete : false, cancel : false }).fetch().length );
		pmdr.total = parseInt( Pomodoro.find({ user_id : this._id }).fetch().length - pmdr.current );
		pmdr.complete = parseInt( Pomodoro.find({ user_id : this._id, complete : true }).fetch().length );
		pmdr.uncomplete = parseInt( Pomodoro.find({ user_id : this._id, cancel : true }).fetch().length );
		pmdr.percent_complete = parseInt( pmdr.complete * 100 / ( pmdr.total - pmdr.current ) );
		pmdr.percent_uncomplete = parseInt( pmdr.uncomplete * 100 / pmdr.total );

		return pmdr;
	},

});

Template._user_detail.events({

});