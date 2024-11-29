import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MenuBar from './components/MenuBar';
import Dock from './components/Dock';
import Window from './components/Window';
import Clock from './components/Clock';
import Desktop from './components/pages/Desktop';
import SnakeGame from './components/pages/SnakeGame';
import ToDoList from './components/pages/ToDoList';

const App = () => {
  return (
    <div className="bg-gray-200 min-h-screen relative">
      {/* Static components */}
      <MenuBar />
      <Clock />
      <Dock />

      {/* Routing for different pages */}
      <Routes>
        <Route path="/" element={<Desktop />} />
        <Route path="/snake-game" element={<SnakeGame />} />
        <Route path="/to-do-list" element={<ToDoList />} />
      </Routes>
    </div>
  );
};

export default App;
