// Function to show the gallery corresponding to the clicked button
function showGallery(galleryId) {
    // Hide all galleries by removing the 'active' class
    const galleries = document.querySelectorAll('.gallery');
    galleries.forEach((gallery) => gallery.classList.remove('active'));

    // Show the selected gallery by adding the 'active' class
    const selectedGallery = document.getElementById(galleryId);
    if (selectedGallery) {
        selectedGallery.classList.add('active');
    }
}

// Ensure the 'interior-painting' gallery is shown by default when the page loads
window.onload = function() {
    showGallery('interior-painting');
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
  