import React, { Component } from 'react';
import { getMatchupPrevious, getMatchupCurrent } from '../API';
import Team from '../components/Team';
import Opponent from '../components/Opponent';

export class Matchup extends Component {

    state = {
        game: null
    };

    componentDidMount = async () => {
        const { gameno } = this.props.match.params;
        const gamePrevious = await getMatchupPrevious(gameno);
        const gameCurrent = await getMatchupCurrent(gameno);
        const count = this.props.count;
        this.setState({
            gamePrevious,
            gameCurrent,
            count
        })
    }


    render() {

        const { gamePrevious, gameCurrent } = this.state;

        return gamePrevious
            ? <React.Fragment>
                <div className="container">
                    <div className="container-fluid">
                        <div className="row" id="matchupboxes">
                            <div className="col-lg-6" id="home">
                                <h4>Home Team</h4>
                                <Team
                                    gameCurrent={gameCurrent}
                                    gamePrevious={gamePrevious} />
                            </div>
                            <div className="col-lg-6" id="away">
                                <h4>Away Team</h4>
                                <Opponent
                                    gameCurrent={gameCurrent}
                                    gamePrevious={gamePrevious} />
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
            : <h3>Loading...</h3>
    }
}

export default Matchup;