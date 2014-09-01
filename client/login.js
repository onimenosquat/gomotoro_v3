
Template.login.events({

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
				
				Events.insert({
					active : true,
					user_id : Meteor.userId() || Session.get('this'),
					notif : "login",
					type : "error",
					timestamp : Date.now(),
					date : app.helper.date( Date.now() ),
					title : "User login error",
					message : err.reason
				});

			} else {

				Session.set('user_selected', Meteor.userId() );

				Events.insert({
					active : true,
					user_id : Meteor.userId() || Session.get('this'),
					notif : "login",
					type : "primary",
					timestamp : Date.now(),
					date : app.helper.date( Date.now() ),
					title : "User login success",
					message : "Hi! How are ou today ?"
				});

				app.router.goTo( 'home' );

			};
		});

		return false; 
	}

});
