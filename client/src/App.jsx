
import './App.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './components/Landing Page/LandingPage';
import Home from './components/Home/Home';
// import Detail from './components/Detail/Detail';
import CreateDriver from './components/CreateDriver/CreateDriver.jsx';

function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path= '/' element= {<LandingPage/>}/>
          <Route exact path= '/home' element= {<Home/>}/>
          <Route exact path='/driver' element= {<CreateDriver/>} />
          {/* <Route exact path= '/home/:id' component= {<Detail/>} /> */}
          </Routes>
      </div>
      </BrowserRouter>
  
  )
}

export default App;
