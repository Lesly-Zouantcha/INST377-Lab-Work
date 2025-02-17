
let slidePosition = 0;
const slides = document.querySelectorAll('.carousel_item');
const totalSlides = slides.length;

document.querySelector('#next-button')
.addEventListener("click", function() {
    moveToNextSlide();
});

document.querySelector('#previous-button').addEventListener("click", function() {moveToPrevSlide();});

function updateSlidePosition() {
    for (let slide of slides) {
        slide.classList.remove('carousel_item--visible');
        slide.classList.add('carousel_item--hidden');
    }

    slides[slidePosition].classList.add('carousel_item--visible');
}

function moveToNextSlide() {
    if (slidePosition === totalSlides - 1){
        slidePosition = 0;
    } else {
        slidePosition++;
    }
    updateSlidePosition();
}

function moveToPrevSlide() {
    if (slidePosition === 0){
        slidePosition = totalSlides - 1;
    } else {
        slidePosition--;
    }
    updateSlidePosition();
}