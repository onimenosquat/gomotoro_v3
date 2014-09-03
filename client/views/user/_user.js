Template._user_detail.helpers({

	pmdr : function () {

		var pmdr = {};
		pmdr.total = Pomodoro.find({ user_id : this._id }).fetch().length;
		pmdr.current = Pomodoro.find({ user_id : this._id, complete : false, cancel : false }).fetch().length;
		pmdr.complete = Pomodoro.find({ user_id : this._id, complete : true }).fetch().length;
		pmdr.uncomplete = Pomodoro.find({ user_id : this._id, cancel : true }).fetch().length;
		pmdr.percent_complete = pmdr.complete * 100 / ( pmdr.total - pmdr.current );
		pmdr.percent_uncomplete = pmdr.uncomplete * 100 / ( pmdr.total - pmdr.current );

		return pmdr;
	},

});

Template._user_detail.events({

});