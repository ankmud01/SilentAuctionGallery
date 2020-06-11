$(document).ready(() => {
  // Getting references to our form and inputs
  const loginForm = $('form.login');
  const emailInput = $('#email-input');
  const passwordInput = $('#password-input');

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
  // When the form is submitted, we validate there's an email and password entered
  loginForm.on('submit', (event) => {
    event.preventDefault();
    const userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
    };
    if (!emailIsValid(userData.email)) {
      if (!userData.email || !userData.password) {
        return;
      }
    }

    // loginUser does a post to our "api/login" route and if successful,
    // redirects us the the members page
    function loginUser(email, password) {
      $.post('/api/login', {
        email,
        password,
      })
        .then(() => {
          window.location.replace('/members'/* '/api/user' */);
          // If there's an error, log the error
        })
        .catch((err) => {
          console.log(err);
        });
    }
    // If we have an email and password we run the loginUser function and clear the form
    loginUser(userData.email, userData.password);
    emailInput.val('');
    passwordInput.val('');
  });
});
