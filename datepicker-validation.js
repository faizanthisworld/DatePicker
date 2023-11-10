const form = document.querySelector("form");
form.onsubmit = (e) => {
  e.preventDefault();
  const datepicker1 = form.querySelectorAll(".datepicker-temp")[0];
  const datepicker2 = form.querySelectorAll(".datepicker-temp")[1];

  const date1 = datepicker1.querySelector("#backend-date").value.trim();
  const date2 = datepicker2.querySelector("#backend-date").value.trim();
  if (date1 === "" || date2 === "") {
    alert("Please Select the dates");
    return;
  }
  const d1 = new Date(date1);
  const d2 = new Date(date2);

  if (d1.getTime() > d2.getTime()) {
    alert("Please select valid dates");
  } else {
    alert("Thanks for selecting dates, See you again");
    location.reload();
  }
};
