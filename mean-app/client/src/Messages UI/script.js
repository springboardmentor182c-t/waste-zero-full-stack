// script.ts
// Plain TypeScript to power the UI: conversation selection, sending messages, search, dark mode.
// Compile with: tsc script.ts (target ES6 / DOM)
const conversations = [
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
const convoItemsEl = document.getElementById("convoItems");
const chatArea = document.getElementById("chatArea");
const chatTitle = document.getElementById("chatTitle");
const messageForm = document.getElementById("messageForm");
const messageInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");
const convoSearch = document.getElementById("convoSearch");
const darkToggle = document.getElementById("darkToggle");
// New elements
const newContactBtn = document.getElementById("newContactBtn");
// Settings elements
const profileBtn = document.getElementById("profileBtn");
const settingsBtn = document.getElementById("settingsBtn");
const helpBtn = document.getElementById("helpBtn");
const adminBtn = document.getElementById("adminBtn");
// Dropdown elements
const optionsBtn = document.getElementById("optionsBtn");
const optionsDropdown = document.getElementById("optionsDropdown");
const archiveOption = document.getElementById("archiveOption");
const starOption = document.getElementById("starOption");
const editOption = document.getElementById("editOption");
const deleteOption = document.getElementById("deleteOption");
// Star button element
const starBtn = document.getElementById("starOption");
// Contacts page elements
const contactsMenuItem = document.getElementById("contactsMenuItem");
const messagesMenuItem = document.getElementById("messagesMenuItem");
const messagesPage = document.getElementById("messagesPage");
const contactsPage = document.getElementById("contactsPage");
const contactsList = document.getElementById("contactsList");
const contactsSearch = document.getElementById("contactsSearch");
const newContactBtn2 = document.getElementById("newContactBtn2");
const contactInfo = document.getElementById("contactInfo");
const archiveContactBtn = document.getElementById("archiveContactBtn");
const favoriteContactBtn = document.getElementById("favoriteContactBtn");
const editContactBtn = document.getElementById("editContactBtn");
const deleteContactBtn = document.getElementById("deleteContactBtn");
// Contact page messaging elements
const contactNameHeader = document.getElementById("contactNameHeader");
const contactChatArea = document.getElementById("contactChatArea");
const contactMessageForm = document.getElementById("contactMessageForm");
const contactMessageInput = document.getElementById("contactMessageInput");
const contactSendBtn = document.getElementById("contactSendBtn");
// Contact dropdown elements
const contactOptionsBtn = document.getElementById("contactOptionsBtn");
const contactOptionsDropdown = document.getElementById("contactOptionsDropdown");
const contactArchiveOption = document.getElementById("contactArchiveOption");
const contactStarOption = document.getElementById("contactStarOption");
const contactEditOption = document.getElementById("contactEditOption");
const contactDeleteOption = document.getElementById("contactDeleteOption");
// Archived contacts page elements
const archivedContactsMenuItem = document.getElementById("archivedContactsMenuItem");
const archivedContactsPage = document.getElementById("archivedContactsPage");
const archivedContactsList = document.getElementById("archivedContactsList");
const archivedContactsSearch = document.getElementById("archivedContactsSearch");
const archivedContactInfo = document.getElementById("archivedContactInfo");
const unarchiveContactBtn = document.getElementById("unarchiveContactBtn");
const deleteArchivedContactBtn = document.getElementById("deleteArchivedContactBtn");
const unarchiveAllBtn = document.getElementById("unarchiveAllBtn");
const archivedContactNameHeader = document.getElementById("archivedContactNameHeader");
let selectedConvoId = null;
let selectedContactId = null;
let selectedArchivedContactId = null;
function formatTime(date = new Date()) {
    const h = date.getHours();
    const m = date.getMinutes().toString().padStart(2, "0");
    const hh = ((h + 11) % 12) + 1;
    const ampm = h >= 12 ? "PM" : "AM";
    return `${hh}:${m} ${ampm}`;
}
function renderConversations(filter = "") {
    convoItemsEl.innerHTML = "";
    const list = conversations.filter(c => !c.archived &&
        c.name.toLowerCase().includes(filter.toLowerCase()));
    list.forEach(c => {
        var _a, _b;
        const li = document.createElement("li");
        li.className = "convo-item" + (c.id === selectedConvoId ? " selected" : "");
        li.innerHTML = `
      <div class="u-initial">${c.name[0]}</div>
      <div class="meta">
        <div class="u-name">${c.name} ${c.starred ? "⭐" : ""}</div>
        <div class="u-last">${c.last}</div>
      </div>
      <div class="time">${(_b = (_a = c.messages[c.messages.length - 1]) === null || _a === void 0 ? void 0 : _a.time) !== null && _b !== void 0 ? _b : ""}</div>
    `;
        li.addEventListener("click", () => {
            selectConversation(c.id);
        });
        convoItemsEl.appendChild(li);
    });
}
function renderContacts(filter = "") {
    contactsList.innerHTML = "";
    const list = conversations.filter(c => 
        !c.archived &&
        c.name.toLowerCase().includes(filter.toLowerCase()));
    list.forEach(c => {
        const li = document.createElement("li");
        li.className = "convo-item" + (c.id === selectedContactId ? " selected" : "");
        li.innerHTML = `
      <div class="u-initial">${c.name[0]}</div>
      <div class="meta">
        <div class="u-name">${c.name} ${c.starred ? "⭐" : ""}</div>
        <div class="u-last">${c.last}</div>
      </div>
    `;
        li.addEventListener("click", () => {
            selectContact(c.id);
        });
        contactsList.appendChild(li);
    });
}
function renderChat(convoId) {
    chatArea.innerHTML = "";
    if (!convoId) {
        chatTitle.textContent = "Select a conversation";
        const empty = document.createElement("div");
        empty.className = "msg system";
        empty.textContent = "No conversation selected. Choose a chat from the left.";
        chatArea.appendChild(empty);
        return;
    }
    const convo = conversations.find(c => c.id === convoId);
    chatTitle.textContent = convo.name;
    // Update star button based on conversation status
    if (convo.starred) {
        starBtn.textContent = "★";
        starBtn.title = "Unstar";
    }
    else {
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
function renderContactInfo(contactId) {
    const contact = conversations.find(c => c.id === contactId);
    if (!contact) {
        contactInfo.innerHTML = "<p>Select a contact to view details</p>";
        return;
    }
    
    let contactHTML = `
      <div class="contact-info-item">
        <div class="contact-info-label">Name</div>
        <div class="contact-info-value">${contact.name}</div>
      </div>
    `;
    
    if (contact.email) {
        contactHTML += `
          <div class="contact-info-item">
            <div class="contact-info-label">Email</div>
            <div class="contact-info-value">${contact.email}</div>
          </div>
        `;
    }
    
    if (contact.phone) {
        contactHTML += `
          <div class="contact-info-item">
            <div class="contact-info-label">Phone</div>
            <div class="contact-info-value">${contact.phone}</div>
          </div>
        `;
    }
    
    contactHTML += `
      <div class="contact-info-item">
        <div class="contact-info-label">Status</div>
        <div class="contact-info-value">${contact.starred ? "Favorite" : "Regular"}</div>
      </div>
      <div class="contact-info-item">
        <div class="contact-info-label">Archived</div>
        <div class="contact-info-value">${contact.archived ? "Yes" : "No"}</div>
      </div>
    `;
    
    contactInfo.innerHTML = contactHTML;
    
    // Update favorite button text
    if (contact.starred) {
        favoriteContactBtn.innerHTML = '<span class="btn-icon">★</span><span>Unfavorite</span>';
    } else {
        favoriteContactBtn.innerHTML = '<span class="btn-icon">☆</span><span>Favorite</span>';
    }
}

function renderContactChat(contactId) {
    contactChatArea.innerHTML = "";
    if (!contactId) {
        contactNameHeader.textContent = "Select a contact";
        const empty = document.createElement("div");
        empty.className = "msg system";
        empty.textContent = "No contact selected. Choose a contact from the left.";
        contactChatArea.appendChild(empty);
        return;
    }
    const contact = conversations.find(c => c.id === contactId);
    contactNameHeader.textContent = contact.name;
    
    contact.messages.forEach(m => {
        const d = document.createElement("div");
        d.className = "msg " + (m.from === "me" ? "outgoing" : (m.from === "them" ? "incoming" : "system"));
        d.innerHTML = `<div class="text">${escapeHtml(m.text)}</div><div class="time" style="font-size:11px;color:#64748b;margin-top:6px">${m.time}</div>`;
        contactChatArea.appendChild(d);
    });
    
    // scroll to bottom
    setTimeout(() => {
        contactChatArea.scrollTop = contactChatArea.scrollHeight;
    }, 50);
}

function selectConversation(id) {
    selectedConvoId = id;
    renderConversations(convoSearch.value);
    renderChat(id);
    
    // Automatically select the newly created contact
    if (id.startsWith('u') && id.length > 10) {
        // This is a newly created contact
        const convo = conversations.find(c => c.id === id);
        if (convo) {
            convo.last = "New conversation";
        }
    }
}

function selectContact(id) {
    selectedContactId = id;
    renderContacts(contactsSearch.value);
    renderContactInfo(id);
    renderContactChat(id);
}

function sendMessage() {
    const text = messageInput.value.trim();
    if (!text || !selectedConvoId)
        return;
    const convo = conversations.find(c => c.id === selectedConvoId);
    const msg = { id: `m${Date.now()}`, text, time: formatTime(), from: "me" };
    convo.messages.push(msg);
    convo.last = `You: ${text.length > 30 ? text.slice(0, 30) + "..." : text}`;
    messageInput.value = "";
    renderConversations(convoSearch.value);
    renderChat(selectedConvoId);
    // very simple automated reply after 800ms for demo
    setTimeout(() => {
        convo.messages.push({ id: `m${Date.now() + 1}`, text: "Thanks for the message — we'll get back soon!", time: formatTime(), from: "them" });
        renderConversations(convoSearch.value);
        renderChat(selectedConvoId);
    }, 800);
}

function sendContactMessage() {
    const text = contactMessageInput.value.trim();
    if (!text || !selectedContactId)
        return;
    const contact = conversations.find(c => c.id === selectedContactId);
    const msg = { id: `m${Date.now()}`, text, time: formatTime(), from: "me" };
    contact.messages.push(msg);
    contact.last = `You: ${text.length > 30 ? text.slice(0, 30) + "..." : text}`;
    contactMessageInput.value = "";
    renderContacts(contactsSearch.value);
    renderContactChat(selectedContactId);
    
    // very simple automated reply after 800ms for demo
    setTimeout(() => {
        contact.messages.push({ id: `m${Date.now() + 1}`, text: "Thanks for the message — we'll get back soon!", time: formatTime(), from: "them" });
        renderContacts(contactsSearch.value);
        renderContactChat(selectedContactId);
    }, 800);
}

function escapeHtml(unsafe) {
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
    if (!selectedConvoId)
        return;
    const convo = conversations.find(c => c.id === selectedConvoId);
    convo.archived = !convo.archived;
    if (convo.archived) {
        selectedConvoId = null;
        renderChat(null);
        chatTitle.textContent = "Conversation Archived";
        // Automatically navigate to archived contacts page
        showArchivedContactsPage();
    }
    renderConversations(convoSearch.value);
    renderArchivedContacts(archivedContactsSearch.value);
}
function starConversation() {
    if (!selectedConvoId)
        return;
    const convo = conversations.find(c => c.id === selectedConvoId);
    convo.starred = !convo.starred;
    renderConversations(convoSearch.value);
    renderChat(selectedConvoId);
}
function deleteConversation() {
    if (!selectedConvoId)
        return;
    if (confirm("Are you sure you want to delete this conversation?")) {
        const index = conversations.findIndex(c => c.id === selectedConvoId);
        conversations.splice(index, 1);
        selectedConvoId = null;
        renderConversations(convoSearch.value);
        renderChat(null);
    }
}
function archiveContact() {
    if (!selectedContactId)
        return;
    const contact = conversations.find(c => c.id === selectedContactId);
    contact.archived = !contact.archived;
    renderContacts(contactsSearch.value);
    renderContactInfo(selectedContactId);
    renderArchivedContacts(archivedContactsSearch.value);
    if (contact.archived) {
        // Automatically navigate to archived contacts page
        showArchivedContactsPage();
        // Select the newly archived contact
        selectArchivedContact(contact.id);
    }
    alert(`Contact ${contact.archived ? "archived" : "unarchived"} successfully!`);
}
function favoriteContact() {
    if (!selectedContactId)
        return;
    const contact = conversations.find(c => c.id === selectedContactId);
    contact.starred = !contact.starred;
    renderContacts(contactsSearch.value);
    renderContactInfo(selectedContactId);
    alert(`Contact ${contact.starred ? "favorited" : "unfavorited"} successfully!`);
}
function deleteContact() {
    if (!selectedContactId)
        return;
    if (confirm("Are you sure you want to delete this contact?")) {
        const index = conversations.findIndex(c => c.id === selectedContactId);
        const contactName = conversations[index].name;
        conversations.splice(index, 1);
        selectedContactId = null;
        renderContacts(contactsSearch.value);
        contactInfo.innerHTML = "<p>Select a contact to view details</p>";
        alert(`Contact "${contactName}" deleted successfully!`);
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
    const closeBtn = modal.querySelector(".close-btn");
    const cancelBtn = modal.querySelector("#cancelBtn");
    const contactForm = modal.querySelector("#contactForm");
    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });
    cancelBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });
    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("contactName").value;
        const email = document.getElementById("contactEmail").value;
        const phone = document.getElementById("contactPhone").value;
        if (name) {
            const newConvo = {
                id: `u${Date.now()}`,
                name,
                last: "New conversation",
                messages: [],
                email: email || undefined,
                phone: phone || undefined
            };
            conversations.push(newConvo);
            renderConversations(convoSearch.value);
            renderContacts(contactsSearch.value);
            modal.style.display = "none";
            
            // Check which page we're on and act accordingly
            if (contactsPage.style.display === "block") {
                // We're on the contacts page, so select the new contact there
                selectContact(newConvo.id);
            } else {
                // We're on the messages page, so select the new conversation there
                selectConversation(newConvo.id);
            }
        }
    });
}

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
    // Close messages page dropdown
    if (!optionsBtn.contains(event.target) && !optionsDropdown.contains(event.target)) {
        optionsDropdown.classList.remove('show');
    }
    // Close contacts page dropdown
    if (!contactOptionsBtn.contains(event.target) && !contactOptionsDropdown.contains(event.target)) {
        contactOptionsDropdown.classList.remove('show');
    }
});

