import * as React from 'react';
import './App.css';
import Header from './Header'
import Login from './Login'
import { USER_COOKIE } from "./constants/types";
import * as Cookies from 'js-cookie'
import VoteCreate from './VoteCreate'
import Votes from './Votes'
import Dialog from 'material-ui/Dialog';
import { SECTION_CENTER } from './styled'
export class User {
    username: string
    id: string
    constructor() {
    }
    updateFromJson(obj) {
        Object.keys(obj).forEach(item => {
            this[item] = obj[item]

        })
    }
}

interface IAppState {
    toggle: {
        islogin_open: boolean,

    }, user: undefined | User
}

const LoginDialogStyle = {
    width: '30%',
    textAlign: 'center'
}

class App extends React.Component<{}, IAppState> {

    state = {
        toggle: {
            islogin_open: false,
            isCreating_newpoll: true
        },
        user: undefined,
    }

    componentWillMount() {
        let rawuser = Cookies.get(USER_COOKIE)
        if (rawuser) {
            const user = new User()
            user.updateFromJson(JSON.parse(rawuser))
            this.setState({ user })
        }
    }
    handleUserStateChange = (user) => {
        Cookies.set(USER_COOKIE, user)
        this.setState({ user })
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

    handlerLoginout = () => {
        const { user } = this.state
        if (!user) {
            throw new Error('user doesn\'t exits!')
        }
        const { id } = user as User


        fetch(`/api/logout?id=${id}`)
            .then(json => json.json())
            .then
            (json => {
                Cookies.remove(USER_COOKIE)
                this.setState({ user: undefined })
            }).catch(err => {
                throw new Error(err)
            })
    }
    handleShowPollAction = (position) => {

        if (position === 'left') {
            this.setState(prev => ({ toggle: { ...prev.toggle, isCreating_newpoll: true } }))
        } else {
            this.setState(prev => ({ toggle: { ...prev.toggle, isCreating_newpoll: false } }))

        }
    }
    render() {
        const { toggle: { isCreating_newpoll } } = this.state
        const ShowPollView = isCreating_newpoll ? VoteCreate : Votes;
        return (
            <div className="App">
                <div className="App-header">
                    <Header
                        toggleLogin={this.handleToggleLogin}
                        handlerLoginout={this.handlerLoginout}
                        user={this.state.user}
                    />
                </div>

                <Dialog
                    modal={false}
                    open={this.state.toggle.islogin_open}
                    contentStyle={LoginDialogStyle}
                    onRequestClose={this.handleToggleLogin}>
                    <Login
                        user={this.state.user}
                        toggleLogin={this.handleToggleLogin}
                        handleUserStateChange={this.handleUserStateChange}

                    />
                </Dialog>
                <main>
                    <SECTION_CENTER>
                        <h1>
                            Dashboard
                        </h1>
                        <h3>What would you like to do today?</h3>
                        <div>
                            <button onClick={() => this.handleShowPollAction('left')}>New Poll</button>
                            <button onClick={() => this.handleShowPollAction('right')}>My Polls</button>
                        </div>
                    </SECTION_CENTER>
                    <ShowPollView></ShowPollView>
                </main>
            </div>
        );
    }

}

export default App;
