const url = 'http://localhost:5000';
let body = document.getElementById("container");

if(localStorage.getItem('username') == null) {
    let username = 'default';
    username = prompt('username: ', username);
    localStorage.setItem('username', username);
}

const messageB = document.getElementById('sendButton');
const messageI = document.getElementById('messageText');
messageB.onclick = sendMessage;

getMessage(0);

function sendMessage() {
    let message = createDOMMessage(localStorage.getItem('username'), messageI.value);
    message.children[1].setAttribute('class', 'message__author me');
    body.appendChild(message);
    messageI.value = '';
    message.scrollIntoView({behavior: "smooth"});
}

async function getMessage(number) {
    fetch(url)
    .then(response => response.json())
    .then(data => {
        let message = createDOMMessage(data[0].author, data[0].message)
        body.appendChild(message);
        scrollIfNeedToMessage(message)
    })
}

function createDOMMessage(name, text) {
    const newMessage = document.createElement("div");
    const newAuthor = document.createElement("div");
    const newText = document.createElement("div");
    const newTime = document.createElement("div");

    newMessage.setAttribute('class', 'message');
    newAuthor.setAttribute('class', 'message__author');
    newText.setAttribute('class', 'message__text');
    newTime.setAttribute('class', 'message__time');

    let date = new Date();

    newTime.textContent = '[' +
    (date.getHours() > 9 ? date.getHours() : '0' + date.getHours())  + 
    ':' + 
    (date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes()) +
    ']';
        
    newAuthor.textContent = name + ':';
    newText.textContent = text;

    newMessage.appendChild(newTime);
    newMessage.appendChild(newAuthor);
    newMessage.appendChild(newText);

    return newMessage;
}

function scrollIfNeedToMessage(message) {
    if(window.scrollY + window.innerHeight > document.body.scrollHeight - 100)
        message.scrollIntoView({behavior: "smooth"});
}