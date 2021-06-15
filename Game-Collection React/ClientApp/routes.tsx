import * as React from 'react';
import { Route, match, Redirect } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { Contact } from './components/Contact';
import { LogOut } from './components/LogOut';
import { Joinus } from './components/Joinus';
import { About } from './components/About';
import { LogIn } from './components/LogIn';
import { CreateGame } from './components/CreateGame';
import { EditGame } from './components/EditGame';
import { DeleteGame } from './components/DeleteGame';
import * as H from "history";
import { Component } from 'react';

export const routes = <Layout>
    <Route exact path='/' component={LogIn} />
    <Route path='/About' component={About} />
    <Route path='/Contact' component={Contact} />
    <Route path='/Joinus' component={Joinus} />
    <Route path='/LogOut' component={LogOut} />
    <Route path='/counter' component={Counter} />
    <Route path='/fetchdata' component={FetchData} />
    <Route path='/test' component={Counter} />
    <Route path='/Home' component={Home} />
    <Route path='/CreateGame' component={CreateGame} />
    <Route path='/EditGame' exact component={EditGame} />
    <Route path='/DeleteGame' exact component={DeleteGame} />
</Layout>;
