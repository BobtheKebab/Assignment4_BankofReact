// src/App.js

import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import LogIn from './components/Login';
import Credits from './components/Credits';
import Debits from './components/Debits';
import axios from 'axios';

class App extends Component {
  constructor() {  // Create and initialize state
    super(); 
    this.state = {
      accountBalance: 1234567.89,
      currentUser: {
        userName: 'Joe Smith',
        memberSince: '11/22/99',
      },
	  credits: [],
	  debits: []
    }
  }
  
  // Make API requests
  async componentDidMount() {
	let creditsAPI = 'https://moj-api.herokuapp.com/credits';
	let debitsAPI = 'https://moj-api.herokuapp.com/debits';
	
	try {
		let creditsResponse = await axios.get(creditsAPI);
		this.setState({credits: creditsResponse.data});
	} catch (e) {
		if (e.response) {
			console.log(e.response.data);
			console.log(e.response.status);
		}
	}
	
	try {
		let debitsReponse = await axios.get(debitsAPI);
		this.setState({debits: debitsReponse.data});
	} catch (e) {
		if (e.response) {
			console.log(e.response.data);
			console.log(e.response.status);
		}
	}
	
  }
  
  // Add debit
  addDebit() {
	  console.log("debit added");
  }
  
  // Add credit
  addCredit() {
	  console.log("credit added");
  }

  // Update state's currentUser (userName) after "Log In" button is clicked
  mockLogIn = (logInInfo) => {  
    const newUser = {...this.state.currentUser}
    newUser.userName = logInInfo.userName
    this.setState({currentUser: newUser})
  }

  // Create Routes and React elements to be rendered using React components
  render() {  
    const HomeComponent = () => (<Home accountBalance={this.state.accountBalance}/>);
    const UserProfileComponent = () => (
      <UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince}  />
    );
    const LogInComponent = () => (<LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} />)  // Pass props to "LogIn" component
	const CreditsComponent = () => (<Credits credits={this.state.credits} addCredit={this.addCredit} />);
	const DebitsComponent = () => (<Debits debits={this.state.debits} addDebit={this.addDebit} />);

    return (
      <Router>
        <div>
          <Route exact path="/" render={HomeComponent}/>
          <Route exact path="/userProfile" render={UserProfileComponent}/>
          <Route exact path="/login" render={LogInComponent}/>
		  <Route exact path="/credits" render={CreditsComponent}/>
		  <Route exact path="/debits" render={DebitsComponent}/>
        </div>
      </Router>
    );
  }
}

export default App;