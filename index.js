const url = 'https://dummyjson.com/comments/';
let body = document.getElementById("container");

if(localStorage.getItem('username') == null) {
    let username = 'default';
    username = prompt('username: ', username);
    localStorage.setItem('username', username);
}

const messageB = document.getElementById('sendButton');
const messageI = document.getElementById('messageText');
messageB.onclick = sendMessage;

let number = 1;
setInterval(() => {
    getMessage(number);
    number++;
}, 1000);


const themes = [];
themes.push('lavender', 'sand', 'pink', 'green', 'old-pc');
if(localStorage.getItem('theme') == null)
    document.firstElementChild.setAttribute("data-theme", themes[0]);
else
    document.firstElementChild.setAttribute("data-theme", themes[localStorage.getItem('theme')]);

let currentTheme = 0;
const themeB = document.getElementById('themeButton');
themeB.onclick = changeTheme;

function changeTheme() {
    currentTheme = currentTheme < themes.length-1 ? ++currentTheme : 0;
    document.firstElementChild.setAttribute("data-theme", themes[currentTheme]);
    localStorage.setItem('theme', currentTheme);
}


function sendMessage() {
    let message = createMessage(localStorage.getItem('username'), messageI.value);
    message.children[1].setAttribute('class', 'message__author me');
    body.appendChild(message);
    messageI.value = '';
    message.scrollIntoView({behavior: "smooth"});
}

async function getMessage(number) {
    let response = fetch(url + number)
    .then(response => response.json())
    .then(responseJson => {
        let message = createMessage(responseJson.user.username, responseJson.body)
        body.appendChild(message);
        scrollIfNeedToMessage(message)
    })
}

function createMessage(name, text) {
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