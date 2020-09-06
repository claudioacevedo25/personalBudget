import React, {Component} from 'react'

class Resumen extends Component {
    constructor(props, context) { 
        super(props, context);  
        this.state = {
            ingresos:'',
            egresos:'',
            saldo: '',
            top: [],
      
        }
        
        this.handleChange = this.handleChange.bind(this)
    
        this.ref = React.createRef()
      } 
    
      componentDidMount(){
        this.getResumen();
      }
    
      getResumen(){
        fetch('http://localhost:4000/budget')
        .then(res => res.json())
        .then(data => {
          console.log(data);
          this.setState({
            top: data.top10,
            ingresos: data.ingresos[0].total,
            egresos:data.gastos[0].total,
            saldo: data.ingresos[0].total-data.gastos[0].total
          })
        })
      }
    
      handleChange(e){
        const {name, value} = e.target;
        this.setState({
            [name]: value
        })
    }
    
      render(){
        return (
          <div className="container">
            <nav className="navbar navbar-light bg-light">
              <a className="navbar-brand" href="#">SISTEMAS DE INGRESOS Y EGRESOS PERSONALES</a>
            </nav>
    
            <section>
                  <div className="container center-align">
                      <h2>RESUMEN</h2>
                      <div className="row">
                          <div className="col">
                            <label htmlFor="">INGRESOS: {this.state.ingresos}</label>
                          </div>
                          <div className="col">
                            <label htmlFor="">EGRESOS: {this.state.egresos}</label>
                          </div>
                          <div className="col">
                            <label htmlFor="">SALDO: {this.state.saldo}</label>
                          </div>
                      </div><br/>
                      <h3>Ultimos 10 movimientos</h3>
                      <table className="table">
                          <thead className= "thead-dark">
                              <tr> 
                                  <th scope="col">Fecha</th>
                                  <th scope="col">Monto</th>
                                  <th scope="col">Detalle</th>
                                  <th scope="col">Descripcion</th>
                                  <th scope="col">Tipo</th>
                              </tr>
                          </thead>
    
                          <tbody>
                  
                              {
                                
                                  this.state.top.map( t => {
                                      return (
                                          <tr key={t.id}>
                                              <td >{t.fecha}</td>
                                              <td>{t.monto}</td>
                                              <td>{t.detalle}</td>
                                              <td>{t.descripcion}</td>
                                              <td>{t.tipo.data == 1 ? 'Ingreso' : 'Egreso'}</td>           
                                          </tr>
                                      )
                                  } )
                              }
                            
                          </tbody>
                      </table>
                  </div>
              </section>
          </div>
        );
      }
      
}

export default Resumen