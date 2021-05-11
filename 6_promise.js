const myPromise = new Promise ((resolve, reject) => {
    setTimeout(() => {
        let number = Math.ceil(Math.random()*100);
        if (number%2 === 0) resolve(`Завершено успешно. Сгенерировано число - ${number}`);
        else reject(`Завершено с ошибкой. Сгенерировано число - ${number}`);
    }, 3000);
    
});

myPromise
.then((value) => {
    console.log(value);
})
.catch((error) => {
    console.log(error);
})