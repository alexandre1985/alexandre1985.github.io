function ajustarFooter() {
    
    // ajust footer (in javascript because of mobile landscape switch)
    document.body.style.paddingBottom = ($o('footer.page-footer').offsetHeight - 3) + 'px'
    
    // ajust to acommodate navbar (in javascript because navbar height may vary from project to project)
    // in this project I have set up a css, instead
    //document.body.style.paddingTop = ($o('nav').offsetHeight - 1) + 'px'
    
}

function voiding(evt) {
    evt.preventDefault()
    return false
}

function putLinkActive(link, links) {
    for (let i = 0; i < links.length; i++) {
        links[i].parentElement.classList.remove('active');
    }

    link.parentElement.classList.add('active');
}



document.addEventListener('DOMContentLoaded', function() {
    
    /*
     * // preciso disto para por o footer em baixo
     * $o('footer').classList.remove('d-none');
     * 
     * ajustarFooter();
     * 
     * // quando o tamanho da janela muda, reajustar footer
     * window.addEventListener('resize', ajustarFooter, false)
     * 
     */
    
    let navbarLinks = $a('.navbar a:not(.dropdown-toggle)')

    /* Navbar links active on click when it goes to an anchor link from another website/webpage */

    let clickedLink = [...navbarLinks].find(l => (l.pathname + l.hash) === (location.pathname + location.hash) )
    if(clickedLink) {
        putLinkActive(clickedLink, navbarLinks)
    }


    /* Collapsed navbar link click hide menu */

    for (let i = 0; i < navbarLinks.length; i++) {

        let navLink = navbarLinks[i]

        navLink.addEventListener('click', function(evt) {
            let clickedLink = evt.target
            // if toggle appears on screen (which should mean that it is not an desktop viewer)
            if(window.matchMedia("(min-width: 992px)")) {
                navbarTogglerInputField.checked = false
                ariaToggle(navegacaoToggler, false)
            }
        });

        /* Navbar links active on click */
        navLink.addEventListener('click', function(evt) {
            putLinkActive(evt.target, navbarLinks)
        });
        
    }

    /* footer current year */
    $o('.year').innerHTML = new Date().getFullYear()
    

    /* scroll reach bottom (hide chat box on mobile) */

    window.addEventListener('scroll', function(event) {

        let doc = document.documentElement
        let chatboxScrollEnd = $o('#conversejs')
        
        if(chatboxScrollEnd) {

            if (window.scrollY >= (doc.scrollHeight - doc.offsetHeight)) {
                chatboxScrollEnd.classList.add('chat-scroll-end')
            } else {
                chatboxScrollEnd.classList.remove('chat-scroll-end')
            }

        }
    }, {passive: true});

});
