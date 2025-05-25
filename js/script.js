import {weather_id, timetable, new_timetable, goal_date, goal_date_name, timetable_config} from "./const.js"
const {ipcRenderer}=require("electron");

let log=(info)=>{ipcRenderer.send("log",info)}

document.getElementById("day").innerHTML=Date().split(" ")[0].toUpperCase();
window.handleWeatherData=(data)=>{
    data=data.data.observe;
    let img=document.querySelector("#weather img");
    img.src=`http://image.nmc.cn/assets/img/w/40x40/3/${weather_id[data.weather]}.png`;
    document.getElementById("temperature").innerHTML=`${data.degree}℃`;
}
function setWeather(){
    let script=document.createElement("script");
    script.src="https://wis.qq.com/weather/common?source=pc&weather_type=observe&province=广东&city=江门&county=开平市&callback=handleWeatherData"
    document.body.appendChild(script)
    script.onload=function(){
        script.remove()
    }
}
setWeather()
document.getElementById("toggle").addEventListener("click",setWeather)

let date=new Date(),day=date.getDay(),full_date=date.getFullYear()*1e4+(date.getMonth()+1)*1e2+date.getDate();
let today_timetable;
if(Object.keys(new_timetable).includes(`${full_date}`)){
    today_timetable=new_timetable[full_date];
}else{
    today_timetable=timetable[day];
}
let timetable_groups=today_timetable.split(" ");
for(let group of timetable_groups){
    let timetable_group_element=document.createElement("span");
    timetable_group_element.className="timetable-group";
    for(let lesson of group){
        let timetable_lesson_element=document.createElement("span");
        timetable_lesson_element.className="lesson app-block";
        timetable_lesson_element.innerHTML=lesson;
        if(Object.keys(timetable_config).includes(lesson)){
            timetable_lesson_element.style.color=timetable_config[lesson].color;
            timetable_lesson_element.ondblclick=()=>{
                ipcRenderer.send("open-dir",timetable_config[lesson].path)
            }
        }
        timetable_group_element.appendChild(timetable_lesson_element);
    }
    document.getElementById("timetable").appendChild(timetable_group_element)
}

let dayNumber=(Date.parse(new Date(goal_date))-Date.parse(date))/1000/60/60/24;
document.getElementById("date-name").innerText=goal_date_name;
document.getElementById("day-number").innerText=parseInt(dayNumber)