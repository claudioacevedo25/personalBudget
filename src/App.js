import React, {Component} from 'react';
import Resumen from './component/resumen'
import Navbar from './component/navbar'



class App extends Component {
  render(){
    return(
     <div className="container">
       <Navbar/>
       <br/><br/><hr/>
       <Resumen/>
     </div>
    )
  }
}

export default App;
