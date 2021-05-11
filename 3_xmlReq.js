const dataOutput = document.querySelector('.output');
const btn = document.querySelector('#load');
const input = document.querySelector('#year');
let url = 'https://my.api.mockaroo.com/revenue_2017-2019.json?key=fd36b440';
const btnHandle = document.querySelector('#handle');

let tableHead = [];
let tableBody = [];
//making object for chart data
function QuickChartDate(arr1, arr2) {
    this.type='bar'; 
    this.data = {
        labels: [...arr1],
        datasets: [{
            label: `Revenue for ${input.value} year`,
            data: [...arr2]
        }]
    }
}

function linkMaker(url, string) {
    let a = document.createElement('A');
    a.setAttribute('href', url);
    a.setAttribute('target', '_blank');
    a.textContent = string;
    return a;
}

function imageMaker(url) {
    let img = document.createElement('IMG');
    img.setAttribute('src', url);
    img.classList.add('chart');
    return img;
}

function tableMaker(arr) {
    let table = document.createElement('TABLE');
    let rows = arr.length;
    let cols = arr[0].length;

    for (let i = 0; i < rows; i++) {
        let tr;
        if (i !== 0) {
            let tbody = table.createTBody();
            tr = tbody.insertRow();
        } else {
            let thead = table.createTHead();
            tr = thead.insertRow();
        }
        for(let j = 0; j < cols; j++) {
            if (i !== 0) {
                let td = tr.insertCell(j);
                td.appendChild(document.createTextNode(`${arr[i][j]}`));
            } else {
                //creating and insert table head elements
                let th = document.createElement('TH');
                th.appendChild(document.createTextNode(`${arr[i][j]}`));
                tr.appendChild(th);
            }
        }   
    }
    
    return table;
}

function requesData(url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url); 
    let data;
    xhr.onload = function() {
        if (xhr.status !== 200) {
            console.log('Status: ' + xhr.status);
        } else {
            data = JSON.parse(xhr.response);
            if (callback) {
                let hundleData = dataHandler(data);
                callback(tableMaker(hundleData), dataOutput);
                let chart = new QuickChartDate(hundleData[0], hundleData[1]);
                let url = `https://quickchart.io/chart?c=${JSON.stringify(chart)}`;
                callback(imageMaker(url), dataOutput);
                callback(linkMaker(url, 'Открыть график в новом окне'), dataOutput);
            }
        }

    };
    xhr.onerror = function() {
        console.log('Error: ' + xhr.status);
    }
    xhr.send();
}

function dataHandler(arrObj) {
    let arrHead = [];
    let arrBody = [];
    //function for deep diving in object properties
    function makeArr (element) {
        for (const key in element) {
            if (element.hasOwnProperty(key)) {
                if (typeof element[key] !== 'object') {
                arrHead.push(key);
                arrBody.push(element[key]);           
                } else makeArr(element[key]);  
            }    
        }
        
    }

    arrObj.forEach((element) => {
        if (element.year === +input.value) {
            makeArr(element);
        }
    });
    arrHead.shift();
    arrBody.shift();
    return [arrHead, arrBody];
}  

function display(content, placeToInject) {
    // placeToInject.textContent = '';
    placeToInject.appendChild(content);
}
   
btn.addEventListener('click', () => {
    dataOutput.textContent = '';
    requesData(url, display);
});