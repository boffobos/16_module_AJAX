const xmlString = `
<list>
<student>
  <name lang="en">
    <first>Ivan</first>
    <second>Ivanov</second>
  </name>
  <age>35</age>
  <prof>teacher</prof>
</student>
<student>
  <name lang="ru">
    <first>Петр</first>
    <second>Петров</second>
  </name>
  <age>58</age>
  <prof>driver</prof>
</student>
</list>`;

const xmlString1 = `
<list>
<student>
  <name lang="en">
    <first>Sidor</first>
    <second>Sidorov</second>
  </name>
  <age>31</age>
  <prof>manager</prof>
</student>
<student>
  <name lang="de">
    <first>Wolf</first>
    <second>Sternov</second>
  </name>
  <age>41</age>
  <prof>engineer</prof>
</student>
</list>`;


const parse = new DOMParser;
const xmlDOM = parse.parseFromString(xmlString, 'text/xml');
const xmlDOM2 = parse.parseFromString(xmlString1, 'text/xml');

const students = {};

function element(name) {

}

function addStudentsToList(DOM, listObj) {
    const nodeName = DOM.firstElementChild.nodeName;
    //get count of elements in xml
    const length = DOM.querySelector(`${nodeName}`).childElementCount;  
    if (!listObj[nodeName]) listObj[nodeName] = [];
    console.log(length); 
    for (i = 0; i < length; i++) {
        let stud = DOM.querySelectorAll('student').item(i);
        let firstName = stud.querySelector('first').textContent;
        let secondName = stud.querySelector('second').textContent;
        let age = stud.querySelector('age').textContent;
        let occupacion = stud.querySelector('prof').textContent;
        let lang = stud.querySelector('name').getAttribute('lang');
        let obj = {};
        obj["name"] = `${firstName} ${secondName}`;
        obj["age"] = +age;
        obj["prof"] = occupacion;
        obj["lang"] = lang;
        listObj[nodeName].push(obj);
    }
}

addStudentsToList(xmlDOM, students);
addStudentsToList(xmlDOM2, students);
console.log(students);
