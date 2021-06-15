import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';
import { format } from "date-fns";


interface FetchDataExampleState {
    games: Games[];
    loading: boolean;
}
interface Games {
    g_Id: number;
    g_Title: string;
    g_Genre: string;
    g_Plattform: string;
    g_ReleaseDate: Date;
    g_Price: number;
}

export class FetchData extends React.Component<RouteComponentProps<{}>, FetchDataExampleState> {
    constructor() {
        super();
        this.state = { games:[], loading: true };

        fetch('api/Games/GetGames')
            .then(response => response.json() as Promise<Games[]>)
            .then(data => {
                console.log(data)
                this.setState({ games: data, loading: false });
            });
    }

    public render() {
        console.log(this.state.games);
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : FetchData.renderGamesTable(this.state.games);

        return <div>

            <h1>Game List</h1>
            <p>Here are all of your game.</p>
            {contents}
        </div>;
    }

    private static renderGamesTable(games: Games[]) {
        console.log(games)
        return <table className='table'>
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
                    <tr key={games.g_Id}>
                        <td>{games.g_Title}</td>
                        <td>{games.g_Genre}</td>
                        <td>{games.g_Plattform}</td>
                        <td>{games.g_ReleaseDate}</td>
                        <td>{games.g_Price}</td>
                    </tr>
                )}
            </tbody>
        </table>;
    }
}
