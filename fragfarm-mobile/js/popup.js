const popup = document.querySelector(".popup");
const dim = document.querySelector(".popup__dim");
const dismiss = document.querySelector(".popup__dismiss");

// Popup Open
popup.hidden = false;
document.body.classList.add("no-scroll");

// dim Click
dim.addEventListener("click", () => {
    popup.hidden = true;
    document.body.classList.remove("no-scroll");
});

// dismiss Click
dismiss.addEventListener("click", () => {
    popup.hidden = true;
    document.body.classList.remove("no-scroll");
});

// ESC Click 
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        popup.hidden = true;
        document.body.classList.remove("no-scroll");
  }
});

// 오늘 다시 보지 않기
const today = new Date().toDateString();
const saved = localStorage.getItem('popupClosedDate');

if (saved === today) {
    popup.hidden = true;
    document.body.classList.remove("no-scroll");
}

dismiss.addEventListener('click', () => {
    localStorage.setItem('popupClosedDate', today);
    popup.hidden = true;
    document.body.classList.remove("no-scroll");
});

