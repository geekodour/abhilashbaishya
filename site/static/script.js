function autorun() {
    var lazyloadImages;    
    if ("IntersectionObserver" in window) {
      lazyloadImages = document.querySelectorAll(".lazy");
      console.log(lazyloadImages)

      let options = {
        root: null,
        rootMargin: '50px 0px',
        threshold: 0.01
      }

      function onIntersect(entries, observer) {
        entries.forEach(function(entry) {
          if (entry.intersectionRatio > 0) {
            console.log(entry)
            var image = entry.target;
            image.src = image.dataset.src;
            image.style.height = "auto";
            image.classList.remove("lazy");
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

window.onload = autorun;
