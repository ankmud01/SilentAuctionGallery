let to;

const subject = 'Silent Auction Verification Email';
$(document).ready(() => {
  // URL parser for jQuery
  function GetURLParameter(sParam) {
    const sPageURL = window.location.search.substring(1);
    const sURLVariables = sPageURL.split('&');
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < sURLVariables.length; i++) {
      const sParameterName = sURLVariables[i].split('=');
      // eslint-disable-next-line eqeqeq
      if (sParameterName[0] == sParam) {
        return sParameterName[1];
      }
    }
  }

  // Section to send Verification Email
  // eslint-disable-next-line consistent-return
  async function sendAnEmail(data) {
    let result;
    try {
      result = await $.post('/send', data, (req, res) => {
        console.log('Return from /send route', res);
        if (res === 'success') {
          // need to make this wait for the response<-----Look here Dean.
          console.log('Email was sent to: ', to);
          $('#emailmsg')
            .empty()
            .html(`Email has been sent to ${to}. Please check your inbox!`);
        } else {
          // eslint-disable-next-line prefer-template
          $('#emailmsg')
            .empty()
            .html(
              `Something happened - Unable to send email to ${to}. Please check the email address you entered.`,
            );
        }
      });

      return result;
    } catch (error) {
      console.error(error);
    }
  }

  $(() => {
    $('#emailinput').change(() => {
      // event.preventDefault();
      if ($('#emailinput').val() === '') {
        $('.enableOnInput').prop('disabled', true);
        $('#emailmsg').text('You must type in an Email to verify.');
      } else {
        $('.enableOnInput').prop('disabled', false);
        $('#validateEmailButton').click((event) => {
          event.preventDefault();
          to = $('#emailinput').val();
          console.log('<-------verfy email button clicked-------->', to);
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
      }
    });
  });


  $('#verifyTokenBtn').click((event) => {
    event.preventDefault();
    console.log('testing');
    const hbtoken = GetURLParameter('id');
    console.log(GetURLParameter('id'));
    const token = { secretToken: $('#secretToken').val() };
    if (!hbtoken) {
      window.location.href = '/signup';
    } else {
      $('#token')
        .empty()
        .html(hbtoken);
      // eslint-disable-next-line no-unused-vars
      $.post('/verify', token, (req, res) => {
        console.log('<-------verfy email button clicked-------->');
        $('.modal').modal();
        // eslint-disable-next-line no-shadow
        $('#confirm-token').click((event) => {
          event.preventDefault();
          window.location.href = '/dashboard';
          return false;
        });
      });
    }
  });
});
