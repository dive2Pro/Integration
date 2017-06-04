import * as React from 'react';
import { DIV_CENTER } from '../styled'
import * as _ from 'lodash-fp'

export interface VoteCreateProps {

}

const defaultOptions = [{ placeholder: 'Dead poll', value: '' }, { placeholder: 'No named Land', value: '' }]
class VoteCreate extends React.Component<VoteCreateProps, any> {

  state = {
    options: _.cloneDeep(defaultOptions),
    title: ''
  }

  handleCreatePoll = (event) => {
    event.preventDefault();

    // craetePoll    
    const { options, title } = this.state
    const headers = new Headers()
    headers.append('Content-type', 'application/json')

    fetch('/api/poll/craete', { method: 'POST', headers })
      .then(data => data.json())
      .then(json => {

      })
      .then(() => {

        this.setState({
          options: _.cloneDeep(defaultOptions),
          title: ''
        })
      })
      .catch(err => {

      })

  }
  renderFieldArray = () => {
    const { options } = this.state
    return (
      <ul>
        {
          options.map((option, index) => {
            const { placeholder, value } = option
            return <li key={'option ' + index}>
              <input onChange={(e) => {
                e.preventDefault()
                const value = e.target.value
                option.value = value
                this.setState(prev => {
                  options[index] = option
                  return {
                    options
                  }
                })
              }} type="text" placeholder={placeholder} value={value} />
            </li>
          })
        }
        <li>
          <button type='button' onClick={() => {
            options.push({
              placeholder: 'type in something',
              value: ''
            });
            this.setState({ options })
          }}>More Options</button>
        </li>
      </ul>
    )
  }
  handleInputTitle = (e) => {
    e.preventDefault()
    const value = e.target.value
    this.setState({ title: value })
  }
  render() {
    const { options, title } = this.state
    return (
      <DIV_CENTER>
        <h1>New Poll</h1>
        <form method='post' onSubmit={this.handleCreatePoll}>
          <fieldset>
            <legend>Name your poll.</legend>
            <input type='text' value={title} onChange={this.handleInputTitle} placeholder="What's your favorite game?" />
          </fieldset>
          <fieldset>
            <legend>Options</legend>
            {this.renderFieldArray()}
          </fieldset>
          <button type='submit'>
            Submit
        </button>
        </form>

      </DIV_CENTER>
    );
  }
}

export default VoteCreate;
