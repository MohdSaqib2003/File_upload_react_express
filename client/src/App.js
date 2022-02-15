import React from 'react';
import FileUpload from './components/fileUpload';
import './App.css';

const App = () => {
  return (
    <div className="container mt-1">
      <div className='p-2 text-center text-info bg-dark'>
        <h2> File Upload using react &amp; Express </h2>
      </div>
      <FileUpload />
    </div>
  );
}
export default App;