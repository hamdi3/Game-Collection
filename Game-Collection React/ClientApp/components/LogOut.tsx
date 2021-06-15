import * as React from 'react';
import { RouteComponentProps } from 'react-router';

export class LogOut extends React.Component<RouteComponentProps<{}>, {}> {
    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick = (e: any) => {
        console.log("Hello");
        fetch("api/Users/LogOut", {
            method: 'POST'
        })
            .then(response => response.json())
        let path = '/';
        this.props.history.push({
            pathname: path,
            state: { LoggedIn: false }
        });
    }
    public render() {
        return <div>
            <h1>Log out</h1>
            <p>Are you sure you want to log out?</p>
            
            <div className="row">
                
                <div className="col-md-4">
                    <form method="post">
                        <div className="form-group"> 
                            <button value="Signin" className="btn btn-default" onClick={this.handleClick}>Log out</button>
                        </div>    
                    </form>
                    <img className='imglo' src={require('./img5.png')} width="550" height="550" />
                </div>
            </div>
        </div>;
    }
}
