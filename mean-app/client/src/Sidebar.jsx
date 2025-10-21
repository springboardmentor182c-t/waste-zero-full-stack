import React from 'react';
import {
  MdDashboard,
  MdSchedule,
  MdOutlineHandshake,
  MdMessage,
  MdOutlineRocketLaunch,
  MdPerson,
  MdSettings,
  MdHelp,
  MdOutlineAdminPanelSettings
} from 'react-icons/md';
// import styles from './Sidebar.module.css'; // Uncomment for actual styling

const navItems = [
  { name: 'Dashboard', icon: MdDashboard, section: 'MAIN MENU' },
  { name: 'Schedule Pickup', icon: MdSchedule, section: 'MAIN MENU' },
  { name: 'Opportunities', icon: MdOutlineHandshake, section: 'MAIN MENU' },
  { name: 'Messages', icon: MdMessage, section: 'MAIN MENU', active: true }, // Active
  { name: 'My Impact', icon: MdOutlineRocketLaunch, section: 'MAIN MENU' },
];

const settingsItems = [
  { name: 'My Profile', icon: MdPerson, section: 'SETTINGS' },
  { name: 'Settings', icon: MdSettings, section: 'SETTINGS' },
  { name: 'Help & Support', icon: MdHelp, section: 'SETTINGS' },
  { name: 'Admin Panel', icon: MdOutlineAdminPanelSettings, section: 'SETTINGS' },
];

const Sidebar = () => {
  const renderNavSection = (items, title) => (
    <>
      <div /* className={styles.sectionTitle} */>{title}</div>
      {items.map((item) => (
        <div 
          key={item.name} 
          /* className={`${styles.navItem} ${item.active ? styles.active : ''}`} */
        >
          <item.icon size={20} />
          <span>{item.name}</span>
        </div>
      ))}
    </>
  );

  return (
    <div /* className={styles.sidebar} */>
      <div /* className={styles.logo} */>
        {/* Placeholder for the WasteZero logo/text */}
        <span>♻️ **WasteZero**</span>
      </div>
      
      <div /* className={styles.adminUser} */>
        <div /* className={styles.userAvatar} */>A</div>
        <div>
          **Admin User**
          <small>Admin</small>
        </div>
      </div>

      <nav /* className={styles.mainNav} */>
        {renderNavSection(navItems.filter(i => i.section === 'MAIN MENU'), 'MAIN MENU')}
      </nav>
      
      <nav /* className={styles.settingsNav} */>
        <div /* className={styles.sectionTitle} */>SETTINGS</div>
        {settingsItems.map((item) => (
          <div key={item.name} /* className={styles.navItem} */>
            <item.icon size={20} />
            <span>{item.name}</span>
          </div>
        ))}
      </nav>

      <div /* className={styles.darkModeToggle} */>
        **Dark Mode**
        {/* Toggle switch placeholder */}
        <span style={{ marginLeft: '10px' }}>[Toggle]</span> 
      </div>
    </div>
  );
};

export default Sidebar;