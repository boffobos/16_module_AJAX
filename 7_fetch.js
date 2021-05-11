const btnRequest = document.querySelector('#request');
const userIdInput = document.querySelector('#userId');
const outputField = document.querySelector('#output');

function useFetch(url) {
    return fetch(url)
        .then((response) => {return response.json();})
        .then((json) => {
            return json;
        })
        .catch(() => {
            console.log('Error');
        })
}

function listMaker(valueArr) {
    const list = document.createElement('UL');
    list.style.textAlign = 'left';
    list.style.listStyle = 'none';
    valueArr.forEach(item => {
        let li = document.createElement('LI');
        let checkBox = document.createElement('INPUT');
        checkBox.type = 'checkbox';
        li.appendChild(checkBox);
        li.insertAdjacentHTML('beforeend', `<span>${item.title}</span>`);
        if (item.completed) checkBox.checked = true;
        list.appendChild(li);
    });
    return list;    
}

function getUserName(valueArr, userId) {
    let userName;
    valueArr.forEach(item => {
        if (item.id === +userId) userName = item.username;
    });
    return userName;
}

btnRequest.addEventListener('click', async() => {
    const userId = userIdInput.value;
    if (!userId) {
        return alert(`Введите номер пользователя`);
    }
    let userName = getUserName( await useFetch(`https://jsonplaceholder.typicode.com/users/`), userId);

    let url = `https://jsonplaceholder.typicode.com/users/${userId}/todos`;
    let response = await useFetch(url);
    if (!response[0]) return alert('Пользователь не найден');
    const list = listMaker(response);
    outputField.textContent = '';
    outputField.insertAdjacentHTML('afterbegin', `Список дел ${userName}: `);
    outputField.appendChild(list);
});