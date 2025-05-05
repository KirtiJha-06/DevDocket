# 🚀 DevDocket – Developer Productivity Dashboard

DevDocket is an all-in-one productivity dashboard tailored for developers. It features a **coding tracker**, **micro-journal**, **bug vault**, **Pomodoro-style break timer**, and **tech stack planner** — all built using modern frontend tools like React, MUI, and Framer Motion.

🌐 [Live Demo](https://dev-docket-seven.vercel.app/)

---

## ✨ Features


🧭 Modular Developer Dashboard
A toolkit built for devs, by devs. Switch between a coding tracker, journal, bug vault, break timer, and stack planner — all from a single layout. It’s like Notion and Trello had a baby (and made it dark mode by default).

💾 Persistent Local Storage
No backend? No problem. Your tasks, logs, and journal entries live safely in your browser thanks to localStorage. Close the tab — we’ve still got your back.

🌙 MUI Theming with Dark Mode
Toggle between light and dark like a UI wizard. Built with MUI’s theming system and a sprinkle of custom palette magic for that sleek, branded feel.

🎞 Framer Motion Animations
Pages don’t just load — they glide in. Buttons bounce. Progress rings animate. The whole thing feels buttery smooth, thanks to Framer Motion.

🔔 Snackbars for Feedback
Click, save, done. Subtle, non-blocking snackbars let users know what’s happening — without being annoying about it.

📱 Fully Responsive Layout
Desktop, tablet, mobile — DevDocket adapts like a pro. Built with MUI’s Grid system and breakpoints so it looks clean no matter the screen size.

⌨️ Accessible by Design
Keyboard-navigable components and semantic structure make DevDocket usable for everyone. Because good UX includes every user.

🧠 Tech Stack That Means Business
React, MUI (Material-UI), React Router, Framer Motion, localStorage. No fluff — just battle-tested frontend tools used the right way.

---
🧩 UI Components Overview (For README.md)
Each tool in DevDocket is a standalone module within a unified dashboard. Here’s how each one works and what makes it useful:

📝 Micro-Journal
“Your personal dev diary — reflect, plan, and log.”

Purpose:
Capture your thoughts, ideas, or daily logs in a minimal note-taking interface.

UI Elements:

Input for title and journal text

Save button

List of previous entries displayed in scrollable cards or list

Delete/edit options (if enabled)

How it works:
Entries are stored in the browser using localStorage and displayed on reload. The UI is clean and responsive with MUI Cards.

👨‍💻 Coding Tracker
“Keep a log of your grind — track what you’ve coded, when, and for how long.”

Purpose:
A lightweight tracker for your daily coding tasks and sessions.

UI Elements:

Task name input

Time spent input

Language/technology field (optional)

Submit button

Session history rendered in a card list or table

How it works:
New entries are saved to localStorage. Past logs are shown below the input area using MUI components.

🐞 Bug Vault
“Squashed a bug? Log it before it bites back.”

Purpose:
A personal issue tracker for recording bugs and their fixes.

UI Elements:

Bug title and description

Optional “fix” or notes field

Add/Edit/Delete functionality

Entries shown in collapsible cards or list

How it works:
Bugs are stored in localStorage and rendered dynamically. Designed for fast entry and retrieval with minimal overhead.

🧠 Tech Stack Planner
“Plan your next big project’s stack — without sticky notes.”

Purpose:
Visually map out tech stacks for future or current projects.

UI Elements:

Input for tool name, type (e.g. frontend, backend), and notes

Grouped tech cards displayed by category

Edit/delete buttons for each item

How it works:
Each stack entry is stored locally and grouped dynamically in the UI. Uses MUI Cards or Chips for tech tiles.

⏲️ Break Buddy (Pomodoro Timer)
“Work hard, rest smart — 25 minutes on, 5 minutes off.”

Purpose:
A minimal Pomodoro-style timer to help with productivity and breaks.

UI Elements:

Countdown timer display

Start, Pause, Reset buttons

Circular progress ring

Optional end-session alert/snackbar

How it works:
Timer is controlled via React hooks (setInterval) and animated with Framer Motion. Works fully client-side.

🎛️ Dashboard Layout
“Your control center — sleek, dark, and responsive.”

Purpose:
Unified layout for easy access to all modules.

UI Elements:

Sidebar navigation (MUI Drawer)

Top AppBar with dark mode toggle

Responsive Grid layout

How it works:
React Router handles routing. MUI Drawer adapts to screen size. Dark mode preference is stored and reloaded automatically.

🎨 Theme & Experience
“Beautiful, accessible, and smooth.”

Built with MUI theming (custom color palette, dark/light toggle)

Framer Motion animations for smooth transitions and interactions

Fully responsive via MUI Grid

Keyboard-accessible components and clear visual hierarchy


## 🛠️ Tech Stack

| Category             | Tech                                                   |
|----------------------|--------------------------------------------------------|
| Frontend Framework   | React, React Router                                    |
| UI Library           | Material-UI (MUI)                                      |
| Animations           | Framer Motion                                          |
| Styling & Theming    | MUI theming, custom palette, responsive drawer         |
| State & Persistence  | React hooks, `localStorage`                            |
| UX & Accessibility   | Keyboard navigation, snackbars, animations             |
| Deployment           | Vercel                                                 |
| Version Control      | Git & GitHub                                           |

---

## 📦 Getting Started

### Prerequisites

Make sure you have **Node.js** and **npm** installed.

### Installation

```bash
git clone https://github.com/your-username/devdocket.git
cd devdocket
npm install

#Run Locally
npm start
The app will run in development mode on http://localhost:3000.
📁 Folder Structure

devdocket/
├── public/
├── src/
│   ├── components/        
│   ├── pages/            
│   ├── styles/            
│   ├── utils/             
│   ├── App.js
│   └── index.js
├── package.json
└── README.md

🚀 Deployment
This project is deployed on Vercel:
🔗 https://dev-docket-seven.vercel.app/

To deploy your own version:

Push your project to a GitHub repo

Connect the repo to Vercel (or Netlify)

Done — automatic deployments on every push!

🙋 Author
Your Name
🔗 https://github.com/KirtiJha-06


