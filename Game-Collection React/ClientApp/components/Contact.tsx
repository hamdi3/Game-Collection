import * as React from 'react';
import { RouteComponentProps } from 'react-router';

export class Contact extends React.Component<RouteComponentProps<{}>, {}> {
    public render() {
        return <div>
            <h1>Contact us!</h1>
            <img className='imgcon' src={require('./img6.png')} width="550" height="550" />
            <address>
                This is just a test project<br />
                test 43 39112 Magdeburg<br />
                <abbr title="Phone">P:</abbr>
                123456789
            </address>

            <address>
                <strong>Support:</strong> <a href="mailto:Support@example.com">Support@example.com</a><br />
                <strong>Marketing:</strong> <a href="mailto:Marketing@example.com">Marketing@example.com</a>
            </address>
        </div>;
    }
}
