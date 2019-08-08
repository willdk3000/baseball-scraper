import React from 'react';

const Opponent = ({ gamePrevious, gameCurrent }) => (
    <React.Fragment>
        <div>
            <img src={gamePrevious[0].logo_opponent} alt="opponentlogo"></img>
        </div>
        <br />
        <div>
            <ul className="list-group">
                <li className="list-group-item active">Team batting</li>
                <li className="list-group-item">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col"></th>
                                <th scope="col">2018</th>
                                <th scope="col">2019</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">Runs</th>
                                <td>{gamePrevious[0].opponent_runs}</td>
                                <td>{gameCurrent[0].opponent_runs}</td>
                            </tr>
                            <tr>
                                <th scope="row">On base pct</th>
                                <td>{gamePrevious[0].opponent_obp}</td>
                                <td>{gameCurrent[0].opponent_obp}</td>
                            </tr>
                            <tr>
                                <th scope="row">On base pct + slugging</th>
                                <td>{gamePrevious[0].opponent_ops}</td>
                                <td>{gameCurrent[0].opponent_ops}</td>
                            </tr>
                            <tr>
                                <th scope="row">On base pct + slugging (normalized)</th>
                                <td>{gamePrevious[0].opponent_opsp}</td>
                                <td>{gameCurrent[0].opponent_opsp}</td>
                            </tr>
                        </tbody>
                    </table>
                </li>
            </ul>
        </div>
        <br />
    </React.Fragment>
);

export default Opponent;