//old task from module 6.
let modal = document.querySelector('#login-form');
document.querySelector('#open').onclick=function() {
  modal.showModal();
}

document.querySelector('#btnClose').onclick=function() {
  modal.close();
}

//task 5 module 16

const popup = document.querySelector('#popup');
const message = document.querySelector('#message');
const btnOk = document.querySelector('#btnOk');
const btns = document.querySelector('#buttons');

function createEl(el, id) {
    //let el = elem.toUpperCase();
    let element = document.createElement(el);
    if (el.toUpperCase() === 'INPUT') element.type = 'text';
    if (el.toUpperCase() === 'BUTTON') element.classList.add('btn');
    element.id = id;
    return element;
}

function switchMessage(whatToDo) {
    if (whatToDo === 'close') popup.close();
    if (whatToDo === 'open') popup.showModal();
}

document.body.onload = function() {
    let isUser = localStorage.getItem('isUser');
    if(!isUser) {
        //creating popup window with name input and show it to user
        let name = null;
        message.textContent = "Добро пожаловать! Как Вас зовут?";
        let nameInput = createEl('input', 'name');
        popup.insertBefore(nameInput, btns);
        let btnCancel = createEl('button', 'cancel');
        btnCancel.textContent = 'Закрыть';
        btns.appendChild(btnCancel);
        switchMessage('open');
        
        btnCancel.addEventListener('click', () => {
            switchMessage('close');
        });
        //Handling entered value when Ok! will be pressed
        btnOk.addEventListener('click', function() {
            if(nameInput.value.length >= 2) {
                name = nameInput.value;
                switchMessage('close');
            } else message.textContent = 'Введите Ваше имя, пожалуйста!';
            if(name) { 
                isUser = true;
                let user = {};
                user.name = name;
                user.time = Date.now();
                localStorage.setItem('isUser', isUser);
                localStorage.setItem('user', JSON.stringify(user));
                }
        });
        
    } else {
        let user = JSON.parse(localStorage.getItem('user'));
        dateOptions = {
            dateStyle: 'short',
            timeStyle: 'short',
        }
        date = new Date(user.time).toLocaleString('ru', dateOptions);
        user.time = Date.now();
        message.textContent = `Добрый день, ${user.name}! Давно не виделись. В последний раз Вы у нас были ${date}`
        switchMessage('open');
        btnOk.addEventListener('click', () => {switchMessage('close')});
        setTimeout( () => {switchMessage('close')}, 5000);
        localStorage.setItem('user', JSON.stringify(user));
    }
};