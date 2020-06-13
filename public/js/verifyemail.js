let to = '';
const subject = 'Silent Auction Verification Email';
$(document).ready(() => {
  // let text;
  $('#send_email').click((event) => {
    event.preventDefault();
    to = $('#emailid').val();
    if (to === '') {
      $('#message').text('You must type in an Email to verify.');
    } else {
      $('#message').text('Sending E-mail...Please wait');
      // eslint-disable-next-line object-shorthand
      $.get('/send', { to: to, subject: subject }, (data) => {
        if (data === 'sent') {
          // eslint-disable-next-line prefer-template
          $('#message').empty().html('Email has been sent to ' + to + ' . Please check your inbox!');
        } else {
          // eslint-disable-next-line prefer-template
          $('message').empty().html('Something happened - Unable to send email to ' + to + '. Please check the email address you entered.');
        }
      });
    }
  });
});
