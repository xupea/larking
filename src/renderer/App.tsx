import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import SplitViewContainer from './ui/splitview';
import ClassicLayout from './layout/classic';

function Hello() {
  // return (
  //   <div className="grid-view">
  //     <SplitViewContainer />
  //   </div>
  // );
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
