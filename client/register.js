Template.register.events({
	'submit #register-form' : function(e, t) {
		e.preventDefault();

		var form = {
				mail : t.find('#register-email'),
				password : t.find('#register-password')
			},

			value = {
				mail : form.mail.value,
				password : form.mail.value,
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

				alert( err.reason );

			} else {

				alert( "success" );

				Session.set('user_selected', Meteor.userId() || null);

				Events.insert({
					active : true,
					user_id : Meteor.userId(),
					notif : "user",
					type : "primary",
					timestamp : Date.now(),
					date : app.helper.date( Date.now() ),
					title : "Welcome to GoMoToro !",
					message : "You can do : <ul><li><a href='#'>Make a visit</a></li><li><a href='#/profile'>Edit your profile</a></li><li><a href='#' class='user-pomodoro-start'>Start pomodoro</a></li><li><a href='#/invite'>Invite friends</a></li></ul>"
				});

				app.router.goTo( 'home' );
			}

		});

		return false;
	}
});