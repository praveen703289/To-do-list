const b1 = document.getElementById("add");
const newTask = document.getElementById("new_task");
const list = document.getElementById("list");
const b2 = document.getElementById("delete");

// Load tasks from local storage
const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Function to render tasks
const renderTasks = () => {
    list.innerHTML = "";
    savedTasks.forEach((savedTask) => {
        const taskDiv = document.createElement("div");
        const task = document.createElement("div");
        const operations = document.createElement("div");
        const plus = document.createElement("button");
        const cross = document.createElement("button");

        task.textContent = savedTask.text;
        taskDiv.style.backgroundColor = savedTask.completed ? "#90EE90" : "";
        
        plus.textContent = '+';
        cross.textContent = 'x';

        taskDiv.appendChild(task);
        operations.appendChild(plus);
        operations.appendChild(cross);
        taskDiv.appendChild(operations);
        taskDiv.style.display = "flex";
        list.appendChild(taskDiv);

        task.style.width = "80%";
        task.style.overflowWrap = "break-word";
        taskDiv.style.border = "1px solid gray";
        operations.style.marginLeft = "10%";
        task.style.color = "blue";

        cross.addEventListener("click", () => {
            // Remove task from the saved tasks
            const index = savedTasks.findIndex((t) => t.text === savedTask.text);
            savedTasks.splice(index, 1);

            // Save updated tasks to local storage
            localStorage.setItem("tasks", JSON.stringify(savedTasks));

            // Remove task from the DOM
            list.removeChild(taskDiv);
        });

        plus.addEventListener("click", () => {
            taskDiv.style.backgroundColor = "#90EE90";
            savedTask.completed = true;

            // Save updated tasks to local storage
            localStorage.setItem("tasks", JSON.stringify(savedTasks));
        });
    });
};

// Initial rendering of tasks
renderTasks();

// Event listener for adding a new task
b1.addEventListener("click", () => {
    if (newTask.value === "") {
        alert("Cannot be null");
    } else {
        // Create a new task object
        const newTaskObject = {
            text: newTask.value,
            completed: false,
        };

        // Add the new task to saved tasks
        savedTasks.push(newTaskObject);

        // Save updated tasks to local storage
        localStorage.setItem("tasks", JSON.stringify(savedTasks));

        // Render the updated tasks
        renderTasks();

        // Clear the input field
        newTask.value = "";
    }
});

// Event listener for deleting all tasks
b2.addEventListener("click", () => {
    // Clear saved tasks
    savedTasks.length = 0;

    // Save updated tasks to local storage
    localStorage.setItem("tasks", JSON.stringify(savedTasks));

    // Render the updated tasks
    renderTasks();
});
