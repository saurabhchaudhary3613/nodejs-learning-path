
const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

const locationMsg = document.querySelector('#location');
const forcastMsg = document.querySelector('#forecats');


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;
    locationMsg.textContent = 'Loading...';
    forcastMsg.textContent = '';

    fetch(`http://localhost:3000/weather?address=${location}`).then((res) => {
    res.json().then((data) => {
        
        if (data.error) {
            console.log(data.error)
           
            locationMsg.textContent = data.error;
            forcastMsg.textContent = '';
        } else {
            console.log(data[0].location)
            console.log(data[0].forecast)
            errorText.textContent = '';
            locationMsg.textContent = data[0].location;
            forcastMsg.textContent = data[0].forecast;
            
        }
    })
})
})