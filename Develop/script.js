// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

var today = dayjs();
$("#currentDay").text(today.format("MMM DD, YYYY"));

var currentTime = dayjs().format("H");
console.log(currentTime);

$(".time-block").each(function () {
  var hourId = $(this).attr("id");
  var hour = parseInt(hourId.split("-")[1]);
  if (hour == currentTime) {
    $(this).addClass("present");
  } else if (currentTime < hour) {
    $(this).addClass("future");
  } else {
    $(this).addClass("past");
  }
});

var save = $(".saveBtn");

save.on("click", function () {
  var currentTimeBlock = $(this).closest(".time-block").attr("id");
  var tasks = $(this).siblings("textarea").val();

  localStorage.setItem(currentTimeBlock, tasks);
  console.log(currentTimeBlock);
  console.log(tasks);

  var confirmation = $("<div>").text("Appointment logged in Local Storage");
  $("header").append(confirmation);
});

$(".time-block").each(function () {
  var hourId = $(this).attr("id");
  var savedTasks = localStorage.getItem(hourId);

  if (savedTasks !== null) {
    $(this).find("textarea").val(savedTasks);
  }
});
