import axios from 'axios';
import * as L from 'leaflet';

const form = document.querySelector('form')!;
const address = document.getElementById('address')! as HTMLInputElement;
const map = L.map('map');
type OpenCageResult = {
  results: { geometry: { lat: number, lng: number }}[],
  status:  { code: 200 | 400 }
}

function searchHandler(event: Event) {
  event.preventDefault();
  const enteredAddress = address.value;
  const MAP_TOKEN = process.env.MAP_TOKEN;
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURI(enteredAddress)}&key=${MAP_TOKEN}`
  axios.get<OpenCageResult>(url)
    .then(res => {
      if(res.data.status.code !== 200) {
        throw new Error('failed to fetch');
    }
    map
    .setView([res.data.results[0].geometry.lat, res.data.results[0].geometry.lng], 13);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    		attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    	}).addTo(map);
    })
    .catch(err => {
      alert(err.message);
      console.log(err);
    });

};

form.addEventListener('submit', searchHandler);
