// Sidebar menu items
const menuItems = document.querySelectorAll(".menu ul li");
const content = document.querySelector(".content");
const themeBtn = document.getElementById("themeBtn");

// Default load = My Profile
loadProfileSection();

// Handle menu clicks
menuItems.forEach(item => {
  item.addEventListener("click", () => {
    menuItems.forEach(el => el.classList.remove("active"));
    item.classList.add("active");

    switch (item.textContent.trim()) {
      case "Dashboard":
        updateContent("Dashboard", "Welcome to your WasteZero dashboard. Track pickups, opportunities, and your impact here.");
        break;
      case "Schedule Pickup":
        updateContent("Schedule Pickup", "Your next pickup is scheduled for <b>Friday, 20th September 2025</b>. You can manage or reschedule here.");
        break;
      case "Opportunities":
        updateContent("Opportunities", "Explore recycling drives, community clean-up events, and volunteering opportunities near you.");
        break;
      case "Messages":
        updateContent("Messages", "Recyclable items can be dropped at:<br><ul><li>City Recycling Center</li><li>Main Street Pickup Point</li><li>Community Eco Hub</li></ul>");
        break;
      case "My Impact":
        updateContent("My Impact", "You have recycled <b>120kg</b> of waste and saved <b>85kg CO₂</b> this year. Keep going!");
        break;
      case "My Profile":
        loadProfileSection();
        break;
      case "Settings":
        loadSettingsSection();
        break;
      case "Help & Support":
        loadHelpSection();
        break;
      case "Admin Panel":
        loadAdminSection();
        break;
    }
  });
});

// Utility: Update content
function updateContent(title, body) {
  content.innerHTML = `<h2>${title}</h2><p>${body}</p>`;
}

// ================== EXTRA PAGES ==================

// Profile Section
function loadProfileSection() {
  content.innerHTML = `
    <h2>My Profile</h2>
    <p>Manage your account information and settings</p>
    <div class="tabs">
      <button id="profileTab" class="active">Profile</button>
      <button id="passwordTab">Password</button>
    </div>
    <div id="profileForm" class="form">
      <div class="form-group"><label>Full Name</label><input type="text" placeholder="Enter the Name"></div>
      <div class="form-group"><label>Email</label><input type="email" placeholder="Enter the Email"></div>
      <div class="form-group"><label>Location</label><input type="text" placeholder="Enter the Location"></div>
    </div>
    <div id="passwordForm" class="form" style="display:none;">
      <div class="form-group"><label>Password</label><input type="password" placeholder="Enter current password"></div>
      <div class="form-group"><label>New Password</label><input type="password" placeholder="Enter new password"></div>
      <div class="form-group"><label>Confirm Password</label><input type="password" placeholder="Confirm new password"></div>
    </div>
  `;

  const profileTab = document.getElementById("profileTab");
  const passwordTab = document.getElementById("passwordTab");
  const profileForm = document.getElementById("profileForm");
  const passwordForm = document.getElementById("passwordForm");

  profileTab.addEventListener("click", () => {
    profileForm.style.display = "block";
    passwordForm.style.display = "none";
    profileTab.classList.add("active");
    passwordTab.classList.remove("active");
  });

  passwordTab.addEventListener("click", () => {
    profileForm.style.display = "none";
    passwordForm.style.display = "block";
    passwordTab.classList.add("active");
    profileTab.classList.remove("active");
  });
}

// Settings Section
function loadSettingsSection() {
  content.innerHTML = `
    <h2>Settings</h2>
    <p>Manage your preferences</p>
    <div class="form">
      <div class="form-group">
        <label>Theme</label>
        <select id="themeSelect">
          <option value="light" ${document.body.classList.contains("light") ? "selected" : ""}>Light</option>
          <option value="dark" ${document.body.classList.contains("dark") ? "selected" : ""}>Dark</option>
        </select>
      </div>
      <div class="form-group">
        <label>Notifications</label>
        <input type="checkbox" checked> Enable Notifications
      </div>
      <div class="form-group">
        <label>Language</label>
        <select>
          <option>English</option>
          <option>Spanish</option>
          <option>French</option>
        </select>
      </div>
    </div>
  `;

  // Theme dropdown change
  const themeSelect = document.getElementById("themeSelect");
  themeSelect.addEventListener("change", () => {
    if (themeSelect.value === "dark") {
      document.body.classList.remove("light");
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
      document.body.classList.add("light");
    }
  });
}

// Help & Support Section
function loadHelpSection() {
  content.innerHTML = `
    <h2>Help & Support</h2>
    <div class="form">
      <h4>FAQs</h4>
      <ul>
        <li>How do I schedule a pickup?</li>
        <li>Where can I drop off recyclables?</li>
        <li>How do I update my profile?</li>
      </ul>
      <h4>Contact Support</h4>
      <p>Email: <b>support@wastezero.com</b></p>
      <p>Phone: +1 800 555 1234</p>
      <h4>Live Chat</h4>
      <p>Available 9am – 6pm (Mon–Fri)</p>
    </div>
  `;
}

// Admin Panel Section
function loadAdminSection() {
  content.innerHTML = `
    <h2>Admin Panel</h2>
    <div class="form">
      <h4>User Management</h4>
      <ul>
        <li>Add / Remove / Edit Users</li>
        <li>Assign Roles</li>
      </ul>
      <h4>System Reports</h4>
      <p>View recycling statistics, pickups completed, and user activity.</p>
      <h4>Activity Logs</h4>
      <p>Monitor system-wide logs for admin use.</p>
    </div>
  `;
}

// ================== THEME TOGGLE BUTTON ==================
themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  document.body.classList.toggle("light");
});
