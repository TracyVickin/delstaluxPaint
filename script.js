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

    // Counter animation functionality
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

    // Client Review Section Slider
    let currentIndex = 0;
    let isMouseDown = false;
    let startX, scrollLeft;
    const slider = document.querySelector('.reviews-slider');
    const reviews = document.querySelectorAll('.reviews');
    const dots = document.querySelectorAll('.dots .dot');
    const totalSlides = reviews.length;  // ✅ Fixed variable name (was "re" before)

    // Function to show a specific slide based on index
    function showSlide(index) {
        // Ensure index stays within bounds
        currentIndex = (index + totalSlides) % totalSlides;

        // Change the transform to slide
        slider.style.transform = `translateX(-${currentIndex * 100}%)`;

        // Update the active circle
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }

    // Auto Slide every 10 seconds
    setInterval(() => {
        currentIndex = (currentIndex + 1) % totalSlides;
        showSlide(currentIndex);
    }, 10000); // Change every 10 seconds

    // Implement manual sliding by dragging
    slider.addEventListener('mousedown', (e) => {
        isMouseDown = true;
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
        e.preventDefault(); // Prevent text selection
    });

    slider.addEventListener('mouseleave', () => {
        isMouseDown = false;
    });

    slider.addEventListener('mouseup', () => {
        isMouseDown = false;

        // Update current slide after drag
        currentIndex = Math.round(slider.scrollLeft / slider.offsetWidth);
        showSlide(currentIndex);
    });

    slider.addEventListener('mousemove', (e) => {
        if (!isMouseDown) return;
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 3; // Adjust the speed of sliding
        slider.scrollLeft = scrollLeft - walk;
    });

    // For manual navigation using dots
    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            currentIndex = i; // Set the index to the clicked dots index
            showSlide(currentIndex);
        });
    });

    // Initial setup to show the first slide
    showSlide(currentIndex);
});

// ✅ Ensure function is globally accessible
function showGallery(galleryId) {
    // Hide all galleries
    document.querySelectorAll(".gallery").forEach(gallery => {
        gallery.style.display = "none";
        gallery.classList.remove("interior-painting", "exterior-painting", "interior-decorations");
    });

    // Show the selected gallery and apply the correct grid style
    const activeGallery = document.getElementById(galleryId);
    if (activeGallery) {
        activeGallery.style.display = "grid";

        // Apply correct grid layout based on gallery ID
        if (galleryId === "interior-painting") {
            activeGallery.classList.add("interior-painting");
        } else if (galleryId === "exterior-painting") {
            activeGallery.classList.add("exterior-painting");
        } else if (galleryId === "interior-decorations") {
            activeGallery.classList.add("interior-decorations");
        }
    }
}
