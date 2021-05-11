const pageInp = document.querySelector('#page');
const limitInp = document.querySelector('#limit');
const btnRequest = document.querySelector('#request');
const outputField = document.querySelector('#output');

function useRequest(url) {
    return fetch(url)
    .then(response => response.json())
    .catch(() => console.log('Fetch error'))
}

function listMaker(valueArr) {
    const list = document.createElement('UL');
    list.style.textAlign = 'left';
    list.style.listStyle = 'none';
    valueArr.forEach(item => {
        const li = document.createElement('LI');
        const span = document.createElement('SPAN');
        const a = document.createElement('A');
        const img = document.createElement('IMG');

        img.src = `${item.download_url}`;
        img.style.height = '200px';
        img.style.width = 'auto';

        a.href = `${item.download_url}`;
        a.target = '_blank';
        a.appendChild(img);

        span.textContent = `${item.author}`;

        li.appendChild(span);
        li.appendChild(a);
        list.appendChild(li);
    });
    return list;    
}

function display(node) {
    outputField.textContent = '';
    outputField.appendChild(node);
}

document.body.onload = function() {
    console.log('Документ загружен');
    let data = JSON.parse(localStorage.getItem('data'));
    if (data) {
       display(listMaker(data));
    }    
};

btnRequest.addEventListener('click', async() =>{
    const page = pageInp.value;
    const limit = limitInp.value;
    const url = `https://picsum.photos/v2/list?page=${page}&limit=${limit}`;
    const data = await useRequest(url);
    //do ifs
    localStorage.clear();
    localStorage.setItem('data', JSON.stringify(data))
    const list = listMaker(data);
    display(list);
});