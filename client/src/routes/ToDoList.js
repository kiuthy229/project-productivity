import React, { useEffect, useState } from "react";
const ToDoList = () => {
	const [todolistContent, setTodolistContent] = useState('')
	const [todolistDue, setTodolistDue] = useState('')
	const [current, setCurrent] = useState('')
	const [todolist, setTodolist] = useState([])
	
	const todolistDueList = todolist.map(value => value.due)
	const submitTodolistItemHandler = (e) => {
		e.preventDefault();
		setTodolist((oldList) => 
			[...oldList, {content: todolistContent, due: todolistDue}]
		)
		console.log('aaaa', todolistDue)
	}
	const editHandler = (index) => {
		// const tmpTodolist = [...todolist]
		// tmpTodolist.splice(index, 1)
		// setTodolist(tmpTodolist)
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
				alert('sjd')
			}
				// todolist.forEach((value, i) => {
				// 	if (current === value.due){
				// 		console.log(current, value.due)
				// 		const tmpTodolist = [...todolist]
				// 		tmpTodolist.splice(i, 1)
				// 		setTodolist(tmpTodolist)
				// 		alert('sjd')
				// 	}
				// 	else {
				// 		console.log('meh', current, value.due)
				// 	}
				// for (let todo of todolist) {
				// 	if (current === todo.due){
				// 		console.log(current, todo.due)
						
				// 		alert('sjd')
				// 		break;
				// 	}
				// 	else {
				// 		console.log('meh', current, todo.due)
				// 	}
				// }
				// todolist.forEach((todo) => {
					
				// })
			
			console.log(current)
			console.log(todolist)
			//if ()
		}
	, [current]);
	return (
		<>
			<EditPopper></EditPopper>
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
						<ToDoListItem
							content={item.content}
							due={item.due}
							editHandler={editHandler}
							deleteHandler={deleteHandler}
							index={index}
						></ToDoListItem>
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

const EditPopper = (showEditPopper, content, due) => {
	return(
		<>
		
		</>
	);
}

export default ToDoList;