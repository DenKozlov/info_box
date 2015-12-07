(function (app) {
    app.views.InfoBoxView = Backbone.View.extend({
        className: 'info-box',
        template: app.templates.getTemplateByID('info-box-template'),
        productView: null,
        events: {
            'click .prev, .next': 'getAnotherProduct'
        },
        initialize: function () {
            this.listenTo(this.collection, "reset", this.onReset);
        },
        onReset: function () {

            this.$el.html(this.template());
            this.renderProduct(this.collection.first());
        },
        getAnotherProduct: function (event) {
            var currProdInd = this.collection.indexOf(this.productView.model);

            if(event.target.className === 'prev' && currProdInd !== 0) {
                currProdInd--;
            }
            else if(event.target.className === 'next' && currProdInd !== this.collection.length-1){
                currProdInd++;
            }

            this.renderProduct(this.collection.at(currProdInd));
        },
        renderProduct: function (model) {
            var renderedView;
            this.productView = this.getProductView();
            this.productView.model = model;
            renderedView = this.productView.render();
            this.$el.prepend($(renderedView.el).hide().fadeIn(1000));
        },
        getProductView: function () {
            function createProductView () {

                return new app.views.ProductView();
            }

            return (function () {
                if(!this.productView) {
                    this.productView = createProductView();
                }

                return this.productView;
            })();
        }
    })
})(application);