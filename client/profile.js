Template.profile.user = function () {
	return Meteor.user();
}

Template.profile.events({
	'change .user_image' : function ( e ) {
		var u = Meteor.user();
		u.profile.image = e.currentTarget.value || "";
		Meteor.users.update( Meteor.userId(), { $set: { profile : u.profile }} );

		Notify.insert({
			user_id : Meteor.userId() || Session.get('this'),
			active : true,
			timestamp : Date.now(),
			message : "Avatar has been updated" ,
			status : 'success'
		});

		Events.insert({
			user_id : Meteor.userId(),
			is_user : true,
			type : "event-primary",
			timestamp : Date.now(),
			date : app.helper.date( Date.now() ),
			title : "Update <small>Avatar was changed</small>"
		});
	},

	'change .user_job' : function ( e ) {
		var u = Meteor.user();
		u.profile.job = e.currentTarget.value || "";
		Meteor.users.update( Meteor.userId(), { $set: { profile : u.profile }} );

		Notify.insert({
			user_id : Meteor.userId() || Session.get('this'),
			active : true,
			timestamp : Date.now(),
			message : "Job has been updated" ,
			status : 'success'
		});

		Events.insert({
			user_id : Meteor.userId(),
			is_user : true,
			type : "event-primary",
			timestamp : Date.now(),
			date : app.helper.date( Date.now() ),
			title : "Update <small>Job was changed</small>"
		});
	},

	'change .user_name' : function ( e ) {
		var u = Meteor.user();
		u.profile.name = app.helper.firstUp(e.currentTarget.value) || "";
		Meteor.users.update( Meteor.userId(), { $set: { profile : u.profile }} );

		Notify.insert({
			user_id : Meteor.userId() || Session.get('this'),
			active : true,
			timestamp : Date.now(),
			message : "Name has been updated" ,
			status : 'success'
		});

		Events.insert({
			user_id : Meteor.userId(),
			is_user : true,
			type : "event-primary",
			timestamp : Date.now(),
			date : app.helper.date( Date.now() ),
			title : "Update <small>Name was changed</small>"
		});
	}
});