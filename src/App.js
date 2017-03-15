import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

const city = 'toronto';

class App extends Component {
  constructor(){
    super();
    this.state = {
      city: city,
      title: '',
      forecastAllData: [],
      maxTemp: 650,
      minTemp: -50,
      images: ['./base.png', 
               './sunny.png', 
               './rain.png', 
               './snow.png']
    };
    this.instagramRedirect = this.instagramRedirect.bind(this);
  }

  componentDidMount() {
    axios.get(`https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22${this.state.city}%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys`)
      .then(res => {
        console.log(res.data);
        this.setState({
          title: res.data.query.results.channel.item.title,
          forecastAllData: res.data.query.results.channel.item.forecast
        })
      })
  }

  instagramRedirect() {
    window.location = 'https://www.instagram.com/harveydroolmonster/';
  }

  render() {
    let randomNumber = function getRandomNumber(min, max) {
      min = Math.ceil(0);
      max = Math.floor(3);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }      

    let forecastTargetData = this.state.forecastAllData.map((eachDay, i) => {
      return (
      <div className='tempBars' style={{height: this.state.maxTemp}} onClick={() => {this.instagramRedirect()}}>
        <div className='harveyStyle' style={{height: (eachDay.high)*10+100}}>
          <img className="harveyImage" src={this.state.images[randomNumber()]} />
        </div>
        <div style={{height: (eachDay.high)*10}} className='tempBarHigh'><span>{Math.round(((eachDay.high-32)*5/9))}°C</span></div>
        <div style={{height: Math.abs((eachDay.low)*5)}} className='tempBarLow'><span>{Math.round(((eachDay.low-32)*5/9))}°C</span></div>
      </div>
      )
    });

    let forecastTargetDay = this.state.forecastAllData.map((eachDay, i) => {
      return <div className='tempDay'>{eachDay.date}</div>
    });

    return (
      <div>
        <span>
          <h1 onClick={() => {this.instagramRedirect()}}>Harvey's Weather Woofcast</h1>
        </span>
        <p>{this.state.title}</p>
        <div className='flex-container'>
          {forecastTargetData}
        </div>
        <div className='flex-container-bottom dayText'>
          {forecastTargetDay}
        </div>
        
      </div>
    );
  }
}
export default App;