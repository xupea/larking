import { Provider } from 'react-redux';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import ClassicLayout from './layout/classic';
import Login from './pages/login';
import { store } from './redux/store';

function Hello() {
  return <ClassicLayout />;
}

export default function App() {
  return (
    <Provider store={store}>
      <Router initialEntries={['/login']}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/main" element={<Hello />} />
        </Routes>
      </Router>
    </Provider>
  );
}
