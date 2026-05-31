# Pacres' Dynamic Portfolio

Welcome to my personal portfolio repository! I built this portfolio from scratch with a focus on **automation and scalability**. Instead of manually updating the code every time I get a new certification, complete a new project, or achieve a new milestone, I integrated a headless Content Management System (CMS) to manage all my content dynamically.

## Project Architecture

This repository is organized into a monorepo structure with three distinct parts:

- **`portfolio-frontend/`**: The face of the portfolio. This is the client-side application that fetches data from the CMS and displays it beautifully.
- **`portfolio-cms/`**: The Content Management System (built with Sanity). This is where I log in to add new projects, achievements, and certifications. As soon as I publish content here, it reflects on the frontend automatically.
- **`portfolio-chatbot/`**: A conversational AI backend built with Python that serves as an interactive assistant for visitors on the site.

## Key Features

* **Dynamic Content Delivery**: No more hardcoding! All achievements, projects, and certifications are fetched dynamically from the CMS.
* **Easy Maintenance**: Content updates are made through a user-friendly CMS dashboard.
* **AI Chatbot Integration**: Visitors can interact with a custom chatbot to learn more about my background and skills.
* **Modern Tech Stack**: Built with modern web development practices for optimal performance and SEO.

## Getting Started

To run this project locally, you will need to start each of the services.

### 1. Starting the CMS
Navigate to the CMS directory, install dependencies, and run the development server:
```bash
cd portfolio-cms
npm install
npm run dev
```
*(The CMS studio will typically run on `http://localhost:3333`)*

### 2. Starting the Frontend
Navigate to the frontend directory, install dependencies, and run the development server:
```bash
cd portfolio-frontend
npm install
npm run dev
```

### 3. Starting the Chatbot Backend
Navigate to the chatbot directory, activate the virtual environment, and run the server:
```bash
cd portfolio-chatbot
# Create and activate your virtual environment (e.g., python -m venv venv)
# source venv/bin/activate  (or venv\Scripts\activate on Windows)
pip install -r requirements.txt
# Run the chatbot server script
```

## Built With
- **Frontend**: Next.js (TypeScript + Tailwind)
- **CMS**: Sanity
- **Chatbot Backend**: Python
- **Cloud Infrastructure**: Google Cloud Run + Artifact Registry

---
*This README will be updated as the project grows and new features are added.*
