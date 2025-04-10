// script.js
const swiperThumbs = new Swiper(".mySwiper", {
  spaceBetween: 10,
  slidesPerView: 4,
  freeMode: true,
  watchSlidesProgress: true,
});

const swiperMain = new Swiper(".mySwiper2", {
  spaceBetween: 10,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  thumbs: {
    swiper: swiperThumbs,
  },
});


const sections = document.querySelectorAll('section');
let currentIndex = 0;
let isScrolling = false;

function scrollToSection(index) {
  sections[index].scrollIntoView({ behavior: 'smooth' });
}

window.addEventListener('wheel', (e) => {
  if (isScrolling) return;

  if (e.deltaY > 0 && currentIndex < sections.length - 1) {
    currentIndex++;
  } else if (e.deltaY < 0 && currentIndex > 0) {
    currentIndex--;
  } else {
    return;
  }

  isScrolling = true;
  scrollToSection(currentIndex);

  setTimeout(() => {
    isScrolling = false;
  }, 1000); // verhindert schnelles Weiterscrollen
});


