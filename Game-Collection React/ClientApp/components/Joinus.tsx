import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';
import { NavLink } from 'react-router-dom';


interface User {
    USR_UserName: string;
    USR_Password: string;
    USR_FirstName: string;
    USR_LastName: string;
    LoggedIn: boolean;
}

export class Joinus extends React.Component<RouteComponentProps<{}>, User> {
    
    constructor() {
        super();
        this.state = { USR_UserName: "", USR_Password: "", USR_FirstName: "", USR_LastName:"",LoggedIn: false };
        this.handleClick = this.handleClick.bind(this);
        this.handleChangeUserName = this.handleChangeUserName.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleChangeFirstName = this.handleChangeFirstName.bind(this);
        this.handleChangeLastName = this.handleChangeLastName.bind(this);
    }
    handleChangeUserName(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ USR_UserName: e.target.value });
    }
    handleChangePassword(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ USR_Password: e.target.value });
    }
    handleChangeFirstName(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ USR_FirstName: e.target.value });
    }
    handleChangeLastName(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ USR_LastName: e.target.value });
    }

    handleClick = (e:any) => {
        console.log("Hello");
        fetch("api/Users", {
            method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({
                USR_UserName: this.state.USR_UserName,
                USR_Password: this.state.USR_Password,
                USR_FirstName: this.state.USR_FirstName,
                USR_LastName: this.state.USR_LastName,
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                this.setState({
                    USR_UserName: data.USR_UserName,
                    USR_Password: data.USR_Password,
                    USR_FirstName: data.USR_FirstName,
                    USR_LastName: data.USR_LastName,
                    LoggedIn: true
                });
            });
        let path = '/';
        this.props.history.push(path);
    }

    public render() {
        return <div>
            <h1>Join us !</h1>
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
                        <div className="form-group">
                            <label  className="control-label">First Name</label>
                        <input className="form-control" name="USR_FirstName" placeholder="First Name" data-val-required="true" data-msg-required="Please enter your first name." onChange={this.handleChangeFirstName}  />
                        </div>
                        <div className="form-group">
                            <label className="control-label">Last Name</label>
                        <input className="form-control" name="USR_LastName" placeholder="Last Name" data-val-required="true" data-msg-required="Please enter your last name." onChange={this.handleChangeLastName}/>
                        </div>
                            <button value="Register" className="btn btn-default" onClick={ this.handleClick }>Register</button>
                        <p className="forgot-password text-right">
                            <NavLink to={'/'} exact activeClassName='active'>
                             Already registered sign in?
                            </NavLink>
                        </p>
                </div>
            </div>
        </div>;
    }
}
