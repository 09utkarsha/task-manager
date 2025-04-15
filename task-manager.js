$(document).ready(function () {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function renderTasks() {
        $("#taskList").empty();
        tasks.forEach((task, index) => {
            $("#taskList").append(`
                <li class="list-group-item d-flex justify-content-between align-items-center">
                    <span class="task-text" data-index="${index}">${task}</span>
                    <div>
                        <button class="btn btn-sm btn-warning edit-btn me-2">Edit</button>
                        <button class="btn btn-sm btn-danger delete-btn">Delete</button>
                    </div>
                </li>
            `);
        });
    }

    $("#addTaskBtn").on("click", function () {
        const taskText = $("#taskInput").val().trim();
        if (taskText !== "") {
            tasks.push(taskText);
            saveTasks();
            renderTasks();
            $("#taskInput").val("");
        }
    });

    $("#taskList").on("click", ".delete-btn", function () {
        const index = $(this).closest("li").find(".task-text").data("index");
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    });

    $("#taskList").on("click", ".edit-btn", function () {
        const li = $(this).closest("li");
        const index = li.find(".task-text").data("index");
        const currentText = tasks[index];
        const newText = prompt("Edit task:", currentText);

        if (newText !== null && newText.trim() !== "") {
            tasks[index] = newText.trim();
            saveTasks();
            renderTasks();
        }
    });

    // Initial render
    renderTasks();
});
