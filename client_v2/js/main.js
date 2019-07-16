/* ===================================================================
 * Glint - Main JS
 *
 * ------------------------------------------------------------------- */

(function ($) {

    "use strict";

    var cfg = {
        scrollDuration: 800, // smoothscroll duration
        mailChimpURL: 'https://facebook.us8.list-manage.com/subscribe/post?u=cdb7b577e41181934ed6a6a44&amp;id=e6957d85dc'   // mailchimp url
    },

        $WIN = $(window);

    // Add the User Agent to the <html>
    // will be used for IE10 detection (Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0))
    var doc = document.documentElement;
    doc.setAttribute('data-useragent', navigator.userAgent);


    /* Preloader
     * -------------------------------------------------- */
    var clPreloader = function () {

        $("html").addClass('cl-preload');

        $WIN.on('load', function () {

            //force page scroll position to top at page refresh
            // $('html, body').animate({ scrollTop: 0 }, 'normal');

            // will first fade out the loading animation 
            $("#loader").fadeOut("slow", function () {
                // will fade out the whole DIV that covers the website.
                $("#preloader").delay(300).fadeOut("slow");
            });

            // for hero content animations 
            $("html").removeClass('cl-preload');
            $("html").addClass('cl-loaded');

        });
    };


    /* Menu on Scrolldown
     * ------------------------------------------------------ */
    var clMenuOnScrolldown = function () {

        var menuTrigger = $('.header-menu-toggle');

        $WIN.on('scroll', function () {

            if ($WIN.scrollTop() > 150) {
                menuTrigger.addClass('opaque');
            }
            else {
                menuTrigger.removeClass('opaque');
            }

        });
    };


    /* OffCanvas Menu
     * ------------------------------------------------------ */
    var clOffCanvas = function () {

        var menuTrigger = $('.header-menu-toggle'),
            nav = $('.header-nav'),
            closeButton = nav.find('.header-nav__close'),
            siteBody = $('body'),
            mainContents = $('section, footer');

        // open-close menu by clicking on the menu icon
        menuTrigger.on('click', function (e) {
            e.preventDefault();
            // menuTrigger.toggleClass('is-clicked');
            siteBody.toggleClass('menu-is-open');
        });

        // close menu by clicking the close button
        closeButton.on('click', function (e) {
            e.preventDefault();
            menuTrigger.trigger('click');
        });

        // close menu clicking outside the menu itself
        siteBody.on('click', function (e) {
            if (!$(e.target).is('.header-nav, .header-nav__content, .header-menu-toggle, .header-menu-toggle span')) {
                // menuTrigger.removeClass('is-clicked');
                siteBody.removeClass('menu-is-open');
            }
        });

    };


    /* photoswipe
     * ----------------------------------------------------- */
    var clPhotoswipe = function () {
        var items = [],
            $pswp = $('.pswp')[0],
            $folioItems = $('.item-folio');

        // get items
        $folioItems.each(function (i) {

            var $folio = $(this),
                $thumbLink = $folio.find('.thumb-link'),
                $title = $folio.find('.item-folio__title'),
                $caption = $folio.find('.item-folio__caption'),
                $titleText = '<h4>' + $.trim($title.html()) + '</h4>',
                $captionText = $.trim($caption.html()),
                $href = $thumbLink.attr('href'),
                $size = $thumbLink.data('size').split('x'),
                $width = $size[0],
                $height = $size[1];

            var item = {
                src: $href,
                w: $width,
                h: $height
            }

            if ($caption.length > 0) {
                item.title = $.trim($titleText + $captionText);
            }

            items.push(item);
        });

        // bind click event
        $folioItems.each(function (i) {

            $(this).on('click', function (e) {
                e.preventDefault();
                var options = {
                    index: i,
                    showHideOpacity: true
                }

                // initialize PhotoSwipe
                var lightBox = new PhotoSwipe($pswp, PhotoSwipeUI_Default, items, options);
                lightBox.init();
            });

        });

    };


    /* Stat Counter
     * ------------------------------------------------------ */
    var clStatCount = function () {

        var statSection = $(".about-stats"),
            stats = $(".stats__count");

        statSection.waypoint({

            handler: function (direction) {

                if (direction === "down") {

                    stats.each(function () {
                        var $this = $(this);

                        $({ Counter: 0 }).animate({ Counter: $this.text() }, {
                            duration: 4000,
                            easing: 'swing',
                            step: function (curValue) {
                                $this.text(Math.ceil(curValue));
                            }
                        });
                    });

                }

                // trigger once only
                this.destroy();

            },

            offset: "90%"

        });
    };


    /* Masonry
     * ---------------------------------------------------- */
    var clMasonryFolio = function () {

        var containerBricks = $('.masonry');

        containerBricks.imagesLoaded(function () {
            containerBricks.masonry({
                itemSelector: '.masonry__brick',
                resize: true
            });
        });
    };


    /* slick slider
     * ------------------------------------------------------ */
    var clSlickSlider = function () {

        $('.clients').slick({
            arrows: false,
            dots: true,
            infinite: true,
            slidesToShow: 6,
            slidesToScroll: 2,
            //autoplay: true,
            pauseOnFocus: false,
            autoplaySpeed: 1000,
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 5
                    }
                },
                {
                    breakpoint: 1000,
                    settings: {
                        slidesToShow: 4
                    }
                },
                {
                    breakpoint: 800,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 2
                    }
                },
                {
                    breakpoint: 500,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                }

            ]
        });

        $('.testimonials').slick({
            arrows: true,
            dots: false,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            adaptiveHeight: true,
            pauseOnFocus: false,
            autoplaySpeed: 1500,
            responsive: [
                {
                    breakpoint: 900,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 800,
                    settings: {
                        arrows: false,
                        dots: true
                    }
                }
            ]
        });

    };

    /* Smooth Scrolling
     * ------------------------------------------------------ */
    var clSmoothScroll = function () {

        $('.smoothscroll').on('click', function (e) {
            var target = this.hash,
                $target = $(target);

            e.preventDefault();
            e.stopPropagation();

            $('html, body').stop().animate({
                'scrollTop': $target.offset().top
            }, cfg.scrollDuration, 'swing').promise().done(function () {

                // check if menu is open
                if ($('body').hasClass('menu-is-open')) {
                    $('.header-menu-toggle').trigger('click');
                }

                window.location.hash = target;
            });
        });

    };


    /* Placeholder Plugin Settings
     * ------------------------------------------------------ */
    var clPlaceholder = function () {
        $('input, textarea, select').placeholder();
    };


    /* Alert Boxes
     * ------------------------------------------------------ */
    var clAlertBoxes = function () {

        $('.alert-box').on('click', '.alert-box__close', function () {
            $(this).parent().fadeOut(500);
        });

    };


    /* Contact Form
     * ------------------------------------------------------ */
    var clContactForm = function () {

        /* local validation */
        $('#contactForm').validate({

            /* submit via ajax */
            submitHandler: function (form) {

                var sLoader = $('.submit-loader');

                $.ajax({

                    type: "POST",
                    url: "inc/sendEmail.php",
                    data: $(form).serialize(),
                    beforeSend: function () {

                        sLoader.slideDown("slow");

                    },
                    success: function (msg) {

                        // Message was sent
                        if (msg == 'OK') {
                            sLoader.slideUp("slow");
                            $('.message-warning').fadeOut();
                            $('#contactForm').fadeOut();
                            $('.message-success').fadeIn();
                        }
                        // There was an error
                        else {
                            sLoader.slideUp("slow");
                            $('.message-warning').html(msg);
                            $('.message-warning').slideDown("slow");
                        }

                    },
                    error: function () {

                        sLoader.slideUp("slow");
                        $('.message-warning').html("Something went wrong. Please try again.");
                        $('.message-warning').slideDown("slow");

                    }

                });
            }

        });
    };


    /* Animate On Scroll
     * ------------------------------------------------------ */
    var clAOS = function () {

        AOS.init({
            offset: 200,
            duration: 600,
            easing: 'ease-in-sine',
            delay: 300,
            once: true,
            disable: 'mobile'
        });

    };


    /* AjaxChimp
     * ------------------------------------------------------ */
    var clAjaxChimp = function () {

        $('#mc-form').ajaxChimp({
            language: 'es',
            url: cfg.mailChimpURL
        });

        // Mailchimp translation
        //
        //  Defaults:
        //	 'submit': 'Submitting...',
        //  0: 'We have sent you a confirmation email',
        //  1: 'Please enter a value',
        //  2: 'An email address must contain a single @',
        //  3: 'The domain portion of the email address is invalid (the portion after the @: )',
        //  4: 'The username portion of the email address is invalid (the portion before the @: )',
        //  5: 'This email address looks fake or invalid. Please enter a real email address'

        $.ajaxChimp.translations.es = {
            'submit': 'Submitting...',
            0: '<i class="fa fa-check"></i> We have sent you a confirmation email',
            1: '<i class="fa fa-warning"></i> You must enter a valid e-mail address.',
            2: '<i class="fa fa-warning"></i> E-mail address is not valid.',
            3: '<i class="fa fa-warning"></i> E-mail address is not valid.',
            4: '<i class="fa fa-warning"></i> E-mail address is not valid.',
            5: '<i class="fa fa-warning"></i> E-mail address is not valid.'
        }

    };


    /* Back to Top
     * ------------------------------------------------------ */
    var clBackToTop = function () {

        var pxShow = 500,         // height on which the button will show
            fadeInTime = 400,         // how slow/fast you want the button to show
            fadeOutTime = 400,         // how slow/fast you want the button to hide
            scrollSpeed = 300,         // how slow/fast you want the button to scroll to top. can be a value, 'slow', 'normal' or 'fast'
            goTopButton = $(".go-top")

        // Show or hide the sticky footer button
        $(window).on('scroll', function () {
            if ($(window).scrollTop() >= pxShow) {
                goTopButton.fadeIn(fadeInTime);
            } else {
                goTopButton.fadeOut(fadeOutTime);
            }
        });
    };

