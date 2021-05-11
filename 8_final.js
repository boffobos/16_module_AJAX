const pageInp = document.querySelector('#page');
const limitInp = document.querySelector('#limit');
const btnRequest = document.querySelector('#request');
const outputField = document.querySelector('#output');

function useRequest(url) {
    return fetch(url)
    .then(response => response.json())
    .catch(() => console.log('Fetch error'))
}

function loadImage(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.crossOrigin = 'anonymous';
        img.alt = "";
        img.addEventListener('load', () => resolve(img));
        img.addEventListener('error', () => reject(new Error("Image can't be loaded")));
    });
}

function makeCanvas(img) {
    const canvas = document.createElement('CANVAS');
    const scale = Math.min(canvas.width / img.width, canvas.height / img.height);
    const contex = canvas.getContext('2d');
    contex.drawImage(img, 0, 0, img.width * scale, img.height * scale);
    return canvas
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
        let url;
        //check local stored images and load them
        if(localStorage.getItem(`${item.id}`)) url = `${localStorage.getItem(item.id)}`;
        else url = `${item.download_url}`;

        //load image, make canvas from it and insert it to <a></a> element
        const imgPromis = loadImage(url)
        imgPromis
        .then(function(resolve) {
            let canvas = makeCanvas(resolve);
            a.appendChild(canvas);
            const id = item.id;
            //caching loaded images to localStorage
            if (!localStorage.getItem(id)) localStorage.setItem(`${id}`, canvas.toDataURL());
        })
        .catch(error => {
            console.log(error);
            a.append(error);
        })

        a.href = `${item.download_url}`;
        a.target = '_blank';

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
    if ( (limit > 10 || limit < 1) && (page > 10 || page < 1) ) return outputField.textContent = "Номер страницы и лимит вне диапазона от 1 до 10"
    else if (page > 10 || page < 1) return outputField.textContent = "Номер страницы вне диапазона от 1 до 10"
    else if (limit > 10 || limit < 1) return outputField.textContent = "Лимит вне диапазона от 1 до 10"
    const url = `https://picsum.photos/v2/list?page=${page}&limit=${limit}`;
    const data = await useRequest(url);
    localStorage.clear();
    localStorage.setItem('data', JSON.stringify(data));
    //do ifs
    const list = listMaker(data);
    display(list);
});