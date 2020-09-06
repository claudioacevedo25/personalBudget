import React, {Component} from 'react'

class Btnupdate extends Component {
    constructor(props, context){
        super(props, context)
        this.state ={
            id:''
        }

    }

render(){
    return(
            <a href="budget/addmov" className="btn btn-info" type="submit">Edit</a>
    )
}
}

export default Btnupdate
