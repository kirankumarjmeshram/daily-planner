const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task");
const taskList = document.getElementById("task-list");
const searchInput = document.getElementById("search");
const clearAllBtn = document.getElementById("clear-all");
const backToTopBtn = document.getElementById("back-to-top");

const debounce = (func, delay) => {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
};

const throttle = (func, limit) => {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

const getTasks = () => JSON.parse(localStorage.getItem("tasks")) || [];
const saveTasks = (tasks) =>
  localStorage.setItem("tasks", JSON.stringify(tasks));

function renderTasks(tasks) {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";

    const check = document.createElement("input");
    check.type = "checkbox";
    check.checked = task.completed;
    check.addEventListener("change", () => toggleComplete(index));
    li.appendChild(check);

    const span = document.createElement("span");
    span.textContent = task.text;
    li.appendChild(span);

    const del = document.createElement("button");
    del.textContent = "Delete";
    del.addEventListener("click", () => deleteTask(index));
    li.appendChild(del);

    taskList.appendChild(li);
  });
}

function addTask() {
  if (!taskInput.value.trim()) return;
  const tasks = getTasks();
  const task = { text: taskInput.value.trim(), completed: false };
  tasks.push(task);
  saveTasks(tasks);
  taskInput.value = "";
  renderTasks(tasks);
}

function deleteTask(index) {
  const tasks = getTasks();
  tasks.splice(index, 1);
  saveTasks(tasks);
  renderTasks(tasks);
}

function toggleComplete(index) {
  const tasks = getTasks();
  tasks[index].completed = !tasks[index].completed;
  saveTasks(tasks);
  renderTasks(tasks);
}

function clearAllTasks() {
  saveTasks([]);
  renderTasks([]);
}

function searchTasks() {
  const query = searchInput.value.toLowerCase();
  const tasks = getTasks();
  const filtered = tasks.filter((t) => t.text.toLowerCase().includes(query));
  renderTasks(filtered);
}

function handleScroll() {
  backToTopBtn.style.display = window.scrollY > 100 ? "block" : "none";
}

backToTopBtn.addEventListener("click", () =>
  window.scrollTo({ top: 0, behavior: "smooth" })
);
window.addEventListener("scroll", throttle(handleScroll, 200));

addTaskBtn.addEventListener("click", addTask);
clearAllBtn.addEventListener("click", clearAllTasks);
searchInput.addEventListener("input", debounce(searchTasks, 300));

document.addEventListener("DOMContentLoaded", () => {
  renderTasks(getTasks());
});
