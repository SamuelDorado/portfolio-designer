$(document).foundation()
    //Mobile menu toggler
$(".mobile-nav--wraper").click(function() {
        $("nav").slideToggle();
    })
    //Smooth scrolling on link click
$('a').click(function() {
    $('html, body').animate({
        scrollTop: $($(this).attr('href')).offset().top
    }, 500);
    return false;
});

// Hide Header on on scroll down
var didScroll;
var lastScrollTop = 0;
var delta = 5;
var navbarHeight = $('header').outerHeight();

$(window).scroll(function(event) {
    didScroll = true;
});

setInterval(function() {
    if (didScroll) {
        hasScrolled();
        didScroll = false;
    }
}, 150);

function hasScrolled() {
    var st = $(this).scrollTop();

    // Make sure they scroll more than delta
    if (Math.abs(lastScrollTop - st) <= delta)
        return;

    // If they scrolled down and are past the navbar, add class .nav-up.
    // This is necessary so you never see what is "behind" the navbar.
    if (st > lastScrollTop && st > navbarHeight) {
        // Scroll Down
        $('header').removeClass('nav-down').addClass('nav-up');
    } else {
        // Scroll Up
        if (st + $(window).height() < $(document).height()) {
            $('header').removeClass('nav-up').addClass('nav-down');
        }
    }

    lastScrollTop = st;
}

//Parallax effect
var ParallaxManager, ParallaxPart;

ParallaxPart = (function() {
    function ParallaxPart(el) {
        this.el = el;
        this.speed = parseFloat(this.el.getAttribute('data-parallax-speed'));
        this.maxScroll = parseInt(this.el.getAttribute('data-max-scroll'));
    }

    ParallaxPart.prototype.update = function(scrollY) {
        if (scrollY > this.maxScroll) { return; }
        var offset = -(scrollY * this.speed);
        this.setYTransform(offset);
    };

    ParallaxPart.prototype.setYTransform = function(val) {
        this.el.style.webkitTransform = "translate3d(0, " + val + "px, 0)";
        this.el.style.MozTransform = "translate3d(0, " + val + "px, 0)";
        this.el.style.OTransform = "translate3d(0, " + val + "px, 0)";
        this.el.style.transform = "translate3d(0, " + val + "px, 0)";
        this.el.style.msTransform = "translateY(" + val + "px)";
    };
    return ParallaxPart;
})();

ParallaxManager = (function() {
    ParallaxManager.prototype.parts = [];

    function ParallaxManager(elements) {
        if (Array.isArray(elements) && elements.length) {
            this.elements = elements;
        }
        if (typeof elements === 'object' && elements.item) {
            this.elements = Array.prototype.slice.call(elements);
        } else if (typeof elements === 'string') {
            this.elements = document.querySelectorAll(elements);
            if (this.elements.length === 0) {
                throw new Error("Parallax: No elements found");
            }
            this.elements = Array.prototype.slice.call(this.elements);
        } else {
            throw new Error("Parallax: Element variable is not a querySelector string, Array, or NodeList");
        }
        for (var i in this.elements) {
            this.parts.push(new ParallaxPart(this.elements[i]));
        }
        window.addEventListener("scroll", this.onScroll.bind(this));
    }

    ParallaxManager.prototype.onScroll = function() {
        window.requestAnimationFrame(this.scrollHandler.bind(this));
    };

    ParallaxManager.prototype.scrollHandler = function() {
        var scrollY = Math.max(window.pageYOffset, 0);
        for (var i in this.parts) { this.parts[i].update(scrollY); }
    };

    return ParallaxManager;

})();

new ParallaxManager('.parallax-ball');