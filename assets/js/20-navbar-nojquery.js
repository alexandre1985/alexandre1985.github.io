/* DropDowns */

function toggleDisplay(el) {
    if (el.style.display === 'block') {
        el.style.display = ''
    } else {
        el.style.display = 'block'
    }
}

function hideDDMenus(exceptElement) {
    for (let i = 0; i < ddmenus.length; i++) {
        if(ddmenus[i] !== exceptElement) {
            ddmenus[i].style.display = ''
        }
    }
}


/* Navbar ARIA */

function ariaToggle(togglerEl, bool=null) {
    if(bool === null) {
        // toggle
        bool = (togglerEl.getAttribute('aria-expanded') !== 'true')
    }
    togglerEl.setAttribute('aria-expanded', bool)
}


document.addEventListener('DOMContentLoaded', function() {

    /* DropDowns */

    for (let j = 0; j < dds.length; j++) {
        ['click','ontouchstart'].forEach(function(evt) {

            dds[j].addEventListener(evt, function() {

                let ddmenu = ddmenus[j]
                hideDDMenus(ddmenu)
                toggleDisplay(ddmenu)

            });
            
        });
    }

    /* on page refresh make navbar not expanded */
    navbarTogglerInputField.checked = false

    navegacaoToggler.addEventListener('click', function(evt) {
        ariaToggle(navegacaoToggler)
        
        // make the toggle = input field action
        navbarTogglerInputField.checked = !navbarTogglerInputField.checked
    });

});
