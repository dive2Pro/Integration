import * as React from 'react'
import styled from 'styled-components'
import Cookies from 'js-cookie'
import { USER_COOKIE } from '../constants/types'

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { User } from "../App";

const Button = (RaisedButton)


const LoginMain = styled.main`
    margin:auto;
    
`


interface ILoginProps {
    toggleLogin: () => void
    user: undefined | {}
    handleUserStateChange: (user: User) => void
}

interface ILoginState {
    username: string,
    password: string,
    isLoginUp: boolean,
    msg: string,
}


export default class Login extends React.Component<ILoginProps, ILoginState> {

    state = {
        username: '',
        password: '',
        isLoginUp: true,
        msg: ""
    }

    handleChange = (type: string) => (e: any) => {
        const value = e.target.value

        this.setState((prevState, props) => {
            return {
                [type]: value
            }
        })
    }

    handleChangeLoginMode = () => {
        this.setState((prevState) => ({
            isLoginUp: !prevState.isLoginUp
        }))
    }

    handleConfirm = (event) => {
        event.preventDefault();

        const isLoginUp = this.state.isLoginUp
        // const {username,password} = this.state
        const { username, password } = this.state
        const { toggleLogin, handleUserStateChange } = this.props
        const headers = new Headers()

        const requestBody = JSON.stringify({ username, password })

        headers.append("Content-Type", "application/json");
        headers.append("Content-Length", requestBody.toString().length + "");
        const path = this.state.isLoginUp ? "register" : "login"
        fetch(`/api/${path}`, { method: "POST", body: requestBody, headers })
            .then(data => data.json())
            .then(json => {
                if (json.err) {
                    throw new Error(json.err)
                }
                this.setState({ msg: path + " scusses...." })
                handleUserStateChange(json)
                setTimeout(() => toggleLogin(), 500)
            }).catch(err => {
                this.setState({ msg: err.message })

            })
        if (isLoginUp) {

        } else {

        }
    }

    render() {
        const { username, password, isLoginUp } = this.state

        return (
            <LoginMain>
                <h1>{isLoginUp ? '注册' : '登录'}</h1>
                <form
                    onSubmit={this.handleConfirm}
                    method="POST">

                    <TextField
                        label="Username"
                        onChange={this.handleChange('username')}
                        hintText="username"
                        value={username}
                        name="username"
                    /><br />
                    <TextField
                        onChange={this.handleChange('password')}
                        value={password}
                        label="Password"
                        hintText="password"
                        name="password"
                    />

                    <div>
                        <p>
                            {this.state.msg}
                        </p>

                        <Button
                            label={isLoginUp ? '已有帐号?登录' : '注册帐号'}
                            onClick={this.handleChangeLoginMode}>
                        </Button>

                        <Button
                            primary={true}
                            type="submit"
                            label="confirm"
                        />
                    </div>
                </form>
            </LoginMain>
        )
    }
}