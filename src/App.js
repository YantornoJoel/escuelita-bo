import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { Navigation } from './components/Navigation';
import CreateUser from './components/CreateUser';
import { StudentList } from './components/StudentList';
import { CreateStudent } from './components/CreateStudent';
import { Footer } from './components/Footer';
import { Login } from './components/Login';

function App() {
  return (
    <Router>
      <Navigation />

      <div className="p-5">
        <Route path="/" exact component={localStorage.getItem('token') ? StudentList : Login} />
        <Route path="/edit/:id" component={CreateStudent} />
        <Route path="/create" component={localStorage.getItem('token') ? CreateStudent : Login} />
        <Route path="/user" component={CreateUser} />
      </div>

      <Footer />

    </Router>

  )
}

export default App;
