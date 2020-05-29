// eslint-disable-next-line no-undef
ClassicEditor
  .create(document.querySelector('#introduction')) // eslint-disable-line no-undef
  .then((editor) => {
    editor.editing.view.change((writer) => {
      writer.setStyle('height', '300px', editor.editing.view.document.getRoot());
    });
  })
  .catch((error) => {
    console.error(error);
  });


function logIn() { // eslint-disable-line no-unused-vars
  const email = document.getElementById('signInEmail').value; // eslint-disable-line no-undef
  const password = document.getElementById('signInPassword').value; // eslint-disable-line no-undef
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
        window.location.href = '/'; // eslint-disable-line no-undef
      }
    });
}
