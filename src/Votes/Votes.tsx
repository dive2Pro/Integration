import * as React from 'react';

export interface VotesProps {
}

class Votes extends React.Component<VotesProps, any> {
  render() {
    return (
      <div>
        <fieldset>
          <legend> Polls</legend>
          <ul>
            <li>
              <span>Favorite Brand</span>
              <button>Delete</button>
            </li>

            <li>
              <span>No Named Land</span>
              <button>Delete</button>
            </li>
          </ul>
        </fieldset>
      </div>
    );
  }
}

export default Votes;
