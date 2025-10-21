import React from 'react';
import { MdSend } from 'react-icons/md';
// import styles from './ChatWindow.module.css'; // Uncomment for actual styling

const ChatMessage = ({ sender, text, time, isUser }) => (
  <div 
    /* className={`${styles.messageBubble} ${isUser ? styles.userMessage : styles.otherMessage}`} */
    style={{ 
      textAlign: isUser ? 'right' : 'left', 
      marginLeft: isUser ? 'auto' : '10px',
      marginRight: isUser ? '10px' : 'auto',
      maxWidth: '70%',
      marginBottom: '10px'
    }}
  >
    <div 
      /* className={styles.bubbleText} */
      style={{
        backgroundColor: isUser ? '#007bff' : '#f0f0f0',
        color: isUser ? 'white' : 'black',
        padding: '10px',
        borderRadius: '15px',
        display: 'inline-block'
      }}
    >
      {text}
      <small 
        /* className={styles.timestamp} */ 
        style={{ display: 'block', fontSize: '10px', marginTop: '5px', opacity: '0.7' }}
      >
        {time}
      </small>
    </div>
  </div>
);


const ChatWindow = ({ activeUser }) => {
  // Mock conversation data
  const messages = [
    { sender: 'User 5', text: 'Your dedication to environmental causes is truly inspiring!', time: '05:34 PM', isUser: false },
    { sender: 'You', text: 'hello', time: '05:41 PM', isUser: true },
  ];

  return (
    <div /* className={styles.chatWindow} */>
      {/* Header with Active User's name */}
      <div /* className={styles.chatHeader} */>
        <div /* className={styles.avatar} */>U</div>
        <h3>{activeUser}</h3>
      </div>

      {/* Message Area */}
      <div /* className={styles.messagesContainer} */>
        {messages.map((msg, index) => (
          <ChatMessage key={index} {...msg} />
        ))}
      </div>

      {/* Message Input Bar */}
      <div /* className={styles.messageInputContainer} */>
        <input 
          type="text" 
          placeholder="This is user..." 
          /* className={styles.messageInput} */ 
          defaultValue="This is user 1..."
        />
        <button /* className={styles.sendButton} */>
          <MdSend size={24} color="white"/>
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;