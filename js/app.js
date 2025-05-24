import { Task } from './modules/Task.js';
import { debounce, throttle, saveToLocalStorage, loadFromLocalStorage } from './modules/utils.js';

class TaskManager {
    constructor() {
        this.tasks = [];
        this.taskList = document.getElementById('taskList');
        this.taskForm = document.getElementById('taskForm');
        this.taskInput = document.getElementById('taskInput');
        this.taskCategory = document.getElementById('taskCategory');
        this.searchInput = document.getElementById('searchInput');
        this.clearAllBtn = document.getElementById('clearAllBtn');
        this.backToTopBtn = document.getElementById('backToTop');

        this.initializeEventListeners();
        this.loadTasks();
        this.renderTasks();
    }

    initializeEventListeners() {
        // Form submission
        this.taskForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.addTask();
        });

        // Search functionality with debounce
        this.searchInput.addEventListener('input', debounce(() => {
            this.filterTasks();
        }, 300));

        // Clear all tasks
        this.clearAllBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to clear all tasks?')) {
                this.clearAllTasks();
            }
        });

        // Back to top button with throttle
        window.addEventListener('scroll', throttle(() => {
            this.toggleBackToTopButton();
        }, 100));

        this.backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        // Task list event delegation
        this.taskList.addEventListener('click', (e) => {
            const taskItem = e.target.closest('.task-item');
            if (!taskItem) return;

            if (e.target.classList.contains('task-checkbox')) {
                this.toggleTaskComplete(taskItem.dataset.id);
            } else if (e.target.classList.contains('btn-danger')) {
                this.deleteTask(taskItem.dataset.id);
            }
        });
    }

    addTask() {
        const text = this.taskInput.value.trim();
        const category = this.taskCategory.value;

        if (text) {
            const task = new Task(text, category);
            this.tasks.push(task);
            console.log('Added new task:', task);
            this.saveTasks();
            this.renderTasks();
            this.taskInput.value = '';
        }
    }

    deleteTask(taskId) {
        this.tasks = this.tasks.filter(task => task.id !== taskId);
        this.saveTasks();
        this.renderTasks();
    }

    toggleTaskComplete(taskId) {
        const task = this.tasks.find(task => task.id === taskId);
        if (task) {
            task.toggleComplete();
            this.saveTasks();
            this.renderTasks();
        }
    }

    filterTasks() {
        const searchTerm = this.searchInput.value.toLowerCase();
        const filteredTasks = this.tasks.filter(task => 
            task.text.toLowerCase().includes(searchTerm) ||
            task.category.toLowerCase().includes(searchTerm)
        );
        this.renderTasks(filteredTasks);
    }

    clearAllTasks() {
        this.tasks = [];
        this.saveTasks();
        this.renderTasks();
    }

    toggleBackToTopButton() {
        this.backToTopBtn.classList.toggle('visible', window.scrollY > 300);
    }

    renderTasks(tasksToRender = this.tasks) {
        console.log('Rendering tasks:', tasksToRender);
        this.taskList.innerHTML = '';
        tasksToRender.forEach(task => {
            const taskElement = task.createTaskElement();
            console.log('Created task element:', taskElement);
            this.taskList.appendChild(taskElement);
        });
    }

    saveTasks() {
        const tasksData = this.tasks.map(task => task.toObject());
        saveToLocalStorage('tasks', tasksData);
    }

    loadTasks() {
        const tasksData = loadFromLocalStorage('tasks');
        if (tasksData) {
            this.tasks = tasksData.map(taskData => Task.fromObject(taskData));
        }
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    new TaskManager();
}); 