import './App.css';

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
// import NewsItem from './components/NewsItem';

import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";

export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
       <Navbar/>
       

       <Routes>
       <Route path="/" element={<News key="general" category="general" />} />
            <Route exact path="/business" element={<News key="business" category="business" />} />
            <Route exact path="/sports" element={<News key="sports" category="sports" />} />
            <Route exact path="/health" element={<News key="health" category="health" />} />
            <Route exact path="/technology" element={<News key="technology" category="technology" />} />
            <Route exact path="/entertainment" element={<News key="entertainment" category="entertainment" />} />
          
         
        </Routes>
       </Router>
      </div>
    )
  }
}

