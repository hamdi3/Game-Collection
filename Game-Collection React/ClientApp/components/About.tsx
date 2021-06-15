import * as React from 'react';
import { RouteComponentProps } from 'react-router';

export class About extends React.Component<RouteComponentProps<{}>, {}> {
    public render() {
        return <div>
            <h1>About Us</h1>
            <p>Here you can find additional informations about us where we are, what we do and how we do it</p>
            <img className='imgabout' src={require('./img4.png')} width="550" height="550" />
        </div>;
    }
}
