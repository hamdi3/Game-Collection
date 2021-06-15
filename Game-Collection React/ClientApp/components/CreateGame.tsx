import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';
import { format, toDate } from "date-fns";
import { NavLink } from 'react-router-dom';
import { getDate } from 'date-fns/esm/fp';


interface Games {
    g_Title: string;
    g_Genre: string;
    g_Plattform: string;
    g_ReleaseDate: Date;
    g_Price: number;
}

export class CreateGame extends React.Component<RouteComponentProps<{}>, Games> {

    constructor() {
        super();
        this.state = { g_Title: "", g_Genre: "", g_Plattform: "", g_ReleaseDate: new Date(), g_Price: 60 };
        this.handleClick = this.handleClick.bind(this);
        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleChangeGenre = this.handleChangeGenre.bind(this);
        this.handleChangePlattform = this.handleChangePlattform.bind(this);
        this.handleChangeRDate = this.handleChangeRDate.bind(this);
        this.handleChangePrice = this.handleChangePrice.bind(this);
    }
    handleChangeTitle(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ g_Title: e.target.value });
    }
    handleChangeGenre(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ g_Genre: e.target.value });
    }
    handleChangePlattform(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ g_Plattform: e.target.value });
    }
    handleChangeRDate(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ g_ReleaseDate: e.target.valueAsDate });
    }
    handleChangePrice(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ g_Price: e.target.valueAsNumber });
    }
    handleClick = (e: any) => {
        console.log("Hello");
        fetch("api/Games/CreateGame", {
            method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({
                g_Title: this.state.g_Title,
                g_Genre: this.state.g_Genre,
                g_Plattform: this.state.g_Plattform,
                g_ReleaseDate: this.state.g_ReleaseDate,
                g_Price: this.state.g_Price,
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                this.setState({
                    g_Title: data.g_Title,
                    g_Genre: data.g_Genre,
                    g_Plattform: data.g_Plattform,
                    g_ReleaseDate: data.g_ReleaseDate,
                    g_Price: data.g_Price,
                });
                let path = '/Home';
                this.props.history.push(path);
            });
    }

    public render() {
        return <div>
            <h1>Join us !</h1>
            <img className='imgju' src={require('./img1.png')} width="600" height="600" />
            <div className="row">
                <div className="col-md-4">
                    <div className="form-group">
                        <label className="control-label">Game Title</label>
                        <input className="form-control" name="g_Title" placeholder="Game Title" onChange={this.handleChangeTitle} />
                    </div>
                    <div className="form-group">
                        <label className="control-label">Genre</label>
                        <input className="form-control" name="g_Genre" placeholder="Genre"  onChange={this.handleChangeGenre} />
                    </div>
                    <div className="form-group">
                        <label className="control-label">Plattform</label>
                        <input className="form-control" name="g_Plattform" placeholder="Plattform"  onChange={this.handleChangePlattform} />
                    </div>
                    <div className="form-group">
                        <label className="control-label">Release Date</label>
                        <input type="date" className="form-control" name="g_ReleaseDate"  onChange={this.handleChangeRDate} />
                    </div>
                    <div className="form-group">
                        <label className="control-label">Price</label>
                        <input type="number" className="form-control" name="g_Price" placeholder="Price"  onChange={this.handleChangePrice} />
                    </div>
                    <button value="Register" className="btn btn-default" onClick={this.handleClick}>Register</button>
                </div>
            </div>
            <hr>
            </hr>
            <NavLink to={'/Home'} exact activeClassName='active'>Back to List</NavLink>
        </div>;
    }
}


