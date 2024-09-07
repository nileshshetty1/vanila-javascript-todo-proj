const input = document.querySelector("#input");
const listDiv = document.querySelector(".list");
let tasks = [];

// Load tasks from cookies when the page loads
const loadTasksFromCookies = () => {
  const cookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith("tasks="))
    ?.split("=")[1];

  if (cookie) {
    tasks = JSON.parse(cookie);
    renderTasks(); // Render the existing tasks from the cookie
  }
};

const handleChange = (e) => {
  const letters = e.target.value;
  return addTasks(letters);
};

const addTasks = (task) => {
  const date = new Date().getTime();
  const idCreator = date;
  const taskOBJ = {
    id: idCreator,
    task: task,
    completed: false,
  };

  // Add new task to the existing tasks array
  tasks.push(taskOBJ);
  updateCookiesAndRender();
};

const updateCookiesAndRender = () => {
  const expiryDate = new Date(new Date().getTime() + 3600000).toUTCString();

  // Store the updated tasks array in cookies as a JSON string
  document.cookie = `tasks=${JSON.stringify(
    tasks
  )}; expires=${expiryDate}; path=/`;

  renderTasks(); // Render tasks again after updating the cookie
};

const renderTasks = () => {
  // Clear previous tasks in the listDiv before rendering new ones
  listDiv.innerHTML = "";

  // Loop through each task and display it in a new paragraph
  tasks.forEach((taskObj) => {
    const taskDiv = document.createElement("div");
    taskDiv.className = "task-div";

    const taskPara = document.createElement("p");
    taskPara.className = "task-para";
    taskPara.textContent = taskObj.task; // Display only the task string
    taskPara.setAttribute("task-id", taskObj.id); // Set custom task-id attribute

    taskDiv.appendChild(taskPara);
    listDiv.appendChild(taskDiv);

    // Add event listener to handle click on each task
    taskPara.addEventListener("click", (e) => {
      const clickedTaskId = e.target.getAttribute("task-id"); // Get the task-id of the clicked task
      console.log(`Clicked Task ID: ${clickedTaskId}`);

      // Perform action if the clicked task matches certain criteria (e.g., matching a specific task)
      if (clickedTaskId === taskObj.id.toString()) {
        taskPara.classList.toggle("line-through");
      }
    });
  });
};

// Load existing tasks from cookies when the page loads
loadTasksFromCookies();

input.addEventListener("change", handleChange);
