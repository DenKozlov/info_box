define(['jquery', 'underscore', 'backbone', 'product'], function ($, _, Backbone, Product) {

    return Backbone.Collection.extend({
        model: Product,
        url: 'json/info_box.json',
        initialize: function () {
            this.fetch({reset:true});
        }
    })
});