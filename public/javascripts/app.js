/* eslint-env browser */
/* global ClassicEditor */

ClassicEditor
  .create(document.querySelector('#introduction'), {
    removePlugins: ['EasyImage', 'Image', 'ImageCaption', 'ImageToolbar', 'ImageStyle', 'ImageUpload', 'MediaEmbed'],
  })
  .then((editor) => {
    editor.editing.view.change((writer) => {
      writer.setStyle('height', '300px', editor.editing.view.document.getRoot());
    });
  })
  .catch((error) => {
    console.error(error);
  });

function logIn() {
  const email = document.getElementById('signInEmail').value;
  const password = document.getElementById('signInPassword').value;
  fetch('auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => response.text())
    .then((data) => {
      if (data !== 'confirmed') {
        document.getElementById('error').classList.remove('d-none');
        document.getElementById('error').innerHTML = data;
      } else {
        window.location.href = '/';
      }
    });
}

function deleteImage() {
  fetch('profile/edit/deleteImage', {
    method: 'DELETE',
  })
    .then((response) => response.text())
    .then((data) => {
      if (data === 'OK') {
        window.location.reload();
      } else {
        document.getElementById('error').classList.remove('d-none');
        document.getElementById('error').innerHTML = data;
      }
    });
}

document.getElementById('login-button').addEventListener('click', logIn);
document.getElementById('delete-image-button').addEventListener('click', deleteImage);
