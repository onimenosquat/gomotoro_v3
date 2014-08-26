Template.notify.notify = function () {
	return Notify.find({
		user_id : Meteor.userId() || Session.get('this'),
		active : true,
	}, {
		sort : { timestamp : 1},
	});
};

Template.notify.events({
	'click .remove-notify' : function ( e ) {
		e.preventDefault();

		var id = this._id,
			n = Notify.findOne( id );

		n.active = false;

		$(e.target).parents('.app-notify').addClass( 'fadeOutRight' );

		Meteor.setTimeout( function(){
			Notify.update( id, n );
		}, 1000);
	},
})
