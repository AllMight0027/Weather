var data=null
var input=document.querySelector('input');
input.addEventListener('keyup',(e)=>{
    if(e.keyCode==13){
        fetch();
    }
})


function fetch(){
    var http= new XMLHttpRequest();
    http.onreadystatechange=function(){
        if(http.readyState==4 && http.status==200){
            data=JSON.parse(http.responseText);
            console.log(data);
            load(data);
            forecast();
        }
        if(http.status==404){
            root=document.getElementById("root");
            root.innerText="Location Not Found";
        }
        if(http.status==400){
            root=document.getElementById("root");
            root.innerText="Please enter the city name";
        }
    };
    var str=document.getElementById("cname").value;
    if(str==""){
        str="Chennai"
    }
    http.open("GET", "https://community-open-weather-map.p.rapidapi.com/weather?units=%2522metric%2522&mode=xml%252C%20html&q="+str,false);
    http.setRequestHeader("x-rapidapi-host", "community-open-weather-map.p.rapidapi.com");
    http.setRequestHeader("x-rapidapi-key", "0a6099c4a7mshc5f9a7560893d4ep184041jsn7cb7df012d74");
    http.send();
}
function load(data){
    divIcon=document.getElementById("icon");
    divIcon.innerHTML="<img src=http://openweathermap.org/img/wn/"+data.weather[0].icon+"@2x.png>"
    document.getElementById("pname").innerHTML=data.name+", "+data.sys.country;
    document.getElementById("wmain").innerHTML=data.weather[0].main;
    document.getElementById("wdesc").innerHTML=data.weather[0].description.toLowerCase().split(' ').map(function(word) {
        return (word.charAt(0).toUpperCase() + word.slice(1));
    }).join(' ')+"<br>"; 
    document.getElementById("temp").innerHTML=" Temperature: "+(parseFloat(data.main.temp)-273.15).toFixed(1).toString()+"&deg;C";
    document.getElementById("tempf").innerHTML=" Feels like: "+(parseFloat(data.main.feels_like)-273.15).toFixed(1).toString()+"&deg;C";
    document.getElementById("tempr").innerHTML=" Minimum: "+(parseFloat(data.main.temp_min)-273.15).toFixed(1).toString()+"&deg;C<br> Maximum: "+(parseFloat(data.main.temp_max)-273.15).toFixed(1).toString()+"&deg;C";
    document.getElementById("humidity").innerHTML=" Humidity: "+data.main.humidity;
    var d = new Date(parseInt(data.sys.sunrise+parseInt(data.timezone))*1000);
    var e = new Date(parseInt(data.sys.sunset+parseInt(data.timezone))*1000);
    console.log(parseInt(data.sys.sunrise+parseInt(data.timezone))*1000);
    document.getElementById("sun").innerHTML=" Sunrise: "+d.toUTCString().slice(-11,-4)+"<br> Sunset: "+ e.toUTCString().slice(-12,-4);

}
