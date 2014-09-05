Template._user.helpers({

	pmdr : function () {

		var pmdr = {};
		pmdr.current = Pomodoro.find({ user_id : this._id, complete : false, cancel : false }).fetch().length;
		pmdr.total = Pomodoro.find({ user_id : this._id }).fetch().length - pmdr.current;
		pmdr.complete = Pomodoro.find({ user_id : this._id, complete : true }).fetch().length;
		pmdr.uncomplete = Pomodoro.find({ user_id : this._id, cancel : true }).fetch().length;
		pmdr.percent_complete = pmdr.complete * 100 / pmdr.total;
		pmdr.percent_uncomplete = pmdr.uncomplete * 100 / pmdr.total;

		return pmdr;
	},

});

Template._user.events({

});