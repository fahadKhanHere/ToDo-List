// Input field for tasks
const taskInputField = document.getElementById('task');

// buttons
const addTask = document.getElementById('add-task');

// list container -> tasks are added in it's child nodes
const listContainer = document.querySelector('.list-container');

addTask.addEventListener('click', addNewTask);

function addNewTask() {
    if(taskInputField.value == "") {
        console.error("False")
        return false;
    }
    else {
        // li
        const li = document.createElement('li');
        li.classList.add('list-elements');

        // input check-box -> to toggle task done/undone
        const inputCheckbox = document.createElement('input');
        inputCheckbox.classList.add('my-checkbox');
        inputCheckbox.name = 'my-checkbox';
        inputCheckbox.type = 'checkbox';
        // inputCheckbox.addEventListener('click', () => {
        //     textSpan.classList.toggle('line-through');
        //     saveState();
        // })

        // text span -> content of task inside li
        const textSpan = document.createElement('span');
        textSpan.classList.add('text-span');
        textSpan.textContent = taskInputField.value.trim();

        // span -> for cross sign
        const span = document.createElement('span');
        span.classList.add('cross-sign');
        span.innerHTML = '&#10060;';
        // span.addEventListener('click', () => {
        //     li.remove();
        //     saveState();
        // })

        // append
        li.appendChild(inputCheckbox);
        li.appendChild(textSpan);
        li.appendChild(span);
        listContainer.appendChild(li);

        // reset input field
        taskInputField.value = "";
        saveState();
    }
}

// Instead of creating individuals event listeners, we created only 1 to handle everyone
listContainer.addEventListener('click', (event) => {
    // console.log(event.target);
    if(event.target.classList.contains('my-checkbox')) {
        toggleTask(event.target);
    }
    else if(event.target.classList.contains('cross-sign')) {
        removeTask(event.target);
    }
})

function toggleTask(checkbox) {
    const textSpan = checkbox.nextElementSibling;
    // console.log(textSpan)
    textSpan.classList.toggle('line-through');
    if(textSpan.classList.contains('line-through')){
        checkbox.checked = true;
    }
    else
        checkbox.checked = false;
    saveState();
}

function removeTask(span) {
    span.parentElement.remove();
    // console.log(span.parentElement);
    saveState();
}

function saveState() {
    localStorage.setItem('Task-List', listContainer.innerHTML);
}

function getState() {
    listContainer.innerHTML = localStorage.getItem('Task-List');
}
getState();