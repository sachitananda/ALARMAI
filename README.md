


# **⏰ ALARMAI (SheetPro Alarm & Leave Management Suite)**


![enter image description here](https://raw.githubusercontent.com/sachitananda/ALARMAI/072f3c86af21b0b1052ae62ba4a0b7745c1cc812/alarmailogo.svg)
**ALARMAI** is a feature-packed web application built on **Google Apps Script** with a modern frontend interface. It seamlessly combines time management tools—such as customizable alarms, deadline countdowns, timers, and stopwatches—with an integrated employee leave/off-day request engine backed by **Google Sheets** and **Google Calendar**.


# **Screenshots**


### **Main View**

![Main View](https://raw.githubusercontent.com/sachitananda/ALARMAI/refs/heads/main/image%20%282%29.png)

### **Countdowns**
![Countdowns](https://raw.githubusercontent.com/sachitananda/ALARMAI/refs/heads/main/image%20%283%29.png)

### **Settings**

![enter image description here](https://raw.githubusercontent.com/sachitananda/ALARMAI/refs/heads/main/image%20%281%29.png)

### **Alarm function**
![enter image description here](https://raw.githubusercontent.com/sachitananda/ALARMAI/refs/heads/main/image%20%284%29.png)


## **🎯 What Is This App About?**

ALARMAI functions as a **personal productivity hub & workflow tool**. It serves two main purposes:

1. **Precision Time & Alarm Engine:** A web-based alarm clock, countdown tracker, timer, and stopwatch equipped with dynamic themes, audio synthesis, browser notifications, and Google Calendar sync.  
2. **Leave & Off-Day Tracker:** An interactive calendar tool that pulls public holidays from a Google Sheet, lets users drag-to-select days off, logs leave requests directly back to Google Sheets, and drafts leave emails automatically.

## **✨ Key Features**

### **1\. 🔔 Advanced Alarm System**

* **Custom Recurrence:** Set one-time or recurring alarms for specific days of the week.  
* **Audio Synthesis & Custom Audio:** Built-in tones (Digital Beep, Smooth Tone, Harsh Buzz) generated via the Web Audio API, plus support for uploading custom audio files.  
* **Interactive Volume Controls:** Dynamic GSAP volume slider with instant audio previewing.  
* **Snooze & Silent Modes:** Customizable snooze durations and visual-only alarm triggers.  
* **Visual Alerts:** Pulsing background flashes, title-bar flashing, and native browser desktop notifications when alarms ring.

### **2\. ⏳ Deadline & Countdown Tracker**

* **Event Countdown Cards:** Track remaining days, hours, minutes, and seconds until upcoming events.  
* **Featured Focus Card:** Automatically highlights the next immediate deadline with an enlarged circular progress indicator.  
* **Google Calendar Integration:** Option to auto-generate a 1-hour block on your primary Google Calendar when adding a new deadline.  
* **Archive System:** Completed countdowns move into a collapsible archive.

### **3\. ⏱️ Chrono Suite (Timer & Stopwatch)**

* **Digital Timer:** Interactive "swoop input" interface for setting hours, minutes, and seconds, paired with a dynamic SVG progress ring and warning indicators.  
* **Physical Stopwatch UI:** Retro stopwatch design complete with crown and pusher controls, supporting split/lap time tracking down to hundredths of a second.

### **4\. 📅 Off-Days & Leave Request Engine**

* **Interactive Calendar:** Drag-and-drop or click to select multiple off-days across months.  
* **Holiday Sync:** Merges built-in public holidays with custom holidays fetched directly from your backend Google Sheet.  
* **Batch Logging:** Write requested leave dates directly to the OffDays Google Sheet tab using batch execution.  
* **Email Generator:** Customizable leave template that automatically fills in selected dates and opens your default mail client (mailto:).

### **5\. 🎨 Deep Theme & Animation Engine**

* **Themes:** Full accent color picker, background color customization, card opacity controls, and AMOLED Pitch Black mode for battery saving.  
* **Glassmorphism:** Toggleable frosted glass UI effects with customizable blur radius.  
* **Dynamic GSAP Backgrounds:** Multiple animated backgrounds:  
  * Cosmic Gradient Flow  
  * Floating GSAP Orbs  
  * Gooey Neon Waves  
  * Endless Space POV (Canvas particle field with asteroids)  
  * Physics-based Bouncing Balls  
  * Custom Image / Wallpaper Uploads

## **🛠️ Architecture & Tech Stack**

### **Backend (Code.gs)**

* **Platform:** Google Apps Script (GAS)  
* **Spreadsheet Backend:** Manages Holidays and OffDays worksheets automatically.  
* **Google Calendar API (CalendarApp):** Direct creation of calendar deadline events.  
* **Batch Operations:** Efficient array mapping for fast writing to Google Sheets.

### **Frontend (index.html)**

* **Framework:** Bootstrap 5.3 (Dark Mode enabled)  
* **DOM Manipulation:** jQuery 3.7.1  
* **Animations:** GSAP 3.12.5 (GreenSock Animation Platform)  
* **Audio:** HTML5 Audio API & Web Audio API (AudioContext)

## **📊 Google Sheets Structure**

The script automatically initializes two tabs in the associated Google Sheet:

### **1\. Holidays**

Stores custom public holidays pulled by the app frontend.

| Column A | Column B |
| :---- | :---- |
| Date (YYYY-MM-DD) | Holiday Name |

### **2\. OffDays**

Records submitted leave requests.

| Column A | Column B |
| :---- | :---- |
| Timestamp | Requested Leave Date |

## **🚀 Setup & Deployment Guide**

1. **Open Google Sheets:** Create a new Google Sheet.  
2. **Open Script Editor:** Go to **Extensions \> Apps Script**.  
3. **Paste Backend Code:** Paste the Apps Script backend into Code.gs.  
4. **Create HTML File:** Add an HTML file named index.html in Apps Script and paste the frontend code into it.  
5. **Run Setup:** Run the setupSheets function once in Apps Script, or use the custom menu item **SheetPro App \> Setup Missing Worksheets** from your Google Sheet interface.  
6. **Deploy as Web App:**  
   * Click **Deploy \> New Deployment**.  
   * Select **Web app**.  
   * Set **Execute as:** *Me*.  
   * Set **Who has access:** *Anyone with Google account* (or as desired).  
   * Click **Deploy** and launch the provided Web App URL.

## **📁 File Structure**

├── Code.gs     \# Google Apps Script backend logic & Sheet handlers  
└── index.html  \# Full SPA frontend (Bootstrap, GSAP, Web Audio, CSS Styles)  
