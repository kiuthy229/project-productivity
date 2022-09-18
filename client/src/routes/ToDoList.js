import React, { useEffect, useState } from "react";
const ToDoList = () => {
	const [todolistContent, setTodolistContent] = useState('')
	const [todolistDue, setTodolistDue] = useState('')
	const [current, setCurrent] = useState('')
  const [showEditPopper, setShowEditPopper] = useState(false)
  const [editIndex, setEditIndex] = useState(0)

	const [todolist, setTodolist] = useState([])
	
	const todolistDueList = todolist.map(value => value.due)
	const submitTodolistItemHandler = (e) => {
		e.preventDefault();
		setTodolist((oldList) => 
			[...oldList, {content: todolistContent, due: todolistDue}]
		)
		console.log('aaaa', todolistDue)
	}
	const editPopperHandler = (index) => {
    setShowEditPopper(!showEditPopper)
		setEditIndex(index)
	}

	const deleteHandler = (index) => {
		const tmpTodolist = [...todolist]
		tmpTodolist.splice(index, 1)
		setTodolist(tmpTodolist)
	}
	useEffect(
		() => {
			//var currentTime = 
			setInterval(() => {
				
				setCurrent(new Date().toLocaleString('zh-CN'))
				 
			}, 1000)
			if (todolistDueList.includes(current)){
        //let todolistIndex = 
        let tmpTodolistContent = todolist[todolistDueList.indexOf(current)].content
        console.log(tmpTodolistContent)
				alert(tmpTodolistContent)
			}
		}
	, [current]);
	return (
		<>
			<h1>Todo List</h1>
			<form onSubmit={submitTodolistItemHandler}>
				<input
					id="todolistContent"
					onChange={(e) => {
						setTodolistContent(e.target.value)
					}}
				></input>
				<input
					type="datetime-local"
					id="todolistDue"
					onChange={(e) => {
						setTodolistDue(new Date(e.target.value.replace('T', ' ')).toLocaleString('zh-CN'))
						//setTodolistDue(e.target.v)
					}}
				></input>
				<button>Add</button>
			</form>
			<div>
				{todolist.map((item, index) => {
					return(
            <>
              <EditPopper
                showEditPopper={showEditPopper && editIndex === index}
                content={todolist[index].content}
                due={todolist[index].due}
                handleEdit={(e) => {
                  e.preventDefault()
                  console.log(e.target[0].value)











//sosossoos




                }}
              ></EditPopper>
              <ToDoListItem
                content={item.content}
                due={item.due}
                editHandler={editPopperHandler}
                deleteHandler={deleteHandler}
                index={index}
              ></ToDoListItem>
            </>
						
					);
				})}
			</div>
		</>
	);
}

const ToDoListItem = ({content, due, editHandler, deleteHandler, index}) => {
	return (
		<div style={{display: "flex"}}>
			<input type="checkbox" ></input>
			<div>{content}</div>
			<div>{due}</div>
			<button onClick={() => editHandler(index)}>Edit</button>
			<button onClick={() => deleteHandler(index)}>Delete</button>
		</div>
	);
}

const EditPopper = ({showEditPopper, content, due, handleEdit}) => {
	return(
		<div style={{display: showEditPopper ? "block" : "none"}}>
      <form onSubmit={handleEdit}>
        <input value={content}></input>
        <input
          type="datetime-local"
          value={new Date(due).toISOString().substring(0, new Date(due).toISOString().length - 1)}
        ></input>
        <button>Save</button>
      </form>
		</div>
	);
}

export default ToDoList;