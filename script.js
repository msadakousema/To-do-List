const addBtn = document.getElementById("add-todo");

function addTask(){
    const input = document.getElementById("todo-input");
    const taskText = input.value;
    if (!taskText) {
        alert("Please enter a task.");
        return;
    }

    const todoList = document.getElementById("todo-list");
    //adding task
    const task = document.createElement("li");
    task.className = "task"
    
    task.innerHTML = ` <div class="label-container">
    <input value="${taskText}" readonly class="label">
    <div class="confirmation">
        <button class="edit">
            <?xml version="1.0" encoding="iso-8859-1"?>
            <!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
            <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
            <svg fill="#000000" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                width="800px" height="800px" viewBox="0 0 494.936 494.936" xml:space="preserve">
                <g>
                    <g>
                        <path d="M389.844,182.85c-6.743,0-12.21,5.467-12.21,12.21v222.968c0,23.562-19.174,42.735-42.736,42.735H67.157
                            c-23.562,0-42.736-19.174-42.736-42.735V150.285c0-23.562,19.174-42.735,42.736-42.735h267.741c6.743,0,12.21-5.467,12.21-12.21
                            s-5.467-12.21-12.21-12.21H67.157C30.126,83.13,0,113.255,0,150.285v267.743c0,37.029,30.126,67.155,67.157,67.155h267.741
                            c37.03,0,67.156-30.126,67.156-67.155V195.061C402.054,188.318,396.587,182.85,389.844,182.85z"/>
                        <path d="M483.876,20.791c-14.72-14.72-38.669-14.714-53.377,0L221.352,229.944c-0.28,0.28-3.434,3.559-4.251,5.396l-28.963,65.069
                            c-2.057,4.619-1.056,10.027,2.521,13.6c2.337,2.336,5.461,3.576,8.639,3.576c1.675,0,3.362-0.346,4.96-1.057l65.07-28.963
                            c1.83-0.815,5.114-3.97,5.396-4.25L483.876,74.169c7.131-7.131,11.06-16.61,11.06-26.692
                            C494.936,37.396,491.007,27.915,483.876,20.791z M466.61,56.897L257.457,266.05c-0.035,0.036-0.055,0.078-0.089,0.107
                            l-33.989,15.131L238.51,247.3c0.03-0.036,0.071-0.055,0.107-0.09L447.765,38.058c5.038-5.039,13.819-5.033,18.846,0.005
                            c2.518,2.51,3.905,5.855,3.905,9.414C470.516,51.036,469.127,54.38,466.61,56.897z"/>
                    </g>
                </g>
            </svg>
        </button>
    </div>
</div>

<article class="checkbox-container">
    <label class="checkbox">
        <input type="checkbox" />
    </label>
</article>

<button class="remove-todo"></button>
`
    
    todoList.appendChild(task);
    input.value = ""; // Clear the input field
    //task done
    const checkBox = task.querySelector("input[type='checkbox']");
    checkBox.addEventListener("change", () => {
        if (checkBox.checked) {
            task.classList.add("done");
        } else {
            task.classList.remove("done");
        }
    });

    //removing task
    const removeBtn = task.querySelector(".remove-todo");
    removeBtn.addEventListener("click", ()=> task.remove());

    //edit
    const edit = task.querySelector(".edit");
    edit.addEventListener("click", () => editTask(task));
}

