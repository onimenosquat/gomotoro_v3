
Template._login.events({

	'submit #login-form' : function(e, t){
		e.preventDefault();

		var form = {
				mail : t.find('#login-email'),
				password : t.find('#login-password')
			},
			value = {
				mail : form.mail.value,
				password : form.password.value,
			};

		Meteor.loginWithPassword(value.mail, value.password, function(err){
			if (err) {
				console.log( err );
			} else {
				Session.set('user_selected', Meteor.userId() );
				app.router.goTo( 'home' );
			};
		});

		return false; 
	}

});
