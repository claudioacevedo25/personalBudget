import React, {Component} from 'react';
import Resumen from './component/resumen'
import Form from './component/form'
import { BrowserRouter as Router, Route, Link, Switch, Redirect, HashRouter} from 'react-router-dom'



class App extends Component {
  render(){
    return(
     <div className="container">
       <Resumen/>
       <HashRouter>
          <Router >
               <Link className="btn btn-primary" to='/budget/addmov'>AGREGAR MOVIMIENTO</Link>
               <Switch>
                   <Route exact path='/budget/addmov' component={Form}/>     
               </Switch>             
          </Router>
       </HashRouter>
     </div>
    )
  }
}

export default App;
