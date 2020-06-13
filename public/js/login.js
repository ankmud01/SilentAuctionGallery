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
    if (emailIsValid(userData.email)) {
      try {
        $.ajax({
          type: 'post',
          url: '/api/login',
          data: userData,
        }).then((res) => {
          // console.log(res);
          if (res.id !== undefined) {
            window.location.replace('/dashboard');
          } else {
            $('#err-msg').empty('').text('** INVALID Username and Password**');
            console.log(`Invalid Username and password ~~~~~~${res.info}`);
          }
        });
      } catch (err) {
        console.log(`Invalid Username and password ~~~~~~${err}`);
      }
    } else {
      console.log('**Please enter a valid username and password**');
      $('#create-err-msg').empty('').text('**Please enter a valid username and password**');
    }
  });
});
