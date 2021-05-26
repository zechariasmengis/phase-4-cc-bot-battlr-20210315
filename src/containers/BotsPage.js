import React, { Component } from "react";
import BotCollection from './BotCollection';
import YourBotArmy from './YourBotArmy'

const botApi = 'http://localhost:6001/bots';

class BotsPage extends Component {
  state = {
    bots: [],
    enlistedBots: [],
  }

  componentDidMount() {
    fetch(botApi).then(res => res.json()).then(bots => this.setState({bots}))
  };

  draftBot = (bot) => {
    this.setState({ enlistedBots: [...this.state.enlistedBots, bot] });
  };

  dischargeBot = (bot) => {
    console.log(bot)
  }

  render() {
    return (
      <div>
        <YourBotArmy handleClick={this.dischargeBot} bots={this.state.enlistedBots}/>
        <BotCollection handleClick={this.draftBot} bots={this.state.bots} />
      </div>);
  }
}

export default BotsPage;

