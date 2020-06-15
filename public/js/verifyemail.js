let to = '';
let goto = '';
const subject = 'Silent Auction Verification Email';
$(document).ready(() => {
  async function sendAnEmail(data) {
    let result;

    try {
      result = await $.post('/send', data, (req, res) => {
        console.log('Return from /send route', res);
        if (res === 'success') { // need to make this wait for the response<-----Look here Dean.
          console.log('Email was sent to: ', to);
          $('#emailmsg').empty().html(`Email has been sent to ${to}. Please check your inbox!`);
        } else {
          // eslint-disable-next-line prefer-template
          $('#emailmsg').empty().html(`Something happened - Unable to send email to ${to}. Please check the email address you entered.`);
        }
      });

      return result;
    } catch (error) {
      console.error(error);
    }
  }

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
      sendAnEmail(data);

    }
  });

  $('#verifyToken').click((event) => {
    event.preventDefault();
    const token = { secretToken: $('#secretToken').val() };
    $.post('/verify', token, (req, res) => {
      $('.modal').modal().val();
      console.log('The value of goto: ', token);
    // if (goto === )
    });
  });
});
