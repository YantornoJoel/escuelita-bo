import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Navigation, StudentList, CreateStudent, Footer, Login, NoLoginStudentList } from './components';


function App() {
  return (
    <Router>
      <Navigation />

      <div className="p-5">
        <Route path="/" exact component={localStorage.getItem('token') ? StudentList : NoLoginStudentList} />
        <Route path="/edit/:id" component={CreateStudent} />
        <Route path="/create" component={localStorage.getItem('token') ? CreateStudent : Login} />
      </div>

      <Footer />

    </Router>

  )
}

export default App;
