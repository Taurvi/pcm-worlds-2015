$(window).scroll(function() {
    // ?????????? 
    // Get scroll position
    var s = $(window).scrollTop(),
    // ???????????
    // scroll value and opacity
        opacityVal = (s / 250.0);
    // blur????????0%??100?
    // opacity value 0% to 100%
    $('.img-blur').css('opacity', opacityVal);
});