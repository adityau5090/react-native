# 🚀 DevSnippets AI

A modern developer productivity app built with **React Native**, **Expo SDK 55**, and **TypeScript** that allows developers to save, organize, search, explain, and manage code snippets locally with AI-powered assistance.

---

# 📱 Overview

Developers often collect useful code snippets from projects, tutorials, documentation, and online resources. Finding those snippets later can be difficult and time-consuming.

**DevSnippets AI** solves this problem by providing a centralized place to:

* Save code snippets
* Organize snippets efficiently
* Search snippets instantly
* Mark favorites
* Store screenshots alongside snippets
* Manage local files and folders
* Get AI-generated explanations for code
* Work completely offline for core functionality

The application follows an **offline-first approach**, ensuring that all important user data remains accessible even without an internet connection.

---

## ⚙️ Installation

```bash
git clone https://github.com/adityau5090/react-native/blob/main/assigments/fooDeliveryapp
npm install
npx expo start
```

## Demo video ->
https://ik.imagekit.io/o6n27bufc/Screenrecording_20260531_105426.mp4?updatedAt=1780207877106


## Screenshots

#### HomeScreen Screen
<img src="./assets/Screenshots/Home-screen.jpeg" width="200" />

#### Snippet Screen
<img src="./assets/Screenshots/Snippet.jpeg" width="200" />

#### Folder Screen
<img src="./assets/Screenshots/Folder-screen.jpeg" width="200" />
<img src="./assets/Screenshots/Folder-screen2.jpeg" width="200" />

#### Setting Screen
<img src="./assets/Screenshots/Setting-screen.jpeg" width="200" />

#### Create Snippet Screen
<img src="./assets/Screenshots/Create-snippet.jpeg" width="200" />

# ✨ Features

## 📝 Snippet Management

* Create new snippets
* View snippet details
* Edit existing snippets
* Delete snippets
* Search snippets by title
* Store programming language information
* Add custom tags
* Attach screenshots/images

---

## ❤️ Favorites

* Mark snippets as favorite
* Quickly access favorite snippets
* Separate favorites screen

---

## 🤖 AI Code Explanation

Supports multiple AI providers:

### OpenAI

* GPT powered code explanation
* Detailed breakdowns
* Improvement suggestions

### Gemini

* Google Gemini integration
* Alternative AI provider
* User-selectable provider

---

## 🔐 API Key Management

Securely stores:

* OpenAI API Key
* Gemini API Key
* Selected AI Provider

Using:

* Expo Secure Store

---

## 📂 File Manager

Built-in file management system:

### Folder Features

* Create folders
* View folders
* Delete folders

### File Features

* Create text files
* Store code files
* Attach images
* View file content
* Copy content
* Share files
* Delete files

---

## 🖼 Image Support

Users can:

* Pick images from gallery
* Store screenshots locally
* Associate screenshots with snippets
* Preview images inside files

---

## 🎨 Modern UI

* Custom pink aesthetic theme
* Rounded card design
* Developer-focused interface
* Custom code viewer
* Responsive layouts

---

# 🛠 Tech Stack

## Frontend

* React Native
* Expo SDK 55
* Expo Router
* TypeScript

## Storage

* Expo SQLite
* Expo Secure Store
* Expo File System

## AI

* OpenAI API
* Google Gemini API

---

# 📂 Project Structure

```txt
src/
│
├── app/
│   ├── snippet/
│   ├── file/
│   ├── folder/
│   ├── settings/
│
├── components/
│   ├── CodeViewer.tsx
│
├── database/
│   ├── database.ts
│   ├── snippet.service.ts
│
├── services/
│   ├── openai.service.ts
│   ├── gemini.service.ts
│   ├── ai.service.provider.ts
│   ├── fileSystem.service.ts
│   ├── FolderSystem.service.ts
│   ├── image.service.ts
│   └── secure-store.service.ts
│
└── assets/
```

---

# 🗄 Database Structure

The application uses **SQLite** for local data persistence.

### Snippets Table

```sql
CREATE TABLE snippets (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT,
  code TEXT,
  language TEXT,
  tags TEXT,
  imagePath TEXT,
  favorite INTEGER DEFAULT 0,
  createdAt TEXT
);
```

### AI Explanations Table

```sql
CREATE TABLE ai_explanations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  snippetId INTEGER,
  provider TEXT,
  explanation TEXT,
  createdAt TEXT
);
```

### Why SQLite?

SQLite was chosen because:

* Fully offline
* Lightweight
* Fast local queries
* No backend required
* Ideal for mobile applications

---

# 📦 Offline Storage Approach

The application follows an **Offline-First Architecture**.

## What is Stored Offline?

### SQLite

Stores:

* Snippets
* Favorites
* Metadata
* AI explanation history

### Secure Store

Stores:

* OpenAI API Key
* Gemini API Key
* Provider selection

### File System

Stores:

* Images
* User folders
* User files

---

## Benefits

* Works without internet
* Faster data access
* Better user experience
* Reduced network dependency

---

# 📂 File Management Implementation

The file manager is built using **Expo FileSystem**.

### Folder Creation

Folders are created inside:

```txt
documentDirectory/devsnippets/
```

Example:

```txt
devsnippets/
├── React
├── Expo
├── Notes
```

---

### File Creation

Users can create:

* Text files
* Code files
* Files with images

Example:

```txt
React/
├── useState.txt
├── useEffect.txt
├── screenshot.png
```

---

### File Operations

Supported operations:

* Create
* Read
* Delete
* Share
* Preview

---

### Image Handling

Images are:

1. Picked from gallery
2. Copied into local storage
3. Persisted in FileSystem
4. Loaded through local URI

---

# 🤖 AI Integration Workflow

The application supports multiple AI providers.

## Workflow

```txt
User Selects Snippet
        ↓
Explain Code
        ↓
Read Selected Provider
        ↓
OpenAI OR Gemini
        ↓
Generate Explanation
        ↓
Store Explanation
        ↓
Display Result
```

---

## Provider Selection

Users can switch between:

```txt
OpenAI
Gemini
```

through the Settings screen.

---

## OpenAI Flow

```txt
Code Snippet
      ↓
OpenAI API
      ↓
GPT Model
      ↓
Response
      ↓
Store Result
```

---

## Gemini Flow

```txt
Code Snippet
      ↓
Gemini API
      ↓
Generated Explanation
      ↓
Store Result
```

---

# 🔒 Security

Sensitive information is never stored in SQLite.

API Keys are stored using:

```txt
Expo Secure Store
```

Benefits:

* Encrypted storage
* Device-level protection
* Secure access

---

# 🚀 Installation

Clone repository:

```bash
git clone https://github.com/yourusername/devsnippets-ai.git
```

Install dependencies:

```bash
npm install
```

Run application:

```bash
npx expo start
```

---

# 📸 Screenshots

Add screenshots here:

```txt
Home Screen
Create Snippet
Snippet Details
Favorites
File Manager
Settings
AI Explanation
```

---

# 🔮 Future Improvements

* Cloud sync
* User authentication
* Team snippet sharing
* Syntax highlighting engine
* AI-powered snippet generation
* Snippet collections
* Export & Import
* Markdown support

---

# 👨‍💻 Author

**Aditya**

Built using:

* React Native
* Expo Router
* SQLite
* FileSystem
* OpenAI
* Gemini

---

# 📄 License

This project is developed for educational and learning purposes.

app/
│
├── _layout.tsx
│
├── (tabs)/
│   ├── _layout.tsx
│   ├── index.tsx
│   ├── favorites.tsx
│   ├── files.tsx
│   └── settings.tsx
