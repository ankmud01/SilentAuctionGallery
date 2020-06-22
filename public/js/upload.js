$(document).ready(() => {
  const fileUpload = res.status;
  console.log('fileUpload: ', fileUpload);
  if (fileUpload === '') {
    console.log('Nothing Uploaded yet!');
    $('#art-upload').text('');
  } else {
    console.log('File is uploaded!');
    $('#art-upload').text('File uploaded! Thanks! Ready for another.');
  }
});
