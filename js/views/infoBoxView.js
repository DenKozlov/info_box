define(['jquery', 'underscore', 'backbone', 'infobox', 'productview', 'text!../templates/infobox.html'], function ($, _, Backbone, InfoBox, ProductView,tmpl) {

    return Backbone.View.extend({
        className: 'info-box icon-comp_plate_graybasiс',
        productView: null,
        events: {
            'click .prev, .next': 'getAnotherProduct'
        },
        initialize: function () {
            this.collection = new InfoBox();
            this.listenTo(this.collection, "reset", this.onReset);
        },
        onReset: function () {
            this.$el.html(_.template(tmpl));
            this.renderProduct(this.collection.first());
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
                this.renderProduct(this.collection.at(currProdInd));
            }
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