$(function () {
    var infoBox = new application.collections.InfoBox();

    $('body').append(new application.views.InfoBoxView({collection: infoBox}).render().el);
});