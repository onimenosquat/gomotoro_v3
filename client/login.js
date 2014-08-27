
Template.login.events({

	'submit #login-form' : function(e, t){
		e.preventDefault();
		
		var user = t.find('#login-user').value,
			password = t.find('#login-password').value;

		Meteor.loginWithPassword(user, password, function(err){
			if (err) {
				
				Notify.insert({
					user_id : Meteor.userId() || Session.get('this'),
					active : true,
					timestamp : Date.now(),
					message : err.reason,
					status : 'error'
				});

			} else {

				Session.set('user_selected', Meteor.userId() || null);

				Notify.insert({
					user_id : Meteor.userId() || Session.get('this'),
					active : true,
					timestamp : Date.now(),
					message : 'Hi ' + Meteor.user().username + '! <br> How are you today ?' ,
					status : 'success'
				});

				app.router.goTo( 'home' );

			};
		});

		return false; 
	}

});

Template.register.events({
	'submit #register-form' : function(e, t) {
		e.preventDefault();

		var email = t.find('#account-email').value,
			username = email ? email.split('@')[0].toLowerCase() : null,
			password = t.find('#account-password').value;

		if ( !email || !username || !password){

			Notify.insert({
				user_id : Meteor.userId() || Session.get('this'),
				active : true,
				timestamp : Date.now(),
				message : 'All fields are require.',
				status : 'warning'
			});

			return false;
		} else if ( email.indexOf('@') <= -1 ) {

			Notify.insert({
				user_id : Meteor.userId() || Session.get('this'),
				active : true,
				timestamp : Date.now(),
				message : 'Email is invalid',
				status : 'warning'
			});

			return false;
		}

		Accounts.createUser({

			email: email,
			password : password,
			username : username,
			profile : {
				name : app.helper.firstUp( username ),
				timer : app.setting.timer,
				is_working : false,
				pomodoro_id : null,
				job : "New user",
				image : "http://dummyimage.com/400x400/eeeeee/33cc99/&text=" + username[0].toUpperCase()
			}
			
		}, function( err, id ){

			Session.set('user_selected', Meteor.userId() || null);
		
			if (err) {

				console.log( err );

				Notify.insert({
					user_id : Meteor.userId() || Session.get('this'),
					active : true,
					timestamp : Date.now(),
					message : err.reason,
					status : 'error'
				});

			} else {

				Notify.insert({
					user_id : Meteor.userId() || Session.get('this'),
					active : true,
					timestamp : Date.now(),
					message : 'Hi ' + Meteor.user().username + '! <br> Nice to meet you.' ,
					status : 'success'
				});

				app.router.goTo( 'home' );

				Events.insert({
					user_id : Meteor.userId(),
					is_user : true,
					type : "event-primary",
					timestamp : Date.now(),
					date : app.helper.date( Date.now() ),
					title : "Welcome to GoMoToro !",
					message : "You can do : <ul><li><a href='#'>Make a visit</a></li><li><a href='#/profile'>Edit your profile</a></li><li><a href='#' class='user-pomodoro-start'>Start pomodoro</a></li><li><a href='#/invite'>Invite friends</a></li></ul>"
				});
			}

		});

		return false;
	}
});