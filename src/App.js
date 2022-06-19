import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import {Navigation} from './components/Navigation';
import CreateUser from './components/CreateUser';
import { StudentList } from './components/StudentList';
import { CreateStudent } from './components/CreateStudent';
import { Footer } from './components/Footer';

function App() {
  return (
    <Router>
      <Navigation />

      <div className="p-5">
        <Route path="/" exact component={StudentList} />
        <Route path="/edit/:id" component={CreateStudent} />
        <Route path="/create" component={CreateStudent} />
        <Route path="/user" component={CreateUser} />
      </div>

      <Footer />

    </Router>

  )
}

export default App;
