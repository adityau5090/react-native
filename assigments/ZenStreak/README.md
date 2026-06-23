# ZenStreak 🚀

A modern, premium habit tracking application built with Expo Router and Expo Notifications.

ZenStreak helps users build positive habits by tracking streaks, scheduling reminders, and receiving motivational notifications.

---

# ✨ Features

* Create and manage habits
* Track daily streaks
* Schedule local notifications
* Receive push notifications
* Deep linking support
* Dark and Light theme support
* Beautiful glassmorphism UI
* Progress tracking
* Analytics dashboard
* SQLite offline persistence

---

# 🏗️ Tech Stack

| Technology           | Purpose                    |
| -------------------- | -------------------------- |
| Expo SDK 55          | Mobile Framework           |
| Expo Router          | Navigation                 |
| TypeScript           | Type Safety                |
| Zustand              | State Management           |
| SQLite               | Local Database             |
| Expo Notifications   | Local & Push Notifications |
| Expo Blur            | Glassmorphism Effects      |
| Expo Linear Gradient | UI Styling                 |
| AsyncStorage         | User Preferences           |
| Date-fns             | Date Utilities             |

---

# 📂 Folder Structure

```txt
src
│
├── components
│   ├── ui
│   ├── habit
│   └── notifications
│
├── constants
├── db
├── hooks
├── lib
│   └── notifications
├── services
├── store
├── theme
├── types
└── utils
```

---

# 🎨 Design System

ZenStreak follows a premium productivity design language inspired by modern productivity applications.

## Design Principles

* Dark & Light Mode support
* Glassmorphism cards
* Floating navigation
* Rounded corners
* Minimal aesthetics
* Orange accent color
* Large typography
* Premium user experience

---

# 🌗 Theme System

The application supports:

* Light Mode
* Dark Mode
* System Theme

Theme switching is managed using Zustand.

```txt
User
   ↓
Theme Toggle
   ↓
Zustand Store
   ↓
Theme Hook
   ↓
UI Re-render
```

---

# 🗄️ Database Architecture

ZenStreak uses SQLite as its primary storage solution.

## Habits Table

```sql
CREATE TABLE habits (
    id TEXT PRIMARY KEY NOT NULL,
    title TEXT NOT NULL,
    emoji TEXT NOT NULL,
    frequency TEXT NOT NULL,
    weekdays TEXT,
    reminder_hour INTEGER,
    reminder_minute INTEGER,
    streak INTEGER DEFAULT 0,
    longest_streak INTEGER DEFAULT 0,
    last_completed_date TEXT,
    notification_ids TEXT,
    created_at TEXT
);
```

---

# 🏠 Home Screen Architecture

Current Home Screen contains:

## Greeting Section

Displays a dynamic greeting based on the current time.

Examples:

* Good Morning ☀️
* Good Afternoon 🌤️
* Good Evening 🌙

---

## Progress Card

Shows:

* Today's completion percentage
* Total completed habits
* Overall progress

```txt
3 of 5 habits completed
60%
```

---

## Streak Card

Displays:

* Current streak
* Longest streak

```txt
🔥 Current Streak
12 Days
```

---

## Habit Cards

Each habit card contains:

* Habit Emoji
* Habit Name
* Reminder Time
* Streak Count
* Completion Button

Example:

```txt
💻 Code 1 Hour

Daily • 8:00 PM

🔥 12 Days

[ Done ]
```

---

# 🔔 Notification Architecture

ZenStreak uses two notification systems.

## Local Notifications

Used for:

* Habit reminders
* Daily routines
* Weekly reminders

Local notifications are scheduled directly on the user's device.

---

## Push Notifications

Used for:

* Streak nudges
* Announcements
* Motivation messages
* Feature updates

Push notifications are sent from a remote server.

---

# 📱 Current Screens

* Home Screen
* Analytics Screen (Placeholder)
* Notifications Screen (Placeholder)
* Profile Screen (Placeholder)

Upcoming screens:

* Create Habit
* Habit Details
* Notification Center
* Settings
* Analytics Dashboard

---

# 🚀 Current Progress

## Phase 1

* [x] Project setup
* [x] Folder structure
* [x] Theme architecture
* [x] SQLite setup
* [x] Zustand setup
* [x] Floating glass tab bar

## Phase 2

* [x] Home screen UI
* [x] Progress card
* [x] Streak card
* [x] Habit card
* [x] Dark/Light theme support

## Upcoming

* [ ] Habit creation
* [ ] Local notifications
* [ ] Push notifications
* [ ] Deep linking
* [ ] Analytics
* [ ] Notification center
* [ ] Permission handling
* [ ] Settings screen
