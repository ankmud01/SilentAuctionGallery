let to = '';
const subject = 'Silent Auction Verification Email';
$(document).ready(() => {
  // let text;
  $('#validateEmailButton').click((event) => {
    event.preventDefault();
    to = $('#email-input').val();
    console.log('<-------verfy email button clicked-------->');
    if (to === '') {
      console.log('No Email to send!');
      $('#emailmsg').text('You must type in an Email to verify.');
    } else {
      console.log('Sending email to: ', to);
      $('#emailmsg').text('Sending E-mail...Please wait');
      const data = {
        to,
        subject,
      };
      // eslint-disable-next-line object-shorthand
      console.log('to: ', to, 'subject:', subject);
      $.post('/send', data, (req, res) => {
        console.log('Return from /send route', req);
        if (req === 'sent') {
          console.log('Email was sent to: ', to);
          // eslint-disable-next-line prefer-template
          $('#emailmsg').empty().html(`Email has been sent to ${to}. Please check your inbox!`);
        } else {
          // eslint-disable-next-line prefer-template
          $('#emailmsg').empty().html(`Something happened - Unable to send email to ${to}. Please check the email address you entered.`);
        }
      });
    }
  });
});
