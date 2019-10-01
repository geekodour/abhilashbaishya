function autorun() {

    var lazyloadImages;    
    if ("IntersectionObserver" in window) {
      lazyloadImages = document.querySelectorAll(".lazy");

      let options = {
        root: null,
        rootMargin: '50px 0px',
        threshold: 0.01
      }

      function onIntersect(entries, observer) {
        entries.forEach(function(entry) {
          if (entry.intersectionRatio > 0) {
            var image = entry.target;
            image.src = image.dataset.src;
            //image.classList.add("h-auto");
            image.classList.remove("lazy");
            //image.classList.remove("h-400");
            observer.unobserve(image);
          }
        });
      }
      var imageObserver = new IntersectionObserver(onIntersect, options);
  
      lazyloadImages.forEach(function(image) {
        imageObserver.observe(image);
      });
    } else {  
      var lazyloadThrottleTimeout;
      lazyloadImages = document.querySelectorAll(".lazy");
      
      function lazyload () {
        if(lazyloadThrottleTimeout) {
          clearTimeout(lazyloadThrottleTimeout);
        }    
  
        lazyloadThrottleTimeout = setTimeout(function() {
          var scrollTop = window.pageYOffset;
          lazyloadImages.forEach(function(img) {
              if(img.offsetTop < (window.innerHeight + scrollTop)) {
                img.src = img.dataset.src;
                img.classList.remove('lazy');
              }
          });
          if(lazyloadImages.length == 0) { 
            document.removeEventListener("scroll", lazyload);
            window.removeEventListener("resize", lazyload);
            window.removeEventListener("orientationChange", lazyload);
          }
        }, 20);
      }
  
      document.addEventListener("scroll", lazyload);
    }
}

function colorchange() {
    // color menu item
    menuItems = document.getElementsByClassName('navbaritem')
    for (i = 0; i < menuItems.length; i++) {
      if (menuItems[i].href == window.location.href ) {
        menuItems[i].classList.add('sunflower')
      }
    }
}

window.onload = autorun;
//document.addEventListener("DOMContentLoaded", colorchange, false);