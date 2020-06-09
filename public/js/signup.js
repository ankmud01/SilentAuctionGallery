$(document).ready(() => {
  // Getting references to our form and input
  const signUpForm = $('form.signup');
  const firstnameInput = $('#firstname-input');
  const lastnameInput = $('#lastname-input');
  const emailInput = $('#email-input');
  const phoneInput = $('#phone-input');
  const passwordInput = $('#password-input');
  const addressInput = $('#address-input');
  const address2Input = $('#address2-input');
  const cityInput = $('#city-input');
  const stateInput = $('#state-input');
  const zipcodeInput = $('#zipcode-input');
  const schoolInput = $('#school-input');

  function handleLoginErr(err) {
    $('#alert .msg').text(err.responseJSON);
    $('#alert').fadeIn(500);
  }
  // Validate Email is reasonable format
  function emailIsValid(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
  $('select[required]').css({
    display: 'inline',
    height: 0,
    padding: 0,
    width: 0,
  });

  // validate if phone number is numbers
  function validatePhone(phoneNumber) {
    const phoneNumberPattern = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
    return phoneNumberPattern.test(phoneNumber);
  }

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(firstname, lastname, email, phonenumber, password,
    address, address2, city, state, zipcode, school) {
    $.post('/api/signup', {
      firstname,
      lastname,
      email,
      password,
      phonenumber,
      address,
      address2,
      city,
      state,
      zipcode,
      school,
    })
      .then((data) => {
        console.log(data);
        window.location.replace('/members');
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on('submit', (event) => {
    event.preventDefault();
    const userData = {
      firstname: firstnameInput.val().trim(),
      lastname: lastnameInput.val().trim(),
      email: emailInput.val().trim(),
      phonenumber: phoneInput.val().trim(),
      password: passwordInput.val().trim(),
      address: addressInput.val().trim(),
      address2: address2Input.val().trim(),
      city: cityInput.val().trim(),
      state: stateInput.val().trim(),
      zipcode: zipcodeInput.val().trim(),
      school: schoolInput.val().trim(),
    };

    const errors = [];
    // check all required fields are filled
    if (!userData.firstname || !userData.lastname || !userData.email || !userData.password
      || !userData.phonenumber) {
      errors.push({ msg: 'Please fill in all the required fields' });
    }

    // check password length
    if (userData.password.length < 6) {
      errors.push({ msg: 'Password must be atleast 6 character long' });
    }

    //
    if (errors.length > 0) {
      handleLoginErr();
      return;
    }

    // If we have an email and password, run the signUpUser function
    signUpUser(userData.firstname, userData.lastname, userData.email, userData.phonenumber,
      userData.password, userData.address, userData.address2, userData.city, userData.state,
      userData.zipcode, userData.school);
    firstnameInput.val('');
    // console.log('FirstName:', userData.firstname);
    lastnameInput.val('');
    // console.log('LastName:', userData.lastname);
    emailInput.val('');
    // console.log('Email:', userData.email);
    phoneInput.val('');
    // console.log('PhoneNumber:', userData.phonenumber);
    passwordInput.val('');
    // console.log('Password:', userData.password);
    addressInput.val('');
    // console.log('Address:', userData.address);
    address2Input.val('');
    // console.log('Address2:', userData.address2);
    cityInput.val('');
    // console.log('City:', userData.city);
    stateInput.val('');
    // console.log('State:', userData.state);
    zipcodeInput.val('');
    // console.log('ZipCode:', userData.zipcode);
    schoolInput.val('');
    // console.log('School:', userData.school);
  });
});
