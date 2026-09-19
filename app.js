const STORAGE_KEY = "todo-list-items";

const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const emptyMessage = document.querySelector("#empty-message");
const remainingCount = document.querySelector("#remaining-count");
const themeToggle = document.querySelector("#theme-toggle");
const themeIcon = document.querySelector(".theme-icon");
const themeLabel = document.querySelector(".theme-label");
const filterButtons = document.querySelectorAll(".filter-button");

let todos = loadTodos();
let nextTodoId = Date.now();
let currentFilter = "all";
const THEME_STORAGE_KEY = "todo-list-theme";

// 從 localStorage 讀取資料，格式錯誤時回傳空清單。
function loadTodos() {
  try {
    const savedTodos = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(savedTodos) ? savedTodos : [];
  } catch {
    return [];
  }
}

// 將目前清單保存到 localStorage。
function saveTodos() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

// 優先使用瀏覽器提供的 UUID，並保留離線檔案開啟時的備援方式。
function createTodoId() {
  return crypto.randomUUID?.() ?? String(nextTodoId++);
}

// 取得作業系統目前使用的色彩模式。
function getSystemTheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

// 套用主題並更新切換按鈕的文字與圖示。
function applyTheme(theme) {
  document.body.dataset.theme = theme;
  const isDark = theme === "dark";
  themeIcon.textContent = isDark ? "☀️" : "🌙";
  themeLabel.textContent = isDark ? "淺色模式" : "深色模式";
  themeToggle.setAttribute("aria-pressed", String(isDark));
}

// 根據儲存設定或作業系統設定初始化主題。
function initializeTheme() {
  applyTheme(localStorage.getItem(THEME_STORAGE_KEY) || getSystemTheme());
}

// 依照目前篩選條件取得要顯示的待辦事項。
function getFilteredTodos() {
  if (currentFilter === "active") {
    return todos.filter((todo) => !todo.completed);
  }

  if (currentFilter === "completed") {
    return todos.filter((todo) => todo.completed);
  }

  return todos;
}

// 更新篩選按鈕的選取狀態與無資料提示。
function updateFilterState(filteredTodos) {
  filterButtons.forEach((button) => {
    const isActive = button.dataset.filter === currentFilter;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  const emptyMessages = {
    all: "還沒有任何待辦事項,新增一個吧!",
    active: "目前沒有未完成的待辦事項。",
    completed: "目前沒有已完成的待辦事項。",
  };
  emptyMessage.textContent = emptyMessages[currentFilter];
  emptyMessage.hidden = filteredTodos.length > 0;
}

// 根據資料重新建立畫面內容與未完成數量。
function renderTodos() {
  todoList.replaceChildren();
  const filteredTodos = getFilteredTodos();

  filteredTodos.forEach((todo) => {
    const listItem = document.createElement("li");
    listItem.className = "todo-item";
    listItem.dataset.id = todo.id;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.setAttribute("aria-label", `標記「${todo.text}」為完成`);

    const text = document.createElement("span");
    text.className = "todo-text";
    text.textContent = todo.text;

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.type = "button";
    deleteButton.textContent = "刪除";
    deleteButton.setAttribute("aria-label", `刪除「${todo.text}」`);

    if (todo.completed) {
      listItem.classList.add("completed");
    }

    listItem.append(checkbox, text, deleteButton);
    todoList.append(listItem);
  });

  const unfinishedCount = todos.filter((todo) => !todo.completed).length;
  remainingCount.textContent = `未完成:${unfinishedCount} 項`;
  updateFilterState(filteredTodos);
}

themeToggle.addEventListener("click", () => {
  const nextTheme = document.body.dataset.theme === "dark" ? "light" : "dark";
  localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
  applyTheme(nextTheme);
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentFilter = button.dataset.filter;
    renderTodos();
  });
});

todoForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = todoInput.value.trim();

  if (!text) {
    return;
  }

  todos.push({
    id: createTodoId(),
    text,
    completed: false,
  });
  saveTodos();
  renderTodos();
  todoInput.value = "";
  todoInput.focus();
});

todoList.addEventListener("change", (event) => {
  if (event.target.type !== "checkbox") {
    return;
  }

  const todoItem = event.target.closest(".todo-item");
  const todo = todos.find((item) => item.id === todoItem.dataset.id);
  todo.completed = event.target.checked;
  saveTodos();
  renderTodos();
});

todoList.addEventListener("click", (event) => {
  if (!event.target.classList.contains("delete-button")) {
    return;
  }

  const todoItem = event.target.closest(".todo-item");
  todos = todos.filter((todo) => todo.id !== todoItem.dataset.id);
  saveTodos();
  renderTodos();
});

initializeTheme();
renderTodos();