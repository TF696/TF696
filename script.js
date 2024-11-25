// Smooth Scroll for Navigation Links
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    targetElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  });
});

// Scroll-to-Top Button
const scrollTopBtn = document.createElement('button');
scrollTopBtn.id = 'scrollTopBtn';
scrollTopBtn.className = 'scroll-top';
scrollTopBtn.innerText = '↑';
document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    scrollTopBtn.classList.add('show');
  } else {
    scrollTopBtn.classList.remove('show');
  }
});

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


// Sticky Navbar
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Highlight Active Section in Navbar
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (window.scrollY >= sectionTop - 100) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').includes(current)) {
      link.classList.add('active');
    }
  });
});

// Animate Sections on Scroll
const sectionsToAnimate = document.querySelectorAll('section');
window.addEventListener('scroll', () => {
  sectionsToAnimate.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    if (sectionTop < window.innerHeight - 100) {
      section.classList.add('visible');
    }
  });
});

let slideIndex = 0;
let autoSlideTimeout;

// Function to show slides
function showSlides(index = null) {
  const slides = document.querySelectorAll(".slide");

  // Update slide index
  if (index !== null) {
    slideIndex = index;
  } else {
    slideIndex++;
    if (slideIndex > slides.length) {
      slideIndex = 1; // Loop back to the first slide
    }
  }

  // Hide all slides
  slides.forEach((slide) => (slide.style.display = "none"));

  // Show the current slide
  slides[slideIndex - 1].style.display = "block";

  // Restart auto-slideshow
  clearTimeout(autoSlideTimeout);
  autoSlideTimeout = setTimeout(() => showSlides(), 3000); // Change slide every 3 seconds
}

// Function to navigate between slides
function changeSlide(step) {
  const slides = document.querySelectorAll(".slide");
  let newIndex = slideIndex + step;

  if (newIndex > slides.length) {
    newIndex = 1; // Loop back to the first slide
  } else if (newIndex < 1) {
    newIndex = slides.length; // Loop to the last slide
  }

  showSlides(newIndex);
}

// Initialize slideshow
showSlides();

window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  preloader.style.display = "none";
});

document.addEventListener("DOMContentLoaded", () => {
  const music = document.getElementById("background-music");
  const toggleMusicBtn = document.getElementById("toggle-music");
  const musicSelector = document.getElementById("music-selector");
  const prevSongBtn = document.getElementById("prev-song");
  const nextSongBtn = document.getElementById("next-song");
  const currentSongLabel = document.getElementById("current-song");
  const volumeSlider = document.getElementById("volume-slider");
  const musicToggle = document.getElementById("music-toggle");
  const musicContainer = document.querySelector(".music-container");

  let currentIndex = 0;

  // Update the current song label
  const updateCurrentSongLabel = () => {
    const currentOption = musicSelector.options[currentIndex];
    currentSongLabel.textContent = `Now Playing: ${currentOption.dataset.title}`;
  };

  // Play or Pause Music
  toggleMusicBtn.addEventListener("click", () => {
    if (music.paused) {
      music.play();
      toggleMusicBtn.textContent = "⏸";
    } else {
      music.pause();
      toggleMusicBtn.textContent = "⏯";
    }
  });

  // Change Music Track
  const changeTrack = (index) => {
    currentIndex = index;
    const selectedOption = musicSelector.options[currentIndex];
    music.src = selectedOption.value;
    music.play();
    toggleMusicBtn.textContent = "⏸";
    updateCurrentSongLabel();
  };

  // Handle Select Change
  musicSelector.addEventListener("change", () => {
    currentIndex = musicSelector.selectedIndex;
    changeTrack(currentIndex);
  });

  // Previous Song
  prevSongBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + musicSelector.options.length) % musicSelector.options.length;
    changeTrack(currentIndex);
  });

  // Next Song
  nextSongBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % musicSelector.options.length;
    changeTrack(currentIndex);
  });

  // Volume Control
  volumeSlider.addEventListener("input", (e) => {
    music.volume = e.target.value;
  });

  // Toggle Music Player Visibility
  musicToggle.addEventListener("click", () => {
    musicContainer.classList.toggle("hidden");
  });

  // Initialize
  updateCurrentSongLabel();
});



