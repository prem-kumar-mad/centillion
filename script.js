// script.js
// Add your JavaScript code here
    const popup = document.getElementById("trainingPopup");
    const openButton = document.getElementById("showPopupBtn");
    const closeButton = document.getElementsByClassName("popup-close")[0];

    // Show popup
    openButton.onclick = function() {
      popup.style.display = "block";
    }

    // Close popup
    closeButton.onclick = function() {
      popup.style.display = "none";
    }

    // Close when clicking outside
    window.onclick = function(event) {
      if (event.target === popup) {
        popup.style.display = "none";
      }
    }