import React, {Component} from 'react'

class Form extends Component {
    constructor(props, context){
        super(props, context);
            this.state = {
                fecha:'',
                monto:'',
                detalle:[],
                descripcion:'',
                categoria:''
            }

            this.handleChange = this.handleChange.bind(this)
            this.addMov = this.addMov.bind(this);
            this.ref = React.createRef()
    }

 
    componentDidMount(){
        this.getDetalle()
    }

    getDetalle(){
        fetch("http://localhost:4000/budget/addmov")
        .then(res => res.json())
        .then(data => {
            console.log(data);
            this.setState({
                detalle: data.detalle
            })
        })
    }
    

    addMov(e){
    
        fetch('http://localhost:4000/budget/addmov', {
            method: 'POST',
            body: JSON.stringify(this.state ),
            headers: { 
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            console.log(res);
            if(res.ok){
              return res.json()
            }
        })
        .then(data =>{
            console.log(data);
        })
        .catch(err => console.log(err));
        e.preventDefault()
    }

    handleChange(e){
        const {name, value} = e.target;
        this.setState({
            [name]: value
        })
    }

    
    render(){
    return (
       <div className= "container">
           <h1 className= "text-center">Nuevos Movimientos</h1>
            <form onSubmit={this.addMov}>
                <div className="form-row">
                    <div className="col-md-6 mb-3">
                            <label >Fecha</label>
                            <input onChange={this.handleChange} type="date" name="fecha" id="" className="form-control" required/>
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="">Monto</label>
                        <input onChange={this.handleChange} type="number" name="monto" id="" className="form-control" required/>
                    </div>
                </div>
                <div className="form-row">
                    <div className="col-md-6 mb-3">
                        <label htmlFor="">Detalle</label>
                        <select onChange={this.handleChange} name="categoria" id="" className="form-control" required>
                            {
                                this.state.detalle.map( detail => {
                                    return(
                                        <option id={detail.id} value={detail.id}>{detail.detalle}</option>
                                    )
                                })
                            }
                        </select>
                       
                    </div>

                    <div className="col-md-6 mb-3">
                        <label htmlFor="">Descripcion</label>
                        <input onChange={this.handleChange} type="text" name="descripcion" id="" className="form-control" required/>
                    </div>
                </div>
                <button className="btn btn-primary" type="submit">ACEPTAR CAMBIOS</button>
                </form>
       </div>
    )
    }
}

export default Form;
