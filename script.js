const images = document.querySelectorAll('.gallery img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
let currentIndex = 0;

function openLightbox(index) {
  currentIndex = index;
  lightbox.style.display = 'flex';
  lightboxImg.src = images[index].src;
}

function closeLightbox() {
  lightbox.style.display = 'none';
}

function changeImage(step) {
  currentIndex += step;
  if (currentIndex < 0) currentIndex = images.length - 1;
  if (currentIndex >= images.length) currentIndex = 0;
  lightboxImg.src = images[currentIndex].src;
}

/* ESC key close */
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeLightbox();
});


document.querySelectorAll('.accordion-header').forEach(header => {
  header.addEventListener('click', () => {
    const item = header.parentElement;
    const openItem = document.querySelector('.accordion-item.active');

    if (openItem && openItem !== item) {
      openItem.classList.remove('active');
    }

    item.classList.toggle('active');
  });
});

const track = document.querySelector('.review-track');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');

const visible = 3;
const gap = 20;

let slides = Array.from(document.querySelectorAll('.review-card'));

/* clone slides */
const head = slides.slice(0, visible).map(s => s.cloneNode(true));
const tail = slides.slice(-visible).map(s => s.cloneNode(true));

tail.forEach(s => track.insertBefore(s, track.firstChild));
head.forEach(s => track.appendChild(s));

slides = Array.from(document.querySelectorAll('.review-card'));

let index = visible;

function slideWidth() {
  return slides[0].getBoundingClientRect().width + gap;
}

function move(noAnim = false) {
  track.style.transition = noAnim ? 'none' : 'transform 0.45s ease';
  track.style.transform = `translateX(-${index * slideWidth()}px)`;
}

/* initial */
move(true);

next.addEventListener('click', () => {
  index++;
  move();

  if (index === slides.length - visible) {
    setTimeout(() => {
      index = visible;
      move(true);
    }, 450);
  }
});

prev.addEventListener('click', () => {
  index--;
  move();

  if (index === 0) {
    setTimeout(() => {
      index = slides.length - visible * 2;
      move(true);
    }, 450);
  }
});

document.querySelectorAll('.read-more').forEach(btn => {
  btn.addEventListener('click', () => {
    const text = btn.previousElementSibling;
    text.classList.toggle('expanded');
    btn.textContent =
      text.classList.contains('expanded') ? 'Read Less' : 'Read More';
  });
});

// step-js
document.addEventListener("DOMContentLoaded", function() {
  const cards = document.querySelectorAll('.steps-section .step-card');

  cards.forEach(card => {
    const text = card.querySelector('.step-text');
    const btn = card.querySelector('.read-more'); // only inside step-card

    const lineHeight = parseFloat(getComputedStyle(text).lineHeight);
    const maxHeight = lineHeight * 3;

    // only show button if text longer
    if (text.scrollHeight <= maxHeight + 1) {
      btn.style.display = 'none';
    } else {
      btn.style.display = 'inline-block';
    }

    // remove any other click listeners attached globally
    btn.replaceWith(btn.cloneNode(true));
    const newBtn = card.querySelector('.read-more');

    newBtn.addEventListener('click', function(e) {
      e.preventDefault();
      text.classList.toggle('expanded');
      newBtn.textContent = text.classList.contains('expanded') ? 'Read Less' : 'Read More';
    });
  });
});
