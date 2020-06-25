let theme = new URLSearchParams(location.search).get('theme')

let themeColor
if(themeColors.hasOwnProperty(theme)) {
    themeColor = themeColors[theme]
} else {
    themeColor = theme
}

document.addEventListener('DOMContentLoaded', function() {
    $a('.b-theme').forEach( el => el.style.backgroundColor = themeColor )
});
