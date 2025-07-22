import { useState, useEffect } from 'react';

import aliNickMobile from "./assets/ali-nick-mobile.JPG"
import aliNickDesktop from "./assets/ali-nick-desktop.JPG"

const WeddingWeekendApp = () => {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  const [darkMode, setDarkMode] = useState(prefersDark);
  const [password, setPassword] = useState("");
  const [passwordFormVisible, setPasswordFormVisible] = useState(false);
  const [adminFormVisible, setAdminFormVisible] = useState(false);
  const [siteData, setSiteData] = useState({
    title: "Ali & Nick's Marriage Celebration",
    subtitle: "Weekend Plan",
    updates: [],
    menus: [],
    eventMenus: {
      'sat-event2': [{ name: "Dinner Menu", url: "#" }],
      'sun-event1': [{ name: "Brunch Menu", url: "#" }]
    },
    events: {}
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  // Form states
  const [newUpdate, setNewUpdate] = useState('');
  const [menuName, setMenuName] = useState('');
  const [menuUrl, setMenuUrl] = useState('');
  const [menuEvent, setMenuEvent] = useState('sat-event2');
  const [eventField, setEventField] = useState('fri-event1-time');
  const [eventValue, setEventValue] = useState('');

  // Load data on component mount
  // useEffect(() => {
  //   const savedData = localStorage.getItem('weddingData');
  //   const savedDarkMode = localStorage.getItem('darkMode');
    
  //   if (savedData) {
  //     const parsedData = JSON.parse(savedData);
  //     // Ensure eventMenus structure exists
  //     if (!parsedData.eventMenus) {
  //       parsedData.eventMenus = {
  //         'sat-event2': [{ name: "Dinner Menu", url: "#" }],
  //         'sun-event1': [{ name: "Brunch Menu", url: "#" }]
  //       };
  //     }
  //     setSiteData(parsedData);
  //   } else {
  //     // Initialize with sample data
  //     const initialData = {
  //       title: "Ali & Nick's Marriage Celebration",
  //       subtitle: "Weekend Plan",
  //       updates: [{
  //         text: "Welcome to our wedding weekend! We're so excited to celebrate with you all. 🎉",
  //         timestamp: new Date().toLocaleString()
  //       }],
  //       menus: [],
  //       eventMenus: {
  //         'sat-event2': [{ name: "Dinner Menu", url: "#" }],
  //         'sun-event1': [{ name: "Brunch Menu", url: "#" }]
  //       },
  //       events: {}
  //     };
  //     setSiteData(initialData);
  //     localStorage.setItem('weddingData', JSON.stringify(initialData));
  //   }
    
  //   if (savedDarkMode === 'enabled') {
  //     setDarkMode(true);
  //   }
  // }, []);

  // Save data whenever siteData changes
  useEffect(() => {
    localStorage.setItem('weddingData', JSON.stringify(siteData));
  }, [siteData]);

  const addUpdate = () => {
    if (newUpdate.trim()) {
      const timestamp = new Date().toLocaleString();
      setSiteData(prev => ({
        ...prev,
        updates: [{
          text: newUpdate.trim(),
          timestamp: timestamp
        }, ...prev.updates]
      }));
      setNewUpdate('');
    }
  };

  const addMenu = () => {
    if (menuName.trim() && menuUrl.trim()) {
      setSiteData(prev => {
        const newData = { ...prev };
        if (menuEvent === 'general') {
          newData.menus.push({ name: menuName.trim(), url: menuUrl.trim() });
        } else {
          if (!newData.eventMenus[menuEvent]) {
            newData.eventMenus[menuEvent] = [];
          }
          newData.eventMenus[menuEvent].push({ name: menuName.trim(), url: menuUrl.trim() });
        }
        return newData;
      });
      setMenuName('');
      setMenuUrl('');
    }
  };

  const updateEvent = () => {
    if (eventField && eventValue.trim()) {
      setSiteData(prev => ({
        ...prev,
        events: {
          ...prev.events,
          [eventField]: eventValue.trim()
        }
      }));
      setEventValue('');
    }
  };

  const exportData = () => {
    const dataStr = JSON.stringify(siteData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'wedding-site-data.json';
    a.click();
  };

  const getEventData = (field, defaultValue) => {
    return siteData.events[field] || defaultValue;
  };

  const handlePasswordFormSubmit = (e) => {
    e.preventDefault()
    if (password === "santikins") {
      setPasswordFormVisible(false)
      setAdminFormVisible(true)
    }
  }

  const imageClasses = "w-screen h-screen object-cover dark:opacity-50"

  return (
    <div className={`min-h-screen font-serif relative transition-colors duration-300 ${
      darkMode 
        ? 'bg-slate-900 text-gray-200' 
        : 'bg-orange-50 text-gray-800'
    }`}>
      {/* Background Styles */}
      <div className={`fixed inset-0 transition-colors duration-300 ${
        darkMode 
          ? 'bg-slate-900' 
          : 'bg-gradient-to-br from-orange-100 to-gray-100'
      }`}>
        <img src={aliNickMobile} className={`${imageClasses} md:hidden`} />
        <img src={aliNickDesktop} className={`${imageClasses} hidden md:block`} />

        {/* Watercolor effects */}
        {/* <div className={`absolute top-0 left-0 w-48 h-48 opacity-40 transition-colors duration-300`}>
          <div className={`w-full h-full rounded-full ${
            darkMode 
              ? 'bg-gradient-radial from-blue-600 via-blue-500 to-transparent' 
              : 'bg-gradient-radial from-orange-300 via-orange-200 to-transparent'
          }`}></div>
        </div>
        <div className={`absolute bottom-0 right-0 w-36 h-36 opacity-30 transition-colors duration-300`}>
          <div className={`w-full h-full rounded-full ${
            darkMode 
              ? 'bg-gradient-radial from-blue-400 via-blue-300 to-transparent' 
              : 'bg-gradient-radial from-gray-400 via-gray-300 to-transparent'
          }`}></div>
        </div> */}
        
        {/* Dots pattern */}
        {/* <div className="absolute top-12 right-5 opacity-60">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className={`absolute rounded-full transition-colors duration-300 ${
                darkMode ? 'bg-white' : 'bg-gray-800'
              } ${
                i % 3 === 0 ? 'w-2 h-2' : i % 2 === 0 ? 'w-1.5 h-1.5' : 'w-1 h-1'
              }`}
              style={{
                top: `${(i * 8) % 50}px`,
                left: `${(i * 12) % 60}px`
              }}
            />
          ))}
        </div> */}
        
        {/* Wavy line */}
        {/* <div className="absolute bottom-12 left-5 w-32 h-6 opacity-80">
          <svg viewBox="0 0 100 20" className="w-full h-full">
            <path
              d="M0,10 Q25,0 50,10 T100,10"
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
              className={`transition-colors duration-300 ${
                darkMode ? 'text-white' : 'text-gray-800'
              }`}
            />
          </svg>
        </div> */}
      </div>

      <div className="relative z-10 max-w-lg mx-auto px-5 py-8">
        {/* Header with controls */}
        <div className="flex justify-end items-start mb-8">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`backdrop-blur-sm px-3 py-2 rounded-full text-sm transition-all duration-300 hover:scale-105 ${
              darkMode 
                ? 'bg-white/10 hover:bg-white/20 text-gray-200' 
                : 'bg-black/10 hover:bg-black/20 text-gray-600'
            }`}
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>

        {/* Main Header */}
        <div className="text-center mb-12">
          <h1 className={`text-[2.125rem] font-normal leading-tight mb-3 transition-colors duration-300 ${
            darkMode ? 'text-blue-300' : 'text-blue-800'
          }`}>
            Ali & Nick's<br />Marriage Celebration
          </h1>
        </div>

        <h2 className={`mb-8 block w-full text-center text-3xl italic font-normal transition-colors duration-300 ${
          darkMode ? 'text-blue-400' : 'text-blue-600'
        }`}>
          <span className="px-4 py-1 bg-white/60 dark:bg-slate-800/90 rounded-md">Weekend Plan</span>
        </h2>

        {/* Updates Section */}
        {siteData.updates.length > 0 && (
          <div className={`border-2 rounded-2xl p-5 mb-8 transition-colors duration-300 ${
            darkMode 
              ? 'bg-blue-900/30 border-blue-600/30' 
              : 'bg-gradient-to-r from-blue-100/80 to-blue-200/60 border-blue-300/50'
          }`}>
            <h3 className={`text-lg font-bold mb-3 transition-colors duration-300 ${
              darkMode ? 'text-blue-300' : 'text-blue-800'
            }`}>
              Latest Updates
            </h3>
            {siteData.updates.map((update, index) => (
              <div key={index} className={`rounded-lg p-3 mb-2 last:mb-0 transition-colors duration-300 ${
                darkMode ? 'bg-white/5' : 'bg-white/60'
              }`}>
                <div className={`font-medium transition-colors duration-300 ${
                  darkMode ? 'text-gray-200' : 'text-gray-800'
                }`}>{update.text}</div>
                <div className={`text-xs mt-1 transition-colors duration-300 ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>{update.timestamp}</div>
              </div>
            ))}
          </div>
        )}

        {/* General Menu Links */}
        {siteData.menus.length > 0 && (
          <div className="text-center mb-8">
            {siteData.menus.map((menu, index) => (
              <a
                key={index}
                href={menu.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-3 rounded-full mx-1 my-1 text-sm hover:from-blue-700 hover:to-blue-900 transition-all duration-300 hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
              >
                {menu.name}
              </a>
            ))}
          </div>
        )}

        {/* Day Sections */}
        <div className={`rounded-2xl p-6 mb-8 shadow-lg transition-colors duration-300 ${
          darkMode ? 'bg-slate-800/90 border border-white/10' : 'bg-white/95'
        }`}>
          <h3 className={`text-xl text-center font-semibold tracking-widest uppercase mb-5 transition-colors duration-300 ${
            darkMode ? 'text-blue-300' : 'text-blue-800'
          }`}>
            FRIDAY
          </h3>
          <div className="space-y-6">
            <div>
              <h4 className={`text-lg font-bold mb-1 transition-colors duration-300 ${
                darkMode ? 'text-blue-200' : 'text-blue-900'
              }`}>
                {getEventData('fri-event1-name', 'Welcome Drinks')}
              </h4>
              <div className={`italic mb-1 transition-colors duration-300 ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                <a
                  href="https://maps.google.com/?q=El+Rey+Arlington+VA"
                  target="_blank"
                  className={`hover:underline transition-colors duration-300 ${
                    darkMode 
                      ? 'text-blue-400 hover:text-blue-300' 
                      : 'text-blue-600 hover:text-blue-800'
                  }`}
                >
                  {getEventData('fri-event1-venue', 'El Rey')}
                </a>
              </div>
              <div className={`text-sm mb-1 transition-colors duration-300 ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {getEventData('fri-event1-location', 'Arlington, VA')}
              </div>
              <div className={`text-sm font-medium transition-colors duration-300 ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {getEventData('fri-event1-time', '8:00pm - 10:30pm')}
              </div>
            </div>
          </div>
        </div>

        <div className={`rounded-2xl p-6 mb-8 shadow-lg transition-colors duration-300 ${
          darkMode ? 'bg-slate-800/90 border border-white/10' : 'bg-white/95'
        }`}>
          <h3 className={`text-xl text-center font-semibold tracking-widest uppercase mb-5 transition-colors duration-300 ${
            darkMode ? 'text-blue-300' : 'text-blue-800'
          }`}>
            SATURDAY
          </h3>
          <div className="space-y-6">
            {/* Boat Ride */}
            <div className={`pb-5 border-b transition-colors duration-300 ${
              darkMode ? 'border-gray-700' : 'border-gray-200'
            }`}>
              <h4 className="text-lg font-bold text-blue-900 dark:text-blue-200 mb-1">
                {getEventData('sat-event1-name', 'Potomac Boat Ride')}
              </h4>
              <div className="text-gray-600 dark:text-gray-400 italic mb-1">
                <a
                  href="https://maps.app.goo.gl/VEvU7iqn9z4WaRar5"
                  target="_blank"
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:underline"
                >
                  {getEventData('sat-event1-venue', 'The Wharf')}
                </a>
              </div>
              <div className="text-gray-500 dark:text-gray-300 text-sm mb-1">
                {getEventData('sat-event1-location', 'Washington, DC')}
              </div>
              <div className="text-gray-700 dark:text-gray-300 text-sm font-medium">
                {getEventData('sat-event1-time', '1:30pm - 4:00pm')}
              </div>
            </div>

            {/* Dinner */}
            <div className="pb-5 border-b border-gray-200 dark:border-gray-700">
              <h4 className="text-lg font-bold text-blue-900 dark:text-blue-200 mb-1">
                {getEventData('sat-event2-name', 'Dinner')}
              </h4>
              <div className="text-gray-600 dark:text-gray-400 italic mb-1">
                <a
                  href="https://maps.google.com/?q=Barcelona+Wine+Bar+Cathedral+Heights+Washington+DC"
                  target="_blank"
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:underline"
                >
                  {getEventData('sat-event2-venue', 'Barcelona Wine Bar (Cathedral Heights)')}
                </a>
              </div>
              <div className="text-gray-700 dark:text-gray-300 text-sm mb-1">
                {getEventData('sat-event2-location', 'Washington, DC')}
              </div>
              <div className="text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                {getEventData('sat-event2-time', '7:00pm - 10:00pm')}
              </div>
              {siteData.eventMenus && siteData.eventMenus['sat-event2'] && siteData.eventMenus['sat-event2'].length > 0 && (
                <div className="mt-2">
                  {siteData.eventMenus['sat-event2'].map((menu, index) => (
                    <a
                      key={index}
                      href={menu.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-gradient-to-r from-blue-500 to-blue-700 text-white px-3 py-1.5 rounded-full mr-2 text-xs hover:from-blue-700 hover:to-blue-900 transition-all duration-300 hover:-translate-y-0.5 shadow-md"
                    >
                      {menu.name}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* After Party */}
            <div>
              <h4 className="text-lg font-bold text-blue-900 dark:text-blue-200 mb-1">
                {getEventData('sat-event3-name', 'After Party')}
              </h4>
              <div className="text-gray-600 dark:text-gray-400 italic mb-1">
                <a
                  href="https://maps.google.com/?q=The+Crown+Crow+Washington+DC"
                  target="_blank"
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:underline"
                >
                  {getEventData('sat-event3-venue', 'The Crown & Crow')}
                </a>
              </div>
              <div className="text-gray-700 dark:text-gray-300 text-sm mb-1">
                {getEventData('sat-event3-location', 'Washington, DC')}
              </div>
              <div className="text-gray-700 dark:text-gray-300 text-sm font-medium">
                {getEventData('sat-event3-time', '10:30pm - 12:30am')}
              </div>
            </div>
          </div>
        </div>

        <div className={`rounded-2xl p-6 mb-8 shadow-lg transition-colors duration-300 ${
          darkMode ? 'bg-slate-800/90 border border-white/10' : 'bg-white/95'
        }`}>
          <h3 className={`text-xl text-center font-semibold tracking-widest uppercase mb-5 transition-colors duration-300 ${
            darkMode ? 'text-blue-300' : 'text-blue-800'
          }`}>
            SUNDAY
          </h3>
          <div>
            <h4 className="text-lg font-bold text-blue-900 dark:text-blue-200 mb-1">
              {getEventData('sun-event1-name', 'Brunch')}
            </h4>
            <div className="text-gray-600 dark:text-gray-400 italic mb-1">
              <a
                href="https://maps.google.com/?q=Medium+Rare+Arlington+VA"
                target="_blank"
                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:underline"
              >
                {getEventData('sun-event1-venue', 'Medium Rare')}
              </a>
            </div>
            <div className="text-gray-700 dark:text-gray-300 text-sm mb-1">
              {getEventData('sun-event1-location', 'Arlington, VA')}
            </div>
            <div className="text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
              {getEventData('sun-event1-time', '11:00am - 1:00pm')}
            </div>
            {siteData.eventMenus && siteData.eventMenus['sun-event1'] && siteData.eventMenus['sun-event1'].length > 0 && (
              <div className="mt-2">
                {siteData.eventMenus['sun-event1'].map((menu, index) => (
                  <a
                    key={index}
                    href={menu.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-gradient-to-r from-blue-500 to-blue-700 text-white px-3 py-1.5 rounded-full mr-2 text-xs hover:from-blue-700 hover:to-blue-900 transition-all duration-300 hover:-translate-y-0.5 shadow-md"
                  >
                    {menu.name}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mb-8 flex justify-center">
          <button
            onClick={() => setPasswordFormVisible(!passwordFormVisible)}
            className={`backdrop-blur-sm px-3 py-2 rounded-full text-sm transition-all duration-300 hover:scale-105 ${
              darkMode 
                ? 'bg-white/10 hover:bg-white/20 text-gray-200' 
                : 'bg-black/10 hover:bg-black/20 text-gray-600'
            }`}
          >
            ✏️ Edit
          </button>
        </div>

        {passwordFormVisible && (
          <div className={`rounded-2xl p-6 shadow-xl border transition-colors duration-300 ${
            darkMode 
              ? 'bg-slate-800/95 border-gray-700' 
              : 'bg-white/98 border-gray-200'
          }`}>
            <form onSubmit={handlePasswordFormSubmit}>
              <div>
                <h3 className={`font-semibold mb-3 transition-colors duration-300 ${
                  darkMode ? 'text-blue-300' : 'text-blue-800'
                }`}>Enter Password</h3>
                <input
                  type="text"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  autoFocus
                />
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="mt-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white px-4 py-2 rounded-full text-sm hover:from-blue-700 hover:to-blue-900 transition-all duration-300 hover:-translate-y-0.5 shadow-md"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}

        {adminFormVisible && (
          <div className={`rounded-2xl p-6 shadow-xl border transition-colors duration-300 ${
            darkMode 
              ? 'bg-slate-800/95 border-gray-700' 
              : 'bg-white/98 border-gray-200'
          }`}>
            <div className="text-center mb-6">
              <h2 className={`text-xl font-bold mb-2 transition-colors duration-300 ${
                darkMode ? 'text-blue-300' : 'text-blue-800'
              }`}>Admin Panel</h2>
              <p className={`text-sm transition-colors duration-300 ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>Make changes to your wedding weekend site</p>
            </div>

            {/* Add Update */}
            <div className="mb-6">
              <h3 className={`font-semibold mb-3 transition-colors duration-300 ${
                darkMode ? 'text-blue-300' : 'text-blue-800'
              }`}>Add Update/Announcement</h3>
              <textarea
                value={newUpdate}
                onChange={(e) => setNewUpdate(e.target.value)}
                placeholder="e.g., Weather looks great! Don't forget to bring sunglasses for the boat ride."
                className={`w-full p-3 border rounded-lg resize-none h-20 text-sm transition-colors duration-300 ${
                  darkMode 
                    ? 'border-gray-600 bg-gray-800 text-gray-100 placeholder-gray-400' 
                    : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
                }`}
              />
              <button
                onClick={addUpdate}
                className="mt-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white px-4 py-2 rounded-full text-sm hover:from-blue-700 hover:to-blue-900 transition-all duration-300 hover:-translate-y-0.5 shadow-md"
              >
                Add Update
              </button>
            </div>

            {/* Add Menu */}
            <div className="mb-6">
              <h3 className="text-blue-800 dark:text-blue-300 font-semibold mb-3">Add Menu/Document to Event</h3>
              <div className="space-y-3">
                <select
                  value={menuEvent}
                  onChange={(e) => setMenuEvent(e.target.value)}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                >
                  <option value="sat-event2">Saturday Dinner</option>
                  <option value="sun-event1">Sunday Brunch</option>
                  <option value="general">General (appears at top)</option>
                </select>
                <input
                  type="text"
                  value={menuName}
                  onChange={(e) => setMenuName(e.target.value)}
                  placeholder="e.g., Dinner Menu"
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
                <input
                  type="url"
                  value={menuUrl}
                  onChange={(e) => setMenuUrl(e.target.value)}
                  placeholder="e.g., /documents/dinner-menu.pdf"
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
                <button
                  onClick={addMenu}
                  className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-4 py-2 rounded-full text-sm hover:from-blue-700 hover:to-blue-900 transition-all duration-300 hover:-translate-y-0.5 shadow-md"
                >
                  Add Menu Link
                </button>
              </div>
            </div>

            {/* Quick Updates */}
            <div className="mb-6">
              <h3 className="text-blue-800 dark:text-blue-300 font-semibold mb-3">Quick Event Updates</h3>
              <div className="space-y-3">
                <select
                  value={eventField}
                  onChange={(e) => setEventField(e.target.value)}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                >
                  <option value="fri-event1-time">Friday Welcome Drinks - Time</option>
                  <option value="sat-event1-time">Saturday Boat Ride - Time</option>
                  <option value="sat-event2-time">Saturday Dinner - Time</option>
                  <option value="sat-event3-time">Saturday After Party - Time</option>
                  <option value="sun-event1-time">Sunday Brunch - Time</option>
                </select>
                <input
                  type="text"
                  value={eventValue}
                  onChange={(e) => setEventValue(e.target.value)}
                  placeholder="Enter new time, venue, or location"
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
                <button
                  onClick={updateEvent}
                  className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-4 py-2 rounded-full text-sm hover:from-blue-700 hover:to-blue-900 transition-all duration-300 hover:-translate-y-0.5 shadow-md"
                >
                  Update Event
                </button>
              </div>
            </div>

            {/* Admin Controls */}
            <div className="text-center space-x-3">
              <button
                onClick={() => setAdminFormVisible(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-full text-sm hover:bg-gray-600 transition-colors"
              >
                Close Admin
              </button>
              <button
                onClick={exportData}
                className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-4 py-2 rounded-full text-sm hover:from-blue-700 hover:to-blue-900 transition-all duration-300 hover:-translate-y-0.5 shadow-md"
              >
                Export Data
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeddingWeekendApp;