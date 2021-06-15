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

export class EditGame extends React.Component<RouteComponentProps<{}>, Games> {

    constructor() {
        super();


        this.state = { g_Id: 0, g_Title: "", g_Genre: "", g_Plattform: "", g_ReleaseDate: new Date(), g_Price: 60 };
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
        fetch("api/Games/EditGame", {
            method: 'PUT' + this.props.location.state.id, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({
                g_Id: this.props.location.state.id,
                g_Title: this.props.location.state.title,
                g_Genre: this.props.location.state.genre,
                g_Plattform: this.props.location.state.Plattform,
                g_ReleaseDate: this.props.location.state.rdate,
                g_Price: this.props.location.state.price,
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
        console.log(this.props.location.state.rdate)
        return <div>
            <h2>Edit</h2>
            <h4>Games</h4>
            <div className="row">
                <div className="col-md-4">
                    <div className="form-group">
                        <label className="control-label">Game Title</label>
                        <input className="form-control" name="g_Title" placeholder={this.props.location.state.title} onChange={this.handleChangeTitle} />
                    </div>
                    <div className="form-group">
                        <label className="control-label">Genre</label>
                        <input className="form-control" name="g_Genre" placeholder={this.props.location.state.genre} onChange={this.handleChangeGenre} />
                    </div>
                    <div className="form-group">
                        <label className="control-label">Plattform</label>
                        <input className="form-control" name="g_Plattform" placeholder={this.props.location.state.Plattform}  onChange={this.handleChangePlattform} />
                    </div>
                    <div className="form-group">
                        <label className="control-label">Release Date</label>
                        <input type="date" className="form-control" name="g_ReleaseDate" placeholder={formatDate(this.props.location.state.rdate)}  onChange={this.handleChangeRDate} />
                    </div>
                    <div className="form-group">
                        <label className="control-label">Price</label>
                        <input type="number" className="form-control" name="g_Price" placeholder={this.props.location.state.price} onChange={this.handleChangePrice} />
                    </div>
                    <button value="Register" className="btn btn-default" onClick={this.handleClick}>Save Edit</button>
                    <hr>
                    </hr>
                    <NavLink to={'/Home'} exact activeClassName='active'>Back to List</NavLink>
                </div>
            </div>
        </div>;
    }
}


