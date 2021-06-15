import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';;

export class NavMenu extends React.Component<{}, {}> {
    public render() {
        return <div className='main-nav'>
                <div className='navbar navbar-inverse'>
                <div className='navbar-header'>
                    <button type='button' className='navbar-toggle' data-toggle='collapse' data-target='.navbar-collapse'>
                        <span className='sr-only'>Toggle navigation</span>
                        <span className='icon-bar'></span>
                        <span className='icon-bar'></span>
                        <span className='icon-bar'></span>
                    </button>
                    <Link className='navbar-brand' to={'/'}>
                        <img className='imglogo' src={require('./img3.png')} width="60" height="60" />
                            Game List
                        </Link>
                </div>
                <div className='clearfix'></div>
                <div className='navbar-collapse collapse'>
                    <ul className='nav navbar-nav'>
                        <li>
                            <NavLink to={'/'} exact activeClassName='active'>
                                <span className='glyphicon glyphicon-home'></span> Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'/About'} exact activeClassName='active'>
                                <span className='glyphicon glyphicon-info-sign'></span> About
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'/Contact'} exact activeClassName='active'>
                                <span className='glyphicon glyphicon-envelope'></span> Contact
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'/Joinus'} exact activeClassName='active'>
                                <span className=' glyphicon glyphicon-heart-empty'></span> Join Us
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'/LogOut'} exact activeClassName='active'>
                                <span className='glyphicon glyphicon-log-out'></span> Log Out
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>;
    }
}
