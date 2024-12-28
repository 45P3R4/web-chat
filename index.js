const url = 'https://dummyjson.com/comments/';
let body = document.getElementById("container");
let number = 1;

let username = '';
username = prompt('username: ', username);


const messageB = document.getElementById('sendButton');
const messageI = document.getElementById('messageText');
messageB.onclick = sendMessage;

function sendMessage() {
    const newMessage = document.createElement("div");
        const newAuthor = document.createElement("div");
        const newText = document.createElement("div");
        const newTime = document.createElement("div");

        newMessage.setAttribute('class', 'message');
        newAuthor.setAttribute('class', 'message__author');
        newAuthor.setAttribute('class', 'me');
        newText.setAttribute('class', 'message__text');
        newTime.setAttribute('class', 'message__time');

        let date = new Date();

        newTime.textContent = '[' +
        (date.getHours() > 9 ? date.getHours() : '0' + date.getHours())  + 
        ':' + 
        (date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes()) +
        ']';
        
        newAuthor.textContent = username + ':';
        newText.textContent = messageI.value;
        messageI.value = null;

        newMessage.appendChild(newTime);
        newMessage.appendChild(newAuthor);
        newMessage.appendChild(newText);
        body.appendChild(newMessage);
}

setInterval(() => {
    getMessage(number);
    number++;
}, 1000);

async function getMessage(number) {
    let response = fetch(url + number)
    .then(response => response.json())
    .then(responseJson => {
        // console.log(responseJson);
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
        
        newAuthor.textContent = responseJson.user.username + ':';
        newText.textContent = responseJson.body;

        newMessage.appendChild(newTime);
        newMessage.appendChild(newAuthor);
        newMessage.appendChild(newText);
        body.appendChild(newMessage);

        if(window.scrollY + window.innerHeight > document.body.scrollHeight - 200)
            newMessage.scrollIntoView({behavior: "smooth"});
    })
}