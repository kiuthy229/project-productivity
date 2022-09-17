import React, { useState } from "react";
const ToDoList = () => {
	const [todolistContent, setTodolistContent] = useState('')
	const [todolist, setTodolist] = useState([])
	const submitTodolistItemHandler = (e) => {
		e.preventDefault();
		console.log(todolistContent)
		setTodolist((oldList) => 
			[todolistContent, ...oldList]
		)
		console.log(todolist)
	}
	return (
		<>
			<h1>Todo List</h1>
			<form onSubmit={submitTodolistItemHandler}>
				<input id="todolistContent" onChange={(e) => {
					setTodolistContent(e.target.value)
				}}></input>
				<input id="todolistDue"></input>
				<button>Add</button>
			</form>
			<div>
				{}
			</div>
		</>
	);
}

const ToDoListItem = ({content, due}) => {
	return (
		<>
			<div>{content}</div>
			<div>{due}</div>
			
		</>
	);
}

export default ToDoList;