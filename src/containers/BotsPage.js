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
    if (!this.state.enlistedBots.includes(bot)) {
    this.setState({ enlistedBots: [...this.state.enlistedBots, bot] });
    }
  };

  dischargeBot = (bot) => {
    this.setState({enlistedBots: [...this.state.enlistedBots.filter(eb => eb !== bot )]})
  }

  terminateBot = (bot) => {
    fetch(`${botApi}/${bot.id}`, {
      method: 'DELETE',
    })
    .then(this.dischargeBot(bot))
    .then(this.setState({
      bots: [...this.state.bots.filter(eb => eb!== bot)]
    }))
  }

  render() {
    return (
      <div>
        <YourBotArmy handleClick={this.dischargeBot} handleTerminate={this.terminateBot} bots={this.state.enlistedBots}/>
        <BotCollection handleClick={this.draftBot} handleTerminate={this.terminateBot} bots={this.state.bots} />
      </div>);
  }
}

export default BotsPage;

