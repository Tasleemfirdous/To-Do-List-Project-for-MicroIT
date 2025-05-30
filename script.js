let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
}

function addTask() {
  const input = document.getElementById('taskInput');
  const priority = document.getElementById('priority').value;
  const taskText = input.value.trim();
  if (taskText === "") return;

  tasks.push({ text: taskText, done: false, priority });
  input.value = "";
  saveTasks();
}

function renderTasks() {
  const list = document.getElementById('taskList');
  const taskCount = document.getElementById('taskCount');
  const completedCount = document.getElementById('completedCount');
  list.innerHTML = "";

  let completed = 0;
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = 'task' + (task.done ? ' done' : '');

    const taskContent = document.createElement('span');
    taskContent.innerHTML = `${task.text} <span class="priority">(${task.priority})</span>`;

    const actions = document.createElement('div');
    actions.className = 'actions';

    const toggleBtn = document.createElement('button');
    toggleBtn.textContent = task.done ? '↩' : '✔';
    toggleBtn.style.backgroundColor = task.done ? '#ccc' : 'green';
    toggleBtn.onclick = () => {
      task.done = !task.done;
      saveTasks();
    };

    const editBtn = document.createElement('button');
    editBtn.textContent = '✏';
    editBtn.style.backgroundColor = 'orange';
    editBtn.onclick = () => {
      const newText = prompt("Edit Task:", task.text);
      if (newText !== null) {
        task.text = newText.trim();
        saveTasks();
      }
    };

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '🗑';
    deleteBtn.style.backgroundColor = 'red';
    deleteBtn.onclick = () => {
      if (confirm("Are you sure you want to delete this task?")) {
        tasks.splice(index, 1);
        saveTasks();
      }
    };

    actions.appendChild(toggleBtn);
    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);

    li.appendChild(taskContent);
    li.appendChild(actions);
    list.appendChild(li);

    if (task.done) completed++;
  });

  taskCount.textContent = tasks.length;
  completedCount.textContent = completed;
}

function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
}


renderTasks();
