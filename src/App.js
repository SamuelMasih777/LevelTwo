// import logo from './logo.svg';
import './App.css';
import JobApplicationForm from './component/JobApplicationForm';
import Navbar from './component/Navbar';

function App() {
  return (
    <div className="h-screen bg-black">
      <Navbar/>
      <JobApplicationForm/>
    </div>
  );
}

export default App;
