Template.projects.helpers({

	projects : function () {
		var p = Project.find({});
		if ( !Session.get('project_selected') ) Session.set('project_selected', p.fetch()[0]._id );
		return p;
	},

	project_selected : function () {
		return Project.findOne( Session.get('project_selected') );
	},

	project_type : function () {
		return Project_type.find({});
	}

});

Template.projects.events({
	'click .create-new-project' : function ( e ) {
		e.preventDefault();
		var $el = $(e.currentTarget),
			type = $el.data('type'),
			model = {
				name : "New project",
				type : type,
			};
		
		Project.insert( model, function (err, id) {
			Events.insert({
				active : true,
				project_id : Meteor.userId(),
				notif : "project",
				type : "default",
				timestamp : Date.now(),
				date : app.helper.date( Date.now() ),
				title : "New project",
				message : "New project has been created"
			});
		});
	},

	'submit .add-projet-type' : function ( e ) {
		e.preventDefault();
		var $el = $(e.currentTarget).find('input'),
			name = $el.val().toLowerCase(),
			model = {
				name : name,
			};

		if ( !name || Project_type.find({ name : name }).fetch().length ) return false;
		
		$el.val( null )
		Project_type.insert( model );
	},

	'click .add-projet-type' : function ( e ) {
		e.stopPropagation()
	},

	// PROJET LISTING
	// -------
	'click .project_listing > a' : function ( e ) {
		e.preventDefault();
		Session.set('project_selected', this._id);
	},

	// PROJET DETAIL
	// -------
	'change .project_name' : function ( e ) {
		Project.update( this._id, {$set : {name : e.currentTarget.value}} );
	},

	'change .project_type' : function ( e ) {
		Project.update( this._id, {$set : {type : e.currentTarget.value}} );
	}
});