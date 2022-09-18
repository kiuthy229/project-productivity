import React, { useEffect, useState } from "react";
const ToDoList = () => {
	const [todolistContent, setTodolistContent] = useState('')
	const [todolistDue, setTodolistDue] = useState('')
	const [current, setCurrent] = useState('')
  const [showEditPopper, setShowEditPopper] = useState(false)
  const [editIndex, setEditIndex] = useState(0)

	const [todolist, setTodolist] = useState([])
	const [todolistAlarm, setTodolistAlarm] = useState([])
	
	const todolistDueList = todolistAlarm.map(value => value.due)
	const submitTodolistItemHandler = (e) => {
		e.preventDefault();
		setTodolist((oldList) => 
			[...oldList, {content: todolistContent, due: todolistDue, done: false}]
		)
    setTodolistContent('')
		console.log('aaaa', todolistDue)
	}
	const editPopperHandler = (index) => {
    	setShowEditPopper(true)
		setEditIndex(index)
	}

	const deleteHandler = (index) => {
		const tmpTodolist = [...todolist]
		tmpTodolist.splice(index, 1)
		setTodolist(tmpTodolist)
	}
	useEffect(
		() => {
      setTodolistAlarm(todolist)
			setInterval(() => {
				setCurrent(new Date().toLocaleString('zh-CN'))
			}, 1000)
			if (todolistDueList.includes(current)){
        let tmpTodolistContent = todolist[todolistDueList.indexOf(current)].content
        if (!todolist[todolistDueList.indexOf(current)].done){
          alert(tmpTodolistContent)
        }
        console.log(tmpTodolistContent)
				
			}
		}
	, [current, todolist]);
	return (
		<>
			<h1>Todo List</h1>
			<form onSubmit={submitTodolistItemHandler}>
				<input
          value={todolistContent}
					id="todolistContent"
					onChange={(e) => {
						setTodolistContent(e.target.value)
					}}
				></input>
				<input
					type="datetime-local"
					id="todolistDue"
					onChange={(e) => {
            console.log(e.target.value)
						setTodolistDue(new Date(e.target.value.replace('T', ' ')).toLocaleString('zh-CN'))
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
                  setShowEditPopper(false)
                  let tmpTodolist = [...todolist]
                  tmpTodolist[index].content = e.target[0].value
                  tmpTodolist[index].due = new Date(e.target[1].value.replace('T', ' ')).toLocaleString('zh-CN')
                  setTodolist(tmpTodolist);
                  console.log(tmpTodolist[index])











//sosossoos




                }}
              ></EditPopper>
              <ToDoListItem
                content={item.content}
                due={item.due}
                done={todolist[index].done}
                editHandler={editPopperHandler}
                deleteHandler={deleteHandler}
                index={index}
                handleAlarmListChecked={() => {
                  const tmpTodolist = [...todolist]
                  tmpTodolist[index].done = false
                  const tmpAlarmList = [...todolistAlarm]
                  tmpAlarmList.splice(index, 0, todolist[index])
                  setTodolistAlarm(tmpAlarmList)
                  setTodolist(tmpTodolist)
                  console.log('tmpalaUn', tmpAlarmList)
                }}
                handleAlarmListUnchecked={() => {
                  const tmpTodolist = [...todolist]
                  tmpTodolist[index].done = true

                  const tmpAlarmList = [...todolistAlarm]

                  tmpAlarmList.splice(index, 1)
                  setTodolistAlarm(tmpAlarmList)
                  setTodolist(tmpTodolist)
                  console.log('tmpalacheck', tmpAlarmList)
                }}
              ></ToDoListItem>
            </>
						
					);
				})}
			</div>
		</>
	);
}

const ToDoListItem = ({content, due, editHandler, deleteHandler, index, handleAlarmListChecked, handleAlarmListUnchecked, done}) => {
	return (
		<div style={{display: "flex"}}>
			<input
        checked={done}
        type="checkbox"
        onClick={done ? handleAlarmListChecked : handleAlarmListUnchecked}  
      ></input>
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
        <input
          defaultValue={content}></input>
        <input
          type="datetime-local"
          defaultValue={new Date(due).toISOString().substring(0, new Date(due).toISOString().length - 1)}
        ></input>
        <button>Save</button>
      </form>
		</div>
	);
}

export default ToDoList;