function formatFormData(formElement){
    var formData = {}, inputs = formElement.serializeArray();
    $.each(inputs, function (i, o) {
        formData[o.name] = o.value;
    });
    return formData;
}
    async function submitCricketForm(formElement) {
       
        var formData = formatFormData(formElement);
        const paramToSend = formData;
        paramToSend["wicket"] = convertBooleanForWicket(paramToSend["wicket"]);

        var url = API_CALL.IP + API_CALL.ENDPOINT;
        var body = JSON.stringify({
            parameters: paramToSend
        });
        await callApi(url,API_CALL.METHOD,body);
    }
    $('#cricketFrom').submit(function () {
        // run other functions here
        submitCricketForm($(this));
        return false;
    });

    async function submitBadmintonForm(formElement) {
       
        var formData = formatFormData(formElement);
        const paramToSend = formData;
        //paramToSend["wicket"] = convertBooleanForWicket(paramToSend["wicket"]);

        var url = API_CALL.IP + API_CALL.BADMINTON_ENDPOINT;
        var body = JSON.stringify({
            parameters: paramToSend
        });
        await callApi(url,API_CALL.METHOD,body);
    }
    $('#badmintonFrom').submit(function () {
        // run other functions here
        submitBadmintonForm($(this));
        return false;
    });


    async function submitTennisForm(formElement) {
       
        var formData = formatFormData(formElement);
        const paramToSend = formData;
        //paramToSend["wicket"] = convertBooleanForWicket(paramToSend["wicket"]);

        var url = API_CALL.IP + API_CALL.TENNIS_ENDPOINT;
        var body = JSON.stringify({
            parameters: paramToSend
        });
        await callApi(url,API_CALL.METHOD,body);
    }
    $('#tennisFrom').submit(function () {
        // run other functions here
        submitTennisForm($(this));
        return false;
    });

    async function callApi(url,method,body){
        const response = await fetch(url, {
            method: method,
            body: body, // string or object
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const myJson = await response.json();
        videoUrl = API_CALL.IP + myJson.url;
        document.getElementById('player').setAttribute('src', videoUrl)
    }




    /* Initialize
     * ------------------------------------------------------ */
    (function ssInit() {

        clPreloader();
        clMenuOnScrolldown();
        clOffCanvas();
        clPhotoswipe();
        clStatCount();
        clMasonryFolio();
        clSlickSlider();
        clSmoothScroll();
        clPlaceholder();
        clAlertBoxes();
        clContactForm();
        clAOS();
        clAjaxChimp();
        clBackToTop();

    })();


})(jQuery);
var videoUrl = "";
function openSport(evt, sport, index) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(sport).style.display = "block";
    //evt.currentTarget.className += " active";
    tablinks[index].className = tablinks[index].className + " active";
    createForm(sport);
}

