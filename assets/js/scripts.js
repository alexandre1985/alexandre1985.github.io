const dds = $a('.dropdown-toggle')
const ddmenus = $a('.dropdown-menu')

const navegacaoToggler = $o('.navbar-toggler')
const navbarTogglerInputField = $o('#checkbox-menu-toggle')

const themeColors = {
    dark: '#2E2E2E',
    default: 'orange'
}
;

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

document.addEventListener('DOMContentLoaded', function() {
    
    converse.initialize({

        bosh_service_url: 'https://niel.site/http-bind/',
        allow_logout: false,
        auto_list_rooms: false,
        auto_subscribe: false,
        message_carbons: false,
        message_archiving: 'never',
        domain_placeholder: ' e.g. niel.site',
        providers_link: 'https://niel.site',
        keepalive: true,
        allow_registration: false,
        show_send_button: true,
        registration_domain: 'https://niel.site/register.php',
        show_message_load_animation: true,
        clear_messages_on_reconnection: true,
        synchronize_availability: false,
        use_system_emojis: true,

        allow_contact_removal: false,
        allow_contact_requests: false,

        blacklisted_plugins: ['converse-profile']
        
    });

});

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

(function() {
  var MutationObserver, Util, WeakMap, getComputedStyle, getComputedStyleRX,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  Util = (function() {
    function Util() {}

    Util.prototype.extend = function(custom, defaults) {
      var key, value;
      for (key in defaults) {
        value = defaults[key];
        if (custom[key] == null) {
          custom[key] = value;
        }
      }
      return custom;
    };

    Util.prototype.isMobile = function(agent) {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(agent);
    };

    Util.prototype.createEvent = function(event, bubble, cancel, detail) {
      var customEvent;
      if (bubble == null) {
        bubble = false;
      }
      if (cancel == null) {
        cancel = false;
      }
      if (detail == null) {
        detail = null;
      }
      if (document.createEvent != null) {
        customEvent = document.createEvent('CustomEvent');
        customEvent.initCustomEvent(event, bubble, cancel, detail);
      } else if (document.createEventObject != null) {
        customEvent = document.createEventObject();
        customEvent.eventType = event;
      } else {
        customEvent.eventName = event;
      }
      return customEvent;
    };

    Util.prototype.emitEvent = function(elem, event) {
      if (elem.dispatchEvent != null) {
        return elem.dispatchEvent(event);
      } else if (event in (elem != null)) {
        return elem[event]();
      } else if (("on" + event) in (elem != null)) {
        return elem["on" + event]();
      }
    };

    Util.prototype.addEvent = function(elem, event, fn) {
      if (elem.addEventListener != null) {
        return elem.addEventListener(event, fn, false);
      } else if (elem.attachEvent != null) {
        return elem.attachEvent("on" + event, fn);
      } else {
        return elem[event] = fn;
      }
    };

    Util.prototype.removeEvent = function(elem, event, fn) {
      if (elem.removeEventListener != null) {
        return elem.removeEventListener(event, fn, false);
      } else if (elem.detachEvent != null) {
        return elem.detachEvent("on" + event, fn);
      } else {
        return delete elem[event];
      }
    };

    Util.prototype.innerHeight = function() {
      if ('innerHeight' in window) {
        return window.innerHeight;
      } else {
        return document.documentElement.clientHeight;
      }
    };

    return Util;

  })();

  WeakMap = this.WeakMap || this.MozWeakMap || (WeakMap = (function() {
    function WeakMap() {
      this.keys = [];
      this.values = [];
    }

    WeakMap.prototype.get = function(key) {
      var i, item, j, len, ref;
      ref = this.keys;
      for (i = j = 0, len = ref.length; j < len; i = ++j) {
        item = ref[i];
        if (item === key) {
          return this.values[i];
        }
      }
    };

    WeakMap.prototype.set = function(key, value) {
      var i, item, j, len, ref;
      ref = this.keys;
      for (i = j = 0, len = ref.length; j < len; i = ++j) {
        item = ref[i];
        if (item === key) {
          this.values[i] = value;
          return;
        }
      }
      this.keys.push(key);
      return this.values.push(value);
    };

    return WeakMap;

  })());

  MutationObserver = this.MutationObserver || this.WebkitMutationObserver || this.MozMutationObserver || (MutationObserver = (function() {
    function MutationObserver() {
      if (typeof console !== "undefined" && console !== null) {
        console.warn('MutationObserver is not supported by your browser.');
      }
      if (typeof console !== "undefined" && console !== null) {
        console.warn('WOW.js cannot detect dom mutations, please call .sync() after loading new content.');
      }
    }

    MutationObserver.notSupported = true;

    MutationObserver.prototype.observe = function() {};

    return MutationObserver;

  })());

  getComputedStyle = this.getComputedStyle || function(el, pseudo) {
    this.getPropertyValue = function(prop) {
      var ref;
      if (prop === 'float') {
        prop = 'styleFloat';
      }
      if (getComputedStyleRX.test(prop)) {
        prop.replace(getComputedStyleRX, function(_, _char) {
          return _char.toUpperCase();
        });
      }
      return ((ref = el.currentStyle) != null ? ref[prop] : void 0) || null;
    };
    return this;
  };

  getComputedStyleRX = /(\-([a-z]){1})/g;

  this.WOW = (function() {
    WOW.prototype.defaults = {
      boxClass: 'wow',
      animateClass: 'animated',
      offset: 0,
      mobile: true,
      live: true,
      callback: null,
      scrollContainer: null
    };

    function WOW(options) {
      if (options == null) {
        options = {};
      }
      this.scrollCallback = bind(this.scrollCallback, this);
      this.scrollHandler = bind(this.scrollHandler, this);
      this.resetAnimation = bind(this.resetAnimation, this);
      this.start = bind(this.start, this);
      this.scrolled = true;
      this.config = this.util().extend(options, this.defaults);
      if (options.scrollContainer != null) {
        this.config.scrollContainer = document.querySelector(options.scrollContainer);
      }
      this.animationNameCache = new WeakMap();
      this.wowEvent = this.util().createEvent(this.config.boxClass);
    }

    WOW.prototype.init = function() {
      var ref;
      this.element = window.document.documentElement;
      if ((ref = document.readyState) === "interactive" || ref === "complete") {
        this.start();
      } else {
        this.util().addEvent(document, 'DOMContentLoaded', this.start);
      }
      return this.finished = [];
    };

    WOW.prototype.start = function() {
      var box, j, len, ref;
      this.stopped = false;
      this.boxes = (function() {
        var j, len, ref, results;
        ref = this.element.querySelectorAll("." + this.config.boxClass);
        results = [];
        for (j = 0, len = ref.length; j < len; j++) {
          box = ref[j];
          results.push(box);
        }
        return results;
      }).call(this);
      this.all = (function() {
        var j, len, ref, results;
        ref = this.boxes;
        results = [];
        for (j = 0, len = ref.length; j < len; j++) {
          box = ref[j];
          results.push(box);
        }
        return results;
      }).call(this);
      if (this.boxes.length) {
        if (this.disabled()) {
          this.resetStyle();
        } else {
          ref = this.boxes;
          for (j = 0, len = ref.length; j < len; j++) {
            box = ref[j];
            this.applyStyle(box, true);
          }
        }
      }
      if (!this.disabled()) {
        this.util().addEvent(this.config.scrollContainer || window, 'scroll', this.scrollHandler);
        this.util().addEvent(window, 'resize', this.scrollHandler);
        this.interval = setInterval(this.scrollCallback, 50);
      }
      if (this.config.live) {
        return new MutationObserver((function(_this) {
          return function(records) {
            var k, len1, node, record, results;
            results = [];
            for (k = 0, len1 = records.length; k < len1; k++) {
              record = records[k];
              results.push((function() {
                var l, len2, ref1, results1;
                ref1 = record.addedNodes || [];
                results1 = [];
                for (l = 0, len2 = ref1.length; l < len2; l++) {
                  node = ref1[l];
                  results1.push(this.doSync(node));
                }
                return results1;
              }).call(_this));
            }
            return results;
          };
        })(this)).observe(document.body, {
          childList: true,
          subtree: true
        });
      }
    };

    WOW.prototype.stop = function() {
      this.stopped = true;
      this.util().removeEvent(this.config.scrollContainer || window, 'scroll', this.scrollHandler);
      this.util().removeEvent(window, 'resize', this.scrollHandler);
      if (this.interval != null) {
        return clearInterval(this.interval);
      }
    };

    WOW.prototype.sync = function(element) {
      if (MutationObserver.notSupported) {
        return this.doSync(this.element);
      }
    };

    WOW.prototype.doSync = function(element) {
      var box, j, len, ref, results;
      if (element == null) {
        element = this.element;
      }
      if (element.nodeType !== 1) {
        return;
      }
      element = element.parentNode || element;
      ref = element.querySelectorAll("." + this.config.boxClass);
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        box = ref[j];
        if (indexOf.call(this.all, box) < 0) {
          this.boxes.push(box);
          this.all.push(box);
          if (this.stopped || this.disabled()) {
            this.resetStyle();
          } else {
            this.applyStyle(box, true);
          }
          results.push(this.scrolled = true);
        } else {
          results.push(void 0);
        }
      }
      return results;
    };

    WOW.prototype.show = function(box) {
      this.applyStyle(box);
      box.className = box.className + " " + this.config.animateClass;
      if (this.config.callback != null) {
        this.config.callback(box);
      }
      this.util().emitEvent(box, this.wowEvent);
      this.util().addEvent(box, 'animationend', this.resetAnimation);
      this.util().addEvent(box, 'oanimationend', this.resetAnimation);
      this.util().addEvent(box, 'webkitAnimationEnd', this.resetAnimation);
      this.util().addEvent(box, 'MSAnimationEnd', this.resetAnimation);
      return box;
    };

    WOW.prototype.applyStyle = function(box, hidden) {
      var delay, duration, iteration;
      duration = box.getAttribute('data-wow-duration');
      delay = box.getAttribute('data-wow-delay');
      iteration = box.getAttribute('data-wow-iteration');
      return this.animate((function(_this) {
        return function() {
          return _this.customStyle(box, hidden, duration, delay, iteration);
        };
      })(this));
    };

    WOW.prototype.animate = (function() {
      if ('requestAnimationFrame' in window) {
        return function(callback) {
          return window.requestAnimationFrame(callback);
        };
      } else {
        return function(callback) {
          return callback();
        };
      }
    })();

    WOW.prototype.resetStyle = function() {
      var box, j, len, ref, results;
      ref = this.boxes;
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        box = ref[j];
        results.push(box.style.visibility = 'visible');
      }
      return results;
    };

    WOW.prototype.resetAnimation = function(event) {
      var target;
      if (event.type.toLowerCase().indexOf('animationend') >= 0) {
        target = event.target || event.srcElement;
        return target.className = target.className.replace(this.config.animateClass, '').trim();
      }
    };

    WOW.prototype.customStyle = function(box, hidden, duration, delay, iteration) {
      if (hidden) {
        this.cacheAnimationName(box);
      }
      box.style.visibility = hidden ? 'hidden' : 'visible';
      if (duration) {
        this.vendorSet(box.style, {
          animationDuration: duration
        });
      }
      if (delay) {
        this.vendorSet(box.style, {
          animationDelay: delay
        });
      }
      if (iteration) {
        this.vendorSet(box.style, {
          animationIterationCount: iteration
        });
      }
      this.vendorSet(box.style, {
        animationName: hidden ? 'none' : this.cachedAnimationName(box)
      });
      return box;
    };

    WOW.prototype.vendors = ["moz", "webkit"];

    WOW.prototype.vendorSet = function(elem, properties) {
      var name, results, value, vendor;
      results = [];
      for (name in properties) {
        value = properties[name];
        elem["" + name] = value;
        results.push((function() {
          var j, len, ref, results1;
          ref = this.vendors;
          results1 = [];
          for (j = 0, len = ref.length; j < len; j++) {
            vendor = ref[j];
            results1.push(elem["" + vendor + (name.charAt(0).toUpperCase()) + (name.substr(1))] = value);
          }
          return results1;
        }).call(this));
      }
      return results;
    };

    WOW.prototype.vendorCSS = function(elem, property) {
      var j, len, ref, result, style, vendor;
      style = getComputedStyle(elem);
      result = style.getPropertyCSSValue(property);
      ref = this.vendors;
      for (j = 0, len = ref.length; j < len; j++) {
        vendor = ref[j];
        result = result || style.getPropertyCSSValue("-" + vendor + "-" + property);
      }
      return result;
    };

    WOW.prototype.animationName = function(box) {
      var animationName, error;
      try {
        animationName = this.vendorCSS(box, 'animation-name').cssText;
      } catch (error) {
        animationName = getComputedStyle(box).getPropertyValue('animation-name');
      }
      if (animationName === 'none') {
        return '';
      } else {
        return animationName;
      }
    };

    WOW.prototype.cacheAnimationName = function(box) {
      return this.animationNameCache.set(box, this.animationName(box));
    };

    WOW.prototype.cachedAnimationName = function(box) {
      return this.animationNameCache.get(box);
    };

    WOW.prototype.scrollHandler = function() {
      return this.scrolled = true;
    };

    WOW.prototype.scrollCallback = function() {
      var box;
      if (this.scrolled) {
        this.scrolled = false;
        this.boxes = (function() {
          var j, len, ref, results;
          ref = this.boxes;
          results = [];
          for (j = 0, len = ref.length; j < len; j++) {
            box = ref[j];
            if (!(box)) {
              continue;
            }
            if (this.isVisible(box)) {
              this.show(box);
              continue;
            }
            results.push(box);
          }
          return results;
        }).call(this);
        if (!(this.boxes.length || this.config.live)) {
          return this.stop();
        }
      }
    };

    WOW.prototype.offsetTop = function(element) {
      var top;
      while (element.offsetTop === void 0) {
        element = element.parentNode;
      }
      top = element.offsetTop;
      while (element = element.offsetParent) {
        top += element.offsetTop;
      }
      return top;
    };

    WOW.prototype.isVisible = function(box) {
      var bottom, offset, top, viewBottom, viewTop;
      offset = box.getAttribute('data-wow-offset') || this.config.offset;
      viewTop = (this.config.scrollContainer && this.config.scrollContainer.scrollTop) || window.pageYOffset;
      viewBottom = viewTop + Math.min(this.element.clientHeight, this.util().innerHeight()) - offset;
      top = this.offsetTop(box);
      bottom = top + box.clientHeight;
      return top <= viewBottom && bottom >= viewTop;
    };

    WOW.prototype.util = function() {
      return this._util != null ? this._util : this._util = new Util();
    };

    WOW.prototype.disabled = function() {
      return !this.config.mobile && this.util().isMobile(navigator.userAgent);
    };

    return WOW;

  })();

}).call(this);

document.addEventListener('DOMContentLoaded', function() {

    /* Animations init */
    new WOW().init();

});

