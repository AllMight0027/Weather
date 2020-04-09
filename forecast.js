var data = null;
function forecast(){
    var http= new XMLHttpRequest();
    http.onreadystatechange=function(){
        if(http.readyState==4 && http.status==200){
            data=JSON.parse(http.responseText);
            console.log(data)
            loaddata(data);
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
    http.open("GET", "https://community-open-weather-map.p.rapidapi.com/forecast/daily?q="+str+"&lat=35&lon=139&cnt=5&units=metric",false);
    http.setRequestHeader("x-rapidapi-host", "community-open-weather-map.p.rapidapi.com");
    http.setRequestHeader("x-rapidapi-key", "0a6099c4a7mshc5f9a7560893d4ep184041jsn7cb7df012d74");
    http.send();
}

function loaddata(data){
    document.getElementById("d1i").innerHTML="<img src=http://openweathermap.org/img/wn/"+data.list[1].weather[0].icon+"@2x.png>"
    document.getElementById("d2i").innerHTML="<img src=http://openweathermap.org/img/wn/"+data.list[2].weather[0].icon+"@2x.png>"
    document.getElementById("d3i").innerHTML="<img src=http://openweathermap.org/img/wn/"+data.list[3].weather[0].icon+"@2x.png>"
    var d = new Date(parseInt(data.list[1].dt+parseInt(data.city.timezone))*1000);
    document.getElementById("d1d").innerHTML=d.toUTCString().slice(4,-12);
    var d2 = new Date(parseInt(data.list[2].dt+parseInt(data.city.timezone))*1000);
    document.getElementById("d2d").innerHTML=d2.toUTCString().slice(4,-12);
    var d3 = new Date(parseInt(data.list[3].dt+parseInt(data.city.timezone))*1000);
    document.getElementById("d3d").innerHTML=d3.toUTCString().slice(4,-12);
    document.getElementById("d1de").innerHTML=data.list[1].weather[0].description.toLowerCase().split(' ').map(function(word) {
        return (word.charAt(0).toUpperCase() + word.slice(1));
    }).join(' ');
    document.getElementById("d2de").innerHTML=data.list[2].weather[0].description.toLowerCase().split(' ').map(function(word) {
        return (word.charAt(0).toUpperCase() + word.slice(1));
    }).join(' ');
    document.getElementById("d3de").innerHTML=data.list[3].weather[0].description.toLowerCase().split(' ').map(function(word) {
        return (word.charAt(0).toUpperCase() + word.slice(1));
    }).join(' ');
    document.getElementById("d1t").innerHTML=" Min: "+(parseFloat(data.list[1].temp.min)).toFixed(1).toString()+"&deg;C";
    document.getElementById("d2t").innerHTML=" Min: "+(parseFloat(data.list[2].temp.min)).toFixed(1).toString()+"&deg;C";
    document.getElementById("d3t").innerHTML=" Min: "+(parseFloat(data.list[3].temp.min)).toFixed(1).toString()+"&deg;C";
    document.getElementById("d1tm").innerHTML=" Max: "+(parseFloat(data.list[1].temp.max)).toFixed(1).toString()+"&deg;C";
    document.getElementById("d2tm").innerHTML=" Max: "+(parseFloat(data.list[2].temp.max)).toFixed(1).toString()+"&deg;C";
    document.getElementById("d3tm").innerHTML=" Max: "+(parseFloat(data.list[3].temp.max)).toFixed(1).toString()+"&deg;C";

}