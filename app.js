window.addEventListener("load", ()=>{
 let long;
 let latt;
 const temperatureDescription = document.querySelector(".temperature-description");
 const temperatureDegree = document.querySelector(".temperature-degree");
 const locationTimeZone = document.querySelector(".location-timezone");
 const degreeSection = document.querySelector(".degree-section");
 const temperatureSpan = document.querySelector(".span");

 

 if(navigator.geolocation){
     navigator.geolocation.getCurrentPosition(currentPosition =>{
         long = currentPosition.coords.longitude;
         latt = currentPosition.coords.latitude;
     })

     const apiKey = `http://api.weatherapi.com/v1/current.json?key= c8d2893c2f53483dbb9101804220403&q=Germany&aqi=no/${long},${latt}`;
     fetch(apiKey).then(response =>{
         return response.json();
     })
     .then(data=>{
         console.log(data);
        const c = data.current.condition.text;
         const {humidity,text} = data.current;

         temperatureDescription.textContent = c;
         temperatureDegree.textContent = humidity;
         locationTimeZone.textContent = data.location.tz_id;

         let celcius = ((humidity-32)*(5/9));
         degreeSection.addEventListener("click",convertToCelcius);
         
         function convertToCelcius(){
             if(temperatureSpan.textContent=== "F"){
                temperatureSpan.textContent= "C";
                temperatureDegree.textContent = Math.floor(celcius); 
             } else {
                 temperatureSpan.textContent = "F";
                 temperatureDegree.textContent= humidity;
             }
     
        }
     })
 }

 
})