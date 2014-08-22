Session.set('notify', null);

Template.notify.notify = function () {
	return Session.get('notify');
};

Template.notify.events({
	'click .remove-notify' : function ( e ) {
		e.preventDefault();
		Session.set('notify', null);
	},
})
