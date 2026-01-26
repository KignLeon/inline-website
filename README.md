# Integrity Electrical Website

A high-fidelity, high-conversion static website for **Integrity Electrical Contracting LLC**, an engineering-first solar and electrical contractor in Yuma, AZ.

This project is built to **Lovoson** repository standards: clean code, component-based CSS architecture, and production-ready static assets.

## 🚀 Live Demo

[Link to GitHub Pages Deployment]

## ⚡ Tech Stack

- **Core**: Semantic HTML5
- **Styling**: TailwindCSS (CDN for lightweight deployment) + Custom CSS Variables (`css/style.css`)
- **Scripting**: Vanilla JavaScript (ES6+)
- **Icons**: FontAwesome 6
- **Fonts**: Inter (Google Fonts)

## 🎨 Design System

The site utilizes the **"Electric Blue / Chrome"** design system.

- **Primary Color**: `#00fcdb` (Electric Blue)
- **Background**: `#111827` (Deep Slate)
- **Surface**: `#1f2937` (Light Slate)
- **Typography**: Inter (Weights: 300, 400, 600, 700, 800)

### Key Components
- **Glassmorphism Cards**: Backdrop blur with transparency.
- **Neon Glows**: Box-shadows using `rgba(0, 252, 219, 0.3)`.
- **Engineering-First Imagery**: High-contrast, industrial aesthetic.

## 📂 Project Structure

```text
/
├── index.html              # Homepage (Hero, Trust, Lead Form)
├── about/                  
│   └── index.html          # Company History & Values
├── contact/
│   └── index.html          # Contact Form & Map
├── services/
│   ├── index.html          # Services Hub
│   ├── solar-installation/ # Deep Service Page
│   ├── pv-maintenance/     # Deep Service Page
│   ├── remove-reinstall/   # Deep Service Page
│   ├── electrical/         # Deep Service Page
│   └── ev-chargers/        # Deep Service Page
├── assets/
│   ├── logo.png            # Official High-Fidelity Logo
│   └── images/             # Visual Assets
├── css/
│   └── style.css           # Custom Design System
└── js/
    └── script.js           # Form Logic, Modals, Mobile Menu
```

## 🛠 Features

- **Global Modal System**: Triggers on "Get Quote" and Floating Action Button.
- **Smart Forms**: AJAX-simulated submission with validation and formatting.
- **Mobile-First**: Fully responsive navigation and layouts.
- **SEO Optimized**: Semantic tags, meta descriptions, and clean URLs.

## 🔧 Deployment

This site is designed for **GitHub Pages**.

1. Go to **Settings** > **Pages**.
2. Select Source: `Deploy from a branch`.
3. Select Branch: `main` / `root`.
4. Click **Save**.

## 📜 License

© 2026 Integrity Electrical Contracting LLC. All Rights Reserved.
