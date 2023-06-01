import React from 'react'
import { useState } from "react";
import "./App.css";
import PostsList1 from "./PostsList1";
import PostsList2 from "./PostsList2";
import Post from "./Post";
import CreatePost from './CreatePost';

function App() {
  const [currentPage, setCurrentPage] = useState(<PostsList1/>)
  const setPage=(component)=>{
    setCurrentPage(component)
  }
  return <div>
    <button onClick={()=>setPage(<PostsList1/>)} >Post List 1</button>
    <button onClick={()=>setCurrentPage(<PostsList2/>)} >Post List 2</button>
    <button onClick={()=>setCurrentPage(<Post id={1} />)} >First Post</button>
    <button onClick={()=>setCurrentPage(<CreatePost setCurrentPage={setCurrentPage} />)} >New Post</button>
    <div>
      {currentPage}
    </div>
  </div>;
}

export default App;
