app = {
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
	}
};