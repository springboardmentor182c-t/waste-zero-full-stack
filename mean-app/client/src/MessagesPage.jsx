import React, { useState } from 'react';
import { 
  MessageCircle, 
  Send, 
  Paperclip, 
  Menu, 
  Bell, 
  User, 
  Settings, 
  Home, 
  Users, 
  Archive, 
  Star, 
  Trash2,
  ChevronDown,
  Globe,
  Plus,
  X,
  Edit3
} from 'lucide-react';

const MessagesPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const [currentLanguage, setCurrentLanguage] = useState('English');
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  
  // Language translations
  const translations = {
    English: {
      messages: "Messages",
      contacts: "Contacts",
      archived: "Archived Chats",
      starred: "Starred Chats",
      trash: "Trash",
      home: "Home",
      settings: "Settings",
      profile: "Profile",
      notifications: "Notifications",
      markAllRead: "Mark all as read",
      editProfile: "Edit Profile",
      viewProfile: "View Profile",
      createContact: "New Contact",
      typeMessage: "Type a message...",
      send: "Send",
      attachment: "Attachment",
      saveSettings: "Save Settings",
      accountSettings: "Account Settings",
      privacySettings: "Privacy Settings",
      appearance: "Appearance",
      enableNotifications: "Enable notifications",
      emailNotifications: "Email notifications",
      showOnlineStatus: "Show online status",
      readReceipts: "Read receipts",
      lightTheme: "Light Theme",
      darkTheme: "Dark Theme",
      starContact: "Star Contact",
      unstarContact: "Unstar Contact",
      archiveContact: "Archive Contact",
      moveToTrash: "Move to Trash",
      restore: "Restore",
      delete: "Delete",
      contactDetails: "Contact Details",
      status: "Status",
      email: "Email",
      phone: "Phone",
      admin: "Admin",
      noArchivedChats: "No archived chats yet.",
      noStarredChats: "No starred chats yet.",
      noTrash: "No chats in trash.",
      trashMessage: "Chats you've deleted will appear here for 30 days before being permanently deleted.",
      archivedMessage: "Chats you've archived will appear here.",
      starredMessage: "Chats you've starred will appear here.",
      // Chat messages translations
      chatMessages: {
        1: [
          { id: 1, text: "Hey, how are you doing?", sender: "contact", time: "10:30 AM" },
          { id: 2, text: "I'm doing great! Just finished the project.", sender: "user", time: "10:32 AM" },
          { id: 3, text: "That's awesome! Can you share the details?", sender: "contact", time: "10:33 AM" }
        ],
        2: [
          { id: 1, text: "Don't forget about the meeting tomorrow", sender: "contact", time: "09:15 AM" },
          { id: 2, text: "Thanks for the reminder!", sender: "user", time: "09:20 AM" }
        ],
        3: [
          { id: 1, text: "Welcome to the admin panel", sender: "contact", time: "08:00 AM" },
          { id: 2, text: "Thank you!", sender: "user", time: "08:05 AM" },
          { id: 3, text: "Please review the new policies", sender: "contact", time: "08:10 AM" }
        ]
      }
    },
    French: {
      messages: "Messages",
      contacts: "Contacts",
      archived: "Chats archivés",
      starred: "Chats favoris",
      trash: "Corbeille",
      home: "Accueil",
      settings: "Paramètres",
      profile: "Profil",
      notifications: "Notifications",
      markAllRead: "Tout marquer comme lu",
      editProfile: "Modifier le profil",
      viewProfile: "Voir le profil",
      createContact: "Nouveau contact",
      typeMessage: "Tapez un message...",
      send: "Envoyer",
      attachment: "Pièce jointe",
      saveSettings: "Sauvegarder les paramètres",
      accountSettings: "Paramètres du compte",
      privacySettings: "Paramètres de confidentialité",
      appearance: "Apparence",
      enableNotifications: "Activer les notifications",
      emailNotifications: "Notifications par email",
      showOnlineStatus: "Afficher le statut en ligne",
      readReceipts: "Accusés de lecture",
      lightTheme: "Thème clair",
      darkTheme: "Thème sombre",
      starContact: "Mettre en favori",
      unstarContact: "Retirer des favoris",
      archiveContact: "Archiver le contact",
      moveToTrash: "Déplacer vers la corbeille",
      restore: "Restaurer",
      delete: "Supprimer",
      contactDetails: "Détails du contact",
      status: "Statut",
      email: "Email",
      phone: "Téléphone",
      admin: "Administrateur",
      noArchivedChats: "Aucun chat archivé pour le moment.",
      noStarredChats: "Aucun chat favori pour le moment.",
      noTrash: "Aucun chat dans la corbeille.",
      trashMessage: "Les chats que vous avez supprimés apparaîtront ici pendant 30 jours avant d'être définitivement supprimés.",
      archivedMessage: "Les chats que vous avez archivés apparaîtront ici.",
      starredMessage: "Les chats que vous avez mis en favori apparaîtront ici.",
      // Chat messages translations
      chatMessages: {
        1: [
          { id: 1, text: "Salut, comment ça va ?", sender: "contact", time: "10:30 AM" },
          { id: 2, text: "Ça va super ! Je viens de finir le projet.", sender: "user", time: "10:32 AM" },
          { id: 3, text: "C'est génial ! Tu peux partager les détails ?", sender: "contact", time: "10:33 AM" }
        ],
        2: [
          { id: 1, text: "N'oublie pas la réunion demain", sender: "contact", time: "09:15 AM" },
          { id: 2, text: "Merci pour le rappel !", sender: "user", time: "09:20 AM" }
        ],
        3: [
          { id: 1, text: "Bienvenue dans le panneau d'administration", sender: "contact", time: "08:00 AM" },
          { id: 2, text: "Merci !", sender: "user", time: "08:05 AM" },
          { id: 3, text: "Veuillez consulter les nouvelles politiques", sender: "contact", time: "08:10 AM" }
        ]
      }
    },
    Spanish: {
      messages: "Mensajes",
      contacts: "Contactos",
      archived: "Chats archivados",
      starred: "Chats destacados",
      trash: "Papelera",
      home: "Inicio",
      settings: "Configuración",
      profile: "Perfil",
      notifications: "Notificaciones",
      markAllRead: "Marcar todo como leído",
      editProfile: "Editar perfil",
      viewProfile: "Ver perfil",
      createContact: "Nuevo contacto",
      typeMessage: "Escribe un mensaje...",
      send: "Enviar",
      attachment: "Adjunto",
      saveSettings: "Guardar configuración",
      accountSettings: "Configuración de cuenta",
      privacySettings: "Configuración de privacidad",
      appearance: "Apariencia",
      enableNotifications: "Habilitar notificaciones",
      emailNotifications: "Notificaciones por email",
      showOnlineStatus: "Mostrar estado en línea",
      readReceipts: "Confirmaciones de lectura",
      lightTheme: "Tema claro",
      darkTheme: "Tema oscuro",
      starContact: "Destacar contacto",
      unstarContact: "Quitar destacado",
      archiveContact: "Archivar contacto",
      moveToTrash: "Mover a la papelera",
      restore: "Restaurar",
      delete: "Eliminar",
      contactDetails: "Detalles del contacto",
      status: "Estado",
      email: "Correo electrónico",
      phone: "Teléfono",
      admin: "Administrador",
      noArchivedChats: "Aún no hay chats archivados.",
      noStarredChats: "Aún no hay chats destacados.",
      noTrash: "No hay chats en la papelera.",
      trashMessage: "Los chats que hayas eliminado aparecerán aquí durante 30 días antes de ser eliminados permanentemente.",
      archivedMessage: "Los chats que hayas archivado aparecerán aquí.",
      starredMessage: "Los chats que hayas destacado aparecerán aquí.",
      // Chat messages translations
      chatMessages: {
        1: [
          { id: 1, text: "¡Hola, ¿cómo estás?", sender: "contact", time: "10:30 AM" },
          { id: 2, text: "¡Estoy muy bien! Acabo de terminar el proyecto.", sender: "user", time: "10:32 AM" },
          { id: 3, text: "¡Eso es genial! ¿Puedes compartir los detalles?", sender: "contact", time: "10:33 AM" }
        ],
        2: [
          { id: 1, text: "No olvides la reunión de mañana", sender: "contact", time: "09:15 AM" },
          { id: 2, text: "¡Gracias por el recordatorio!", sender: "user", time: "09:20 AM" }
        ],
        3: [
          { id: 1, text: "Bienvenido al panel de administración", sender: "contact", time: "08:00 AM" },
          { id: 2, text: "¡Gracias!", sender: "user", time: "08:05 AM" },
          { id: 3, text: "Por favor revisa las nuevas políticas", sender: "contact", time: "08:10 AM" }
        ]
      }
    },
    German: {
      messages: "Nachrichten",
      contacts: "Kontakte",
      archived: "Archivierte Chats",
      starred: "Markierte Chats",
      trash: "Papierkorb",
      home: "Startseite",
      settings: "Einstellungen",
      profile: "Profil",
      notifications: "Benachrichtigungen",
      markAllRead: "Alle als gelesen markieren",
      editProfile: "Profil bearbeiten",
      viewProfile: "Profil anzeigen",
      createContact: "Neuer Kontakt",
      typeMessage: "Nachricht eingeben...",
      send: "Senden",
      attachment: "Anhang",
      saveSettings: "Einstellungen speichern",
      accountSettings: "Kontoeinstellungen",
      privacySettings: "Datenschutzeinstellungen",
      appearance: "Erscheinungsbild",
      enableNotifications: "Benachrichtigungen aktivieren",
      emailNotifications: "E-Mail-Benachrichtigungen",
      showOnlineStatus: "Online-Status anzeigen",
      readReceipts: "Lesebestätigungen",
      lightTheme: "Helles Thema",
      darkTheme: "Dunkles Thema",
      starContact: "Kontakt markieren",
      unstarContact: "Markierung entfernen",
      archiveContact: "Kontakt archivieren",
      moveToTrash: "In den Papierkorb verschieben",
      restore: "Wiederherstellen",
      delete: "Löschen",
      contactDetails: "Kontaktdetails",
      status: "Status",
      email: "E-Mail",
      phone: "Telefon",
      admin: "Administrator",
      noArchivedChats: "Noch keine archivierten Chats.",
      noStarredChats: "Noch keine markierten Chats.",
      noTrash: "Keine Chats im Papierkorb.",
      trashMessage: "Gelöschte Chats werden hier 30 Tage lang angezeigt, bevor sie dauerhaft gelöscht werden.",
      archivedMessage: "Archivierte Chats werden hier angezeigt.",
      starredMessage: "Markierte Chats werden hier angezeigt.",
      // Chat messages translations
      chatMessages: {
        1: [
          { id: 1, text: "Hey, wie geht's dir?", sender: "contact", time: "10:30 AM" },
          { id: 2, text: "Mir geht's super! Ich habe gerade das Projekt fertiggestellt.", sender: "user", time: "10:32 AM" },
          { id: 3, text: "Das ist toll! Kannst du die Details teilen?", sender: "contact", time: "10:33 AM" }
        ],
        2: [
          { id: 1, text: "Vergiss nicht das Treffen morgen", sender: "contact", time: "09:15 AM" },
          { id: 2, text: "Danke für die Erinnerung!", sender: "user", time: "09:20 AM" }
        ],
        3: [
          { id: 1, text: "Willkommen im Admin-Panel", sender: "contact", time: "08:00 AM" },
          { id: 2, text: "Danke!", sender: "user", time: "08:05 AM" },
          { id: 3, text: "Bitte überprüfen Sie die neuen Richtlinien", sender: "contact", time: "08:10 AM" }
        ]
      }
    },
    Chinese: {
      messages: "消息",
      contacts: "联系人",
      archived: "已归档聊天",
      starred: "星标聊天",
      trash: "垃圾箱",
      home: "首页",
      settings: "设置",
      profile: "个人资料",
      notifications: "通知",
      markAllRead: "全部标记为已读",
      editProfile: "编辑个人资料",
      viewProfile: "查看个人资料",
      createContact: "新建联系人",
      typeMessage: "输入消息...",
      send: "发送",
      attachment: "附件",
      saveSettings: "保存设置",
      accountSettings: "账户设置",
      privacySettings: "隐私设置",
      appearance: "外观",
      enableNotifications: "启用通知",
      emailNotifications: "邮件通知",
      showOnlineStatus: "显示在线状态",
      readReceipts: "已读回执",
      lightTheme: "浅色主题",
      darkTheme: "深色主题",
      starContact: "星标联系人",
      unstarContact: "取消星标",
      archiveContact: "归档联系人",
      moveToTrash: "移至垃圾箱",
      restore: "恢复",
      delete: "删除",
      contactDetails: "联系人详情",
      status: "状态",
      email: "邮箱",
      phone: "电话",
      admin: "管理员",
      noArchivedChats: "暂无已归档聊天。",
      noStarredChats: "暂无星标聊天。",
      noTrash: "垃圾箱中无聊天。",
      trashMessage: "您删除的聊天将在此处保留30天，然后被永久删除。",
      archivedMessage: "您归档的聊天将显示在此处。",
      starredMessage: "您星标的聊天将显示在此处。",
      // Chat messages translations
      chatMessages: {
        1: [
          { id: 1, text: "嘿，你好吗？", sender: "contact", time: "10:30 AM" },
          { id: 2, text: "我很好！刚完成项目。", sender: "user", time: "10:32 AM" },
          { id: 3, text: "太棒了！能分享一下细节吗？", sender: "contact", time: "10:33 AM" }
        ],
        2: [
          { id: 1, text: "别忘了明天的会议", sender: "contact", time: "09:15 AM" },
          { id: 2, text: "谢谢提醒！", sender: "user", time: "09:20 AM" }
        ],
        3: [
          { id: 1, text: "欢迎来到管理面板", sender: "contact", time: "08:00 AM" },
          { id: 2, text: "谢谢！", sender: "user", time: "08:05 AM" },
          { id: 3, text: "请查看新政策", sender: "contact", time: "08:10 AM" }
        ]
      }
    }
  };

  // Get translated text for current language
  const t = (key) => {
    return translations[currentLanguage][key] || translations.English[key] || key;
  };

  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isNotificationPanelOpen, setIsNotificationPanelOpen] = useState(false);
  const [isCreateContactModalOpen, setIsCreateContactModalOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello there! How are you doing today?", sender: "user", time: "10:30 AM" },
    { id: 2, text: "I'm doing great! Just finished the project.", sender: "contact", time: "10:32 AM" }
  ]);
  const [contacts, setContacts] = useState([
    { id: 1, name: "John Doe", status: "Online", avatar: "JD" },
    { id: 2, name: "Jane Smith", status: "Offline", avatar: "JS" },
    { id: 3, name: "Admin User", status: "Online", avatar: "AU", isAdmin: true }
  ]);
  
  // Create separate message histories for each contact based on language
  const [contactMessages, setContactMessages] = useState(() => {
    const initialMessages = {};
    // Initialize with English messages as default
    Object.keys(translations.English.chatMessages).forEach(contactId => {
      initialMessages[contactId] = translations.English.chatMessages[contactId];
    });
    return initialMessages;
  });
  
  // Additional chat states
  const [archivedChats, setArchivedChats] = useState([]);
  const [starredChats, setStarredChats] = useState([1]); // John Doe is starred by default
  const [trashedChats, setTrashedChats] = useState([]);
  const [currentPage, setCurrentPage] = useState('messages'); // messages, contacts, archived, starred, trash

  const [activeContact, setActiveContact] = useState(contacts[0]);
  const [newContact, setNewContact] = useState({ name: '', email: '', phone: '' });
  const [profile, setProfile] = useState({
    name: "Current User",
    email: "user@example.com",
    bio: "Software Developer",
    avatar: "CU"
  });
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editedProfile, setEditedProfile] = useState(profile);
  const [theme, setTheme] = useState('dark'); // dark or light
  const [tempTheme, setTempTheme] = useState('dark'); // Temporary theme for settings

  // Apply theme class to root element
  React.useEffect(() => {
    const appContainer = document.querySelector('.app-container');
    if (theme === 'light') {
      document.body.classList.add('light-theme');
      if (appContainer) {
        appContainer.classList.add('light-theme');
      }
    } else {
      document.body.classList.remove('light-theme');
      if (appContainer) {
        appContainer.classList.remove('light-theme');
      }
    }
  }, [theme]);

  // Close menus when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (e) => {
      // Don't close menu if clicking on menu toggle button
      if (e.target.closest('.menu-toggle')) {
        return;
      }
      // Don't close menu if clicking inside the sidebar
      if (e.target.closest('.sidebar')) {
        return;
      }
      if (isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isMenuOpen]);

  const menuItems = [
    { icon: Home, label: 'Home', action: (e) => { e.stopPropagation(); console.log('Home clicked'); setIsMenuOpen(false); setCurrentPage('messages'); } },
    { icon: MessageCircle, label: 'Messages', action: (e) => { e.stopPropagation(); console.log('Messages clicked'); setIsMenuOpen(false); setCurrentPage('messages'); } },
    { icon: Users, label: 'Contacts', action: (e) => { e.stopPropagation(); console.log('Contacts clicked'); setIsMenuOpen(false); setCurrentPage('contacts'); } },
    { icon: Archive, label: 'Archived', action: (e) => { e.stopPropagation(); console.log('Archived clicked'); setIsMenuOpen(false); setCurrentPage('archived'); } },
    { icon: Star, label: 'Starred', action: (e) => { e.stopPropagation(); console.log('Starred clicked'); setIsMenuOpen(false); setCurrentPage('starred'); } },
    { icon: Trash2, label: 'Trash', action: (e) => { e.stopPropagation(); console.log('Trash clicked'); setIsMenuOpen(false); setCurrentPage('trash'); } },
    { icon: Settings, label: 'Settings', action: (e) => { e.stopPropagation(); handleSettings(); } },
  ];

  const languages = ['English', 'Spanish', 'French', 'German', 'Chinese'];

  const handleLanguageChange = (language) => {
    setCurrentLanguage(language);
    setIsLanguageMenuOpen(false);
    // Redirect to messages/chat page after language change
    setCurrentPage('messages');
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: (contactMessages[activeContact.id] ? contactMessages[activeContact.id].length : 0) + 1,
        text: message,
        sender: "user",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setContactMessages(prev => ({
        ...prev,
        [activeContact.id]: [...(prev[activeContact.id] || []), newMessage]
      }));
      
      setMessage('');
    }
  };

  const handleAttachment = () => {
    alert('Attachment feature would open file picker in a full implementation');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleProfileEdit = () => {
    setIsEditingProfile(true);
    setEditedProfile(profile);
  };

  const handleProfileSave = () => {
    setProfile(editedProfile);
    setIsEditingProfile(false);
  };

  const handleProfileCancel = () => {
    setIsEditingProfile(false);
    setEditedProfile(profile);
  };

  const handleProfileView = () => {
    setIsProfileMenuOpen(false);
    // Redirect to profile page
    setCurrentPage('profile');
  };

  const handleSettings = () => {
    setIsMenuOpen(false);
    setIsProfileMenuOpen(false);
    // Redirect to main settings page
    setCurrentPage('settings');
  };

  const handleAccountSettings = () => {
    setCurrentPage('account-settings');
  };

  const handlePrivacySettings = () => {
    setCurrentPage('privacy-settings');
  };

  const handleAppearanceSettings = () => {
    setCurrentPage('appearance-settings');
  };

  const changeTheme = (selectedTheme) => {
    setTempTheme(selectedTheme);
    // Apply theme immediately for preview
    setTheme(selectedTheme);
  };

  const saveSettings = () => {
    // Apply the temporary theme
    setTheme(tempTheme);
    alert('Settings saved successfully!');
    // Redirect to main settings page after saving
    setCurrentPage('settings');
  };

  const handleCreateContact = () => {
    if (newContact.name.trim()) {
      const contact = {
        id: Date.now(), // Unique ID for new contact
        name: newContact.name,
        email: newContact.email || '',
        phone: newContact.phone || '',
        status: "Online",
        avatar: newContact.name.split(' ').map(n => n[0]).join('').toUpperCase()
      };
      const updatedContacts = [...contacts, contact];
      setContacts(updatedContacts);
      
      // Initialize empty message history for new contact
      setContactMessages(prev => ({
        ...prev,
        [contact.id]: []
      }));
      
      setNewContact({ name: '', email: '', phone: '' });
      setIsCreateContactModalOpen(false);
      // Redirect to the new contact
      setActiveContact(contact);
    }
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(0);
  };

  // Chat management functions
  const archiveChat = (contactId) => {
    if (!archivedChats.includes(contactId)) {
      setArchivedChats([...archivedChats, contactId]);
      // Remove from starred if it's there
      if (starredChats.includes(contactId)) {
        setStarredChats(starredChats.filter(id => id !== contactId));
      }
    }
  };

  const unarchiveChat = (contactId) => {
    setArchivedChats(archivedChats.filter(id => id !== contactId));
  };

  const starChat = (contactId) => {
    // Make sure we're working with numbers for consistent comparison
    const numericContactId = Number(contactId);
    if (!starredChats.includes(numericContactId)) {
      setStarredChats([...starredChats, numericContactId]);
    }
  };

  const unstarChat = (contactId) => {
    // Make sure we're working with numbers for consistent comparison
    const numericContactId = Number(contactId);
    setStarredChats(starredChats.filter(id => id !== numericContactId));
  };

  const trashChat = (contactId) => {
    if (!trashedChats.includes(contactId)) {
      setTrashedChats([...trashedChats, contactId]);
      // Remove from archived and starred if present
      if (archivedChats.includes(contactId)) {
        setArchivedChats(archivedChats.filter(id => id !== contactId));
      }
      if (starredChats.includes(contactId)) {
        setStarredChats(starredChats.filter(id => id !== contactId));
      }
    }
  };

  const restoreChat = (contactId) => {
    setTrashedChats(trashedChats.filter(id => id !== contactId));
  };

  const deleteChatPermanently = (contactId) => {
    // Remove from all lists
    setTrashedChats(trashedChats.filter(id => id !== contactId));
    setArchivedChats(archivedChats.filter(id => id !== contactId));
    setStarredChats(starredChats.filter(id => id !== contactId));
    
    // Remove contact if it's not in the main contacts list
    if (!contacts.find(c => c.id === contactId)) {
      const updatedContactMessages = { ...contactMessages };
      delete updatedContactMessages[contactId];
      setContactMessages(updatedContactMessages);
    }
  };

  // Filter contacts based on current page
  const getFilteredContacts = () => {
    switch (currentPage) {
      case 'archived':
        return contacts.filter(contact => archivedChats.includes(contact.id));
      case 'starred':
        return contacts.filter(contact => starredChats.includes(contact.id));
      case 'trash':
        return contacts.filter(contact => trashedChats.includes(contact.id));
      case 'contacts':
        return contacts;
      default:
        // For messages page, exclude archived and trashed
        return contacts.filter(contact => 
          !archivedChats.includes(contact.id) && 
          !trashedChats.includes(contact.id)
        );
    }
  };

  const filteredContacts = getFilteredContacts();

  // Update contact messages when language changes
  React.useEffect(() => {
    const translatedMessages = {};
    Object.keys(translations[currentLanguage].chatMessages).forEach(contactId => {
      translatedMessages[contactId] = translations[currentLanguage].chatMessages[contactId];
    });
    setContactMessages(translatedMessages);
  }, [currentLanguage]);

  return (
    <div className="app-container">
      {/* Sidebar Menu */}
      <div className={`sidebar ${isMenuOpen ? 'open' : ''}`}>
        <div className="logo">
          <MessageCircle size={28} />
          <h2>{t('messages')}</h2>
        </div>
        
        <nav className="menu-nav">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div 
                key={index} 
                className="menu-item"
                onClick={(e) => {
                  e.stopPropagation();
                  item.action(e);
                }}
              >
                <Icon size={20} />
                <span>{t(item.label.toLowerCase())}</span>
              </div>
            );
          })}
        </nav>
        
        <div className="sidebar-footer">
          <button 
            className="create-contact-btn"
            onClick={() => setIsCreateContactModalOpen(true)}
          >
            <Plus size={20} />
            <span>{t('createContact')}</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Header with enhanced features */}
        <div className="header">
          <div className="header-left">
            <button className="menu-toggle" onClick={(e) => {
              e.stopPropagation();
              setIsMenuOpen(!isMenuOpen);
            }}>
              <Menu size={24} />
            </button>
            <h1>{t('messages')}</h1>
          </div>
          
          <div className="header-right">
            {/* Language Selector */}
            <div className="language-selector">
              <button 
                className="language-button" 
                onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
              >
                <Globe size={20} />
                <span>{currentLanguage}</span>
                <ChevronDown size={16} />
              </button>
              
              {isLanguageMenuOpen && (
                <div className="language-dropdown">
                  {languages.map((lang, index) => (
                    <div 
                      key={index} 
                      className="language-option"
                      onClick={() => handleLanguageChange(lang)}
                    >
                      {lang}
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Notification Bell */}
            <div className="notification-icon">
              <button onClick={() => setIsNotificationPanelOpen(!isNotificationPanelOpen)}>
                <Bell size={24} />
                {notifications > 0 && (
                  <span className="notification-badge">{notifications}</span>
                )}
              </button>
            </div>
            
            {/* User Profile */}
            <div className="user-profile">
              <button onClick={(e) => {
                e.stopPropagation();
                setIsProfileMenuOpen(!isProfileMenuOpen);
              }}>
                <User size={24} />
              </button>
            </div>
          </div>
        </div>
        
        {/* Notification Panel */}
        {isNotificationPanelOpen && (
          <div className="notification-panel">
            <div className="panel-header">
              <h3>{t('notifications')}</h3>
              <button onClick={markAllNotificationsAsRead}>
                {t('markAllRead')}
              </button>
            </div>
            <div className="panel-content">
              <div className="notification-item">
                <p><strong>System:</strong> Your message was delivered</p>
                <span>2 min ago</span>
              </div>
              <div className="notification-item">
                <p><strong>John Doe:</strong> Thanks for the update!</p>
                <span>15 min ago</span>
              </div>
              <div className="notification-item">
                <p><strong>Admin:</strong> New policy document available</p>
                <span>1 hour ago</span>
              </div>
            </div>
          </div>
        )}
        
        {/* Profile Menu */}
        {isProfileMenuOpen && (
          <div className="profile-menu">
            <div className="profile-header">
              <div className="profile-avatar">
                {profile.avatar}
              </div>
              <div className="profile-info">
                <h4>{profile.name}</h4>
                <p>{profile.email}</p>
              </div>
            </div>
            <div className="profile-actions">
              <button onClick={(e) => {
                e.stopPropagation();
                setIsProfileMenuOpen(false);
                handleProfileEdit();
              }}>
                <Edit3 size={16} />
                <span>{t('editProfile')}</span>
              </button>
              <button onClick={(e) => {
                e.stopPropagation();
                setIsProfileMenuOpen(false);
                handleSettings();
              }}>
                <Settings size={16} />
                <span>{t('settings')}</span>
              </button>
              <button onClick={(e) => {
                e.stopPropagation();
                setIsProfileMenuOpen(false);
                handleProfileView();
              }}>
                <User size={16} />
                <span>{t('viewProfile')}</span>
              </button>
            </div>
          </div>
        )}
        
        {/* Profile Editing Modal */}
        {isEditingProfile && (
          <div className="modal-overlay">
            <div className="profile-edit-modal">
              <div className="modal-header">
                <h3>{t('editProfile')}</h3>
                <button onClick={handleProfileCancel}>
                  <X size={20} />
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>{t('name')}</label>
                  <input 
                    type="text" 
                    value={editedProfile.name}
                    onChange={(e) => setEditedProfile({...editedProfile, name: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>{t('email')}</label>
                  <input 
                    type="email" 
                    value={editedProfile.email}
                    onChange={(e) => setEditedProfile({...editedProfile, email: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>{t('bio')}</label>
                  <textarea 
                    value={editedProfile.bio}
                    onChange={(e) => setEditedProfile({...editedProfile, bio: e.target.value})}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button className="cancel-btn" onClick={handleProfileCancel}>{t('cancel')}</button>
                <button className="save-btn" onClick={handleProfileSave}>{t('save')}</button>
              </div>
            </div>
          </div>
        )}
        
        {/* Create Contact Modal */}
        {isCreateContactModalOpen && (
          <div className="modal-overlay">
            <div className="create-contact-modal">
              <div className="modal-header">
                <h3>{t('createContact')}</h3>
                <button onClick={() => setIsCreateContactModalOpen(false)}>
                  <X size={20} />
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>{t('name')}</label>
                  <input 
                    type="text" 
                    placeholder="Enter contact name"
                    value={newContact.name}
                    onChange={(e) => setNewContact({...newContact, name: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>Contact Type</label>
                  <div className="contact-type-selector">
                    <button 
                      className={`type-btn ${!newContact.email && !newContact.phone ? 'active' : ''}`}
                      onClick={() => setNewContact({...newContact, email: '', phone: ''})}
                    >
                      Both
                    </button>
                    <button 
                      className={`type-btn ${newContact.email && !newContact.phone ? 'active' : ''}`}
                      onClick={() => setNewContact({...newContact, email: newContact.email || '', phone: ''})}
                    >
                      Email
                    </button>
                    <button 
                      className={`type-btn ${!newContact.email && newContact.phone ? 'active' : ''}`}
                      onClick={() => setNewContact({...newContact, email: '', phone: newContact.phone || ''})}
                    >
                      Phone
                    </button>
                  </div>
                </div>
                {(!newContact.email && !newContact.phone) || newContact.email ? (
                  <div className="form-group">
                    <label>{t('email')}</label>
                    <input 
                      type="email" 
                      placeholder="Enter contact email"
                      value={newContact.email || ''}
                      onChange={(e) => setNewContact({...newContact, email: e.target.value})}
                    />
                  </div>
                ) : null}
                {(!newContact.email && !newContact.phone) || newContact.phone ? (
                  <div className="form-group">
                    <label>{t('phone')}</label>
                    <input 
                      type="tel" 
                      placeholder="Enter phone number"
                      value={newContact.phone || ''}
                      onChange={(e) => {
                        // Allow common phone number characters: digits, spaces, hyphens, parentheses, and plus sign
                        const value = e.target.value;
                        // Basic validation - allow numbers and common phone symbols
                        if (/^[0-9\s\-\(\)\+]*$/.test(value)) {
                          setNewContact({...newContact, phone: value});
                        }
                      }}
                    />
                  </div>
                ) : null}
              </div>
              <div className="modal-footer">
                <button 
                  className="cancel-btn" 
                  onClick={() => setIsCreateContactModalOpen(false)}
                >
                  {t('cancel')}
                </button>
                <button 
                  className="save-btn" 
                  onClick={handleCreateContact}
                >
                  {t('createContact')}
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Chat Area */}
        <div className="chat-container">
          {/* Contact List */}
          <div className="contact-list">
            <div className="contact-list-header">
              <h3>
                {currentPage === 'archived' && t('archived')}
                {currentPage === 'starred' && t('starred')}
                {currentPage === 'trash' && t('trash')}
                {currentPage === 'contacts' && t('contacts')}
                {currentPage === 'messages' && t('messages')}
                {currentPage === 'profile' && t('profile')}
                {currentPage === 'settings' && t('settings')}
              </h3>
            </div>
            <div className="contact-items">
              {filteredContacts.map(contact => (
                <div 
                  key={contact.id} 
                  className={`contact-item ${activeContact.id === contact.id ? 'active' : ''}`}
                  onClick={() => {
                    if (currentPage !== 'trash') {
                      setActiveContact(contact);
                    }
                  }}
                >
                  <div className="contact-avatar">
                    {contact.avatar}
                  </div>
                  <div className="contact-info">
                    <h4>{contact.name}</h4>
                    <p>{contact.status}</p>
                  </div>
                  {contact.isAdmin && <span className="admin-badge">{t('admin')}</span>}
                  {currentPage === 'contacts' && (
                    <div className="contact-actions">
                      <button onClick={(e) => { 
                        e.stopPropagation(); 
                        starredChats.includes(Number(contact.id)) ? 
                          unstarChat(contact.id) : 
                          starChat(contact.id);
                      }}>
                        <Star size={16} />
                      </button>
                      <button onClick={(e) => { e.stopPropagation(); archiveChat(contact.id); }}>
                        <Archive size={16} />
                      </button>
                      <button onClick={(e) => { e.stopPropagation(); trashChat(contact.id); }}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  )}
                  {currentPage === 'archived' && (
                    <div className="contact-actions">
                      <button onClick={(e) => { e.stopPropagation(); unarchiveChat(contact.id); }}>
                        <Archive size={16} />
                      </button>
                    </div>
                  )}
                  {currentPage === 'starred' && starredChats.includes(Number(contact.id)) && (
                    <div className="contact-actions">
                      <button onClick={(e) => { 
                        e.stopPropagation(); 
                        unstarChat(contact.id);
                      }}>
                        <Star size={16} />
                      </button>
                    </div>
                  )}
                  {currentPage === 'trash' && (
                    <div className="contact-actions">
                      <button onClick={(e) => { e.stopPropagation(); restoreChat(contact.id); }}>
                        Restore
                      </button>
                      <button onClick={(e) => { e.stopPropagation(); deleteChatPermanently(contact.id); }}>
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Chat Window or Page Content */}
          <div className="chat-window">
            {currentPage === 'profile' ? (
              // Profile Page Content
              <div className="page-content">
                <div className="page-header">
                  <h2>{t('profile')}</h2>
                </div>
                <div className="profile-page-content">
                  <div className="profile-card">
                    <div className="profile-avatar-large">
                      {profile.avatar}
                    </div>
                    <h3>{profile.name}</h3>
                    <p className="profile-email">{profile.email}</p>
                    <p className="profile-bio">{profile.bio}</p>
                    <button 
                      className="edit-profile-btn"
                      onClick={handleProfileEdit}
                    >
                      {t('editProfile')}
                    </button>
                  </div>
                </div>
              </div>
            ) : currentPage === 'settings' ? (
              // Main Settings Page Content
              <div className="page-content">
                <div className="page-header">
                  <h2>{t('settings')}</h2>
                </div>
                <div className="settings-page-content">
                  <div className="settings-menu">
                    <div className="settings-menu-item active">
                      <h3>{t('settings')}</h3>
                    </div>
                    <div className="settings-menu-item" onClick={handleAccountSettings}>
                      <h3>{t('accountSettings')}</h3>
                    </div>
                    <div className="settings-menu-item" onClick={handlePrivacySettings}>
                      <h3>{t('privacySettings')}</h3>
                    </div>
                    <div className="settings-menu-item" onClick={handleAppearanceSettings}>
                      <h3>{t('appearance')}</h3>
                    </div>
                  </div>
                </div>
                <div className="settings-actions">
                  <button className="save-settings-btn" onClick={saveSettings}>
                    {t('saveSettings')}
                  </button>
                </div>
              </div>
            ) : currentPage === 'account-settings' ? (
              // Account Settings Page Content
              <div className="page-content">
                <div className="page-header">
                  <h2>{t('accountSettings')}</h2>
                </div>
                <div className="settings-page-content">
                  <div className="settings-menu">
                    <div className="settings-menu-item" onClick={() => setCurrentPage('settings')}>
                      <h3>{t('settings')}</h3>
                    </div>
                    <div className="settings-menu-item active">
                      <h3>{t('accountSettings')}</h3>
                    </div>
                    <div className="settings-menu-item" onClick={handlePrivacySettings}>
                      <h3>{t('privacySettings')}</h3>
                    </div>
                    <div className="settings-menu-item" onClick={handleAppearanceSettings}>
                      <h3>{t('appearance')}</h3>
                    </div>
                  </div>
                  <div className="settings-section">
                    <h3>{t('accountSettings')}</h3>
                    <div className="setting-item">
                      <label>
                        <input type="checkbox" defaultChecked /> 
                        {t('enableNotifications')}
                      </label>
                    </div>
                    <div className="setting-item">
                      <label>
                        <input type="checkbox" /> 
                        {t('emailNotifications')}
                      </label>
                    </div>
                    <div className="setting-item">
                      <label>
                        <input type="checkbox" defaultChecked /> 
                        {t('showOnlineStatus')}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            ) : currentPage === 'privacy-settings' ? (
              // Privacy Settings Page Content
              <div className="page-content">
                <div className="page-header">
                  <h2>{t('privacySettings')}</h2>
                </div>
                <div className="settings-page-content">
                  <div className="settings-menu">
                    <div className="settings-menu-item" onClick={() => setCurrentPage('settings')}>
                      <h3>{t('settings')}</h3>
                    </div>
                    <div className="settings-menu-item" onClick={handleAccountSettings}>
                      <h3>{t('accountSettings')}</h3>
                    </div>
                    <div className="settings-menu-item active">
                      <h3>{t('privacySettings')}</h3>
                    </div>
                    <div className="settings-menu-item" onClick={handleAppearanceSettings}>
                      <h3>{t('appearance')}</h3>
                    </div>
                  </div>
                  <div className="settings-section">
                    <h3>{t('privacySettings')}</h3>
                    <div className="setting-item">
                      <label>
                        <input type="checkbox" defaultChecked /> 
                        {t('showOnlineStatus')}
                      </label>
                    </div>
                    <div className="setting-item">
                      <label>
                        <input type="checkbox" /> 
                        {t('readReceipts')}
                      </label>
                    </div>
                    <div className="setting-item">
                      <label>
                        <input type="checkbox" defaultChecked /> 
                        {t('enableNotifications')}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            ) : currentPage === 'appearance-settings' ? (
              // Appearance Settings Page Content
              <div className="page-content">
                <div className="page-header">
                  <h2>{t('appearance')}</h2>
                </div>
                <div className="settings-page-content">
                  <div className="settings-menu">
                    <div className="settings-menu-item" onClick={() => setCurrentPage('settings')}>
                      <h3>{t('settings')}</h3>
                    </div>
                    <div className="settings-menu-item" onClick={handleAccountSettings}>
                      <h3>{t('accountSettings')}</h3>
                    </div>
                    <div className="settings-menu-item" onClick={handlePrivacySettings}>
                      <h3>{t('privacySettings')}</h3>
                    </div>
                    <div className="settings-menu-item active">
                      <h3>{t('appearance')}</h3>
                    </div>
                  </div>
                  <div className="settings-section">
                    <h3>{t('appearance')}</h3>
                    <div className="setting-item">
                      <label>
                        <input 
                          type="radio" 
                          name="theme" 
                          checked={tempTheme === 'light'} 
                          onChange={() => changeTheme('light')} 
                        /> 
                        {t('lightTheme')}
                      </label>
                    </div>
                    <div className="setting-item">
                      <label>
                        <input 
                          type="radio" 
                          name="theme" 
                          checked={tempTheme === 'dark'} 
                          onChange={() => changeTheme('dark')} 
                        /> 
                        {t('darkTheme')}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            ) : currentPage === 'contacts' ? (
              // Contacts Page Content
              <div className="page-content">
                <div className="page-header">
                  <h2>{t('contacts')}</h2>
                </div>
                <div className="contacts-page-content">
                  <div className="contact-details-card">
                    <div className="contact-avatar-large">
                      {activeContact.avatar}
                    </div>
                    <h3>{activeContact.name}</h3>
                    <p>{t('status')}: {activeContact.status}</p>
                    {activeContact.email && <p>{t('email')}: {activeContact.email}</p>}
                    {activeContact.phone && <p>{t('phone')}: {activeContact.phone}</p>}
                    {activeContact.isAdmin && <span className="admin-badge">{t('admin')}</span>}
                  </div>
                  <div className="contact-actions-section">
                    <button onClick={() => {
                      starredChats.includes(Number(activeContact.id)) ? 
                        unstarChat(activeContact.id) : 
                        starChat(activeContact.id);
                    }}>
                      {starredChats.includes(Number(activeContact.id)) ? t('unstarContact') : t('starContact')}
                    </button>
                    <button onClick={() => archiveChat(activeContact.id)}>
                      {t('archiveContact')}
                    </button>
                    <button onClick={() => trashChat(activeContact.id)}>
                      {t('moveToTrash')}
                    </button>
                  </div>
                </div>
              </div>
            ) : currentPage === 'archived' ? (
              // Archived Chats Page Content
              <div className="page-content">
                <div className="page-header">
                  <h2>{t('archived')}</h2>
                </div>
                <div className="info-message">
                  <p>{t('archivedMessage')}</p>
                  {archivedChats.length === 0 && (
                    <p className="empty-message">{t('noArchivedChats')}</p>
                  )}
                </div>
              </div>
            ) : currentPage === 'starred' ? (
              // Starred Chats Page Content
              <div className="page-content">
                <div className="page-header">
                  <h2>{t('starred')}</h2>
                </div>
                <div className="info-message">
                  <p>{t('starredMessage')}</p>
                  {starredChats.length === 0 && (
                    <p className="empty-message">{t('noStarredChats')}</p>
                  )}
                </div>
              </div>
            ) : currentPage === 'trash' ? (
              // Trash Page Content
              <div className="page-content">
                <div className="page-header">
                  <h2>{t('trash')}</h2>
                </div>
                <div className="info-message">
                  <p>{t('trashMessage')}</p>
                  {trashedChats.length === 0 && (
                    <p className="empty-message">{t('noTrash')}</p>
                  )}
                </div>
              </div>
            ) : (
              // Regular Chat Window
              <>
                <div className="chat-header">
                  <div className="contact-details">
                    <div className="contact-avatar">
                      {activeContact.avatar}
                    </div>
                    <div className="contact-info">
                      <h4>{activeContact.name}</h4>
                      <p>{activeContact.status}</p>
                    </div>
                  </div>
                  <div className="chat-actions">
                    <button onClick={() => starChat(activeContact.id)}>
                      <Star size={20} />
                    </button>
                    <button onClick={() => archiveChat(activeContact.id)}>
                      <Archive size={20} />
                    </button>
                    <button onClick={() => trashChat(activeContact.id)}>
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
                
                <div className="message-list">
                  {(contactMessages[activeContact.id] || []).map(msg => (
                    <div key={msg.id} className={`message ${msg.sender}`}>
                      <div className="message-content">
                        <p>{msg.text}</p>
                        <span className="timestamp">{msg.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="input-area">
                  <button className="attachment-btn" onClick={handleAttachment}>
                    <Paperclip size={20} />
                  </button>
                  <input 
                    type="text" 
                    placeholder={t('typeMessage')} 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                  />
                  <button 
                    className="send-btn" 
                    onClick={handleSendMessage}
                    disabled={!message.trim()}
                  >
                    <Send size={20} />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;