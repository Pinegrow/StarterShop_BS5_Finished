jQuery(function($) {

    var scrollTo = function($el) {
        var el = $el.get(0);
        el && el.scrollIntoView && el.scrollIntoView();
    }

    var handleHash = function(event, skip_scroll) {
        var hash  = window.location.hash;
        var url   = window.location.href;

        //open description tab by default
        var selector = '[data-bs-target=#tab-description]';

        if ( hash.toLowerCase().indexOf( 'comment-' ) >= 0 || hash === '#reviews' || hash === '#tab-reviews' ) {
            selector = '[data-bs-target=#tab-reviews]';
        } else if ( url.indexOf( 'comment-page-' ) > 0 || url.indexOf( 'cpage=' ) > 0 ) {
            selector = '[data-bs-target=#tab-reviews]';
        } else if ( hash === '#tab-additional_information' ) {
            selector = '[data-bs-target=#tab-additional_information]';
        } 
        var $button = $(selector);
        if(!$button.hasClass('collapsed')) {
            //nothing to do, this panel is already shown
            $button.closest('.accordion').find('.accordion-button:not(.collapsed)').not($button).each(function(i, b) {
                $(b).addClass('collapsed');
                b.getAttribute('data-bs-target') && $(b.getAttribute('data-bs-target')).removeClass('show');
            })
        } else {
            if(skip_scroll) {
                $button.trigger( 'click' );
            } else {
                scrollTo( $button.trigger( 'click' ) );
            }
        }
    }

    handleHash(null, true /* no need to scroll there */);

    $(window).on('hashchange', handleHash);

    var quantityAddDec = function(e) {
        e.preventDefault();
        var f = this.classList.contains('quantity-decrease') ? -1 : 1;
        var $input = $(this).parent().find('input');
        var min = parseInt($input.attr('min') || 1);
        var max = parseInt($input.attr('max') || 9999);
        $input.val( Math.max(min, Math.min(max, parseInt(($input.val() || 1)) + f * 1)) ).trigger('change');
    }

    $('.quantity-decrease, .quantity-increase').on('click', quantityAddDec);
})