function renderArchivedContacts(filter = "") {
    archivedContactsList.innerHTML = "";
    const list = conversations.filter(c => 
        c.archived &&
        c.name.toLowerCase().includes(filter.toLowerCase()));
    list.forEach(c => {
        const li = document.createElement("li");
        li.className = "convo-item" + (c.id === selectedArchivedContactId ? " selected" : "");
        li.innerHTML = `
      <div class="u-initial">${c.name[0]}</div>
      <div class="meta">
        <div class="u-name">${c.name} ${c.starred ? "⭐" : ""}</div>
        <div class="u-last">${c.last}</div>
      </div>
    `;
        li.addEventListener("click", () => {
            selectArchivedContact(c.id);
        });
        archivedContactsList.appendChild(li);
    });
}

function renderArchivedContactInfo(contactId) {
    const contact = conversations.find(c => c.id === contactId);
    if (!contact) {
        archivedContactInfo.innerHTML = "<p>Select an archived contact to view details</p>";
        return;
    }
    
    let contactHTML = `
      <div class="contact-info-item">
        <div class="contact-info-label">Name</div>
        <div class="contact-info-value">${contact.name}</div>
      </div>
    `;
    
    if (contact.email) {
        contactHTML += `
          <div class="contact-info-item">
            <div class="contact-info-label">Email</div>
            <div class="contact-info-value">${contact.email}</div>
          </div>
        `;
    }
    
    if (contact.phone) {
        contactHTML += `
          <div class="contact-info-item">
            <div class="contact-info-label">Phone</div>
            <div class="contact-info-value">${contact.phone}</div>
          </div>
        `;
    }
    
    contactHTML += `
      <div class="contact-info-item">
        <div class="contact-info-label">Status</div>
        <div class="contact-info-value">${contact.starred ? "Favorite" : "Regular"}</div>
      </div>
      <div class="contact-info-item">
        <div class="contact-info-label">Archived</div>
        <div class="contact-info-value">Yes</div>
      </div>
    `;
    
    archivedContactInfo.innerHTML = contactHTML;
}

