(function() {
    // FUNCTIONS

    function aligningAction(hashOfURL, event, element=null) {
        
        // if there is no hash (in the link), no need to align
        if(! hashOfURL) {
            return
        }
        
        // if different url pathname; dont do the .preventDefault(), just quit
        if (element && location.pathname !== element.pathname) {
            return
        }


        // this is required because the browser would align the page, without taking into account the top fixed nav bar, after we already have done the correct scroll alignment. Without this lines, it would destroy the correct scroll alignment
        event.preventDefault()
        event.stopPropagation()

        const elementThatTheAnchorTargets = document.querySelector(hashOfURL) || topBarSelector
        
        // distance (on the Y axis) between the top of the document or webpage and the begining of the elementThatTheAnchorTargets

        const YCoordinateOfTheTargetElement = elementThatTheAnchorTargets.offsetTop

        // make the scroll correctly (because it takes into account the sticky top bar)

        window.scrollTo({
            top: YCoordinateOfTheTargetElement - topBarHeight
        })

        // make the click on this links part of history (to be able to retrogress) These lines are needed because of the .preventDefault() and/or(?) .stopPropogation() code below

        if (element) {
            const targetHref = `${location.origin}${location.pathname}${element.hash}`
            history.pushState(null, null, targetHref)
        }

    }


    // MAIN LOGIC

    // id of top fixed nav bar
    const topBarSelector = '#topbar'

    // fetch website for the top fixed nav bar element
    const topBarElement = document.querySelector(topBarSelector)

    // get top fixed nav bar height
    const topBarHeight = topBarElement.offsetHeight

    // 1. ON-LOAD (to address 'typing in the browser's address bar' when we are coming from outside of our website)

    window.addEventListener('load', function(event) {
        aligningAction(location.hash, event)
    })


    // 2. ON-POPSTATE (to address the action of "history changing" or "moving to a hash on the same page" within our website)

    window.addEventListener('popstate', function(event) {
        aligningAction(location.hash, event)
    })

    // 3. ON-CLICK (to address clicking on anchor links of our website)

    // fetch all elements that are anchor links of our website. Ideally this would only be on anchor links that are point to our website
    const anchorLinks = document.querySelectorAll('a[href*="#"]')

    // apply an event to those links
    for (let anchorElement of anchorLinks) {
        anchorElement.addEventListener('click', function(event) {
            aligningAction(this.hash, event, this)
        })
    }
}());
