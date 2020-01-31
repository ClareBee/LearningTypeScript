"use strict";
console.log(process.env.MAP_TOKEN);
const form = document.querySelector('form');
const address = document.getElementById('address');
function searchHandler(event) {
    event.preventDefault();
    const enteredAddress = address.value;
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${enteredAddress}&key=8a81529e37e24e6f8717b98553a4428b`;
}
;
function printMap() {
}
form.addEventListener('submit', searchHandler);
//# sourceMappingURL=app.js.map