const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const fileChooser = document.querySelector('#images');
const preview = document.querySelector('.ad-form__photo');

const onFileChooserChange = () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      preview.style.backgroundSize = 'cover';
      preview.style.backgroundImage = `url(${reader.result})`;
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

const setDefault = () => {
  preview.style.backgroundSize = '';
  preview.style.backgroundImage = '';
};

export {activate, deactivate, setDefault};
