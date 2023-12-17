import { ref } from 'vue'
import userModule from '../modules/userModule'

const getTodos = () => {
    const state = ref({
        newTitle: '',
        newTodoItem: '',
        todos: [],
        showEmptyTitle: false, //avairble controll when empty title
        showEmptyContent: false, //avairble controll when empty content
        showDeleteConfirm: false, // Handle show popup confirm
        selectedItem: null, // storage id of todo selected

        // Avairble for edit todo
        showInputEdit: false,
        editTitle: '',
        editContent: '',
        editSelectedId: null,
        showEmptyEdit: false,

        //Avarible for show info
        localTime: '',
        localDate: '',
        infoSelected: null,
        showInfo: false,
        infoTitle: '',
        infoContent: '',
        infoTime: '',
        infoDate: '',

        // Report data
        countTotalTodo: 0,
        countCompletedTodo: 0,
        countUnfinishedTodo: 0,
        processPercent: 0,

    })

    const GetAllTodos = async () => {
        try {
          const token = localStorage.getItem('token'); // Lấy token từ local storage hoặc nơi lưu trữ token của bạn
      
          const requestOptions = {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}` // Thêm token vào header của yêu cầu
            }
          };
      
          await fetch("http://localhost:3000/todos", requestOptions)
            .then((res) => res.json())
            .then((data) => {
              state.value.todos = data;
            });
      
          countTotalTodo();
        } catch (error) {
          console.log(error);
        }
      };

    // Create a new todo
    const newTodo = async () => {

        // Set date end time
        state.value.localTime = getTime();
        state.value.localDate = getDate();

        //get token from localstorage
        const token = localStorage.getItem('token');

        const requesOption = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                title: state.value.newTitle,
                todo: state.value.newTodoItem,
                timeAdd: state.value.localTime,
                dateAdd: state.value.localDate,
            })
        }
        await fetch('http://localhost:3000/todos/new/', requesOption);
        state.value.newTitle = '';
        state.value.newTodoItem = '';
        GetAllTodos();
    }

    //Handle if user non fill input
    const handleSubmit = () => {
        if (state.value.newTitle.trim() === '') {
            state.value.showEmptyTitle = true;
        } else
            if (state.value.newTodoItem.trim() === '') {
                state.value.showEmptyContent = true;
            } else {
                newTodo()
                state.value.showEmptyTitle = false;
                state.value.showEmptyContent = false;
            }
    }


    // Delete a todo
    const deleteTodo = async (_id) => {
        await fetch('http://localhost:3000/todos/delete/' + _id, { method: 'DELETE' });
        GetAllTodos();
    }

    //Show popup confirm when click delete icon
    const handleDeleteIconClick = async (_id) => {
        state.value.showDeleteConfirm = true;
        state.value.selectedItem = _id;
    }

    //Confirm delete
    const confirmDelete = async (_id) => {
        deleteTodo(state.value.selectedItem)
        state.value.showDeleteConfirm = false;
    }

    //Cancel delete
    const cancelDelete = () => {
        state.value.showDeleteConfirm = false;
    }


    // Edit a todo
    const editTodo = async () => {

        // Empty edit check
        if (state.value.editTitle === '' || state.value.editContent === '') {
            state.value.showEmptyEdit = true;
        } else {
            const requestOptions = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: state.value.editTitle,
                    todo: state.value.editContent,
                })
            };
            await fetch('http://localhost:3000/todos/update/' + state.value.editSelectedId, requestOptions);
            state.value.editTitle = '';
            state.value.editContent = '';
            state.value.showEmptyEdit = false;
            GetAllTodos();
        }
    }


    //Handle edit icon click
    const handleEditClick = async (_id) => {
        state.value.editSelectedId = _id;
        state.value.todos.forEach((item) => {
            if (item._id === _id) {
                item.showEdit = true; // show input edit selected
                state.value.editTitle = item.title;
                state.value.editContent = item.todo;
            } else {
                item.showEdit = false; // hide input edit
            }
        });

    }

    // Cancel Edit
    const cancelEdit = () => {
        state.value.todos.forEach((item) => {
            item.showEdit = false;
        });
    }

    //Function get local time
    const getTime = () => {
        const currentTime = new Date();
        const timeString = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        return timeString;
    }

    const getDate = () => {
        const currentDate = new Date().toLocaleDateString();
        return currentDate;
    }


    //Handle click in info icon
    const handleInfoClick = async (_id) => {
        state.value.infoSelected = _id;
        state.value.todos.forEach((item) => {
            if (item._id === _id) {
                item.showInfo = true;
            } else {
                item.showInfo = false;
            }
        })
    }

    // Cancel info
    const cancelInfo = () => {
        state.value.todos.forEach((item) => {
            item.showInfo = false;
        });
    }

    // handle click completed icon
    const toggleCompleted = async (_id) => {

        // Find and detect ID
        const todoToUpdate = state.value.todos.find((item) => item._id === _id);

        if (!todoToUpdate) {
            return;
        }

        todoToUpdate.completed = !todoToUpdate.completed;

        // Update state of complete future in DATABASE
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ completed: todoToUpdate.completed })
        };

        await fetch('http://localhost:3000/todos/update/' + _id, requestOptions)
            .then(res => res.json())
            .then(data => {
                
            })
            .catch(error => {
                console.error('Error:', error);
            });
            GetAllTodos();
    }


    // Count total todos
    const countTotalTodo = async () => {
        const token = localStorage.getItem('token'); 

        const requesOption = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            
        };
        await fetch('http://localhost:3000/todos/count',requesOption)
        .then(res => res.json())
        .then(data => {
            state.value.countTotalTodo = data.totalCount;
            state.value.countCompletedTodo = data.completedCount;
            state.value.countUnfinishedTodo = data.unfinishedCount;
            // Percent completed
            if (state.value.countTotalTodo === 0) {
                return 0; // Tránh chia cho 0
            }
            state.value.processPercent = ((state.value.countCompletedTodo / state.value.countTotalTodo) * 100).toFixed(2);
            
        })
        .catch(error => {
            console.error('Error:', error);
        })
    }
    


    return {
        state,
        GetAllTodos,
        newTodo,
        deleteTodo,
        editTodo,
        handleSubmit,
        handleDeleteIconClick,
        confirmDelete,
        cancelDelete,
        handleEditClick,
        cancelEdit,
        handleInfoClick,
        cancelInfo,
        toggleCompleted,
    };
}

export default getTodos
