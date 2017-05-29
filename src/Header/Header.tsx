/**
 *
 */
import * as React from 'react'

import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';
import styled from 'styled-components'
//
// const HeaderNav = styled.nav`
//  display:flex;
//  & > div{
//
//    &:first-child{
//      flex:1;
//      text-align:start;
//     }
//   }
// `

const AuthSection = styled.section`
&>div{
  margin-right:10px;
}
`

interface IHeaderState {
}
interface  IHeaderProps{
    toggleLogin:()=>void
    user:undefined|{}
}

export const fetchSomething=()=> fetch("/api")

export default class Header extends React.Component<IHeaderProps, IHeaderState> {
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
        const user:any = this.props.user
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
        const isAuthed = !!this.props.user
        const Content = isAuthed ? this.renderAuthed : this.renderUnAuth
        return (
            <Toolbar>
                <ToolbarGroup firstChild={true}>
                    <ToolbarTitle text="fcc-voting" />
                </ToolbarGroup>
                <ToolbarGroup>
                    {Content()}
                </ToolbarGroup>
            </Toolbar>
        )
    }
}
