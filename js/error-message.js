const showErrorMessage = () => {
  const errorElement = document.createElement('div');
  errorElement.style.position = 'fixed';
  errorElement.style.top = '0';
  errorElement.style.left = '0';
  errorElement.style.right = '0';
  errorElement.style.padding = '20px';
  errorElement.style.backgroundColor = 'red';
  errorElement.style.color = 'white';
  errorElement.style.textAlign = 'center';
  errorElement.style.fontSize = '18px';
  setTimeout(() => errorElement.remove(), 5000);
  errorElement.textContent = 'Не удалось загрузить данные с сервера. Попробуйте позже.';

  document.body.appendChild(errorElement);
};

export { showErrorMessage };
