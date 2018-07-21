import * as React from 'react'
import store from '../store'
import * as Game from '../lib/game'
// import { connect } from 'react-redux';


export default class UserGuess extends React.PureComponent{
  handleChange(event){
    // console.log(event.target.value)
    if (event.target.value.length > 1){
      // console.log("max input is 1 character")
      // alert("max input is 1 character")
      event.target.value = event.target.value.slice(0,1)
      return 
    }
  }

  handleSubmit(event){
    event.preventDefault();
    const newGuess = event.target.guessedCharacter.value;
    // Check if the user is sending empty character
    if(newGuess === "" || newGuess === '' ){
      event.target.guessedCharacter.value = ''
      return
    }
    const prevGuesses = store.getState().userGuesses.previousGuesses

    console.log(prevGuesses);
    console.log(prevGuesses.indexOf(newGuess));
    // Check if the user is sending a character which is guessed before
    if (prevGuesses.indexOf(newGuess) > -1 ){
      event.target.guessedCharacter.value = ''
      return 
    }
    store.dispatch(Game.makeGuess(newGuess))
    event.target.guessedCharacter.value = ''
  }
  
  render(){

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
                        Guess 
            <input 
              type="text" 
              onChange={this.handleChange}
              name = "guessedCharacter"
                         />
          </label>
          <input type="submit" value="Guess"/>
        </form>
      </div>
    )
  }
}

// const mapStateToProps = state =>{
//   return {
//       userGuesses: state.userGuesses.previousGuesses
//   }
// }

// export default connect(mapStateToProps)(UserGuess)

// onChange={this.handleChange}
// value = {this.state.name}
             