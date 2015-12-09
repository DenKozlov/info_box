define(['jquery', 'underscore', 'backbone', 'text!../templates/product.html'], function ($, _, Backbone, tmpl) {

    return Backbone.View.extend({
        className: 'product',
        events: {
            'click .show-hide-details': 'showHideDetails'
        },
        render: function () {
            this.$el.html(_.template(tmpl)(this.model.toJSON()));

            return this;
        },
        showHideDetails: function () {
            var linkText = this.$('.show-hide-details').text(),
                $exclIm = this.$('.excl-image');

            if(linkText === 'show details') {
                this.show($exclIm);
            } else {
                this.hide($exclIm);
            }
        },
        show: function ($exclIm) {
            this.$('.prod-img').animate({opacity: 0}, 1000);
            $exclIm.css('position', 'relative').animate({top: -190}, 1100).promise()
            .pipe(function () {
                return $(".descr").animate({height: $(".descr").get(0).scrollHeight} );
            }).pipe(function () {
                return $('.note').slideDown();
            }).pipe(function () {
               return $('.show-hide-details').text('hide details');
            });
        },
        hide: function ($exclIm) {
            $('.note').slideUp().promise()
                .pipe(function () {
                   return $(".descr").animate({height: '2.4em'})
                })
                .pipe(function () {
                    return $exclIm.animate({top: 0}, 1100)
                })
                .pipe(function () {
                    $('.prod-img').animate({opacity: 1}, 1000);
                })
            .pipe(function () {
                return $('.show-hide-details').text('show details');
            });
        }

    })
});