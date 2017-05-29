import * as React from 'react';
import './App.css';
import Header from './Header'
import Login from './Login'
import {USER_COOKIE} from "./constants/types";
import * as Cookies from 'js-cookie'

import Dialog from 'material-ui/Dialog';
interface IAppState {
    toggle: {
        islogin_open: boolean,

    },user: undefined | {}
}


class App extends React.Component<{}, IAppState> {

    state = {
        toggle: {
            islogin_open: false
        },
        user: undefined
    }

    constructor(props) {
        super(props)
        let user = Cookies.get(USER_COOKIE)
        this.setState({user})
    }

    handleUserStateChange = (user) => {
        Cookies.set(USER_COOKIE, user)
        this.setState({user})
    }

    handleToggleLogin = () => {
        this.setState((prevState, props) => {
            const toggled = !prevState.toggle.islogin_open
            return {
                toggle: {
                    ...prevState.toggle, islogin_open: toggled
                }
            }
        })
    }


    render() {

        return (
            <div className="App">
                <div className="App-header">
                    <Header
                        toggleLogin={this.handleToggleLogin}
                        user={this.state.user}
                    />
                </div>

                <Dialog
                    modal={false}
                    open={this.state.toggle.islogin_open}
                    onRequestClose={this.handleToggleLogin}>
                    <Login
                        user={this.state.user}
                        toggleLogin={this.handleToggleLogin}
                        />
                </Dialog>
            </div>
        );
    }

}

export default App;
