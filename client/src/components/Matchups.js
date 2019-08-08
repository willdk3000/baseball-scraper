import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Matchup extends Component {

    render() {
        const { games } = this.props
        return games
            ? <React.Fragment>
                <div className="container">
                    <ul className="list-group">
                        {
                            games.map(game => (
                                <li key={game.gameno} className="list-group-item">
                                    <Link to={{ pathname: `/schedule/${game.gameno}` }}>
                                        <section className="matchup_cards">
                                            <img src={game.logo_team} alt="teamlogo"></img> vs <img src={game.logo_opponent} alt="opponentlogo"></img>
                                            <section>
                                                <p>{game.team} ({((game.team_xrr + game.team_erp) / (game.opponent_xrr + game.opponent_erp)).toFixed(2)}) vs {game.opponent_initials} ({((game.opponent_xrr + game.opponent_erp) / (game.team_xrr + game.team_erp)).toFixed(2)})</p>
                                            </section>
                                        </section>
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <br />
            </React.Fragment>
            : (<div className="container">
                <h1>Loading...</h1>
            </div>);
    }
}

export default Matchup;