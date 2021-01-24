import React from 'react';
import firebase from 'firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import Login from './pages/login';
import Signup from './pages/signup';
import Home from './pages/home';

const theme = createMuiTheme({
	palette: {
		primary: {
			light: '#33c9dc',
			main: '#FF5722',
			dark: '#d50000',
			contrastText: '#fff'
		}
  }
});

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {

	const [user] = useAuthState(auth);

  return (
    <div className="App">

      <section>
        {user ? <Home />: <Login />}
        
      </section>
    </div>
  );
//   return (
// 	<MuiThemeProvider theme={theme}>
// 		<Router>
// 			<div>
// 				<Switch>
// 					<Route exact path="/" component={Home} />
// 					<Route exact path="/login" component={Login} />
// 					<Route exact path="/signup" component={Signup} />
// 				</Switch>
// 			</div>
// 	<nav>
// 	  <ul>
// 		<li>
// 		  <Link to="/">Home</Link>
// 		</li>
// 		<li>
// 		  <Link to="/login">Login</Link>
// 		</li>
// 	  </ul>
// 	</nav>
// 		</Router>
// 	</MuiThemeProvider>
// );
}

export default App;
