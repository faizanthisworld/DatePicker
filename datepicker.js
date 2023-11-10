const datepickerAll = document.querySelectorAll(".datepicker");
class Datepicker {
  constructor(datepicker) {
    this.calander = datepicker.querySelector("#calander");
    this.input = datepicker.querySelector("#date-input");
    this.backendDate = datepicker.querySelector("#backend-date");
    this.calanderBody = this.calander.querySelector(
      ".calander-body .container"
    );
    this.calanderHeader = this.calander.querySelector(
      ".calander-header .container"
    );
    this.currentMonth = this.calander.querySelector(".current-month");
    this.currentYear = this.calander.querySelector(".current-year");
    this.yearsContainer = this.calander.querySelector("#years");
    this.monthsContainer = this.calander.querySelector("#months");
    this.preMonth = this.calander.querySelector(".pre-month");
    this.nextMonth = this.calander.querySelector(".next-month");
    this.closeBtn = this.calander.querySelector("#close-btn");
    this.daysName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    this.date = new Date();
    this.InitialiseCalander(this.date.getFullYear(), this.date.getMonth());
  }
  displayCalander() {
    this.input.onclick = () => {
      this.calander.style.display = "block";
    };
  }
  preMonthClick() {
    this.preMonth.onclick = () => {
      this.InitialiseCalander(
        Number(this.currentYear.textContent),
        this.getMonthNumber(this.currentMonth.textContent) - 1
      );
      this.monthsContainer.style.display = "none";
      this.yearsContainer.style.display = "none";
    };
  }
  nextMonthClick() {
    this.nextMonth.onclick = (e) => {
      this.InitialiseCalander(
        Number(this.currentYear.textContent),
        this.getMonthNumber(this.currentMonth.textContent) + 1
      );
      this.monthsContainer.style.display = "none";
      this.yearsContainer.style.display = "none";
    };
  }
  closeBtnClick() {
    this.closeBtn.onclick = (e) => {
      this.calanderBody.style.display = "grid";
      this.monthsContainer.style.display = "none";
      this.yearsContainer.style.display = "none";
      this.calanderHeader.style.display = "flex";
      this.closeBtn.style.display = "none";
    };
  }
  currentMonthClick() {
    this.currentMonth.onclick = () => {
      this.monthsContainer.style.display = "grid";
      this.yearsContainer.style.display = "none";
      this.calanderBody.style.display = "none";
      this.calanderHeader.style.display = "none";
      this.closeBtn.style.display = "block";
      const months = this.monthsContainer.querySelectorAll("span");
      months.forEach((month) => {
        month.addEventListener("click", () => {
          this.currentMonth.textContent = month.textContent;
          this.monthsContainer.style.display = "none";
          this.yearsContainer.style.display = "none";
          this.calanderBody.style.display = "grid";
          this.calanderHeader.style.display = "flex";
          this.closeBtn.style.display = "none";
        });
      });
    };
  }
  currentYearClick() {
    this.currentYear.onclick = (e) => {
      const years = this.setYears(Number(e.target.textContent));
      this.monthsContainer.style.display = "none";
      this.yearsContainer.style.display = "grid";
      this.calanderBody.style.display = "none";
      this.calanderHeader.style.display = "none";
      this.closeBtn.style.display = "block";
      this.yearsContainer.innerHTML = "";
      years.forEach((year) => {
        const span = document.createElement("span");
        span.textContent = year;
        this.yearsContainer.append(span);
      });
      setTimeout(() => {
        this.selectYear(this.yearsContainer);
      }, 500);
    };
  }
  selectYear(y) {
    const yearsSpan = y.querySelectorAll("span");
    yearsSpan.forEach((year) => {
      year.addEventListener("click", () => {
        this.monthsContainer.style.display = "none";
        y.style.display = "none";
        this.calanderBody.style.display = "grid";
        this.calanderHeader.style.display = "flex";
        this.closeBtn.style.display = "none";
        this.currentYear.textContent = year.textContent;
      });
    });
  }
  getMonthName(year, month) {
    return new Date(year, month).toLocaleString("detault", { month: "short" });
  }
  getMonthNumber(month) {
    const year = new Date().getFullYear();
    return new Date(`${month} 1, ${year}`).getMonth();
  }
  InitialiseCalander(year, month) {
    if (month > 11) {
      month = 0;
      year++;
    }
    if (month < 0) {
      month = 11;
      year--;
    }
    const firstDay = new Date(year, month).getDay();
    this.calanderBody.innerHTML = "";
    this.currentMonth.textContent = this.getMonthName(year, month);
    this.currentYear.textContent = year;
    this.daysName.forEach((day) => {
      let DayElement = document.createElement("span");
      DayElement.textContent = day;
      DayElement.classList.add("day");
      this.calanderBody.appendChild(DayElement);
    });
    const days = this.getAllDaysInMonth(year, month);
    days.forEach((day) => {
      let newDayElement = document.createElement("span");
      newDayElement.textContent = day;
      newDayElement.classList.add("date");
      this.calanderBody.appendChild(newDayElement);
    });
    const dates = this.calanderBody.querySelectorAll("span");
    this.calander.onclick = this.selectDate(dates, firstDay + 1);
  }
  selectDate(dates, pos) {
    dates[7].style.gridColumn = pos;
    dates.forEach((date) => {
      date.addEventListener("click", () => {
        if (!date.classList.contains("day")) {
          this.input.value = `${
            date.textContent +
            "/" +
            Number(this.getMonthNumber(this.currentMonth.textContent) + 1) +
            "/" +
            this.currentYear.textContent
          }`;
          this.backendDate.value = `${
            this.currentYear.textContent +
            "-" +
            Number(this.getMonthNumber(this.currentMonth.textContent) + 1) +
            "-" +
            date.textContent
          }`;
          this.calander.style.display = "none";
        }
      });
    });
  }
  getAllDaysInMonth(year, month) {
    const date = new Date(year, month);
    const dates = [];
    while (date.getMonth() == month) {
      dates.push(new Date(date).getDate());
      date.setDate(date.getDate() + 1);
    }
    return dates;
  }
  setYears(year) {
    let years = [];
    years.push(year);
    for (let i = 1; i < 8; i++) {
      years.push(year + i);
      years.push(years[0] - i);
    }
    years.sort();
    return years;
  }
}
document.addEventListener("DOMContentLoaded", () => {
  const dateTemplate = document.querySelector("[data-datePickerTemplate]");
  const datepickers = document.querySelectorAll(".datepicker-temp");
  datepickers.forEach((datepickerContainer) => {
    const datepicker = dateTemplate.content
      .cloneNode(true)
      .querySelector(".datepicker-template");
    const d = new Datepicker(datepicker);
    d.closeBtnClick();
    d.preMonthClick();
    d.nextMonthClick();
    d.currentMonthClick();
    d.currentYearClick();
    d.displayCalander();
    datepickerContainer.append(datepicker);
  });
});

