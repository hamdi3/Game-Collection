import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';
import { format, toDate } from "date-fns";
import { NavLink } from 'react-router-dom';
import { getDate } from 'date-fns/esm/fp';
import { id } from 'date-fns/locale';
import * as dateFormat from 'dateformat';


const formatDate = (dt: Date) => dateFormat(dt, "mm/dd/yyyy");

interface Games {
    g_Id: number;
    g_Title: string;
    g_Genre: string;
    g_Plattform: string;
    g_ReleaseDate: Date;
    g_Price: number;
}

export class DeleteGame extends React.Component<RouteComponentProps<{}>, Games> {

    constructor() {
        super();


        this.state = { g_Id: 0, g_Title: "", g_Genre: "", g_Plattform: "", g_ReleaseDate: new Date(), g_Price: 60 };
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick = (e: any) => {
        console.log("Hello");
        fetch("api/Games/DeleteGame", {
            method: 'Delete' + this.props.location.state.id, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({
                g_Id: this.props.location.state.id,
                g_Title: this.props.location.state.title,
                g_Genre: this.props.location.state.genre,
                g_Plattform: this.props.location.state.Plattform,
                g_ReleaseDate: this.props.location.state.rdate,
                g_Price: this.props.location.state.price,
            })
        })
            .then(data => {
                let path = '/Home';
                this.props.history.push(path);
            });

    }
    

    public render() {
        console.log(this.props.location.state.rdate)
        return <div>
            <h2>Delete</h2>
            <h4>Are you sure you want to delete this game ?</h4>
                    <table className='table table-sm'>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Genre</th>
                                <th>Plattform</th>
                                <th>Release Date</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody> 
                        <td> {this.props.location.state.title}</td>
                        <td> {this.props.location.state.genre}</td>
                        <td> {this.props.location.state.Plattform}</td>
                        <td> {formatDate(this.props.location.state.rdate)} </td>
                        <td> {this.props.location.state.price}</td>
                        </tbody>
                    </table>
                    <button value="Register" className="btn btn-default" onClick={this.handleClick}>Delete Game</button>
                    <hr>
                    </hr>
                    <NavLink to={'/Home'} exact activeClassName='active'>Back to List</NavLink>
        </div>;
    }
}


