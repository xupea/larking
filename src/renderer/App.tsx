import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import ClassicLayout from './layout/classic';

function Hello() {
  return <ClassicLayout />;
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
