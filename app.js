const slider = document.querySelector(".slider");
const imgContainer = document.querySelectorAll(".img-cont");
const btnLeft = document.querySelector(".btn-left");
const btnRight = document.querySelector(".btn-right");
const dotsContainer = document.querySelector(".dots");

let curSlide = 0;
const maxSlide = imgContainer.length;

const ImgSlider = function () {
  // Creating the dots
  const creatingDots = function () {
    imgContainer.forEach((_, i) => {
      dotsContainer.insertAdjacentHTML(
        "beforeend",
        `<div class="dot" data-slide="${i}"></div>`
      );
    });
  };

  //Active Dot
  const activeDot = function (slide) {
    document
      .querySelectorAll(".dot")
      .forEach((dot) => dot.classList.remove("active"));
    document
      .querySelector(`.dot[data-slide="${slide}"]`)
      .classList.add("active");
  };

  const goToSlide = function (slide) {
    imgContainer.forEach((img, i) => {
      img.style.transform = `translate(${100 * (i - slide)}%)`;
    });
  };

  // Initial Function
  const init = function () {
    creatingDots();
    activeDot(0);
    goToSlide(0);
  };

  init();

  const moveRight = function () {
    curSlide === maxSlide - 1 ? (curSlide = 0) : curSlide++;
    goToSlide(curSlide);
    activeDot(curSlide);
  };

  const moveLeft = function () {
    curSlide === 0 ? (curSlide = maxSlide - 1) : curSlide--;
    goToSlide(curSlide);
    activeDot(curSlide);
  };

  //Event Delegation of dots
  const activateDots = function (e) {
    if (e.target.classList.contains("dot")) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activeDot(slide);
    }
  };

  const arrowFunction = function (e) {
    e.key === "ArrowRight" && moveRight();
    e.key === "ArrowLeft" && moveLeft();
  };

  document.addEventListener("keydown", arrowFunction);
  btnRight.addEventListener("click", moveRight);
  btnLeft.addEventListener("click", moveLeft);
  dotsContainer.addEventListener("click", activateDots);
};

ImgSlider();
