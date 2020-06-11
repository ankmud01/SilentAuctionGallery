$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get('/api/user_data').then((data) => {
    $('.member-name').text(data.fullName);
    $('.first-name').text(data.firstName);
    $('.last-name').text(data.lastName);
    $('.emailid').text(data.email);
    $('.phone').text(data.phone);
    $('.add1').text(data.address1);
    $('.add2').text(data.address2);
    $('.city').text(data.city);
    $('.state').text(data.state);
    $('.zipcode').text(data.zipcode);
    $('.school').text(data.school);
  });
});