function selectArchivedContact(id) {
    selectedArchivedContactId = id;
    renderArchivedContacts(archivedContactsSearch.value);
    renderArchivedContactInfo(id);
}

function unarchiveContact() {
    if (!selectedArchivedContactId)
        return;
    const contact = conversations.find(c => c.id === selectedArchivedContactId);
    contact.archived = false;
    renderArchivedContacts(archivedContactsSearch.value);
    renderContacts(contactsSearch.value);
    archivedContactInfo.innerHTML = "<p>Select an archived contact to view details</p>";
    selectedArchivedContactId = null;
    // Automatically navigate to contacts page
    showContactsPage();
    alert(`Contact "${contact.name}" unarchived successfully!`);
}

function unarchiveAllContacts() {
    const archivedContacts = conversations.filter(c => c.archived);
    if (archivedContacts.length === 0) {
        alert("No archived contacts to unarchive!");
        return;
    }
    
    if (confirm(`Are you sure you want to unarchive all ${archivedContacts.length} contacts?`)) {
        archivedContacts.forEach(contact => {
            contact.archived = false;
        });
        renderArchivedContacts(archivedContactsSearch.value);
        renderContacts(contactsSearch.value);
        archivedContactInfo.innerHTML = "<p>Select an archived contact to view details</p>";
        selectedArchivedContactId = null;
        // Automatically navigate to contacts page
        showContactsPage();
        alert(`${archivedContacts.length} contacts unarchived successfully!`);
    }
}

