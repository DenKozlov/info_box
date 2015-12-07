(function (app) {
    app.views.ProductView = Backbone.View.extend({
        className: 'product',
        template: app.templates.getTemplateByID('product-template'),
        events: {
            'click .show-hide-details': 'showHideDetails'
        },
        render: function () {
            this.$el.html(this.template(this.model.toJSON()));

            return this;
        },
        showHideDetails: function () {
            var linkText = this.$('.show-hide-details').text(),
                $descr = this.$('.descr'),
                autoHeight = $descr.css('height', 'auto').height();

            if(linkText === 'show details') {
                this.show($descr, autoHeight);
            } else {
                this.hide($descr, autoHeight);
            }
        },
        show: function ($descr, autoHeight) {
            this.$('.prod-img').slideUp();
            $descr.height('20px').animate({height: autoHeight}, 'slow');
            $('.note').slideDown('slow');
            this.$('.show-hide-details').text('hide details');
        },
        hide: function ($descr, autoHeight) {
            $('.note').slideUp('slow');
            $descr.height(autoHeight).animate({height: '20px'}, 'slow');
            this.$('.show-hide-details').text('show details');
            this.$('.prod-img').slideDown('slow');
        }

    })
})(application);