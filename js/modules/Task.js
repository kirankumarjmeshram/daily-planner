/**
 * Task class to represent a single task
 */
export class Task {
    /**
     * Create a new task
     * @param {string} text - The task text
     * @param {string} category - The task category
     * @param {boolean} completed - Whether the task is completed
     */
    constructor(text, category = 'personal', completed = false) {
        this.id = Date.now().toString();
        this.text = text;
        this.category = category;
        this.completed = completed;
        this.createdAt = new Date();
    }

    /**
     * Toggle the completed status of the task
     */
    toggleComplete() {
        this.completed = !this.completed;
    }

    /**
     * Create a task element for the DOM
     * @returns {HTMLElement} - The task element
     */
    createTaskElement() {
        console.log('Creating task element for:', this);
        const taskElement = document.createElement('li');
        taskElement.className = 'task-item';
        taskElement.dataset.id = this.id;

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'task-checkbox';
        checkbox.checked = this.completed;

        const textSpan = document.createElement('span');
        textSpan.className = `task-text ${this.completed ? 'completed' : ''}`;
        textSpan.textContent = this.text;

        const categorySpan = document.createElement('span');
        categorySpan.className = 'task-category';
        categorySpan.textContent = this.category;

        const deleteButton = document.createElement('button');
        deleteButton.className = 'btn btn-danger';
        deleteButton.textContent = 'Delete';

        taskElement.appendChild(checkbox);
        taskElement.appendChild(textSpan);
        taskElement.appendChild(categorySpan);
        taskElement.appendChild(deleteButton);

        console.log('Created task element:', taskElement);
        return taskElement;
    }

    /**
     * Convert task to a plain object for storage
     * @returns {Object} - The task object
     */
    toObject() {
        return {
            id: this.id,
            text: this.text,
            category: this.category,
            completed: this.completed,
            createdAt: this.createdAt
        };
    }

    /**
     * Create a Task instance from a plain object
     * @param {Object} obj - The task object
     * @returns {Task} - A new Task instance
     */
    static fromObject(obj) {
        const task = new Task(obj.text, obj.category, obj.completed);
        task.id = obj.id;
        task.createdAt = new Date(obj.createdAt);
        return task;
    }
} 