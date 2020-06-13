/* eslint-disable no-unused-vars */
$(document).ready(() => {
  // <h2>Welcome, {{userInfo.first_name}} {{userInfo.last_name}}</h2>
  // <p> First Name: {{userInfo.first_name}}</p>
  // <p> Last Name: {{userInfo.last_name}}</p>
  // <p> Email-Id: {{userInfo.email}}</p>
  // <p> Phone Number: {{userInfo.phone}}</p>
  // <p> Address1: {{userInfo.address}}</p>
  // <p> Address2: {{userInfo.address2}}</p>
  // <p> City: {{userInfo.city}}</p>
  // <p> State: {{userInfo.state}}</p>
  // <p> Zip Code: {{userInfo.zip}}</p>
  // <p> School: {{userInfo.school}}</p>
  // <p> Role: {{userInfo.role_id}}</p>

  // Delete Account
  $('#deleteButton').on('click', (event) => {
    event.preventDefault();
    // $('#err-msg').empty('');
    // $('#delete-account-modal').open();
    // });

    // $('#confirm-delete').on('click', (event) => {
    const deleteAccount = {
      account_id: $('#account_id').val().trim(),
      password: $('#password-input').val().trim(),
    };
    console.log(deleteAccount);
    if (deleteAccount.account_id.length > 0 && deleteAccount.password.length > 0) {
      $.ajax(`/accounts/${deleteAccount.account_id}/${deleteAccount.password}`, {
        type: 'DELETE',
      }).then(
        () => {
          console.log('deleted account', deleteAccount.account_id);
          // Reload the page to get the updated list
          location.reload();
        },

      );
    } else {
      console.log('fill out entire form');
      $('#err-msg').empty('').text('fill out entire form');
    }
  });

  // UPDATE ACCOUNT
  $('#updateButton').on('click', (event) => {
    event.preventDefault();

    // capture All changes
    const changeAccount = {
      account_id: $('#account_id').val().trim(),
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
    $('#err-msg').empty('');
    // $("#change-account-modal").modal("show");
    console.log(changeAccount);


    if (changeAccount.password.length > 0 && changeAccount.phone.length > 0
      && changeAccount.email.length > 0 && changeAccount.zip.length > 0
      && changeAccount.state.length > 0 && changeAccount.city.length > 0
      && changeAccount.address1.length > 0 && changeAccount.last_name.length > 0
      && changeAccount.first_name.length > 0) {
      $.ajax({
        type: 'PUT',
        url: `/accounts/${changeAccount.account_id}/${changeAccount.password}`,
        data: changeAccount,
      }).then(
        () => {
          console.log('Updated account', changeAccount);
          // Reload the page to get the updated list
          location.reload();
        },
      );
    } else {
      console.log('**Please fill out entire form**');
      $('#update-err-msg').empty('').text('**Please fill out entire form**');
    }
  });
});
