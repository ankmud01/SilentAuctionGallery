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

// $('.dropdown-trigger').dropdown();
// document.addEventListener('DOMContentLoaded', () => {
//   const elems = document.querySelectorAll('.dropdown-trigger');
//   const options = {
//     constrainWidth: false,
//     coverTrigger: false,
//   };
//   const instances = M.Dropdown.init(elems, options);
// });
