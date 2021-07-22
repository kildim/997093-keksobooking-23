const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const DEFAULT_IMG_SRC = 'img/muffin-grey.svg';

const fileChooser = document.querySelector('#avatar');
const preview = document.querySelector('.ad-form-header__preview img');

const onFileChooserChange = () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      preview.src = reader.result;
    });

    reader.readAsDataURL(file);
  }
};

const activate = () => {
  fileChooser.addEventListener('change', onFileChooserChange);
};

const deactivate = () => {
  fileChooser.removeEventListener('change', onFileChooserChange);
};

const setDefault = () => {preview.src = DEFAULT_IMG_SRC;};

export {activate, deactivate, setDefault};
