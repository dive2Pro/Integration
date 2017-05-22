/**
 *
 */
import * as React from 'react'
const  Cookies =require( 'js-cookie')


interface IHeaderState {
    user: { username: string } | undefined
}


export const fetchSomething=()=> fetch("/api/auth")

export default class Header extends React.Component<{}, IHeaderState> {
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
    renderAuthDiv = (text: string) => {

        return (
            <div id="sign">
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
            <section>
                <div>My Polls</div>
                <div>New Poll</div>
                {this.renderAuthDiv(username)}
            </section>
        )
    }

    renderUnAuth = () => {
        return this.renderAuthDiv('Sign in/up')
    }

    render() {
        const isAuthed = !!this.state.user
        const Content = isAuthed ? this.renderAuthed : this.renderUnAuth
        return (
            <nav>
                <div>
                    fcc-voting
                </div>

                <div>
                    HOME
                </div>
                {
                    Content()
                }
            </nav>
        )
    }
}
