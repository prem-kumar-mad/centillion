// Get both popups
const trainingPopup = document.getElementById("trainingPopup");
const userdetailsPopup = document.getElementById("userdetailsPopup");
const systemdetailsPopup = document.getElementById("systemdetailsPopup");

// Get all close buttons
const closeButtons = document.getElementsByClassName("popup-close");

// Example open buttons (you need to add these in your HTML)
const trainingOpenBtn = document.getElementById("showTrainingPopupBtn");
const userdetailsOpenBtn = document.getElementById("showUserdetailsPopupBtn");
const systemdetailsOpenBtn = document.getElementById("showSystemdetailsPopupBtn");

// Show training popup
trainingOpenBtn.onclick = function () {
  trainingPopup.style.display = "block";
}

// Show user details popup
userdetailsOpenBtn.onclick = function () {
  userdetailsPopup.style.display = "block";
}

// Show sysytem details popup
systemdetailsOpenBtn.onclick = function () {
  systemdetailsPopup.style.display = "block";
}

// Close popup when clicking on any close button
for (let i = 0; i < closeButtons.length; i++) {
  closeButtons[i].onclick = function () {
    trainingPopup.style.display = "none";
    userdetailsPopup.style.display = "none";
    systemdetailsPopup.style.display = "none";
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
  if (event.traget === systemdetailsPopup) {
    systemdetailsPopup.style.display = "none";
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


const svgFirst = `
  <svg width="80" height="60" xmlns="http://www.w3.org/2000/svg">
    <rect x="15" y="12" width="48" height="12" stroke="black" fill="none" stroke-width="2"/>
    <rect x="15" y="30" width="48" height="30" stroke="black" fill="none" stroke-width="2"/>
    <rect x="2" y="12" width="9" height="12" stroke="black" fill="none" stroke-width="2" rx="5"/>
  </svg>`;

const svgSecond = `
  <svg width="80" height="60" xmlns="http://www.w3.org/2000/svg">
    <rect x="15" y="6" width="48" height="30" stroke="black" fill="none" stroke-width="2"/>
    <rect x="15" y="42" width="48" height="12" stroke="black" fill="none" stroke-width="2"/>
    <rect x="68" y="42" width="9" height="12" stroke="black" fill="none" stroke-width="2" rx="5"/>
  </svg>`;


// Row 1 desks: input first, then first SVG
document.querySelectorAll('.desk-row1').forEach(desk => {
  desk.insertAdjacentHTML('beforeend', svgFirst);
});

// Row 2 desks: second SVG first, then input
document.querySelectorAll('.desk-row2').forEach(desk => {
  // remove existing input temporarily
  const input = desk.querySelector('input');
  desk.innerHTML = '';
  desk.insertAdjacentHTML('beforeend', svgSecond);
  desk.appendChild(input);
});

document.getElementById("downloadReport").addEventListener("click", function () {
    // Collect all desk inputs
    const deskInputs = document.querySelectorAll('.desk-row1 input, .desk-row2 input');
    let csvContent = "Desk,User\n"; // CSV header

    deskInputs.forEach((input, index) => {
      const deskNumber = index + 1;
      const userName = input.value || "Unassigned";
      csvContent += `${deskNumber},${userName}\n`;
    });

    // Create a downloadable file
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "desk_allocations_report.csv"; // file name
    link.click();
  });


  // 🔐 Secure password
  const securePassword = "PremSecure123";

  // Unlock file input when password is correct
  document.getElementById("uploadPassword").addEventListener("input", function () {
    const entered = this.value;
    const fileInput = document.getElementById("uploadCSV");
    if (entered === securePassword) {
      fileInput.disabled = false;
      fileInput.classList.add("is-valid");
    } else {
      fileInput.disabled = true;
      fileInput.classList.remove("is-valid");
    }
  });

  // Handle CSV upload and auto-assign users
  document.getElementById("uploadCSV").addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
      const text = e.target.result;
      const rows = text.trim().split("\n").slice(1); // skip header row

      // Get current time in minutes
      const now = new Date();
      const currentMinutes = now.getHours() * 60 + now.getMinutes();

      // Shift boundaries
      const morningStart = 421;   // 7:01 AM
      const morningEnd = 930;     // 3:30 PM
      const afternoonStart = 931; // 3:31 PM
      const afternoonEnd = 1440;  // 12:00 AM
      const nightEnd = 420;       // 7:00 AM

      let columnIndex = 1; // default to morning
      let shiftName = "";

      if (currentMinutes >= morningStart && currentMinutes <= morningEnd) {
        columnIndex = 1; // Morning shift
        shiftName = "Morning Shift Active";
      } else if (currentMinutes >= afternoonStart && currentMinutes <= afternoonEnd) {
        columnIndex = 2; // Afternoon shift
        shiftName = "Afternoon Shift Active";
      } else if (currentMinutes >= 0 && currentMinutes <= nightEnd) {
        columnIndex = 3; // Night shift
        shiftName = "Night Shift Active";
      }

      // Show active shift banner
      document.getElementById("activeShift").innerText = shiftName;

      // Select all desk inputs
      const deskInputs = document.querySelectorAll('.desk-row1 input, .desk-row2 input');

      rows.forEach((row, index) => {
        const columns = row.split(",");
        const user = columns[columnIndex]?.trim();
        deskInputs[index].value = user && user.toLowerCase() !== "not assign" ? user : "";
      });
    };
    reader.readAsText(file);
  });
