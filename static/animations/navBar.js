$(document).ready(function () {
    function bar() {
        let documentHeight = $(document).height(),
            windowHeight = $(window).height(),
            windowTop = $(window).scrollTop(),
            progressConvert = (windowTop / (documentHeight - windowHeight) * 100);

      $('header .progress .progress-bar').css('width', Math.round(progressConvert) + '%');
}
$(document).on('scroll', function() {
    bar();
});
    bar();
});