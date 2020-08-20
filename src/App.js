import React from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import ChatBody from './components/ChatBody/ChatBody';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login/Login';
import { useStateValue } from './context/StateProvider';

function App() {
  const [{ user }] = useStateValue();
  return (
    <Router>
      <div className="app">
        {
          !user ? <Login /> : <div className="app__body">
            <Sidebar />
            <Switch>
              <Route exact path="/" render={() => (<h3 className="p-3">Select a room to start a new conversation</h3>)} />
              <Route exact path="/room/:roomId">
                <ChatBody />
              </Route>
            </Switch>
          </div>
        }
      </div>
    </Router>
  );
}

export default App;
