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
            this.cacheElements();
            var linkText = this.$link.text();

            (linkText === 'show details') ? this.show() : this.hide();
        },
        show: function () {
            this.$prodImg.animate({opacity: 0}, 1000);
            this.$exclIm.css('position', 'relative').animate({top: -190}, 1100).promise()
            .pipe(function () {
                return this.$descr.animate({ height: this.$descr.scrollHeight });
            }.bind(this))
            .pipe(function () {
                return this.$note.slideDown();
            }.bind(this))
            .pipe(function () {
               return this.$link.text('hide details');
            }.bind(this));
        },
        hide: function () {
            this.$note.slideUp().promise()
                .pipe(function () {
                   return this.$descr.animate({ height: '2.4em' })
                }.bind(this))
                .pipe(function () {
                    return this.$exclIm.animate({top: 0}, 1100)
                }.bind(this))
                .pipe(function () {
                    this.$prodImg.animate({ opacity: 1 }, 1000);
                }.bind(this))
                .pipe(function () {
                return this.$link.text('show details');
                }.bind(this));
        },
        cacheElements: function () {
            this.$note = $('.note');
            this.$descr = $('.descr');
            this.$prodImg = $('.prod-img');
            this.$exclIm = $('.excl-image');
            this.$link = $('.show-hide-details');
        }
    })
});