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
			message : "<img src='" + u.profile.image + "' class='user-avatar'> Avatar has been updated" ,
			status : 'success'
		});

		Events.insert({
			user_id : Meteor.userId(),
			is_user : true,
			type : "event-primary",
			timestamp : Date.now(),
			date : app.helper.date( Date.now() ),
			title : "Update",
			message : "Avatar was changed",
			media : u.profile.image,
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
			title : "Update",
			message : "New job : <strong>" + u.profile.job + "</strong>",
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
			title : "Update",
			message : "New name : <strong>" + u.profile.name + "</strong>",
		});
	}
});