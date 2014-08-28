Template.topbar.user = function () {
	return Meteor.user();
};

Template.topbar.currentPage = function ( page ) {
	return ( Session.get('router').name == page ) ? true : false;
};

Template.topbar.events({
	'click .app-logout' : function () {
		Meteor.logout();
	},

	'click .select_user' : function () {
		Session.set('user_selected', Meteor.userId());
	}
})