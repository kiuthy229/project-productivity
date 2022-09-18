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
		<div
      style={{
        background: "#FED6D7",
        padding: "5vh",
        height: "25vh",
        borderRadius: "10px",
        margin: "1vw", 
        height: "85vh", 
      }}
    >
			<h1>Todo List</h1>
			<form onSubmit={submitTodolistItemHandler}
        style={{
          padding: "auto 0"
        }}
      >
				<input
          style={{
            padding: "2vh 1vw",
            margin: " 1vh auto",
            border: "none", 
            borderRadius: "10px",
            outline: "none",
            
            width: "92%"
          }}
          value={todolistContent}
					id="todolistContent"
					onChange={(e) => {
						setTodolistContent(e.target.value)
					}}
				></input>
				<input
          style={{
            padding: "2vh 1vw",
            margin: " 1vh auto",
            border: "none", 
            borderRadius: "10px",
            outline: "none",
            
            width: "92%"
          }}
					type="datetime-local"
					id="todolistDue"
					onChange={(e) => {
            console.log(e.target.value)
						setTodolistDue(new Date(e.target.value.replace('T', ' ')).toLocaleString('zh-CN'))
					}}
				></input>
				<button
          style={{
            padding: "2vh 2vw",
            margin: " 2vh auto",
            border: "none", 
            borderRadius: "10px",
            background: "#EB6CAC",
            color: "white", 
            fontWeight: "bolder"
          }}
        >Add</button>
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
		</div>
	);
}

const ToDoListItem = ({content, due, editHandler, deleteHandler, index, handleAlarmListChecked, handleAlarmListUnchecked, done}) => {
	return (
		<div style={{
      display: "flex",
      alignContent: "center",
      justifyContent: "space-between"
    }}>
			<input
        checked={done}
        type="checkbox"
        onClick={done ? handleAlarmListChecked : handleAlarmListUnchecked}  
      ></input>
      <div>
        <div
        style={{
          //padding: "2vh 1vw",
          fontWeight: "bold"
        }}
      >{content}</div>
			<div
        // style={{
        //   padding: "2vh 1vw",
          
        // }}
      >{due}</div>
      </div>
			
      <div>
      <button
        style={{
          padding: "2vh 1vw",
          margin: " 0.5vh auto",
          border: "none", 
          borderRadius: "10px",
          background: "#EB6CAC",
          color: "white", 
          fontWeight: "bolder",
          marginRight: "1vh"
        }}
        onClick={() => editHandler(index)}>Edit</button>
			<button
        style={{
          padding: "2vh 1vw",
          margin: " 0.5vh auto",
          border: "none", 
          borderRadius: "10px",
          background: "#EB6CAC",
          color: "white", 
          fontWeight: "bolder"
        }}
        onClick={() => deleteHandler(index)}>Delete</button>
      </div>
			
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