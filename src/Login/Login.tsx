import * as React from 'react'
import styled from 'styled-components'

const Button  = styled.button``

const TextField = styled.input`

`

interface  ILoginProps{
    isShowing:boolean
}

interface ILoginState{
    username:string,
    password:string,
    isLoginUp:boolean
}



export default class Login extends React.Component<ILoginProps,ILoginState>{

    state={
        username:'',
        password:'',
        isLoginUp:true
    }

    handleChange=(type:string)=>(e:any)=>{
        const value = e.target.value

        this.setState((prevState, props) => {
            return {
                type:value
            }
        })
    }

    handleChangeLoginMode=()=>{

        this.setState((prevState)=>({
            isLoginUp:!prevState.isLoginUp
        }))

    }

    handleConfirm=()=>{
        const isLoginUp = this.state.isLoginUp
        // const {username,password} = this.state

        if(isLoginUp){

        }else{

        }
    }
    render(){
        const {username,password,isLoginUp} =this.state

        const {isShowing} = this.props
        const containerStyle = {
            display:isShowing?'block':'none'
        }
        return(
            <section style={containerStyle}>
                <TextField
                    onChange={this.handleChange('username')}
                    placeholder="username"
                    value={username}
                />
                <TextField
                    onChange={this.handleChange('password')}
                    value={password}

                    placeholder="password" />

                <div>
                    <Button onClick={this.handleChangeLoginMode}>
                        {isLoginUp?'Login In':'Login Up'}
                    </Button>
                    <Button
                        onClick={this.handleConfirm}
                    >
                        confirm
                    </Button>
                </div>
            </section>
        )
    }
}