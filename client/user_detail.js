Template.user_detail.helpers({

	pmdr : function () {

		var pmdr = {};
		pmdr.length = Pomodoro.find({ user_id : this._id }).fetch().length;
		pmdr.complete = Pomodoro.find({ user_id : this._id, complete : true }).fetch().length;
		pmdr.uncomplete = Pomodoro.find({ user_id : this._id, cancel : true }).fetch().length;
		pmdr.percent_complete = pmdr.complete * 100 / pmdr.length;
		pmdr.percent_uncomplete = pmdr.uncomplete * 100 / pmdr.length;

		return pmdr;
	},

});