function deleteArchivedContact() {
    if (!selectedArchivedContactId)
        return;
    if (confirm("Are you sure you want to permanently delete this archived contact?")) {
        const index = conversations.findIndex(c => c.id === selectedArchivedContactId);
        const contactName = conversations[index].name;
        conversations.splice(index, 1);
        selectedArchivedContactId = null;
        renderArchivedContacts(archivedContactsSearch.value);
        archivedContactInfo.innerHTML = "<p>Select an archived contact to view details</p>";
        alert(`Contact "${contactName}" deleted permanently!`);
    }
}

// Navigation functions
function showMessagesPage() {
    messagesPage.style.display = "block";
    contactsPage.style.display = "none";
    archivedContactsPage.style.display = "none";
    messagesMenuItem.classList.add("active");
    contactsMenuItem.classList.remove("active");
    archivedContactsMenuItem.classList.remove("active");
}

function showContactsPage() {
    messagesPage.style.display = "none";
    contactsPage.style.display = "block";
    archivedContactsPage.style.display = "none";
    contactsMenuItem.classList.add("active");
    messagesMenuItem.classList.remove("active");
    archivedContactsMenuItem.classList.remove("active");
    renderContacts();
}

function showArchivedContactsPage() {
    messagesPage.style.display = "none";
    contactsPage.style.display = "none";
    archivedContactsPage.style.display = "block";
    archivedContactsMenuItem.classList.add("active");
    messagesMenuItem.classList.remove("active");
    contactsMenuItem.classList.remove("active");
    renderArchivedContacts();
}

