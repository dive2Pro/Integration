/**
 *
 */
import * as React from 'react'

import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import styled from 'styled-components'
import RaisedButton from 'material-ui/RaisedButton'

import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';

import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
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
display:flex;
&>div{
  margin-right:10px;
}
`

interface IHeaderState {
    isMenuOpen: boolean
}
interface IHeaderProps {
    toggleLogin: () => void
    handlerLoginout: () => void

    user: undefined | {}
}

export const fetchSomething = () => fetch("/api")

export default class Header extends React.Component<IHeaderProps, IHeaderState> {
    state = { isMenuOpen: false }
    componentDidMount() {
        fetchSomething()
            .then(data => {
                console.log(data.json())
            }).catch(err => {
                console.error('err', err)
            })
    }

    handlerClickAuth = () => {
        this.props.toggleLogin();
    }
    handlerOpenIconMenu = () => {
        this.setState(prev => ({
            isMenuOpen: !prev.isMenuOpen
        }))
    }

    renderAuthDiv = (text: string) => {
        const { user, handlerLoginout } = this.props

        const isAuthed = !!user

        return (
            <div style={{ display: 'flex' }}>
                <RaisedButton
                    onClick={!isAuthed ? this.handlerClickAuth : this.handlerOpenIconMenu}
                    label={text}
                    labelPosition="before"
                    primary={true}
                    id="sign">
                </RaisedButton>
                {isAuthed && <IconMenu
                    onItemTouchTap={handlerLoginout}
                    open={this.state.isMenuOpen}
                    onRequestChange={this.handlerOpenIconMenu}
                    iconButtonElement={
                        <IconButton>
                            <NavigationExpandMoreIcon />
                        </IconButton>
                    }
                >
                    <MenuItem primaryText="Logout" />
                </IconMenu>
                }
            </div>
        )
    }
    renderAuthed = () => {
        const user: any = this.props.user
        if (user == null) {
            throw new Error('user cant be null');
        }
        const { username } = user
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
