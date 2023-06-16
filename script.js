const app = document.getElementById('app');
const fileUpload = document.getElementById('jsonFileUpload');

fileUpload.addEventListener('change', (e) => {
  const file = e.target.files[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      const data = JSON.parse(event.target.result);
      displayMessages(data);
    };
    reader.readAsText(file);
  }
});

function displayMessages(data) {
  const messages = data.messages;
  app.innerHTML = ''; // Clear any existing messages

  messages.forEach(message => {
    let messageCard = document.createElement('div');
    messageCard.className = 'message';

    let messageHeader = document.createElement('div');
    messageHeader.className = 'message__header';

    let user = document.createElement('span');
    user.className = 'message__user';
    user.textContent = message.user;
    messageHeader.appendChild(user);

    let timestamp = document.createElement('span');
    timestamp.className = 'message__timestamp';
    let date = new Date(parseFloat(message.ts) * 1000);
    timestamp.textContent = `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${("0" + date.getDate()).slice(-2)} ${("0" + date.getHours()).slice(-2)}:${("0" + date.getMinutes()).slice(-2)}`;
    messageHeader.appendChild(timestamp);

    messageCard.appendChild(messageHeader);

    let text = document.createElement('div');
    text.className = 'message__text';
    text.innerHTML = makeLinksClickable(message.text);
    messageCard.appendChild(text);

    app.appendChild(messageCard);
  });
}

function makeLinksClickable(text) {
  const urlRegex = /(https?:\/\/[^\s<>]+)/g;
  return text.replace(urlRegex, url => `<a href="${url}" target="_blank">${url}</a>`);
}

