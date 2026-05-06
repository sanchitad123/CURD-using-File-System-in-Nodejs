// SEARCH USERS

const searchInput = document.getElementById("searchInput");

if (searchInput) {

searchInput.addEventListener("keyup", function () {

let filter = searchInput.value.toLowerCase();

let cards = document.querySelectorAll(".userCard");

cards.forEach(card => {

let name = card.innerText.toLowerCase();const toggleBtn = document.getElementById("themeToggle")

// Load saved theme
if (localStorage.getItem("theme") === "light") {
document.body.classList.add("light")
toggleBtn.textContent = "☀️"
}

// Toggle theme
toggleBtn.addEventListener("click", () => {

document.body.classList.toggle("light")

if(document.body.classList.contains("light")){
localStorage.setItem("theme","light")
toggleBtn.textContent = "☀️"
}
else{
localStorage.setItem("theme","dark")
toggleBtn.textContent = "🌙"
}

})

if (name.includes(filter)) {
card.style.display = "block";
} else {
card.style.display = "none";
}

});

});
}



// THEME TOGGLE

const toggle = document.getElementById("themeToggle");

toggle.onclick = () => {

document.body.classList.toggle("light");

if(document.body.classList.contains("light")){
toggle.innerText = "☀️"
}else{
toggle.innerText = "🌙"
}

}



// PAGE TRANSITION

document.addEventListener("DOMContentLoaded", () => {
document.body.classList.add("page-loaded");
});