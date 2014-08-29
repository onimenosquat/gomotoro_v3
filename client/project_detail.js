Template.project_detail.helpers({
	
	typeOf : function ( type ) {
		return ( Project.findOne( Session.get('project_selected') ).type == type ) ? true : false;
	},

	project_type : function () {
		return Project_type.find({});
	},

	timeline_item : function () {
		var id = Session.get('project_selected'),
		filter = Session.get('filter_timeline_project') || {};

		filter.project_id = id;
		return Events.find( filter , {sort : {timestamp : -1}}).fetch();  
	},
});