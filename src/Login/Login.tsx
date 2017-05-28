import * as React from 'react'
import styled from 'styled-components'

const Button = styled.button`
    color:gray;
    
`

const TextField = styled.input`
    background:red;
`

interface ILoginProps {
    isShowing: boolean
}

interface ILoginState {
    username: string,
    password: string,
    isLoginUp: boolean,
    error: string
}


export default class Login extends React.Component<ILoginProps, ILoginState> {

    state = {
        username: '',
        password: '',
        isLoginUp: true,
        error: ""
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
        const headers = new Headers()
        const requestBody =
            JSON.stringify(
                { username, password }
            )
        const data = new FormData()
        data.append("json", requestBody)
        headers.append("Content-Type", "application/json");
        headers.append("Content-Length", requestBody.toString().length + "");
        const path = this.state.isLoginUp ? "register" : "login"
        fetch(`/api/${path}`, { method: "POST", body: requestBody, headers })
            .then(data =>
                data.json()
            )
            .then(json => {
                this.setState({ error: json.err || "" })

            }).catch(err => {
                console.error(err)
            })
        if (isLoginUp) {

        } else {

        }
    }

    render() {
        const { username, password, isLoginUp } = this.state

        const { isShowing } = this.props
        const containerStyle = {
            display: isShowing ? 'block' : 'none'
        }
        return (
            <section style={containerStyle}>
                <form
                    onSubmit={this.handleConfirm}
                    method="POST">

                    <TextField
                        onChange={this.handleChange('username')}
                        placeholder="username"
                        value={username}
                        name="username"
                    />
                    <TextField
                        onChange={this.handleChange('password')}
                        value={password}
                        placeholder="password"
                        name="password"
                    />

                    <div>
                        <p>
                            {this.state.error}
                        </p>
                        <Button
                            onClick={this.handleChangeLoginMode}>
                            {isLoginUp ? 'Login In' : 'Login Up'}
                        </Button>
                        <Button
                            type="submit"
                        >
                            confirm
                        </Button>
                    </div>
                </form>
            </section>
        )
    }
}