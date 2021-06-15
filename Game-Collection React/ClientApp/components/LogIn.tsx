import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';
import { NavLink } from 'react-router-dom';

interface User {
    USR_UserName: string;
    USR_Password: string;
    LoggedIn: boolean;
}

export class LogIn extends React.Component<RouteComponentProps<{}>, User> {
    constructor() {
        super();
        this.state = { USR_UserName: "", USR_Password: "", LoggedIn: false };
        this.handleClick = this.handleClick.bind(this);
        this.handleChangeUserName = this.handleChangeUserName.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
    }

    handleChangeUserName(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ USR_UserName: e.target.value });
    }
    handleChangePassword(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ USR_Password: e.target.value });
    }
    handleClick = (e: any) => {
        this.setState({ LoggedIn: true });
        console.log("Hello");
        console.log(this.state.USR_UserName);
        console.log(this.state.USR_Password);
        fetch("api/Users/Signin", {
            method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({
                USR_UserName: this.state.USR_UserName,
                USR_Password: this.state.USR_Password,
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log("Login:");
                console.log(data);
                let path = '/Home';
                
                this.props.history.push({
                    pathname: path,
                    state: { LoggedIn: true }
                });
            });
    }

    public render() {
        //console.log(this.props.location.state);
        //if (this.props.location.state != undefined && this.props.location.state.LoggedIn == true ) {
        //    let path = '/Home';
        //    this.props.history.push(path);
        //}
        return <div>
            <h1>Log in</h1>
            <img className='imgju' src={require('./img1.png')} width="600" height="600" />
            <div className="row">
                <div className="col-md-4">
                    <div className="form-group">
                        <label className="control-label">User Name</label>
                        <input className="form-control" name="USR_UserName" placeholder="UserName" data-val-required="true" data-msg-required="a User Name is required" onChange={this.handleChangeUserName} />
                    </div>
                    <div className="form-group">
                        <label className="control-label">Password</label>
                        <input type="password" className="form-control" name="USR_Password" placeholder="Password" data-val-required="true" data-msg-required="a Password is required" onChange={this.handleChangePassword} />
                    </div>
                    <button value="Signin" className="btn btn-default"  onClick={this.handleClick}>Log in</button>
                    <p className="forgot-password text-right">
                        <NavLink to={'/Joinus'} exact activeClassName='active'>
                            Not registered? sign up!
                        </NavLink>
                    </p>
                </div>
            </div>
        </div>;
    }
}
