import { Switch, Route } from 'react-router-dom';


import Dashboard from '../pages/Dashboard';

const Routes = () => (
  <Switch>
    <Route path="/" component={Dashboard} exact/>
  </Switch>
);

export default Routes;