// Settings navigation functions
function navigateToProfile() {
    // Hide the main content and show profile edit page
    const mainContent = document.querySelector('.content');
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
    const cancelProfileBtn = document.getElementById("cancelProfileBtn");
    const saveProfileBtn = document.getElementById("saveProfileBtn");
  
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
    const mainContent = document.querySelector('.content');
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
    const backToMessagesBtn = document.getElementById("backToMessagesBtn");
    const saveSettingsBtn = document.getElementById("saveSettingsBtn");
  
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
    if (e.key === "Enter")
        sendMessage();
});
convoSearch.addEventListener("input", () => {
    renderConversations(convoSearch.value);
});
contactsSearch.addEventListener("input", () => {
    renderContacts(contactsSearch.value);
});
// New event listeners
newContactBtn.addEventListener("click", function() {
    // Redirect to contacts page and open new contact modal
    showContactsPage();
    setTimeout(() => {
        createContactModal();
    }, 100);
});
newContactBtn2.addEventListener("click", createContactModal);

// Dropdown event listeners
optionsBtn.addEventListener("click", function(event) {
    event.stopPropagation();
    optionsDropdown.classList.toggle("show");
});

archiveOption.addEventListener("click", function() {
    optionsDropdown.classList.remove("show");
    archiveConversation();
});

