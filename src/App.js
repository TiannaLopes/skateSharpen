import logo from './logo.svg';
import './App.css';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import VilleButton from './VilleButton';
import VilleTime from './VilleTime';
import VilleTime2 from './VilleTime2';
import VilleMenu from './VilleMenu';
import Login from './Login';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ProvideAuth, PrivateRoute, LoginScreen } from './Login';
import LandingPage from './LandingPage';
import MvilleAppBar from './MvilleAppBar';
import AppointmentsList from './AppointmentsList';
import ExistingRequest from './ExistingRequest';
import SharpenRequest from './SharpenRequest';
 function App() {
  return (
    <Container maxWidth="sm">
      <ProvideAuth>
        <Router>
          <Switch>
          <Route path="/login">
              <LoginScreen />
            </Route>
            <PrivateRoute path="/classes">
                {/* <MvilleAppBar section="Classes" /> */}
              <SharpenRequest/>
            </PrivateRoute>
            <PrivateRoute path="/appointments/:classId">  
              <MvilleAppBar section="appointments" />
              <appointmentsList />
                            {/* {<NewTaskDialog/>} */}
           </PrivateRoute>
            <Route path="/">
              <LandingPage />
            </Route>
         </Switch>
       </Router>
      </ProvideAuth>
     </Container>
  );
}

export default App;