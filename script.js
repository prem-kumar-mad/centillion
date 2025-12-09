// Get both popups
const trainingPopup = document.getElementById("trainingPopup");
const userdetailsPopup = document.getElementById("userdetailsPopup");

// Get all close buttons
const closeButtons = document.getElementsByClassName("popup-close");

// Example open buttons (you need to add these in your HTML)
const trainingOpenBtn = document.getElementById("showTrainingPopupBtn");
const userdetailsOpenBtn = document.getElementById("showUserdetailsPopupBtn");

// Show training popup
trainingOpenBtn.onclick = function () {
  trainingPopup.style.display = "block";
}

// Show user details popup
userdetailsOpenBtn.onclick = function () {
  userdetailsPopup.style.display = "block";
}

// Close popup when clicking on any close button
for (let i = 0; i < closeButtons.length; i++) {
  closeButtons[i].onclick = function () {
    trainingPopup.style.display = "none";
    userdetailsPopup.style.display = "none";
  }
}

// Close when clicking outside
window.onclick = function (event) {
  if (event.target === trainingPopup) {
    trainingPopup.style.display = "none";
  }
  if (event.target === userdetailsPopup) {
    userdetailsPopup.style.display = "none";
  }
}

const popup = document.getElementById('popup');

function showPopup(message) {
  popup.textContent = message;
  popup.classList.add('show');
  setTimeout(() => popup.classList.remove('show'), 1500);
}

document.querySelectorAll('.copy').forEach(cell => {
  cell.addEventListener('dblclick', () => {
    const text = cell.textContent;
    navigator.clipboard.writeText(text).then(() => {
      if (cell.classList.contains('username')) {
        showPopup('Copied username');
      } else if (cell.classList.contains('password')) {
        showPopup('Copied password');
      }
    });
  });
});
