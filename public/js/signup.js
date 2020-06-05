$(document).ready(() => {
  // Getting references to our form and input
  const signUpForm = $('form.signup');
  const firstnameInput = $('input#firstname-input');
  const middlenameInput = $('input#middlename-input');
  const lastnameInput = $('input#lastname-input');
  const emailInput = $('input#email-input');
  const passwordInput = $('input#password-input');

  function handleLoginErr(err) {
    $('#alert .msg').text(err.responseJSON);
    $('#alert').fadeIn(500);
  }

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(firstname, middlename, lastname, email, password) {
    $.post('/api/signup', {
      firstname,
      middlename,
      lastname,
      email,
      password,
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
      middlename: middlenameInput.val().trim(),
      lastname: lastnameInput.val().trim(),
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
    };

    if (!userData.firstname || !userData.middlename || !userData.lastname || !userData.email
      || !userData.password) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.firstname, userData.middlename, userData.lastname, userData.email,
      userData.password);
    firstnameInput.val('');
    console.log('SignUpUser:', userData.firstname);
    middlenameInput.val('');
    console.log('SignUpUser:', userData.middlename);
    lastnameInput.val('');
    console.log('SignUpUser:', userData.lastname);
    emailInput.val('');
    console.log('SignUpUser:', userData.email);
    passwordInput.val('');
    console.log('SignUpUser:', userData.password);
  });
});
