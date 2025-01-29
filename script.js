// Function to show the gallery corresponding to the clicked button
document.addEventListener("DOMContentLoaded", function () {
    // Hide all galleries except the first one
    document.querySelectorAll(".gallery").forEach(gallery => {
        gallery.style.display = "none";
    });

    // Show the first gallery by default (Interior Painting)
    const defaultGallery = document.getElementById("interior-painting");
    if (defaultGallery) {
        defaultGallery.style.display = "grid";
        defaultGallery.classList.add("interior-painting");
    }
});

// Make the function globally accessible
function showGallery(galleryId) {
    // Hide all galleries
    document.querySelectorAll(".gallery").forEach(gallery => {
        gallery.style.display = "none";
        gallery.classList.remove("interior-painting", "exterior-painting", "interior-decorations");
    });

    // Show the selected gallery and apply the grid style
    const activeGallery = document.getElementById(galleryId);
    if (activeGallery) {
        activeGallery.style.display = "grid";
        activeGallery.classList.add(galleryId);
    }
}



  // Counter animation functionality
  document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll(".counter");
    const aboutUsSection = document.querySelector(".about-us");
  
    // Function to start the counters
    const startCounter = (counter) => {
      const target = +counter.getAttribute("data-target");
      const speed = 200; // Adjust speed for animation
  
      // Reset counter to 0 before starting
      counter.innerText = "0";
  
      const updateCounter = () => {
        const current = +counter.innerText; // Get current value
        const increment = Math.ceil(target / speed); // Increment value
  
        if (current < target) {
          counter.innerText = current + increment; // Update value
          setTimeout(updateCounter, 10); // Call function again
        } else {
          counter.innerText = target; // Set to target if complete
        }
      };
  
      updateCounter();
    };
  
    // Intersection Observer to detect visibility of the "about-us" section
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            counters.forEach((counter) => startCounter(counter)); // Start counters
          }
        });
      },
      { threshold: 0.5 } // Trigger when 50% of the section is visible
    );
  
    if (aboutUsSection) {
      observer.observe(aboutUsSection); // Observe the "about-us" section
    }
  });
  