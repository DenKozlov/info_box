define(['jquery', 'underscore', 'backbone', 'infoboxview'], function ($, _, Backbone, InfoBoxView) {
        return Backbone.Router.extend({
        infoBox: null,
        initialize: function () {
            this.listenTo(Backbone, 'get-url-path', this.getRouterPath);
        },
        routes: {
            'products/:id': 'productChange',
            '*default': 'defaults'
        },
        getRouterPath: function (productUrl) {

            this.navigate(productUrl, {trigger: true});
        },
        productChange: function () {
            var hash = '';
            if(!this.infoBox){
                $('body').append(new InfoBoxView().el);
                this.infoBox = true;
            } else {
                hash = '/' + location.hash.slice(1);
                Backbone.trigger('changeProduct', hash);
                this.navigate(hash);
            }
        },
        defaults: function () {
            this.navigate('products/promo1.html', {trigger: true});
        }
    })
});