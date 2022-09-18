import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import CreateRoom from "./routes/CreateRoom";
import ToDoList from './routes/ToDoList';
import MusicPlayer from './routes/MusicPlayer';
import JoinRoom from './routes/JoinRoom'
import DownloadApp from './routes/DownloadApp';
import Room from "./routes/Room";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={JoinRoom} />
        <Route path="/scan-code" exact component={DownloadApp} />
        <Route path="/todolist" exact component={ToDoList} />
        <Route path="/musicplayer" exact component={MusicPlayer} />
        <Route path="/room/:roomID" component={Room} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