function editTask(task){
    const label = task.querySelector(".label");
    const editBtn = task.querySelector(".edit");

    const labelText = label.value;
    const confirmation = task.querySelector(".confirmation");
    label.removeAttribute("readonly");
    label.focus();

    const confirmBtn = document.createElement("button");
    confirmBtn.innerHTML=`
    <button class="confirm">
        <?xml version="1.0" encoding="utf-8"?>
        
        <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
        <!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
        <svg  version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
            width="800px" height="800px" viewBox="0 0 72 72" enable-background="new 0 0 72 72" xml:space="preserve">
        <g>
            <path d="M24.014,70.462c-2.617,0-5.073-1.016-6.917-2.859L2.175,53.877c-1.908-1.906-2.926-4.364-2.926-6.979
                s1.018-5.072,2.866-6.92c1.849-1.849,4.307-2.866,6.921-2.866c2.591,0,5.029,1,6.872,2.818l8.102,7.109L55.861,4.618
                c0.057-0.075,0.119-0.146,0.186-0.213c1.849-1.85,4.307-2.867,6.921-2.867s5.072,1.018,6.921,2.867
                c3.784,3.784,3.815,9.923,0.093,13.747L31.697,67.416c-0.051,0.065-0.106,0.128-0.165,0.188c-1.914,1.912-4.498,2.926-7.214,2.854
                C24.216,70.46,24.116,70.462,24.014,70.462z M9.037,41.112c-1.546,0-2.999,0.602-4.093,1.695C3.851,43.9,3.25,45.353,3.25,46.898
                s0.602,3,1.694,4.093l14.922,13.726c1.148,1.146,2.6,1.914,4.148,1.914l0.227,0.164c0.05,0,0.1,0,0.151,0l0.221-0.164
                c1.51,0,2.929-0.654,4.008-1.69l38.275-49.294c0.051-0.065,0.105-0.148,0.165-0.207c2.256-2.258,2.256-5.939,0-8.195
                c-1.094-1.094-2.547-1.701-4.093-1.701c-1.502,0-2.917,0.566-3.999,1.602L25.914,51.169c-0.335,0.445-0.84,0.73-1.394,0.787
                c-0.551,0.057-1.106-0.118-1.525-0.486l-9.771-8.573c-0.032-0.028-0.064-0.058-0.095-0.089
                C12.036,41.714,10.583,41.112,9.037,41.112z"/>
        </g>
        </svg>
    </button>`

    cancelBtn = document.createElement("button");
    cancelBtn.innerHTML=      `  <?xml version="1.0" encoding="UTF-8"?>
    <!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
    <svg width="800px" height="800px" viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <title>cancel</title>
        <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g id="work-case"  transform="translate(91.520000, 91.520000)">
    <polygon id="Close" points="328.96 30.2933333 298.666667 1.42108547e-14 164.48 134.4 30.2933333
        1.42108547e-14 1.42108547e-14 30.2933333 134.4 164.48 1.42108547e-14 298.666667 30.2933333 328.96 164.48
        194.56 298.666667 328.96 328.96 298.666667 194.56 164.48">
    
    </polygon>
            </g>
        </g>
    </svg>`
    confirmation.append(confirmBtn, cancelBtn); // Add confirmation buttons;
    editBtn.classList.add("hidden"); // Hide the edit button

    confirmBtn.addEventListener("click", () => { 
        label.setAttribute("readonly","readonly");
        
        confirmation.removeChild(confirmBtn); // Remove the confirm button
        confirmation.removeChild(cancelBtn); // Remove the cancel button
        editBtn.classList.remove("hidden"); // Show the edit button again
    })

    cancelBtn.addEventListener("click", () => {
        label.value = labelText; // Restore the original text
        label.setAttribute("readonly","readonly");
        
        confirmation.removeChild(confirmBtn); // Remove the confirm button
        confirmation.removeChild(cancelBtn); // Remove the cancel button
        editBtn.classList.remove("hidden"); // Show the edit button again
    });
    
}

addBtn.addEventListener("click", addTask);

//Filter
const selector = document.getElementById("selector");
const dropdown = document.querySelector(".dropdown");

selector.addEventListener("focus", () => {
    dropdown.classList.add("active");
})

document.addEventListener("click", (event) => {
    if (!selector.contains(event.target)) {
        dropdown.classList.remove("active");
    }
});

// Filter tasks based on the selected option
dropdown.addEventListener("click", (event) => {
    if (event.target.tagName === "BUTTON") {
        if ( event.target.className === "active"){
            return; // Ignore clicks on the active button
        }
        const filter = event.target.innerText;
        const btnText = document.getElementById("btn-text");
        btnText.innerText = filter;
        
        for (btn of dropdown.querySelectorAll("button")) {
            btn.classList.remove("active");
        }
        event.target.classList.add("active");

       filterTasks(filter);
    }
});

function filterTasks(filter) {
    if (filter === "All") {
        for (element of document.querySelectorAll(".task")) {
            element.classList.remove("hidden");
        }
    }
    else if (filter === "Active") {
        for (element of document.querySelectorAll(".task")) {
            if (element.classList.contains("done"))  element.classList.add("hidden");
                else element.classList.remove("hidden");
        }
    } 
    else {
        for (element of document.querySelectorAll(".task")) {
            if (element.classList.contains("done")) element.classList.remove("hidden");
            else element.classList.add("hidden");   
        }   
    }
}
