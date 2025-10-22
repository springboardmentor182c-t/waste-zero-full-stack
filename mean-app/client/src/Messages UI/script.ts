// script.ts
// Plain TypeScript to power the UI: conversation selection, sending messages, search, dark mode.
// Compile with: tsc script.ts (target ES6 / DOM)

type Message = {
  id: string;
  text: string;
  time: string;
  from: "me" | "them" | "system";
};

type Conversation = {
  id: string;
  name: string;
  last: string;
  messages: Message[];
  archived?: boolean;
  starred?: boolean;
  email?: string;
  phone?: string;
};

const conversations: Conversation[] = [
  {
    id: "u1",
    name: "User 5",
    last: "You: hello",
    messages: [
      { id: "m1", text: "Your dedication to environmental causes is truly inspiring!", time: "05:34 PM", from: "them" },
      { id: "m2", text: "hello", time: "05:41 PM", from: "me" },
    ],
    email: "user5@example.com"
  },
  {
    id: "u2",
    name: "User 4",
    last: "You: Thank you for your active ...",
    messages: [
      { id: "m3", text: "Thank you for your active participation!", time: "11:12 AM", from: "them" }
    ],
    phone: "+1234567890"
  }
];

const convoItemsEl = document.getElementById("convoItems") as HTMLUListElement;
const chatArea = document.getElementById("chatArea") as HTMLDivElement;
const chatTitle = document.getElementById("chatTitle") as HTMLDivElement;
const messageForm = document.getElementById("messageForm") as HTMLFormElement;
const messageInput = document.getElementById("messageInput") as HTMLInputElement;
const sendBtn = document.getElementById("sendBtn") as HTMLButtonElement;
const convoSearch = document.getElementById("convoSearch") as HTMLInputElement;
const darkToggle = document.getElementById("darkToggle") as HTMLInputElement;

// New elements
const newContactBtn = document.getElementById("newContactBtn") as HTMLButtonElement;
const archiveBtn = document.getElementById("archiveBtn") as HTMLButtonElement;
const starBtn = document.getElementById("starBtn") as HTMLButtonElement;
const editBtn = document.getElementById("editBtn") as HTMLButtonElement;
const deleteBtn = document.getElementById("deleteBtn") as HTMLButtonElement;

// Settings elements
const profileBtn = document.getElementById("profileBtn") as HTMLLIElement;
const settingsBtn = document.getElementById("settingsBtn") as HTMLLIElement;
const helpBtn = document.getElementById("helpBtn") as HTMLLIElement;
const adminBtn = document.getElementById("adminBtn") as HTMLLIElement;

// Modal elements
const modal = document.createElement("div");
modal.className = "modal";
modal.id = "contactModal";
document.body.appendChild(modal);

let selectedConvoId: string | null = null;

function formatTime(date = new Date()) {
  const h = date.getHours();
  const m = date.getMinutes().toString().padStart(2, "0");
  const hh = ((h + 11) % 12) + 1;
  const ampm = h >= 12 ? "PM" : "AM";
  return `${hh}:${m} ${ampm}`;
}

function renderConversations(filter = "") {
  convoItemsEl.innerHTML = "";
  const list = conversations.filter(c => 
    !c.archived && 
    c.name.toLowerCase().includes(filter.toLowerCase())
  );
  list.forEach(c => {
    const li = document.createElement("li");
    li.className = "convo-item" + (c.id === selectedConvoId ? " selected" : "");
    li.innerHTML = `
      <div class="u-initial">${c.name[0]}</div>
      <div class="meta">
        <div class="u-name">${c.name} ${c.starred ? "⭐" : ""}</div>
        <div class="u-last">${c.last}</div>
      </div>
      <div class="time">${c.messages[c.messages.length - 1]?.time ?? ""}</div>
    `;
    li.addEventListener("click", () => {
      selectConversation(c.id);
    });
    convoItemsEl.appendChild(li);
  });
}

function renderChat(convoId: string | null) {
  chatArea.innerHTML = "";
  if (!convoId) {
    chatTitle.textContent = "Select a conversation";
    const empty = document.createElement("div");
    empty.className = "msg system";
    empty.textContent = "No conversation selected. Choose a chat from the left.";
    chatArea.appendChild(empty);
    return;
  }
  const convo = conversations.find(c => c.id === convoId)!;
  chatTitle.textContent = convo.name;

  // Update star button based on conversation status
  if (convo.starred) {
    starBtn.textContent = "★";
    starBtn.title = "Unstar";
  } else {
    starBtn.textContent = "☆";
    starBtn.title = "Star";
  }

  convo.messages.forEach(m => {
    const d = document.createElement("div");
    d.className = "msg " + (m.from === "me" ? "outgoing" : (m.from === "them" ? "incoming" : "system"));
    d.innerHTML = `<div class="text">${escapeHtml(m.text)}</div><div class="time" style="font-size:11px;color:#64748b;margin-top:6px">${m.time}</div>`;
    chatArea.appendChild(d);
  });

  // scroll to bottom
  setTimeout(() => {
    chatArea.scrollTop = chatArea.scrollHeight;
  }, 50);
}

