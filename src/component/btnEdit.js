import React, {Component} from 'react'

class Btnedit extends Component {
    constructor(props, context){
        super(props, context)
        this.state ={
            id:''
        }

        this.handleChange = this.handleChange.bind(this)
        this.postId = this.postId.bind(this);
        this.ref = React.createRef()
    }

    postId(e){
    
        fetch('http://localhost:4000/budget/edit', {
            method: 'POST',
            body: JSON.stringify(this.props ),
            headers: { 
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => { 
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
    return(
        <form onSubmit={this.postId}>
            <input onChange={this.handleChange} type="hidden" name="id"/>
            <button className="btn btn-info" type="submit">Edit</button>
        </form>
    )
}
}

export default Btnedit