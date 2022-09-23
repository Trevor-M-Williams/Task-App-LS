addListeners();
getTasks();
handleDate();

let item;

function addListeners() {
    // Form
    let taskForm = document.querySelector('form');
    taskForm.onsubmit = (e) => {
        e.preventDefault();
        let input = document.querySelector('.input.add-task');
        if (input.value !== '') {
            createTask(input.value);
            storeTask(input.value);
            input.value = '';
        }
    }

    // Delete Button
    let del = document.querySelector('.icon.delete');
    del.onclick = deleteTask;

    // Close Button
    let close = document.querySelector('.icon.close');
    close.onclick = () => {
        let menu = document.querySelector('.menu-right');
        menu.style.width = '0px';
    }

    // Completed Toggle
    let toggle = document.querySelector('.switch input');
    toggle.addEventListener('change', () => toggleTasks());
}

function completeTask(e) {
    item = e.target.parentElement.parentElement;
    let task = item.children[1].textContent;
    let tasks = JSON.parse(localStorage.tasks);
    let index = tasks.indexOf(task);

    item.remove();
    tasks.splice(index, 1);
    localStorage.tasks = JSON.stringify(tasks);

    let completedContainer = document.querySelector('.completed-tasks');
    let completedTasks = localStorage.completedTasks;
    if (completedTasks) completedTasks = JSON.parse(completedTasks);
    else completedTasks = [];

    let completeIcon = document.querySelector('.completed');
    let clone = completeIcon.cloneNode(true);
    clone.classList.remove('hidden');
    item.children[0].children[0].remove();
    item.children[0].append(clone);

    completedContainer.append(item);
    completedTasks.push(task);
    localStorage.completedTasks = JSON.stringify(completedTasks);
}

function createTask(task, completed) {
    let tasksContainer = document.querySelector('.tasks');
    let completedContainer = document.querySelector('.completed-tasks');

    let newTask = document.createElement('div');
    newTask.classList.add('item');
    newTask.onclick = (e) => selectTask(e);
    newTask.ondblclick = (e) => editTask(e);

    let icon = document.createElement('div');
    icon.classList.add('icon');

    if (!completed) {
        let circle = document.createElement('div');
        circle.classList.add('circle');
        circle.textContent = 'O';
        circle.onclick = (e) => completeTask(e);
        icon.append(circle);
    } else {
        let completeIcon = document.querySelector('.completed');
        let clone = completeIcon.cloneNode(true);
        clone.classList.remove('hidden');
        icon.append(clone);
    }

    let text = document.createElement('div');
    text.classList.add('item-text');
    text.textContent = task;

    newTask.append(icon, text);

    if (completed) completedContainer.append(newTask);
    else tasksContainer.append(newTask);
}

function deleteTask() {
    let completed = false;
    let completedContainer = document.querySelector('.completed-tasks');
    if (completedContainer.style.display === 'block') completed = true;

    let menu = document.querySelector('.menu-right');
    let task = item.children[1].textContent;
    let tasks
    if (!completed) tasks = JSON.parse(localStorage.tasks);
    else tasks = JSON.parse(localStorage.completedTasks);
    let index = tasks.indexOf(task);

    item.remove();
    tasks.splice(index, 1);
    if (!completed) localStorage.tasks = JSON.stringify(tasks);
    else localStorage.completedTasks = JSON.stringify(tasks);

    menu.style.width = '0px';
}

function editTask(e) {
    if (e.target.classList.contains('circle')) return;
    let task = item.children[1].textContent;
    let input = document.createElement('input');
    input.classList.add('input');
    input.value = task;
    item.children[1].remove();
    item.append(input);
    input.focus();

    addInputListeners();

    function addInputListeners() {
        input.addEventListener('keydown', (e) => {
            if (e.code === 'Enter') input.blur();
        })
        input.addEventListener('focusout', () => {
            if (input.value !== '' && input.value !== task) {
                task = input.value;
                updateTask();
            }
            input.remove();
            let itemText = document.createElement('div');
            itemText.classList.add('item-text');
            itemText.textContent = task;
            item.append(itemText);
        });
    }

    function updateTask() {
        let index = getItemIndex(item);
        let tasks = JSON.parse(localStorage.tasks);
        tasks[index] = task;
        localStorage.tasks = JSON.stringify(tasks);
    }
}

function getItemIndex(item) {
    return Array.from(item.parentElement.children).indexOf(item);
}

function getTasks() {
    let tasks = localStorage.tasks;
    if (tasks) {
        tasks = JSON.parse(tasks);
        tasks.forEach((task) => {
            createTask(task, false);
        });
    }

    let completedTasks = localStorage.completedTasks;
    if (completedTasks) {
        completedTasks = JSON.parse(completedTasks);
        completedTasks.forEach((task) => {
            createTask(task, true);
        });
    }
}

function handleDate() {
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let date = new Date();
    let [day, month, num] = [date.getDay(), date.getMonth(), date.getDate()];

    let div = document.querySelector('.date');
    div.textContent = days[day] + ', ' + months[month] + ' ' + num;
}

function handleOptionsMenu() {
    let menu = document.querySelector('.menu-right');
    if (menu.style.width !== '300px') openOptionsMenu();

    function openOptionsMenu() {
        menu.style.width = '300px';
    }
}

function selectTask(e) {
    if (e.target.classList.contains('circle')) return;
    item = e.target;
    changeBackground();
    handleOptionsMenu();

    function changeBackground() {
        let tasks = document.querySelectorAll('.item');
        for (let i = 0; i < tasks.length; i++) {
            tasks[i].classList.remove('blue-bg');
        }
        item.classList.add('blue-bg');

    }
}

function storeTask(task) {
    let tasks = localStorage.tasks;
    if (tasks) tasks = JSON.parse(tasks);
    else tasks = [];
    tasks.push(task);
    localStorage.tasks = JSON.stringify(tasks);
}

function toggleTasks() {
    let toggle = document.querySelector('.switch input');
    let title = document.querySelector('.title');
    let tasks = document.querySelector('.tasks');
    let completeTasks = document.querySelector('.completed-tasks');
    let form = document.querySelector('.item.add-task');

    if (toggle.checked) {
        title.textContent = 'Completed';
        tasks.style.display = 'none';
        form.style.display = 'none';
        completeTasks.style.display = 'block';
    } else {
        title.textContent = 'Tasks';
        tasks.style.display = 'block';
        form.style.display = 'block';
        completeTasks.style.display = 'none';
    }
}