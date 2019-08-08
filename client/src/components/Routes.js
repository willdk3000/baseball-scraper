import React from 'react';
import { Switch, Route } from 'react-router-dom';
import NotFound from './NotFound';
import DateSelect from '../containers/DateSelect';
import Matchup from '../containers/Matchup';

const Routes = () => (
    <Switch>
        <Route exact path="/" component={DateSelect} />
        <Route
            exact path="/schedule/:gameno" component={Matchup} />
        <Route path="*" component={NotFound} />
    </Switch>
);

export default Routes;