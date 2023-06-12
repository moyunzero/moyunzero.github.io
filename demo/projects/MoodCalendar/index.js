
window.onload = function(){


const calendar = document.getElementById("calendar");
const moods = document.querySelectorAll(".mood");
const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "Octomber",
  "November",
  "December",
];

const myh2 = document.getElementById('myh2');
myh2.innerHTML = `${currentYear}年心情日历`;


const dates = getAlldays(currentYear);
// const colors = ["#2d6b5f", "#72e3a6", "#dff4c7", "#edbf98", "#ea3d36"];
const defaultColor = "#888";
let activeColor = "";


let htmlStr = "";

months.forEach((month, index) => {
  htmlStr += ` <div class="months month_${index}">
  <h3>${month}</h3>
  <div class="week_days_container">
    ${weekDays.map((day) => `<div class="week_days">${day}</div>`).join("")}
  </div>
  <div class="days_container">
  </div>
</div>`;
});

calendar.innerHTML = htmlStr;

dates.forEach((date) => {
  var month = date.getMonth();
  var monthEl = document.querySelector(`.month_${month} .days_container`);
  if (date.getDate() === 1 && date.getDay() !== 0) {
    for (let i = 0; i < date.getDay(); i++) {
      const emptySpot = document.createElement("div");
      emptySpot.classList.add("days");
      monthEl.appendChild(emptySpot);
    }
  }
  var dateEl = document.createElement("div");
  dateEl.classList.add("days");
  dateEl.innerHTML = `<span class="circle">${date.getDate()}</span>`;
  monthEl.appendChild(dateEl);
});

//为所有心情元素添加点击事件，实现心情选择功能
moods.forEach((mood) => {
  mood.addEventListener("click", function () {
    //判断是否被选中
    if (mood.classList.contains("selected")) {
      mood.classList.remove("selected");
      activeColor = defaultColor;
    } else {
      //清除其他selected
      moods.forEach((mood) => {
        mood.classList.remove("selected");
      });
      mood.classList.add("selected");
    }
    activeColor = getComputedStyle(mood).getPropertyValue("color");
  });
});
//点击日期添加颜色
const circles = document.querySelectorAll(".circle");
circles.forEach((circle) => {
  circle.addEventListener("click", () => {
    circle.style.backgroundColor = activeColor;
  });
});

function getAlldays(year) {
  var FirstDay = new Date(`January 1 ${year}`);
  var lastDay = new Date(`December 31 ${year}`);
  var lastDayIndex = FirstDay;
  const days = [FirstDay];
  while (lastDayIndex.getTime() !== lastDay.getTime()) {
    days.push(addDays(lastDayIndex, 1));
    lastDayIndex = days[days.length - 1];
  }
  return days;
}
function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}
}
