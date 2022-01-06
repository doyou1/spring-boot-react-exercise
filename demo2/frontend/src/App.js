import React from 'react';
import {Routes, Route} from "react-router-dom";

import "./css/App.css";
import Join from './components/Join';
import Send from './components/Send';
import Main from './components/Main';

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/join" element={<Join />} />
        <Route path="/send/:_id" element={<Send />} />
        <Route path="/tree/:_id" element={<Main mainPageType="treelink" />} />
      </Routes>
    </div>
  );
}

export default App;