(function (app) {
    app.collections.InfoBox = Backbone.Collection.extend({
        model: app.models.Product,
        url: 'json/info_box.json',
        initialize: function () {
            this.fetch({reset:true});
        }
    })
})(application);