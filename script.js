//Theme Switch
const themeSwitch = document.querySelector(".switch");
const body = document.body;

themeSwitch.addEventListener("click", () => {
    themeSwitch.classList.toggle("active");
    body.classList.toggle("lightmode");
    localStorage.setItem("theme", body.classList.contains("lightmode") ? "light" : "dark");
});

if (localStorage.getItem("theme") === "light") {
    body.classList.add("lightmode");
    themeSwitch.classList.add("active");
}

// Load filter state
filterTasks(localStorage.getItem("filterState") || "All");
const selector = document.getElementById("selector");
const dropdown = document.querySelector(".dropdown");

selector.addEventListener("focus", () => {
    dropdown.classList.add("active");
});

document.addEventListener("click", (event) => {
    if (!selector.contains(event.target)) {
        dropdown.classList.remove("active");
    }
});

dropdown.addEventListener("click", (event) => {
    if (event.target.tagName === "BUTTON") {
        if (event.target.className === "active") return;
        const filter = event.target.innerText;
        localStorage.setItem("filterState", filter);

        for (btn of dropdown.querySelectorAll("button")) {
            btn.classList.remove("active");
        }
        event.target.classList.add("active");
        filterTasks(filter);
    }
});

function filterTasks(filter) {
    const btnText = document.getElementById("btn-text");
    btnText.innerText = filter;
    document.querySelectorAll(".task").forEach(element => {
        if (filter === "All") {
            element.classList.remove("fade-out");
            setTimeout(() => {
                element.classList.remove("hidden");
            }, 300);
            
        } else if (filter === "Active") {
            element.classList.toggle("fade-out", element.classList.contains("done"));
            setTimeout(() => {
                element.classList.toggle("hidden", element.classList.contains("done"));
            }, 300);
        } else {
            element.classList.toggle("fade-out", !element.classList.contains("done"));
            setTimeout(() => {
                element.classList.toggle("hidden", !element.classList.contains("done"));
            }, 300);
        }
    });
}

// LocalStorage Helpers
function updateLocalStorage() {
    const tasks = [];
    document.querySelectorAll(".task").forEach(task => {
        const label = task.querySelector(".label").value;
        const done = task.classList.contains("done");
        tasks.push({ label, done });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
    const stored = localStorage.getItem("tasks");
    if (!stored) return;
    const tasks = JSON.parse(stored);
    tasks.forEach(({ label, done }) => createTask(label, done));
}

// Add Task
const addBtn = document.getElementById("add-todo");

function addTask() {
    const input = document.getElementById("todo-input");
    const taskText = input.value.trim();
    if (!taskText) {
        const errorLabel = document.querySelector(".error-label");
        errorLabel.classList.add("visible");
        setTimeout(() => errorLabel.classList.remove("visible"), 2000);
        input.focus();
        return;
    }
    createTask(taskText);
    input.value = "";
}

function createTask(taskText, isDone = false) {
    const todoList = document.getElementById("todo-list");
    const task = document.createElement("li");
    task.className = "task";
    if (isDone) task.classList.add("done");

    task.innerHTML = ` <div class="label-container">
        <textarea readonly class="label">${taskText}</textarea>
        </div>
        <div class="confirmation">
            <button class="edit">
                <!-- your SVG here -->
                ✏️
            </button>
        </div>
        <article class="checkbox-container">
            <label class="checkbox">
                <input type="checkbox" ${isDone ? "checked" : ""}/>
            </label>
        </article>
        <button class="remove-todo">❌</button>`;

    todoList.appendChild(task);

    taskDone(task);
    const removeBtn = task.querySelector(".remove-todo");
    removeBtn.addEventListener("click", () => {
        task.classList.add("fade-out");
        setTimeout(() => {
            task.remove();
            updateLocalStorage();
        }, 300);
    });

    const edit = task.querySelector(".edit");
    edit.addEventListener("click", () => editTask(task));

    const label = task.querySelector(".label");
    autoGrow(label);
    label.addEventListener("input", function () {
        autoGrow(this);
    });
    setTimeout(() => {
        filterTasks(localStorage.getItem("filterState") || "All");
    }, 800);
    updateLocalStorage();
}

function taskDone(task) {
    const checkBox = task.querySelector("input[type='checkbox']");
    checkBox.addEventListener("change", () => {
        task.classList.toggle("done", checkBox.checked);
        setTimeout(() => {
            filterTasks(localStorage.getItem("filterState") || "All");
            updateLocalStorage();
        }, 300);
    });
}

function editTask(task) {
    const label = task.querySelector(".label");
    const editBtn = task.querySelector(".edit");
    const labelText = label.value;
    const confirmation = task.querySelector(".confirmation");
    label.removeAttribute("readonly");
    label.focus();
    autoGrow(label);

    function onInput() { autoGrow(label); }
    label.addEventListener("input", onInput);

    const confirmBtn = document.createElement("button");
    confirmBtn.innerText = "✔️";
    confirmBtn.classList.add("confirm");

    const cancelBtn = document.createElement("button");
    cancelBtn.innerText = "❌";

    confirmation.append(confirmBtn, cancelBtn);
    editBtn.classList.add("hidden");

    confirmBtn.addEventListener("click", () => {
        label.setAttribute("readonly", "readonly");
        label.removeEventListener("input", onInput);
        confirmation.removeChild(confirmBtn);
        confirmation.removeChild(cancelBtn);
        editBtn.classList.remove("hidden");
        updateLocalStorage(); // ✅ Save after edit confirm
    });

    cancelBtn.addEventListener("click", () => {
        label.value = labelText;
        label.setAttribute("readonly", "readonly");
        label.removeEventListener("input", onInput);
        confirmation.removeChild(confirmBtn);
        confirmation.removeChild(cancelBtn);
        editBtn.classList.remove("hidden");
    });
}

addBtn.addEventListener("click", addTask);

function autoGrow(textarea) {
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
}

// Load saved tasks on page load
window.addEventListener("DOMContentLoaded", loadTasksFromLocalStorage);
