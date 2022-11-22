import './App.css';
import Spinner from "react-spinkit";

function App() {
  return (
    <>
    <nav className='title'>Library Management</nav>
    <center style={{padding:"10%"}}>
      <Spinner name="cube-grid" style={{ width: 100, height: 100,  color:"whitesmoke"}}/>
    </center>
    </>
  );
}

export default App;
