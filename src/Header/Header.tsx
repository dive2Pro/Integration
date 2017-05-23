/**
 *
 */
import * as React from 'react'
import styled from 'styled-components'

const  Cookies =require( 'js-cookie')

const HeaderNav = styled.nav`
 display:flex;
 & > div{
 
   &:first-child{
     flex:1;
     text-align:start;
    }
  }
`

const AuthSection = styled.section`
&>div{
  margin-right:10px;
}
`

interface IHeaderState {
    user: { username: string } | undefined
}
interface  IHeaderProps{
    toggleLogin:()=>void
}

export const fetchSomething=()=> fetch("/api")

export default class Header extends React.Component<IHeaderProps, IHeaderState> {
    state = {user:undefined}

    componentWillMount() {

        let user = Cookies.get('auth')
        if(user){
        user = JSON.parse(user)
        this.setState({user})
        }

    }

    componentDidMount(){
       fetchSomething()
           .then(data=>{
               console.log(data.json())
           }).catch(err=>{
           console.error('err',err)
       })
    }

    handlerClickAuth=()=>{
        this.props.toggleLogin();
    }

    renderAuthDiv = (text: string) => {

        return (
            <div
                onClick={this.handlerClickAuth}
                id="sign">
                {text}
            </div>
        )
    }
    renderAuthed = () => {
        const user:any = this.state.user
        if(user==null){
            throw new Error('user cant be null');
        }
        const {username}=user
        return (
            <AuthSection>
                <div>My Polls</div>
                <div>New Poll</div>
                {this.renderAuthDiv(username)}
            </AuthSection>
        )
    }

    renderUnAuth = () => {
        return this.renderAuthDiv('Sign in/up')
    }

    render() {
        const isAuthed = !!this.state.user
        const Content = isAuthed ? this.renderAuthed : this.renderUnAuth
        return (
            <HeaderNav>
                <div>
                    fcc-voting
                </div>

                <div>
                    HOME
                </div>
                {
                    Content()
                }
            </HeaderNav>
        )
    }
}
