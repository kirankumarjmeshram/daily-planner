# Daily Planner

A simple and efficient web application for managing daily tasks with a clean, modern interface.

## Features

- Add, complete, and delete tasks
- Search functionality with debounced input
- Persistent storage using localStorage
- Responsive design
- "Back to Top" button with throttled scroll
- Task categories (Personal, Work, Study)
- Clear All Tasks functionality

## Project Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/daily-planner.git
cd daily-planner
```

2. Open `index.html` in your web browser to run the application locally.

## Project Structure

```
daily-planner/
├── index.html          # Main HTML file
├── styles/
│   └── main.css       # Main stylesheet
├── js/
│   ├── app.js         # Main application logic
│   └── modules/       # Modular JavaScript files
└── README.md          # Project documentation
```

## Technologies Used

- HTML5 (Semantic tags)
- CSS3 (Flexbox, Grid, Media Queries)
- JavaScript (ES6+, Modules, LocalStorage)
- Performance optimizations (Debounce, Throttle)

## Usage

1. Add a new task using the input field at the top
2. Mark tasks as complete by clicking the checkbox
3. Delete tasks using the delete button
4. Search tasks using the search bar
5. Use the "Back to Top" button when scrolling
6. Categorize tasks using the category dropdown
7. Clear all tasks using the "Clear All" button

## Browser Support

The application is compatible with all modern browsers that support ES6+ features.