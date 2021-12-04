import './index.css'
const API_KEY = '99de64ffa30576e029f79fdaecd6b298'
const URL = "api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}"

const cityInput = document.querySelector("#cityInput"); 
const body = document.getElementsByTagName('body')[0];

// fetch(`http://api.openweathermap.org/data/2.5/weather?q=${e.target.value}&appid=99de64ffa30576e029f79fdaecd6b298`)
//     .then((res)=>{
//         return res.json()
//     })
//     .then((data)=>{
//         console.log(data);
//     })
//     .catch(()=>{
//         throw new Error('lol' + e.target.value)
//         // console.log("something went wrong: ",err);
//     }) 
            
async function getWeatherDate(city){
    try{
        const res = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`, {mode:'cors'});
        if(res.status === 404){
            throw new Error('Enter correct city name'); 
        }
        const data = await res.json();
        return data;
        // console.log(data);
    }catch(err){
        console.log(err); 
    }
}

function testFunction(data){
    const li = document.createElement('li');
    const img = document.createElement('img');
    let src = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`
    img.src = src;
    li.innerText = data.weather[0].main;
    body.appendChild(li);
    body.appendChild(img);
    console.log(data);
    console.log(data.weather[0]);
}


async function final(){
    let data = await getWeatherDate(cityInput.value);
    testFunction(data);
} 

let timer;
cityInput.addEventListener("keyup",(e)=>{
    clearTimeout(timer);
    timer = setTimeout(()=>{
        final();
        cityInput.value= ""
    },1000)
})
            
            
            