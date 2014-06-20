// Nav for narrow screens
$(".js #siteNav ul").click(function () {
    $("#siteNav ul").toggleClass("show");
    if ($("#siteNav ul").hasClass("show")) {
        $("#siteNav").siblings().one("click", function () {
            $("#siteNav ul").removeClass("show");
        })
    }
});

// Move nav dropdown offscreen when content, header or footer are clicked. This is our hack for touch devices until a more comprehensive solution is implemented
$("#siteNav").siblings().click(function () {
    $('#nav li ul').css({ 'left': '-999em' });
});