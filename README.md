# Task Board - Fluid AI Assignment

A clean, full-stack task management application built with **Python FastAPI** backend and **React** frontend.

## Features

### Core Requirements

✅ Add tasks with input box and button  
✅ Display task list with title, checkbox, and delete button  
✅ Mark tasks as complete/incomplete  
✅ Delete tasks  
✅ Progress indicator (percentage + progress bar)  
✅ Python backend with RESTful APIs  
✅ Persistent storage (JSON file)

### Unique Feature: **Priority Management System**

- **3-Level Priority System**: High, Medium, Low
- **Smart Task Sorting**: Auto-sorts by completion status and priority
- **Priority Statistics**: Real-time dashboard showing task breakdown by priority

## Architecture

### Backend (Python + FastAPI)

- **Framework**: FastAPI with Pydantic models
- **Storage**: In-memory + JSON file persistence
- **APIs**:
  - `GET /api/tasks` - List all tasks
  - `POST /api/tasks` - Create task with priority
  - `PATCH /api/tasks/{id}` - Toggle completion
  - `DELETE /api/tasks/{id}` - Delete task
  - `GET /api/stats` - Get statistics (unique feature)

### Frontend (React + Vite + Tailwind)

- **Framework**: React 18 with Vite
- **Styling**: Tailwind CSS with custom gradient design
- **Components**:
  - `TaskInput`: Add tasks with priority selection
  - `TaskList`: Sorted task display
  - `TaskItem`: Individual task with priority badge
  - `ProgressBar`: Animated completion tracker
  - `Stats`: Priority-based statistics dashboard

## 📦 Project Structure

```
fluid-ai/
├── backend/
│   ├── main.py           # FastAPI application
│   ├── requirements.txt  # Python dependencies
│   └── tasks.json        # Data persistence
└── frontend/
    ├── src/
    │   ├── components/   # React components
    │   ├── App.jsx       # Main application
    │   ├── main.jsx      # Entry point
    │   └── index.css     # Global styles
    ├── index.html
    ├── package.json
    ├── vite.config.js
    └── tailwind.config.js
```

## Running Locally

### Backend Setup

```bash
cd backend
pip install -r requirements.txt
python main.py
```

Backend runs on: `http://localhost:8000`

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on: `http://localhost:3000`

## Tech Stack

**Backend:**

- Python 3.8+
- FastAPI
- Uvicorn
- Pydantic

**Frontend:**

- React 18
- Vite
- Tailwind CSS
- Axios

## 💡 Key Engineering Decisions

1. **FastAPI over Flask**: Better performance, automatic API docs, type validation
2. **JSON File Storage**: Simple, portable, meets "runtime persistence" requirement
3. **Priority System**: Adds real value beyond basic CRUD operations
4. **Component Architecture**: Clean separation of concerns
5. **Tailwind CSS**: Rapid UI development with consistent design
6. **Smart Sorting**: UX enhancement - incomplete tasks first, then by priority
"# Task-Board" 
