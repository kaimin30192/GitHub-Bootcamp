const STORAGE_KEY = "todo-list-items";

const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const emptyMessage = document.querySelector("#empty-message");
const remainingCount = document.querySelector("#remaining-count");

let todos = loadTodos();
let nextTodoId = Date.now();

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

// 根據資料重新建立畫面內容與未完成數量。
function renderTodos() {
  todoList.replaceChildren();

  todos.forEach((todo) => {
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
  emptyMessage.hidden = todos.length > 0;
}

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

renderTodos();