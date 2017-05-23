import * as React from 'react';
import './App.css';
import Header from './Header'
import Login from './Login'
interface IAppState{
    toggle:{
        islogin_open:boolean,

    }
}



class App extends React.Component<{}, IAppState> {

    state={
        toggle:{
            islogin_open:false
        }
    }

    handleToggleLogin=()=>{
        this.setState((prevState, props) => {
          const toggled = !prevState.toggle.islogin_open
            return {
                toggle:{
                    ...prevState.toggle, islogin_open:toggled}
        }
        })
    }




  render() {

    return (
      <div className="App">
        <div className="App-header">
            <Header
            toggleLogin={this.handleToggleLogin}
            />
          </div>
          <Login isShowing={this.state.toggle.islogin_open}/>
      </div>
    );
  }

}

export default App;
