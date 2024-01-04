import './App.css';
import Login from './loginPage.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './mainPage.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
