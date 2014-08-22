

Template.login.events({

	'submit #login-form' : function(e, t){
		e.preventDefault();
		var email = t.find('#login-email').value,
			password = t.find('#login-password').value;

		Meteor.loginWithPassword(email, password, function(err){
			if (err) {
				
				Session.set('notify', {
					message : 'Incorrect <b>e-mail</b> or <b>password</b>',
					status : 'error'
				});

			} else {

				Session.set('notify', {
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

			Session.set('notify', {
				message : 'All fields are require.',
				status : 'warning'
			});

			return false;
		}

		Accounts.createUser({

			email: email,
			password : password,
			username : name

		}, function(err){
		
			if (err) {

				Session.set('notify', {
					message : 'Error ! Please contact the support. lol.',
					status : 'error'
				});

			} else {

				Session.set('notify', {
					message : 'Hi ' + Meteor.user().username + '! <br> Nice to meet you.' ,
					status : 'success'
				});

				app.router.goTo( 'home' );
			}

		});

		return false;
	}
});