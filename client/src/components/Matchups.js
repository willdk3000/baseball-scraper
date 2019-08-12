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
                                            <div className='row'>
                                                <div className='col-lg-6'>
                                                    <img className='hometeamlogo' src={game.team_logo} alt="teamlogo"></img>
                                                    <p>Home team</p>
                                                    <table className="table table-bordered table-striped text-center">
                                                        <tbody>
                                                            <tr>
                                                                <td>My odds</td>
                                                                <td style={{
                                                                        backgroundColor: game.my_outcome === 'win' ? "#E1FFE1" : "#FFE2E2"
                                                                    }}>{game.my_odds ? game.my_odds.toFixed(2) : 'no odds calculated'}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Moj odds</td>
                                                                <td style={{
                                                                        backgroundColor: game.moj_outcome === 'win' ? "#E1FFE1" : "#FFE2E2"
                                                                    }}>{game.moj_odds ? game.moj_odds : 'no odds calculated'}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                                <div className='col-lg-6'>
                                                    <img className='awayteamlogo' src={game.opponent_logo} alt="opponentlogo"></img>
                                                    <p>Away team</p>
                                                    <table className="table table-bordered table-striped text-center">
                                                        <tbody>
                                                            <tr>
                                                                <td>My odds</td>
                                                                <td style={{
                                                                        backgroundColor: game.opponent_my_outcome === 'win' ? "#E1FFE1" : "#FFE2E2"
                                                                    }}>{game.opponent_my_odds ? game.opponent_my_odds.toFixed(2) : 'no odds calculated'}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Moj odds</td>
                                                                <td style={{
                                                                        backgroundColor: game.opponent_moj_outcome === 'win' ? "#E1FFE1" : "#FFE2E2"
                                                                    }}>{game.opponent_moj_odds ? game.opponent_moj_odds : 'no odds calculated'}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
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