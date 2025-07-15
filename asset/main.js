
//prevent page go up when click empty link
document.querySelectorAll('a[href="#"]').forEach(link => {
  link.addEventListener('click', function (event) {
    event.preventDefault(); // prevent the page from jumping
  });
});


// === Spotlight Gallery Slider home page ===
let currentSlide = 0;

function showSlide(index) {
  const slides = document.querySelector(".slides-container");
  const totalSlides = document.querySelectorAll(".slide").length;
  if (!slides) return;

  if (index >= totalSlides) currentSlide = 0;
  else if (index < 0) currentSlide = totalSlides - 1;
  else currentSlide = index;

  slides.style.transform = `translateX(-${currentSlide * 100}vw)`;
}

function nextSlide() {
  showSlide(currentSlide + 1);
}

function prevSlide() {
  showSlide(currentSlide - 1);
}


// === Navigation Bar Toggle scroll down nav bar fold ===
const navbar = document.getElementById("navbar");
let lastScrollTop = 0;

if (navbar) {
  window.addEventListener("scroll", function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
      navbar.classList.add("nav-hide"); // hide when scrolling down
    } else {
      navbar.classList.remove("nav-hide"); // show when scrolling up
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  });
}


// === Back to Top Button ===
const backToTopBtn = document.getElementById("backToTop");

if (backToTopBtn) {
  window.addEventListener("scroll", () => {
    backToTopBtn.style.display = window.scrollY > 300 ? "block" : "none";
  });

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}


// === Anime & Movie List Slider home page ===
function moveSlider(sliderId, direction) {
  const slider = document.getElementById(sliderId);
  const card = slider.querySelector(".top10-card") || document.querySelector(".episode-card");
  if (!slider || !card) return;

  const cardWidth = card.offsetWidth + 15;
  const scrollAmount = cardWidth * direction * 3;

  slider.scrollBy({ left: scrollAmount, behavior: "smooth" });

  setTimeout(() => updateArrowVisibility(sliderId), 300);
}

function updateArrowVisibility(sliderId) {
  const slider = document.getElementById(sliderId);
  if (!slider) return;

  const leftArrow = slider.parentElement.querySelector(".slider-arrow.left");
  const rightArrow = slider.parentElement.querySelector(".slider-arrow.right");

  if (leftArrow) {
    leftArrow.classList.toggle("hidden", slider.scrollLeft <= 10);
  }
  if (rightArrow) {
    rightArrow.classList.toggle(
      "hidden",
      slider.scrollLeft >= slider.scrollWidth - slider.clientWidth - 10
    );
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const sliders = document.querySelectorAll(".slider-track");

  sliders.forEach((slider) => {
    updateArrowVisibility(slider.id);
    slider.addEventListener("scroll", () => updateArrowVisibility(slider.id));
  });


  //like button in most view page
  document.querySelectorAll('.like-btn').forEach(button => {
    button.addEventListener('click', () => {
      const icon = button.querySelector('ion-icon');
      const countSpan = button.querySelector('.like-count');
      let count = parseInt(countSpan.textContent);

      const isLiked = icon.getAttribute('name') === 'heart';

      // Toggle icon and update count
      if (isLiked) {
        icon.setAttribute('name', 'heart-outline');
        count--;
      } else {
        icon.setAttribute('name', 'heart');
        count++;
      }

      countSpan.textContent = count;
    });
  });


  // View More buttons home page
  document.querySelectorAll(".view-more").forEach((button) => {
    button.addEventListener("click", () => {
      const sectionTitle = button.parentElement.querySelector(".section-title")?.textContent;
    });
  });
});


// Search page begin

// close button
if (closeBtn) {
  closeBtn.addEventListener("click", () => {
    const container = document.querySelector(".search-container");
    if (container) container.style.display = "none";
  });
}

//type to search
document.getElementById("searchInput").addEventListener("focus", function () {
  document.getElementById("searchList").classList.add("show");
});

document.addEventListener("click", function (event) {
  if (!event.target.closest("#searchInput")) {
    document.getElementById("searchList").classList.remove("show");
  }
});

function search2() {
  // Declare variables
  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById('searchInput');
  filter = input.value.toUpperCase();
  ul = document.getElementById("searchList");
  li = ul.getElementsByTagName('li');

  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("a")[0];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}


// show more button on coming soon page
function toggleSchedule() {
  const extraItems = document.querySelector('.extra-items');
  const toggleBtn = document.querySelector('.show-more');

  if (extraItems.classList.contains('hidden')) {
    extraItems.classList.remove('hidden');
    toggleBtn.textContent = 'Show less';
  } else {
    extraItems.classList.add('hidden');
    toggleBtn.textContent = 'Show more';
  }
}

//email send and preview contact us page
const form = document.getElementById('contactForm');


form.addEventListener('submit', function (e) {
  e.preventDefault(); // prevent actual form submission

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const subject = document.getElementById('subject').value.trim();
  const message = document.getElementById('message').value.trim();

  // Update preview panel
  preview.innerHTML = `
      <p><strong>Name:</strong> ${name || '—'}</p>
      <p><strong>Email:</strong> ${email || '—'}</p>
      <p><strong>Subject:</strong> ${subject || '—'}</p>
      <p><strong>Message:</strong><br>${message || '—'}</p>
    `;
});

// Mailto handler script 
  document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault(); // stop the form from submitting normally

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;

    const mailtoLink = `mailto:companyhermes04@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
      "Name: " + name + "\nEmail: " + email + "\n\nMessage:\n" + message
    )}`;

    window.location.href = mailtoLink;
  });



  // toggle for phone
  function toggleMenu() {
    document.querySelector('.nav-links').classList.toggle('show');
  }