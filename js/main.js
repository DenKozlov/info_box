requirejs.config({
    paths: {
        "jquery": "../libs/jquery-2.1.4.min",
        "underscore": "../libs/underscore",
        "backbone": "../libs/backbone",
        "text": "../node_modules/text/text",
        "infobox":"collections/infoBox",
        "product": "models/product",
        "productview": "views/productView",
        "infoboxview": "views/infoBoxView",
        "router": "router/router"
    }
});

/*require(['jquery', 'infoboxview'], function ($, InfoBoxView) {
    $('body').append(new InfoBoxView().render().el);
});*/

require(['jquery', 'underscore', 'backbone', 'router'], function ($, _, Backbone, Router) {
    new Router();
    Backbone.history.start();
});


