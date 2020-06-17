// ----------------------------------------Cosmetic Jquery JS
const backgroundCard = $('.cardOpacityBackground');
const frontCard = $('.frontCard');
const frontCardHeight = frontCard.css('height');

const backCharity = $('.footerCharityOpacity');
const frontCharity = $('.footerFront');
const frontCharityHeight = frontCharity.css('height');

backgroundCard.css('height', frontCardHeight);
// leftArrow.css("height", frontCardHeight);
// rightArrow.css("height", frontCardHeight);
backCharity.css('height', frontCharityHeight);
// ----------------------------------------Cosmetic Jquery JS

// ---------------------------------------- Courasel Slider
var slideIndex = [1,1,1];
/* Class the members of each slideshow group with different CSS classes */
var slideId = ["mySlides1", "mySlides2", "mySlides3"]
showSlides(1, 0);
showSlides(1, 1);

function plusSlides(n, no) {
  showSlides(slideIndex[no] += n, no);
}

function showSlides(n, no) {
  var i;
  var x = document.getElementsByClassName(slideId[no]);
  if (n > x.length) {slideIndex[no] = 1}
  if (n < 1) {slideIndex[no] = x.length}
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  x[slideIndex[no]-1].style.display = "block";
}
// ---------------------------------------- Courasel Slider