function createForm(sport) {
    /*Create a Form
 *-----------------------------------------------------------*/
    //     var f = document.createElement("form");
    //     var options = {
    //         "PAGE_TYPES": ["Cricket", "Badminton", "Tennis"],
    //         "CRICKET_HIGHLIGHT_TYPES": {
    //             "batsman": {
    //                 "title": "Batsman",
    //                 "required": true,
    //                 "options": [{
    //                     "title": "Virat Kohli",
    //                     "value": "Kohli"
    //                 }, {
    //                     "title": "MS Dhoni",
    //                     "value": "Dhoni"
    //                 }, {
    //                     "title": "David Warner",
    //                     "value": "Warner"
    //                 }]
    //             },
    //             "bowler": {
    //                 "title": "Bowler",
    //                 "required": true,
    //                 "options": [{
    //                     "title": "Jaspreet Bumrah",
    //                     "value": "Bumrah"
    //                 }, {
    //                     "title": "Yuzvendra Chahal",
    //                     "value": "Chahal"
    //                 }, {
    //                     "title": "Lasith Malinga",
    //                     "value": "Malinga"
    //                 }]
    //             },
    //             "shot": {
    //                 "title": "Shots",
    //                 "required": true,
    //                 "options": [{
    //                     "title": "Pull",
    //                     "value": "pull"
    //                 }, {
    //                     "title": "Sweep",
    //                     "value": "sweep"
    //                 }]
    //             },
    //             "ball_type": {
    //                 "title": "Ball Types",
    //                 "required": true,
    //                 "options": [{
    //                     "title": "Yorker",
    //                     "value": "yorker"
    //                 }, {
    //                     "title": "Googly",
    //                     "value": "googly"
    //                 }]
    //             },
    //             "runs": {
    //                 "title": "Runs",
    //                 "required": true,
    //                 "options": [{
    //                     "title": "1",
    //                     "value": "1"
    //                 }, {
    //                     "title": "2",
    //                     "value": "2"
    //                 }, {
    //                     "title": "3",
    //                     "value": "3"
    //                 }, {
    //                     "title": "Four",
    //                     "value": "4"
    //                 }, {
    //                     "title": "5",
    //                     "value": "5"
    //                 }, {
    //                     "title": "Six",
    //                     "value": "6"
    //                 }]
    //             },
    //             "wicket": {
    //                 "title": "Wickets",
    //                 "required": false,
    //                 "options": [{
    //                     "title": "No Choice",
    //                     "value": "undefined"
    //                 }, {
    //                     "title": "Wicket",
    //                     "value": "true"
    //                 }, {
    //                     "title": "No Wicket",
    //                     "value": "false"
    //                 }]
    //             }
    //         }
    //     };
    //     f.setAttribute('method', "post");
    //     f.setAttribute('action', "submit.php");

    //     for (var key in options.CRICKET_HIGHLIGHT_TYPES) {
    //         var l = document.createElement("label");
    //         var val = options.CRICKET_HIGHLIGHT_TYPES[key];
    //         l.name = val.title;
    //         l.id = val.title;
    //         f.appendChild(l);
    //     }
    //     //create input element
    //     var i = document.createElement("input");
    //     i.type = "text";
    //     i.name = "user_name";
    //     i.id = "user_name1";

    //     //create a checkbox
    //     var c = document.createElement("input");
    //     c.type = "checkbox";
    //     c.id = "checkbox1";
    //     c.name = "check1";

    //     //create a button
    //     var s = document.createElement("input");
    //     s.type = "submit";
    //     s.value = "Submit";

    //     // add all elements to the form
    //    f.appendChild(i);

    //     var r = document.createElement('span');
    // var y = document.createElement("INPUT");
    // y.setAttribute("type", "text");
    // y.setAttribute("placeholder", "Name");
    // var g = document.createElement("IMG");
    // g.setAttribute("src", "delete.png");
    // increment();
    // y.setAttribute("Name", "textelement_" + i);
    // r.appendChild(y);
    // g.setAttribute("onclick", "removeElement('myForm','id_" + i + "')");
    // r.appendChild(g);
    // r.setAttribute("id", "id_" + i);
    // f.appendChild(r);
    // f.style.backgroundColor ="white";
    // f.style.width ="100%";
    // f.style.zIndex = 10;
    // document.getElementById(sport).appendChild(f);

    $(function () {
        $("#" + sport).load("cricketForm.html");
    });
    //  $('#'+sport).append(f);
}
convertBooleanForWicket = (value) => {
    if (!value) return null;
    const val = {
        "undefined": null,
        "true": true,
        "false": false
    }
    return val[value];
}

const API_CALL = {
    IP: "http://35.203.155.182:5000/",
    ENDPOINT: "highlights",
    BADMINTON_ENDPOINT: "baddyhighlights",
    TENNIS_ENDPOINT: "tennishighlights",
    METHOD: "POST",
};
async function submitCricket() {
    console.log(document.cricketForm.batsman);
    /*  var request = new XMLHttpRequest();
   
   request.open('GET', 'https://ghibliapi.herokuapp.com/films', true)
   request.onload = function() {
     // Begin accessing JSON data here
     var data = JSON.parse(this.response)
   
     if (request.status >= 200 && request.status < 400) {
       data.forEach(movie => {
         console.log(movie.title)
       })
     } else {
       console.log('error')
     }
   }
   
   request.send()*/
}

window.onload = function () {
    openSport(undefined, 'cricket', 0);
};

