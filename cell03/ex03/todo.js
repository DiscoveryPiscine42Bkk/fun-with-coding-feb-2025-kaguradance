function saveToDoList() {
    const toDoList = [];
    const toDoItems = document.querySelectorAll('.todo_item');
    toDoItems.forEach(item => {
        toDoList.push(item.textContent.trim());
    });
    document.cookie = "todo_list=" + JSON.stringify(toDoList) + ";path=/";
}

function loadToDoList() {
    const cookies = document.cookie.split(';');
    const toDoCookie = cookies.find(cookie => cookie.trim().startsWith('todo_list='));
    
    if (toDoCookie) {
        const toDoList = JSON.parse(toDoCookie.split('=')[1]);
        toDoList.forEach(todo => {
            addToDoItem(todo);
        });
    }
}

function addToDoItem(text) {
    const toDoItem = document.createElement('div');
    toDoItem.classList.add('todo_item');
    toDoItem.textContent = text;

    const ftList = document.getElementById('ft_list');
    ftList.insertBefore(toDoItem, ftList.firstChild);

    toDoItem.addEventListener('click', function() {
        const confirmation = confirm('ต้องการลบ To-Do นี้ไหม?');
        if (confirmation) {
            toDoItem.remove();
            saveToDoList();
        }
    });
}

document.getElementById('btn').addEventListener('click', function() {
    const newTodo = prompt('Enter your new To-Do:');
    
    if (newTodo && newTodo.trim() !== '') {
        addToDoItem(newTodo);
        saveToDoList();
    } else {
        alert('You must enter a valid To-Do.');
    }
});

window.onload = function() {
    loadToDoList();
};
