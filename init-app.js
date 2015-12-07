application = {
    models: {},
    views: {},
    collections: {},
    routers: {},
    templates: {
        getTemplateByID: function(id) {

            return _.template($('#' + id).html());
        }
    }
};