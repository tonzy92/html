// Sectionsweise scrollen 
const sections = document.querySelectorAll('section');
let currentIndex = 0;
let isScrolling = false;

function scrollToSection(index) {
  if (index === 0) {
    // Ganz an den Anfang scrollen
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    sections[index].scrollIntoView({ behavior: 'smooth' });
  }
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


// //Slide logik
const cardArray = Array.from(document.querySelectorAll('[id^="card"]'));
let currentCard = 0;
let textState = 0; // 0 = erster Text sichtbar, 1 = zweiter Text sichtbar

function showCard(index) {
  cardArray.forEach((card, i) => {
    card.style.opacity = i === index ? "1" : "0";

    const first = card.querySelector(".text_container_about.first");
    const second = card.querySelector(".text_container_about.second");

    if (first) first.classList.remove("active");
    if (second) second.classList.remove("active");
  });

  // Setze für die neue Karte den Anfangszustand
  const newCard = cardArray[index];
  const newFirst = newCard.querySelector(".text_container_about.first");
  if (newFirst) newFirst.classList.add("active");

  textState = 0;
  currentCard = index;
}

function nextCard() {
  const currentCardElement = cardArray[currentCard];
  const firstText = currentCardElement.querySelector(".text_container_about.first");
  const secondText = currentCardElement.querySelector(".text_container_about.second");

  if (textState === 0) {
    if (firstText) firstText.classList.remove("active");
    if (secondText) secondText.classList.add("active");
    textState = 1;
  } else {
    const next = (currentCard + 1) % cardArray.length;
    showCard(next);
  }
}

function lastCard() {
  if (textState === 1) {
    // Von Text 2 zurück zu Text 1
    const currentCardElement = cardArray[currentCard];
    const firstText = currentCardElement.querySelector(".text_container_about.first");
    const secondText = currentCardElement.querySelector(".text_container_about.second");

    if (secondText) secondText.classList.remove("active");
    if (firstText) firstText.classList.add("active");
    textState = 0;
  } else {
    // Vorherige Karte anzeigen
    const prev = (currentCard - 1 + cardArray.length) % cardArray.length;
    showCard(prev);
  }
}

document.getElementById("arrow_right").addEventListener("click", nextCard);
document.getElementById("arrow_left").addEventListener("click", lastCard);

// Initial anzeigen
showCard(0);
