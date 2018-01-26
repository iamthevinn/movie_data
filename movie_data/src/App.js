import React, { Component } from 'react';
import axios from 'axios'
import './App.css';

const Year = (props) => {
  return (
          <div>
            <div style={{float: 'left'}}>Year:&nbsp;</div>
            <div>
              {props.year}
            </div>
          </div>
  )
}

const Director = (props) => {
  return (
          <div>
          <div style={{float: 'left'}}>Director:&nbsp;</div>
          <div>
          {props.director}
          </div>
        </div>
  )
}

const Plot = (props) => {
  return (
          <div>
          <div style={{float: 'left'}}>Plot:&nbsp;</div>
          <div>
          {props.plot}
          </div>
        </div>
  )
}

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      inputBoxText: '',
      currentMovie: null
    }
    this.setInputBoxText = this.setInputBoxText.bind(this)
    this.searchMovie = this.searchMovie.bind(this)
  }

  setInputBoxText(event) {
    this.setState({inputBoxText: event.target.value})
  }

  searchMovie (event) {
    
    var movieNameWithPluses = this.state.inputBoxText.split(' ').join('+');
    axios.get("http://www.omdbapi.com/?t=" + movieNameWithPluses + "&apikey=9a13d6be").then( data => {
      this.setState({currentMovie: {year: data.data.Year, director: data.data.Director, plot: data.data.Plot}})
      }

    )
  }



render() {
  let outputMovieData = null;
  if (this.state.currentMovie && this.state.currentMovie.year) {
    outputMovieData = (
          <div>
            <Year year={this.state.currentMovie.year}/>
            <br />
            <Director director={this.state.currentMovie.director}/>
            <br />
            <Plot plot={this.state.currentMovie.plot}/>
          </div>
    )
  }

  return (
    <div>
      <div style={{fontSize: '48px', textAlign: 'center'}}>Movie Data</div>
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <div style={{height: '100vh', width: '400px'}}>
          <div style={{padding: '20px', display: 'flex', justifyContent: 'center'}}>
            <div className="search">
              <span className="fa fa-search"></span>
              <input onChange={this.setInputBoxText} className="searchText" placeholder="Enter a movie"></input>
              <button onClick={this.searchMovie} style={{ marginLeft: '20px', boxShadow: '5px 5px 5px black', outline: 'none'}}>Submit</button>
            </div>
          </div>
          <br />
          <div>
            {outputMovieData}
          </div>
        </div>
      </div>
    </div>
  )
}
}

export default App;
