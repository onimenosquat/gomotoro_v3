
Template.login.events({

	'submit #login-form' : function(e, t){
		e.preventDefault();
		
		var email = t.find('#login-email').value,
			password = t.find('#login-password').value;

		Meteor.loginWithPassword(email, password, function(err){
			if (err) {
				
				Notify.insert({
					active : true,
					timestamp : Date.now(),
					message : 'Incorrect <b>e-mail</b> or <b>password</b>',
					status : 'error'
				});

			} else {

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

		name = app.helper.firstUp( name ) || name; 

		if ( !email || !name || !password){

			Notify.insert({
				active : true,
				timestamp : Date.now(),
				message : 'All fields are require.',
				status : 'warning'
			});

			return false;
		};

		Accounts.createUser({

			email: email,
			password : password,
			username : name,
			profile : {
				timer : app.setting.timer,
				is_working : false,
				pomodoro_id : null
			}
			
		}, function(err){
		
			if (err) {

				Notify.insert({
					active : true,
					timestamp : Date.now(),
					message : 'Error ! Please contact support. lol.',
					status : 'error'
				});

			} else {

				Notify.insert({
					active : true,
					timestamp : Date.now(),
					message : 'Hi ' + Meteor.user().username + '! <br> Nice to meet you.' ,
					status : 'success'
				});

				app.router.goTo( 'home' );
			}

		});

		return false;
	}
});