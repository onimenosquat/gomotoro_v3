
Session.set('user_selected', null);

Template.team.users = function () {
	return Meteor.users.find({});
};

Template.team.timeline_items = function () {
	return  Meteor.users.findOne( Session.get('user_selected') );
};

Template.team_user.events({
	'click' : function ( e ) {
		e.preventDefault();
		Session.set('user_selected', this._id);
	}
})