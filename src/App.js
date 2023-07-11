import { Landing } from './screens';
import { Switch, Route } from 'react-router-dom';
import { DashboardRoute } from './navigation';
import {
  Register,
  SignIn,
  ForgetPassword,
  CreateNewPassword,
} from './screens';

function App() {
  return (
    <div>
      <Switch>
        {/* <Route exact path='/' component={() => {
          window.location.href = 'https://stegvision.com';
          return null;
        }}/> */}
        <Route exact path='/' />
        <Route path="/register" component={Register} />
        <Route path="/signin" component={SignIn} />
        <Route path="/forgetpassword" component={ForgetPassword} />
        <Route path="/createnewpassword" component={CreateNewPassword} />
        <Route path="/dashboard" component={DashboardRoute} />
      </Switch>
    </div>
  );
}

export default App;
