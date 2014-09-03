Template._register.events({
	'submit #register-form' : function(e, t) {
		e.preventDefault();

		var form = {
				mail : t.find('#register-email'),
				password : t.find('#register-password')
			},
			value = {
				mail : form.mail.value,
				password : form.password.value,
				username : form.mail.value ? form.mail.value.split('@')[0].toLowerCase() : null,
			};

		if ( !value.mail || !value.username || !value.password ){
			alert('All fields are require.');
			return false;
		} else if ( value.mail.indexOf('@') <= -1 ) {
			alert('Email is invalid');
			return false;
		}

		Accounts.createUser({
			email: value.mail,
			password : value.password,
			username : value.username,
			profile : {
				name : app.helper.firstUp( value.username ),
				timer : app.setting.timer,
				is_working : false,
				pomodoro_id : null,
				job : "New user",
				image : "http://dummyimage.com/400x400/fff/888/&text=" + value.username[0].toUpperCase()
			}
		}, function( err, id ){
			if (err) {
				console.log( err );
			} else {
				Session.set('user_selected', Meteor.userId() || null);
				app.router.goTo( 'home' );
			}
		});

		return false;
	}
});