/**
 *
 */
import * as React from 'react' 
import { shallow} from 'enzyme'
import Header
    from './Header'
import * as Cookie from 'js-cookie';

jest.mock('./Header',()=>{

})


 describe("Header",()=>{
     const cookieName = 'auth'
     beforeEach(()=>{
         const fc:any  =fetch
         fc.mockResponseOnce(
             JSON.stringify({
                 test:'test'
             })
         )
     })

     it('unauth render',()=>{
         // cookie
         Cookie.remove(cookieName)
         let  wrapper=shallow(<Header/>)
         expect(wrapper).toMatchSnapshot()
         expect(wrapper.find('div').length).toEqual(3)
         const signText = wrapper.find('#sign').text()
         expect(signText).toEqual("Sign in/up")
     })

     it('auth render',()=>{
         const user = {
             username:'hyc'
         }

         Cookie.set(cookieName,user)
         let  wrapper=shallow(<Header/>)
         expect(wrapper).toMatchSnapshot()
         expect(wrapper.find('div').length).toEqual(5)
         const signText = wrapper.find('#sign').text()
         expect(signText).toEqual(user.username)
         expect(wrapper.containsAllMatchingElements([
             <div>My Polls</div>,
             <div>New Poll</div>
         ])).toBeTruthy()
     })

     it('')

 })