import React, { Component } from 'react';
import './App.css';
import PieChart from 'react-minimal-pie-chart';

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      colors: [],
      computers: []
    }
  }

  componentDidMount() {
    fetch('https://api.whatpulse.org/user.php?user=tjw&format=json')
    .then(response => response.json())
    .then(data => {
      console.log(data.Computers);
      const response = data.Computers;
      // map to create array
      var computer_values = Object.keys(response).map(computer => parseInt(response[computer].Keys));
      console.log(computer_values);
      const reducer = (accumulator, currentValue) => accumulator + currentValue;

      var total_keys = computer_values.reduce(reducer);
      console.log(total_keys)

      var colors = ["#142614", "#1E441E", "#32F92F", "#227221", "#139910", "#132313","#1C3E1C", "#2EE32B", "#1F681E", "#128C0F"]
      var computers = Object.keys(response).map(computer => { return {
        title: response[computer].Name,
        value: parseInt(response[computer].Keys),
        color: colors[parseInt(computer.substr(-1))]
      }})

      this.setState({computers})
      //Object.keys(temp1).map(computer => { console.log(temp1[computer]) })
    })
  }

  render() {
    var chart_style = {height: '100vh', width: '100vh'}
    return (
      <div className="App">
        <header className="App-header">
        <PieChart
          data={this.state.computers}
          style={chart_style}
        />
        </header>
      </div>
    );
  }
}

export default App;
