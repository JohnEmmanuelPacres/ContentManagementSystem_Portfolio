# Pacres' Dynamic Portfolio & AI Assistant

Welcome to my personal portfolio repository! This is a modern, high-performance developer portfolio built from scratch with a focus on **automation, scalability, and premium design**.

Instead of manually updating source code for new projects or achievements, this portfolio integrates a headless Content Management System (CMS) to manage all content dynamically. It also features a floating AI chatbot widget powered by the Google Gemini SDK to guide visitors.

---

## 🚀 Key Features

* **Premium Dark Mode & Glassmorphism**: Designed with a sleek dark aesthetic (`slate-950` background), glowing background auroras, responsive flex/grid layouts, and responsive side-by-side hero sections.
* **Micro-Animations**: Hover-triggered glowing border highlights, scale-up transformations on project cards, and a subtle glowing aura around the profile photo.
* **CMS-Driven Portfolio Content**: Real-time project syncing (title, description, tech stack, and thumbnail images) using GROQ queries to pull directly from Sanity.
* **Interactive AI Assistant**: A custom floating chatbot widget in the bottom-right corner built with a glassmorphic popup UI, real-time "thinking" typing indicator, message autoscrolling, and a FastAPI Python backend.

---

## 🛠️ Project Architecture

This repository is organized as a monorepo containing three primary services:

* **`portfolio-frontend/`**: The Next.js client-side application. It fetches project details from the CMS and handles the user interface.
* **`portfolio-cms/`**: The headless Content Management System powered by Sanity.io. This handles the content schema and database entries.
* **`portfolio-chatbot/`**: A FastAPI Python backend that handles communication with the Google Gemini model.

---

## 🛠️ Built With

* **Frontend**: Next.js 15+ (React 19, TypeScript, Tailwind CSS v4, Framer Motion/Native CSS transitions)
* **CMS**: Sanity v3 Studio (GROQ query language)
* **Chatbot Backend**: Python 3.10+ (FastAPI, Google GenAI SDK, Uvicorn)

---

## ⚙️ Getting Started

Follow the steps below to start each service locally on your machine.

### 1. Start the CMS Studio
Navigate to the CMS directory, install dependencies, and start the local Sanity Studio server:
```bash
cd portfolio-cms
npm install
npm run dev
```
*The Sanity Studio panel will run on **`http://localhost:3333`**.*

### 2. Start the Chatbot Backend
Navigate to the chatbot directory, activate your Python virtual environment, install dependencies, and launch the Uvicorn server:
```bash
cd portfolio-chatbot

# Create virtual environment (if not already done)
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start the server
uvicorn main:app --reload
```
*The FastAPI chatbot backend will run on **`http://127.0.0.1:8000`**.*

### 3. Start the Next.js Frontend
Navigate to the frontend directory, install dependencies, and launch the Next.js development server:
```bash
cd portfolio-frontend
npm install
npm run dev
```
*The frontend user interface will run on **`http://localhost:3000`**.*

---

*This README was updated to align with the latest premium dark mode visual overhaul, floating AI assistant, and Gemini API SDK upgrades.*
