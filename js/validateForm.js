// Инициализация Pristine после того, как DOM загружен
const formElement   = document.querySelector('.img-upload__form');
const hashtagsInput = formElement.querySelector('.text__hashtags');
const commentInput  = formElement.querySelector('.text__description');

// Создаём экземпляр Pristine
const pristine = new Pristine(formElement, {
  classTo:         'img-upload__text',
  errorTextParent: 'img-upload__text',
  errorTextClass:  'img-upload__error'
});

// Валидатор для хэш-тегов
pristine.addValidator(
  hashtagsInput,
  (value) => {
    const tags     = value.trim().toLowerCase().split(/\s+/).filter(Boolean);
    const MAX_COUNT = 5;
    const pattern = /^#[a-z0-9\u0400-\u04FF]{1,19}$/i;

    if (tags.length > MAX_COUNT) {
      return false;
    }
    if (new Set(tags).size !== tags.length) {
      return false;
    }
    return tags.every((tag) => pattern.test(tag));
  },
  'Нельзя более 5 хэш-тегов, без повторов, каждый формат: #тег (буквы/цифры), не длиннее 20 символов'
);

// Валидатор для комментария
pristine.addValidator(
  commentInput,
  (value) => value.length <= 140,
  'Комментарий не может быть длиннее 140 символов'
);

// Функция проверки формы при сабмите
const validateForm = () => pristine.validate();

// Сброс ошибок Pristine (вызывается при закрытии формы)
const resetValidation = () => pristine.reset();

export { validateForm, resetValidation };
