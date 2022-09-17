import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import CreateRoom from "./routes/CreateRoom";
import SingleCamera from "./routes/SingleCamera";
import ToDoList from './routes/ToDoList';
import JoinRoom from './routes/JoinRoom'
import Room from "./routes/Room";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={CreateRoom} />
        <Route path="/join" exact component={JoinRoom} />
        {/* <Route path="/" exact component={SingleCamera} /> */}
        <Route path="/todolist" exact component={ToDoList} />
        <Route path="/room/:roomID" component={Room} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
