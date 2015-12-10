define(['jquery', 'underscore', 'backbone', 'infobox', 'productview', 'text!../templates/infobox.html'], function ($, _, Backbone, InfoBox, ProductView,tmpl) {

    return Backbone.View.extend({
        className: 'info-box icon-comp_plate_graybasiс',
        productView: null,
        events: {
            'click .prev, .next': 'getAnotherProduct'
        },
        initialize: function () {
            this.collection = new InfoBox();
            this.listenTo(this.collection, "reset", this.onReset)
                .listenTo(Backbone, 'changeProduct', this.onProdChange);
        },
        onReset: function () {
            var hash = '/' + location.hash.slice(1);
            this.$el.html(_.template(tmpl));
            this.onProdChange(hash);
            /*this.renderProduct(this.collection.first());*/
        },
        getAnotherProduct: function (event) {
            var currProdInd = this.collection.indexOf(this.productView.model),
                renderProd = false;

            if(event.target.className.indexOf('prev') !== -1 && currProdInd > 0) {
                currProdInd--;
                renderProd = true;
            }
            else if(event.target.className.indexOf('next') !== -1 && currProdInd < this.collection.length-1){
                currProdInd++;
                renderProd = true;
            }
            if(renderProd) {
                Backbone.trigger('get-url-path', this.collection.at(currProdInd).get('productUrl'));
                /*this.renderProduct(this.collection.at(currProdInd));*/
            }
        },
        onProdChange: function (hash) {
            var modelToRend;
            this.collection.each(function (model) {
                if(model.get('productUrl') === hash) {
                    modelToRend = model;
                }
            });
            this.renderProduct(this.collection.at(this.collection.indexOf(modelToRend)));
        },
        renderProduct: function (model) {
            var productImg = model.get('img'),
                renderedView;
            this.productView = this.getProductView();
            this.productView.model = model;
            renderedView = this.productView.render();
            renderedView.$('.prod-img').addClass('icon-' + productImg.slice(0, productImg.lastIndexOf('.')));
            this.$el.prepend($(renderedView.el).hide().fadeIn(1000));
        },
        getProductView: function () {
            function createProductView () {

                return new ProductView();
            }

            return (function () {
                if(!this.productView) {
                    this.productView = createProductView();
                }

                return this.productView;
            })();
        }
    })
});