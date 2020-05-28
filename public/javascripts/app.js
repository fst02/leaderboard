// eslint-disable-next-line no-undef
ClassicEditor
  .create(document.querySelector('#introduction')) // eslint-disable-line no-undef
  .then((editor) => {
    editor.editing.view.change((writer) => {
      writer.setStyle('height', '500px', editor.editing.view.document.getRoot());
    });
  })
  .catch((error) => {
    console.error(error);
  });


function logIn() { // eslint-disable-line no-unused-vars
  const email = document.getElementById('email').value; // eslint-disable-line no-undef
  const password = document.getElementById('password').value; // eslint-disable-line no-undef
  fetch('auth/login', { // eslint-disable-line no-undef
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => response.text())
    .then((data) => {
      if (data !== 'confirmed') {
        document.getElementById('error').classList.remove('d-none'); // eslint-disable-line no-undef
        document.getElementById('error').innerHTML = data; // eslint-disable-line no-undef
      } else {
        location.reload(); // eslint-disable-line no-undef, no-restricted-globals
      }
    });
}
