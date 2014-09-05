Template._projects.helpers({

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

Template._projects.events({
	'submit .add-projet' : function ( e ) {
		e.preventDefault();
		var $el = $(e.currentTarget).find('input'),
			name = $el.val().toLowerCase(),
			model = {
				type : "new",
				name : name,
			};

		if ( !name || Project.find({ name : name }).fetch().length ) return false;
		
		$el.val( null )
		Project.insert( model );
	},

	'click .add-projet' : function ( e ) {
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