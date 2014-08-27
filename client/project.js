Template.projects.projects = function () {
	return Project.find({});
};

Template.projects.project_selected = function () {
	return Project.findOne( Session.get('project_selected') );
};

Template.projects.events({
	'click .create-new-project' : function ( e ) {
		e.preventDefault();
		var $el = $(e.currentTarget),
			type = $el.data('type'),
			model = {
				name : "New project",
				type : type,
			};
		
		Project.insert( model );
	}
});

Template.project_listing.project_selected = function () {
	return (Session.get('project_selected') == this._id) ? "is-selected" : ""; 
};

Template.project_listing.events({
	'click' : function ( e ) {
		e.preventDefault();
		Session.set('project_selected', this._id);
	},
})

Template.project_detail.current_type = function ( type ) {
	return ( Project.findOne( this._id ).type == type ) ? true : false;
};

Template.project_detail.events({
	'change .project_name' : function ( e ) {
		Project.update( this._id, {$set : {name : e.currentTarget.value}} );
	},

	'change .project_type' : function ( e ) {
		Project.update( this._id, {$set : {type : e.currentTarget.value}} );
	}
})