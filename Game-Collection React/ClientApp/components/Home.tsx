import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';
import { format } from "date-fns";
import { NavLink, Route, Link } from 'react-router-dom';
import { LogIn } from './Login';
import { EditGame } from './EditGame';
import { tr } from 'date-fns/locale';
import * as dateFormat from 'dateformat';

const formatDate = (dt:Date) => dateFormat(dt, "mm/dd/yyyy");
interface FetchDataExampleState {
    games: Games[];
    loading: boolean;
    SearchString: string;
}
interface Games {
    g_Id: number;
    g_Title: string;
    g_Genre: string;
    g_Plattform: string;
    g_ReleaseDate: Date;
    g_Price: number;
}

export class Home extends React.Component<RouteComponentProps<{}>, FetchDataExampleState> {
    constructor() {
        super();
        this.state = { games: [], loading: true, SearchString: "" };
        fetch('api/Games/GetGames')
            .then(response => response.json() as Promise<Games[]>)
            .then(data => {
                this.setState({ games: data, loading: false });
            });
        this.handleClick = this.handleClick.bind(this);
        this.SearchString = this.SearchString.bind(this);
        this.ChangeOnSelect = this.ChangeOnSelect.bind(this);
    }
    ChangeOnSelect = (e: any) => {
        console.log("ChangeOnSelect");
        console.log(e.target);
        console.log(e.target.value);
        fetch("api/Games/GetGamesPerSelect?Select=" + e.target.value, {
            method: 'POST'
        })
            .then(response => response.json() as Promise<Games[]>)
            .then(data => {
                console.log(data)
                this.setState({
                    games: data,
                    loading: false
                });
            });
    }
    SearchString(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ SearchString: e.target.value });
    }
    handleClick = (e: any) => {
        console.log("Hello");
        console.log(this.state.SearchString);
        fetch("api/Games/GetGamesPerString?SearchString=" + this.state.SearchString, {
            method: 'POST'
        })
            .then(response => response.json() as Promise<Games[]>)
            .then(data => {
                console.log(data)
                this.setState({
                    games: data,
                    loading: false
                });
            });
    }
    public render() {
        //if (this.props.location.state.LoggedIn == false) {
        //    let path = '/LogIn';
        //    this.props.history.push(path);
        //}
        //console.log(this.props.location.state);
        let contents = this.state.loading
            ?<div className="loader-container">
                    <div className="loader" />
                    <span className="loading-text">
                    </span>
                </div>
            : Home.renderGamesTable(this.state.games);
        return <div>
            <h1>Game List</h1>
            <p>Here are all of your game.</p>
            <NavLink to={'/CreateGame'} exact activeClassName='active'>
                Add a new Game ?
            </NavLink>
           <div>
                <p>
                    Genre
                    <select onChange={this.ChangeOnSelect}>
                        <option value={""} > All </option>)}
                        {this.state.games.map(games =>
                            <option value={games.g_Genre}>{games.g_Genre} </option>)}
                    </select>

                    Title: <input type="text" onChange={this.SearchString} />
                    <button value="Search" className="btn btn-outline-dark" onClick={this.handleClick}>Search</button>
                </p>
            </div>
            {contents}
            </div>;


    }
    private static renderGamesTable(games: Games[]) {
        console.log(games)
        return <table className='table table-sm'>
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
                {games.map(games =>
                    <tr  key={games.g_Id}>
                        <td>{games.g_Title}</td>
                        <td>{games.g_Genre}</td>
                        <td>{games.g_Plattform}</td>
                        <td>{formatDate(games.g_ReleaseDate)} </td>
                        <td>{games.g_Price}</td>
                        <td>
                            <li><Link to={{ pathname: "/EditGame", state: { id: games.g_Id, title: games.g_Title, genre: games.g_Genre, Plattform: games.g_Plattform, rdate: games.g_ReleaseDate, price: games.g_Price } }} >Edit</Link></li>
                            <li><Link to={{ pathname: "/DeleteGame", state: { id: games.g_Id, title: games.g_Title, genre: games.g_Genre, Plattform: games.g_Plattform, rdate: games.g_ReleaseDate, price: games.g_Price } }} >Delete</Link></li>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>;
    }
}