function selectConversation(id: string) {
  selectedConvoId = id;
  renderConversations(convoSearch.value);
  renderChat(id);
}

function sendMessage() {
  const text = messageInput.value.trim();
  if (!text || !selectedConvoId) return;
  const convo = conversations.find(c => c.id === selectedConvoId)!;
  const msg: Message = { id: `m${Date.now()}`, text, time: formatTime(), from: "me" };
  convo.messages.push(msg);
  convo.last = `You: ${text.length > 30 ? text.slice(0, 30) + "..." : text}`;
  messageInput.value = "";
  renderConversations(convoSearch.value);
  renderChat(selectedConvoId);

  // very simple automated reply after 800ms for demo
  setTimeout(() => {
    convo.messages.push({ id: `m${Date.now()+1}`, text: "Thanks for the message — we'll get back soon!", time: formatTime(), from: "them" });
    renderConversations(convoSearch.value);
    renderChat(selectedConvoId);
  }, 800);
}

function escapeHtml(unsafe: string) {
  return unsafe.replace(/[&<"'>]/g, function (m) {
    switch (m) {
      case "&": return "&amp;";
      case "<": return "&lt;";
      case ">": return "&gt;";
      case '"': return "&quot;";
      case "'": return "&#039;";
      default: return m;
    }
  });
}

// New functions for the additional features
function archiveConversation() {
  if (!selectedConvoId) return;
  const convo = conversations.find(c => c.id === selectedConvoId)!;
  convo.archived = !convo.archived;
  if (convo.archived) {
    selectedConvoId = null;
    renderChat(null);
    chatTitle.textContent = "Conversation Archived";
  }
  renderConversations(convoSearch.value);
}

function starConversation() {
  if (!selectedConvoId) return;
  const convo = conversations.find(c => c.id === selectedConvoId)!;
  convo.starred = !convo.starred;
  renderConversations(convoSearch.value);
  renderChat(selectedConvoId);
}

function deleteConversation() {
  if (!selectedConvoId) return;
  if (confirm("Are you sure you want to delete this conversation?")) {
    const index = conversations.findIndex(c => c.id === selectedConvoId)!;
    conversations.splice(index, 1);
    selectedConvoId = null;
    renderConversations(convoSearch.value);
    renderChat(null);
  }
}

function createContactModal() {
  modal.innerHTML = `
    <div class="modal-content">
      <div class="modal-header">
        <h2>Create New Contact</h2>
        <button class="close-btn">&times;</button>
      </div>
      <form id="contactForm">
        <div class="form-group">
          <label for="contactName">Name *</label>
          <input type="text" id="contactName" required>
        </div>
        <div class="form-group">
          <label for="contactEmail">Email</label>
          <input type="email" id="contactEmail">
        </div>
        <div class="form-group">
          <label for="contactPhone">Phone</label>
          <input type="tel" id="contactPhone">
        </div>
        <div class="form-actions">
          <button type="button" class="btn btn-secondary" id="cancelBtn">Cancel</button>
          <button type="submit" class="btn btn-primary">Create Contact</button>
        </div>
      </form>
    </div>
  `;
  
  modal.style.display = "flex";
  
  const closeBtn = modal.querySelector(".close-btn") as HTMLButtonElement;
  const cancelBtn = modal.querySelector("#cancelBtn") as HTMLButtonElement;
  const contactForm = modal.querySelector("#contactForm") as HTMLFormElement;
  
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });
  
  cancelBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });
  
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = (document.getElementById("contactName") as HTMLInputElement).value;
    const email = (document.getElementById("contactEmail") as HTMLInputElement).value;
    const phone = (document.getElementById("contactPhone") as HTMLInputElement).value;
    
    if (name) {
      const newConvo: Conversation = {
        id: `u${Date.now()}`,
        name,
        last: "New conversation",
        messages: [],
        email: email || undefined,
        phone: phone || undefined
      };
      
      conversations.push(newConvo);
      renderConversations(convoSearch.value);
      modal.style.display = "none";
      
      // Automatically select the newly created contact
      selectConversation(newConvo.id);
    }
  });
}

