/* eslint-disable */


const getData = () => {
  return fetch('https://25.javascript.htmlacademy.pro/kekstagram/data')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Не удалось загрузить данные');
      }
      return response.json();
    })
    .then((data) => data)
    .catch((error) => {
      // Можно здесь отправить ошибку на сервер или залогировать
      console.error(error);
      throw error; // Пробрасываем ошибку дальше
    });
};

const sendData = (body) => {
  return fetch('https://25.javascript.htmlacademy.pro/kekstagram', {
    method: 'POST',
    body,
  });
};

export { getData, sendData };
