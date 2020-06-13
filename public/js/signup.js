$(document).ready(() => {
  // Code here handles what happens when a user submits a new account.


  console.log('Signup.js loaded');

  // ADD    ****************
  $('#registerBtn').on('click', (event) => {
    event.preventDefault();

    console.log('Clicked on Signup button.');
    // make a newAccount obj
    const newAccount = {
      first_name: $('#firstname-input').val().trim(),
      last_name: $('#lastname-input').val().trim(),
      address1: $('#address-input').val().trim(),
      address2: $('#address2-input').val().trim(),
      city: $('#city-input').val().trim(),
      state: $('#state-input').val().trim(),
      zip: $('#zipcode-input').val().trim(),
      school: $('#school-input').val().trim(),
      email: $('#email-input').val().trim(),
      phone: $('#phone-input').val().trim(),
      password: $('#password-input').val().trim(),

    };

    if (newAccount.password.length > 0 && newAccount.phone.length > 0
      && newAccount.email.length > 0 && newAccount.zip.length > 0 && newAccount.state.length > 0
      && newAccount.city.length > 0 && newAccount.address1.length > 0
      && newAccount.last_name.length > 0 && newAccount.first_name.length > 0) {
      $.ajax({
        type: 'post',
        url: '/api/signup',
        data: newAccount,
      }).then((data) => {
        console.log(data);
        window.location.replace('/login');
      });
    } else {
      console.log('**Please fill out entire form**');
      $('#create-err-msg').empty('').text('**Please fill out entire form**');
    }
  });
});