// Settings navigation functions
function navigateToProfile() {
  // Hide the main content and show profile edit page
  const mainContent = document.querySelector('.content') as HTMLElement;
  mainContent.innerHTML = `
    <div class="profile-edit-page">
      <h1 class="page-title">Edit Profile</h1>
      <p class="page-sub">Update your profile information</p>
      
      <div class="profile-form">
        <div class="form-group">
          <label for="profileName">Name</label>
          <input type="text" id="profileName" class="form-control" value="Admin User">
        </div>
        <div class="form-group">
          <label for="profileEmail">Email</label>
          <input type="email" id="profileEmail" class="form-control" value="admin@example.com">
        </div>
        <div class="form-group">
          <label for="profilePhone">Phone</label>
          <input type="tel" id="profilePhone" class="form-control" value="+1234567890">
        </div>
        <div class="form-group">
          <label for="profileRole">Role</label>
          <input type="text" id="profileRole" class="form-control" value="Admin" readonly>
        </div>
        <div class="form-actions">
          <button id="cancelProfileBtn" class="btn btn-secondary">Cancel</button>
          <button id="saveProfileBtn" class="btn btn-primary">Save Changes</button>
        </div>
      </div>
    </div>
  `;
  
  // Add event listeners for profile buttons
  const cancelProfileBtn = document.getElementById("cancelProfileBtn") as HTMLButtonElement;
  const saveProfileBtn = document.getElementById("saveProfileBtn") as HTMLButtonElement;
  
  cancelProfileBtn.addEventListener("click", () => {
    // Reload the main messages page
    window.location.reload();
  });
  
  saveProfileBtn.addEventListener("click", () => {
    alert("Profile saved successfully!");
    // Reload the main messages page
    window.location.reload();
  });
}

function navigateToSettings() {
  // Hide the main content and show settings page
  const mainContent = document.querySelector('.content') as HTMLElement;
  mainContent.innerHTML = `
    <div class="settings-page">
      <h1 class="page-title">Settings</h1>
      <p class="page-sub">Manage your application settings</p>
      
      <div class="settings-section">
        <h2>General Settings</h2>
        <div class="setting-item">
          <label for="notifications">Enable Notifications</label>
          <label class="switch">
            <input type="checkbox" id="notifications" checked>
            <span class="slider"></span>
          </label>
        </div>
        <div class="setting-item">
          <label for="darkMode">Dark Mode</label>
          <label class="switch">
            <input type="checkbox" id="darkMode">
            <span class="slider"></span>
          </label>
        </div>
      </div>
      
      <div class="settings-section">
        <h2>Privacy Settings</h2>
        <div class="setting-item">
          <label for="lastSeen">Last Seen</label>
          <select id="lastSeen" class="form-control">
            <option value="everyone">Everyone</option>
            <option value="contacts" selected>My Contacts</option>
            <option value="nobody">Nobody</option>
          </select>
        </div>
        <div class="setting-item">
          <label for="profilePhoto">Profile Photo</label>
          <select id="profilePhoto" class="form-control">
            <option value="everyone">Everyone</option>
            <option value="contacts" selected>My Contacts</option>
            <option value="nobody">Nobody</option>
          </select>
        </div>
      </div>
      
      <div class="settings-section">
        <h2>Security</h2>
        <div class="setting-item">
          <label for="twoFactor">Two-Factor Authentication</label>
          <label class="switch">
            <input type="checkbox" id="twoFactor">
            <span class="slider"></span>
          </label>
        </div>
      </div>
      
      <div class="form-actions">
        <button id="backToMessagesBtn" class="btn btn-secondary">Back to Messages</button>
        <button id="saveSettingsBtn" class="btn btn-primary">Save Settings</button>
      </div>
    </div>
  `;
  
  // Add event listeners for settings buttons
  const backToMessagesBtn = document.getElementById("backToMessagesBtn") as HTMLButtonElement;
  const saveSettingsBtn = document.getElementById("saveSettingsBtn") as HTMLButtonElement;
  
  backToMessagesBtn.addEventListener("click", () => {
    // Reload the main messages page
    window.location.reload();
  });
  
  saveSettingsBtn.addEventListener("click", () => {
    alert("Settings saved successfully!");
    // Reload the main messages page
    window.location.reload();
  });
}

function navigateToHelp() {
  alert("Help & Support page would be displayed here");
}

function navigateToAdmin() {
  alert("Admin Panel page would be displayed here");
}

// events
sendBtn.addEventListener("click", sendMessage);
messageInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") sendMessage();
});
convoSearch.addEventListener("input", () => {
  renderConversations(convoSearch.value);
});

// New event listeners
newContactBtn.addEventListener("click", createContactModal);
archiveBtn.addEventListener("click", archiveConversation);
starBtn.addEventListener("click", starConversation);
editBtn.addEventListener("click", () => {
  alert("Edit functionality would be implemented here");
});
deleteBtn.addEventListener("click", deleteConversation);

// Settings event listeners
profileBtn.addEventListener("click", navigateToProfile);
settingsBtn.addEventListener("click", navigateToSettings);
helpBtn.addEventListener("click", navigateToHelp);
adminBtn.addEventListener("click", navigateToAdmin);

// dark mode toggle
function setDarkMode(enabled: boolean) {
  if (enabled) document.body.classList.add("dark");
  else document.body.classList.remove("dark");
  // store
  try { localStorage.setItem("wz_dark", enabled ? "1" : "0"); } catch {}
}
darkToggle.addEventListener("change", () => setDarkMode(darkToggle.checked));

// initial load
(function init() {
  // populate convo list
  const savedDark = (() => {
    try { return localStorage.getItem("wz_dark"); } catch { return null; }
  })();
  if (savedDark === "1") {
    darkToggle.checked = true;
    setDarkMode(true);
  }

  renderConversations();
  renderChat(null);
})();