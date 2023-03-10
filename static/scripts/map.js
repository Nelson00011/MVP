'use strict';
//COMMENT Insert random filler text into activities
const acts = ["Local Submarine Trip", "Wildlife Cafe", "Home Brewed Beer",  "Scuba Dive" , "Dolphin Swim", "Canoe Trip with local Seals", "Ziplining From Vessel", "Barrel Boat Racing", "Hammock Swings from Lines","Darts on Deck"]
const lists=document.getElementById("lists")
let actList =[]
const cacheList={}
while(8>actList.length){
  let index=Math.floor(Math.random()*acts.length)
  let quotes = acts[index]
  if(!cacheList[quotes]){
    actList.push(quotes)
    cacheList[quotes]=1
  }
}

actList.forEach((c)=> lists.innerHTML+=`<li>${c}</li>`)

//COMMENT: generate trip event function
function generateTrip(evt){
  evt.preventDefault();
  
  const formInputs = {
    tour_id: document.querySelector('p').id,
    intention: evt.target.value,
  };                   

  fetch('/bookTrip', {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(formInputs),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((responseJson) => {
      alert(responseJson.status);
    });
};

//COMMENT: Event listener for generateTrip
document.querySelector('#booked').addEventListener('click', generateTrip) 
document.querySelector('#saved').addEventListener('click', generateTrip) 

//COMMENT: Reviews adding stars to score
const star_list = document.querySelectorAll(".stars")
star_list.forEach((score)=> {
  let insertText = ''
  let num = score.id
  for(let i=0;i<5;i++){
    if(i<num){
      insertText += '<span class="fa fa-star" style="color:gold"></span>'
    }
    else{
      insertText += '<span class="fa fa-star"></span>'
    }
  }
  score.innerHTML=insertText})



//COMMENT: list of markers here
const markerObj = {}
//COMMENTS: GOOGLE MAPS API
//identify the class for map_port line 35
const map_port = document.querySelector('#map').classList[0]

const locations = {
  alaska: {
    port_id: "24",
    port_name: "Port of Anchorage",
    coordinates: {
      lat: 61.223278610804506,
      lng:  -149.89909775375338
    }  
  },

  hawaii: {
    port_id: "39",
    port_name: "Port of Honolulu",
    coordinates: {
      lat: 21.3079761,
      lng: -157.866185
    }
  },

  washington: {
    port_id: "30",
    port_name: "Port of Seattle",
    coordinates: {
      lat: 47.61707744883518, 
      lng: -122.36048698489884,
    }
  }
};


//identify the class for map_port line 35
const coordinate = locations[map_port]

//initiate google map function
function initMap() {
 
  const basicMap = new google.maps.Map(document.querySelector('#map'), {
    center: coordinate.coordinates,
    zoom: 13,
  });

  const portMarker = new google.maps.Marker({
    position: coordinate.coordinates,
    title: map_port,
    map: basicMap,
  });

  const info = new google.maps.InfoWindow({
    content: `<h6>${coordinate.port_name}:</br></h6><p>Please Explore!</p>`,
  });

  info.open(basicMap, portMarker);

  


//COMMENT Google Places Library
//COMMENT conditionality based on button
function buttonMap(evt=""){
  
  let target = evt.target.id
  let searchQuery = target[0].toUpperCase() + target.slice(1)

const request = {
  query: searchQuery,
  radius: '1500',
  location: coordinate.coordinates 
};
///COMMENT: gooogle services
var service = new google.maps.places.PlacesService(basicMap)

//COMMENT: generic infoWindow
const infoWindow = new google.maps.InfoWindow();

if(!markerObj[searchQuery]){
  markerObj[searchQuery] = []

service.textSearch(request, function(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (let i = 0; i < results.length; i++) {
      //COMMENT: Create New Marker
      console.log("ITEM IN MAPS")
      console.log(results[i])
      const markerMap = new google.maps.Marker({
        map: basicMap,
        title: results[i].name,
        position: results[i].geometry.location,
        icon: {
          url: results[i].icon,
          scaledSize: new google.maps.Size(25,25),
        },
      
      });
      
      markerObj[searchQuery].push(markerMap)

      //COMMENT: Create's Content
      const placeContent = `
      <div class="${searchQuery}" id='${results[i].place_id}'>
      <h5>${results[i].name}<h5>
      <p>${searchQuery} Rating: ${results[i].rating}</p>
      <p class="address">Address: ${results[i].formatted_address}<p>
      </div> 
      `
      //COMMENT: add eventlistener to every marker on map
      markerMap.addListener('click', () => {
        infoWindow.close();
        infoWindow.setContent(placeContent);
        infoWindow.open(basicMap, markerMap);
      });
    }
  }
});

}
else{

let markerList = markerObj[searchQuery]

for(let i=0; i<markerList.length ;i++){
  let item = markerList[i]
  item.setMap(null)
  markerObj[searchQuery]=0
    }

  }

}
///eventlisteners for each
document.querySelector('#museums').addEventListener('click', buttonMap) 
document.querySelector('#cafe').addEventListener('click', buttonMap) 
document.querySelector('#restaurants').addEventListener('click', buttonMap)

}
