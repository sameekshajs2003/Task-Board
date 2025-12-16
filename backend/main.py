from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import json
import os
from datetime import datetime

app = FastAPI()

# CORS middleware for frontend connection
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Task(BaseModel):
    id: int
    title: str
    completed: bool = False
    priority: str = "medium"  # low, medium, high - unique feature
    created_at: str
    
class TaskCreate(BaseModel):
    title: str
    priority: Optional[str] = "medium"

class TaskUpdate(BaseModel):
    completed: bool

#In-memory storage 
TASKS_FILE = "tasks.json"
tasks_db: List[Task] = []
next_id = 1

def load_tasks():
    """Load tasks from JSON file"""
    global tasks_db, next_id
    if os.path.exists(TASKS_FILE):
        try:
            with open(TASKS_FILE, 'r') as f:
                data = json.load(f)
                tasks_db = [Task(**task) for task in data.get('tasks', [])]
                next_id = data.get('next_id', 1)
        except Exception as e:
            print(f"Error loading tasks: {e}")
            tasks_db = []
            next_id = 1

def save_tasks():
    """Save tasks to JSON file"""
    try:
        with open(TASKS_FILE, 'w') as f:
            json.dump({
                'tasks': [task.dict() for task in tasks_db],
                'next_id': next_id
            }, f, indent=2)
    except Exception as e:
        print(f"Error saving tasks: {e}")

load_tasks()

@app.get("/")
def read_root():
    return {"message": "Task Board API", "version": "1.0"}

@app.get("/api/tasks", response_model=List[Task])
def get_tasks():
    """Get all tasks"""
    return tasks_db

@app.post("/api/tasks", response_model=Task)
def create_task(task: TaskCreate):
    """Create a new task"""
    global next_id
    
    if not task.title.strip():
        raise HTTPException(status_code=400, detail="Task title cannot be empty")
    
    new_task = Task(
        id=next_id,
        title=task.title.strip(),
        completed=False,
        priority=task.priority or "medium",
        created_at=datetime.now().isoformat()
    )
    
    tasks_db.append(new_task)
    next_id += 1
    save_tasks()
    
    return new_task

@app.patch("/api/tasks/{task_id}", response_model=Task)
def update_task(task_id: int, task_update: TaskUpdate):
    """Mark a task as complete/incomplete"""
    for task in tasks_db:
        if task.id == task_id:
            task.completed = task_update.completed
            save_tasks()
            return task
    
    raise HTTPException(status_code=404, detail="Task not found")

@app.delete("/api/tasks/{task_id}")
def delete_task(task_id: int):
    """Delete a task"""
    global tasks_db
    
    initial_length = len(tasks_db)
    tasks_db = [task for task in tasks_db if task.id != task_id]
    
    if len(tasks_db) == initial_length:
        raise HTTPException(status_code=404, detail="Task not found")
    
    save_tasks()
    return {"message": "Task deleted successfully"}

@app.get("/api/stats")
def get_stats():
    """Get task statistics - unique feature enhancement"""
    total = len(tasks_db)
    completed = sum(1 for task in tasks_db if task.completed)
    by_priority = {
        "high": sum(1 for task in tasks_db if task.priority == "high" and not task.completed),
        "medium": sum(1 for task in tasks_db if task.priority == "medium" and not task.completed),
        "low": sum(1 for task in tasks_db if task.priority == "low" and not task.completed)
    }
    
    return {
        "total": total,
        "completed": completed,
        "pending": total - completed,
        "completion_rate": round((completed / total * 100) if total > 0 else 0, 1),
        "by_priority": by_priority
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
