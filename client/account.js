
Template.login.events({

	'submit #login-form' : function(e, t){
		e.preventDefault();
		
		var email = t.find('#login-email').value,
			password = t.find('#login-password').value;

		Meteor.loginWithPassword(email, password, function(err){
			if (err) {

				console.log( err );
				
				Notify.insert({
					active : true,
					timestamp : Date.now(),
					message : 'Incorrect <b>e-mail</b> or <b>password</b>',
					status : 'error'
				});

			} else {

				Session.set('team_user_selected', Meteor.userId() || null);

				Notify.insert({
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
			name = t.find('#account-name').value,
			password = t.find('#account-password').value;

		if ( !email || !name || !password){

			Notify.insert({
				active : true,
				timestamp : Date.now(),
				message : 'All fields are require.',
				status : 'warning'
			});

			return false;
		};

		name = app.helper.firstUp( name ) || name;

		Accounts.createUser({

			email: email,
			password : password,
			username : name,
			profile : {
				timer : app.setting.timer,
				is_working : false,
				pomodoro_id : null,
				job : "New user",
				image : "http://dummyimage.com/400x400/eeeeee/33cc99/&text=" + name[0]
			}
			
		}, function(err){
		
			if (err) {

				console.log( err );

				Notify.insert({
					active : true,
					timestamp : Date.now(),
					message : 'Error ! Please contact support. lol.',
					status : 'error'
				});

			} else {

				Session.set('team_user_selected', Meteor.userId() || null);

				Notify.insert({
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
					title : "Welcome to GoMoToro !"
				});
			}

		});

		return false;
	}
});