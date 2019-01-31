var initialTasks = [
    {
        id: 1,
        checked: false,
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tincidunt pellentesque velit, quis porttitor purus venenatis eu. Donec at nulla est. In at ipsum pulvinar, ultrices tortor vitae, gravida velit.'
    },
    {
        id: 2,
        checked: true,
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tincidunt pellentesque velit, quis porttitor purus venenatis eu. Donec at nulla est. In at ipsum pulvinar, ultrices tortor vitae, gravida velit. 2'
    },
    {
        id: 3,
        checked: false,
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tincidunt pellentesque velit, quis porttitor purus venenatis eu. Donec at nulla est. In at ipsum pulvinar, ultrices tortor vitae, gravida velit. 3'
    }
];
var lastId = 3;
var searchValue = '';

function renderTasks(tasks) {
    var tasksHtml;

    if (tasks.length > 0) {
        tasksHtml = '<ul class="todo-list">';
        tasks.map(function(task) {
            var checked = '';

            if (task.checked)
                checked = 'checked';

            tasksHtml = tasksHtml +
                '<li>' +
                '<div class="check"><input type="checkbox" value="1" ' + checked + ' onclick="checkTask(' + task.id + ')"></div>' +
                '<div class="text"><p>' + task.text + '</p></div>' +
                '<div class="delete"><i data-task="' + task.id + '" class="fas fa-trash" onclick="deleteTask(' + task.id + ')"></i></div>'
            '</li>';
        });

        tasksHtml = tasksHtml + '</ul>';
    } else {
        tasksHtml = '<div class="no-tasks"><p>Nenhuma tarefa encontrada.</p></div>';
    }

    document.getElementById('todo-list').innerHTML = tasksHtml;
};

function addTask(event) {
    event.preventDefault();
    var taskText = document.getElementById('input-task').value.trim();

    if (taskText != '') {
        lastId = lastId + 1;

        initialTasks.push({id: lastId, checked: false, text: taskText});
        renderTasks(initialTasks);
    }
};

function deleteTask(id) {
    initialTasks = initialTasks.filter(function(task) {
        return task.id != id;
    });

    findOrRender();
};

function checkTask(id) {
    var taskIndex = initialTasks.findIndex(function(task) {
        return task.id == id;
    });

    initialTasks[taskIndex].checked = !initialTasks[taskIndex].checked;
    findOrRender();
}

function findTask(textToFind) {
    searchValue = textToFind.trim();

    var taskList = initialTasks.filter(function(task) {
        return task.text.search(textToFind.trim()) != -1;
    });

    renderTasks(taskList);
};

function changeTaskOrder(event) {
    event.preventDefault();

    document.querySelectorAll('.sort-btn').forEach(function(el) {
        el.classList.remove('active');
    });

    event.target.classList.add('active');
    var sortType = event.target.dataset.sort;

    switch (sortType) {
        case 'normal':
            initialTasks.sort(function(a, b) {
                if (a.id < b.id)
                    return -1;
                if (a.id > b.id)
                    return 1;
                return 0;
            });
            break;

        case 'asc':
            initialTasks.sort(function (a, b) {
                if (a.checked)
                    return -1;
                if (!a.checked)
                    return 1;
                return 0;
            });
            break;

        case 'desc':
            initialTasks.sort(function(a, b) {
                if (!a.checked)
                    return -1;
                if (a.checked)
                    return 1;
                return 0;
            });
            break;

        default:
            break;
    }

    findOrRender(initialTasks);
};

function findOrRender() {
    if (searchValue != '') {
        findTask(searchValue);
    } else {
        renderTasks(initialTasks);
    }
};

window.onload = function(){
    renderTasks(initialTasks);
};