import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import AdminDashboard from './components/AdminDashboard';

export default function RootRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}