starOption.addEventListener("click", function() {
    optionsDropdown.classList.remove("show");
    starConversation();
});

editOption.addEventListener("click", function() {
    optionsDropdown.classList.remove("show");
    alert("Edit functionality would be implemented here");
});

deleteOption.addEventListener("click", function() {
    optionsDropdown.classList.remove("show");
    deleteConversation();
});

// Contacts page event listeners
contactsMenuItem.addEventListener("click", showContactsPage);
messagesMenuItem.addEventListener("click", showMessagesPage);

// Contact messaging event listeners
contactSendBtn.addEventListener("click", sendContactMessage);
contactMessageInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter")
        sendContactMessage();
});

// Contact dropdown event listeners
contactOptionsBtn.addEventListener("click", function(event) {
    event.stopPropagation();
    contactOptionsDropdown.classList.toggle("show");
});

contactArchiveOption.addEventListener("click", function() {
    contactOptionsDropdown.classList.remove("show");
    archiveContact();
});

contactStarOption.addEventListener("click", function() {
    contactOptionsDropdown.classList.remove("show");
    favoriteContact();
});

contactEditOption.addEventListener("click", function() {
    contactOptionsDropdown.classList.remove("show");
    if (!selectedContactId) {
        alert("Please select a contact first");
        return;
    }
    alert("Edit contact functionality would be implemented here");
});

contactDeleteOption.addEventListener("click", function() {
    contactOptionsDropdown.classList.remove("show");
    deleteContact();
});

archiveContactBtn.addEventListener("click", archiveContact);
favoriteContactBtn.addEventListener("click", favoriteContact);
editContactBtn.addEventListener("click", function() {
    if (!selectedContactId) {
        alert("Please select a contact first");
        return;
    }
    alert("Edit contact functionality would be implemented here");
});
deleteContactBtn.addEventListener("click", deleteContact);

// Settings event listeners
if (profileBtn) profileBtn.addEventListener("click", navigateToProfile);
if (settingsBtn) settingsBtn.addEventListener("click", navigateToSettings);
if (helpBtn) helpBtn.addEventListener("click", navigateToHelp);
if (adminBtn) adminBtn.addEventListener("click", navigateToAdmin);

// dark mode toggle
function setDarkMode(enabled) {
    if (enabled)
        document.body.classList.add("dark");
    else
        document.body.classList.remove("dark");
    // store
    try {
        localStorage.setItem("wz_dark", enabled ? "1" : "0");
    }
    catch (_a) { }
}
darkToggle.addEventListener("change", () => setDarkMode(darkToggle.checked));
// initial load
(function init() {
    // populate convo list
    const savedDark = (() => {
        try {
            return localStorage.getItem("wz_dark");
        }
        catch (_a) {
            return null;
        }
    })();
    if (savedDark === "1") {
        darkToggle.checked = true;
        setDarkMode(true);
    }
    renderConversations();
    renderChat(null);
})();

// Archived contacts page event listeners
archivedContactsMenuItem.addEventListener("click", showArchivedContactsPage);
unarchiveContactBtn.addEventListener("click", unarchiveContact);
deleteArchivedContactBtn.addEventListener("click", deleteArchivedContact);
unarchiveAllBtn.addEventListener("click", unarchiveAllContacts);
archivedContactsSearch.addEventListener("input", () => {
    renderArchivedContacts(archivedContactsSearch.value);
});
