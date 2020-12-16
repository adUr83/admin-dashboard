
import './App.css';
import NavBar from './Components/NavBar';
import Routes from './Components/Router';
import loginimg from './Img/images.jpeg'

function App() {
  return (
    <div className="App" style={{ backgroundSize: "cover",
      backgroundPosition: "top",
      minHeight: "100%",
      height: "100vh",
      position: "relative", backgroundImage: `url(${loginimg})`}}>
      <NavBar/>
        <Routes/>

    </div>
  );
}

export default App;
