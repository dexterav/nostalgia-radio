# 🎵 Nostalgia Radio

> A retro-inspired music experience built around the charm of classic Indian cinema and old Hindi songs.

🌐 **Live Demo:** https://paanwala.vercel.app  
💻 **Portfolio Repository:** https://github.com/dexterav/nostalgia-radio

---

## ✨ Overview

Nostalgia Radio is a responsive web-based music player designed with a nostalgic Indian street aesthetic.

The project combines a cinematic visual experience with a functional audio player, playlist navigation, responsive layouts, and modern frontend technologies.

The goal was to create a website that feels like stepping into a small old-school paan shop while listening to classic Hindi music.

---

## 🚀 Features

- 🎵 Custom music player with play/pause controls
- ⏮️ Previous and next track navigation
- 📻 Playlist-based music playback
- ⏱️ Track progress and duration display
- 📱 Responsive mobile and desktop layouts
- 🖼️ Separate visual layouts for wide and tall screens
- 🎨 Custom retro/Indian street-inspired UI
- 🌐 Production deployment with Vercel
- ⚡ Fast frontend experience with Vite
- 💾 Git LFS workflow for large audio assets

---

## 🛠️ Tech Stack

| Technology | Usage |
|------------|-------|
| React | Frontend UI |
| TypeScript | Type-safe development |
| Vite | Development & build tooling |
| CSS | Responsive styling and animations |
| HTML5 Audio | Music playback |
| Git & GitHub | Version control |
| Git LFS | Large audio file management |
| Vercel | Production deployment |

---

## 🎯 Technical Highlights

### Responsive Design
The interface adapts between desktop and mobile layouts using dedicated visual assets and responsive styling.

### Custom Audio Player
The application uses the HTML5 Audio API with custom controls for:

- Play / Pause
- Previous / Next
- Track progress
- Duration
- Playlist management
- Error handling for unavailable tracks

### Large File Management
The original production project uses **Git LFS** to manage large MP3 assets efficiently instead of storing the binary files directly in normal Git history.

### Production Deployment
The application is deployed and tested in a real production environment using Vercel.

---

## 📂 Project Structure

```text
nostalgia-radio/
├── public/
│   └── bg/
│       ├── scene-tall.png
│       └── scene-wide.png
├── src/
│   ├── components/
│   ├── data/
│   └── ...
├── .gitattributes
├── package.json
├── vite.config.*
└── README.md
