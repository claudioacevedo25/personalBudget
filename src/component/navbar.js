import React, {Component} from 'react'
import { BrowserRouter as Router, Route, Link, Switch, Redirect, HashRouter} from 'react-router-dom'
import Form from './form'


class Navbar extends Component {
    render(){
        return(
            <Router>
                <nav className="navbar navbar-light bg-light">
                     <div className="btn-group">
                        <Link className="btn btn-dark" to='/'>Inicio</Link>
                        <Link className="btn btn-dark" to='/budget/addmov'>Agregar Movimiento</Link>
                     </div>
                     <div className="text-align rigth">
                        <h2>BUDGET PERSONAL</h2>
                     </div>
                </nav>
                <Switch>
                    <Route path='/budget/addmov' exact component={Form}></Route>
                </Switch>
            </Router>
        )
    }
}

export default Navbar