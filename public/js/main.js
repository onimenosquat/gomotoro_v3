// functions app

app = {

	setting : {
		timer : 1500,
	},

	router : {
		changePage : function() {
			var dataUrl = window.location.hash.toLowerCase().split('/');
			Session.set('router', {
				name : dataUrl[1] || null,
				id : dataUrl[2] || null,
			});
		},

		goTo : function( page ) {
			if ( !page ) return false;
			window.location.hash = "#/" + page;
		},
	},

	helper : {
		firstUp : function ( str ) {
			var words = str.split(' '),
				texte = "";

			for (var i = 0; i < words.length; i++) {
				texte += words[i].charAt(0).toUpperCase() + words[i].slice(1) + " "
			};

			return texte;
		},

		timer : function ( s ) {
			var hours = parseInt( s / 3600 ) % 24,
			minutes = parseInt( s / 60 ) % 60,
			seconds = s % 60;

			return (hours > 0 ? (hours < 10 ? "0" + hours : hours) + ":" : "" ) + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds  < 10 ? "0" + seconds : seconds);
		}
	},
};