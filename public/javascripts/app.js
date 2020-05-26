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
