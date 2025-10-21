import React from 'react';
import { MdSearch } from 'react-icons/md';
// import styles from './MessageList.module.css'; // Uncomment for actual styling

const conversations = [
  { user: 'User 5', lastMessage: 'You hello', date: '5/1/2025', unread: true },
  { user: 'User 4', lastMessage: 'Thank you for your active...', date: '5/1/2025', unread: false },
  // ... more conversations
];

const MessageItem = ({ user, lastMessage, date, unread }) => (
  <div 
    /* className={`${styles.messageItem} ${unread ? styles.unread : ''} ${user === 'User 5' ? styles.active : ''}`} */
    style={{ borderLeft: user === 'User 5' ? '4px solid blue' : 'none' }} // Visual indicator for selected chat
  >
    <div /* className={styles.avatar} */>U</div>
    <div /* className={styles.content} */>
      **{user}**
      <p>{lastMessage}</p>
    </div>
    <div /* className={styles.date} */>
      <small>{date}</small>
      {unread && <span /* className={styles.unreadDot} */></span>}
    </div>
  </div>
);

const MessageList = () => {
  return (
    <div /* className={styles.messageList} */>
      <h2>Messages</h2>
      <p>Chat with volunteers, NGOs, and waste management partners</p>
      
      {/* Inbox Search Bar */}
      <div /* className={styles.searchBar} */>
        <MdSearch size={20} style={{ marginRight: '8px' }}/>
        <input type="text" placeholder="Search messages..." /* className={styles.searchInput} */ />
      </div>

      {/* Conversation List */}
      <div /* className={styles.conversationContainer} */>
        {conversations.map((conv, index) => (
          <MessageItem key={index} {...conv} />
        ))}
      </div>
    </div>
  );
};

export default MessageList;