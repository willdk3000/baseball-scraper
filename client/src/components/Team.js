import React from 'react';

const Team = ({ gamePrevious, gameCurrent }) => (
    <React.Fragment>
        <div>
            <img src={gamePrevious[0].logo_team} alt="teamlogo"></img>
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
                                <td>{gamePrevious[0].team_runs}</td>
                                <td>{gameCurrent[0].team_runs}</td>
                            </tr>
                            <tr>
                                <th scope="row">On base pct</th>
                                <td>{gamePrevious[0].team_obp}</td>
                                <td>{gameCurrent[0].team_obp}</td>
                            </tr>
                            <tr>
                                <th scope="row">On base pct + slugging</th>
                                <td>{gamePrevious[0].team_ops}</td>
                                <td>{gameCurrent[0].team_ops}</td>
                            </tr>
                            <tr>
                                <th scope="row">On base pct + slugging (normalized)</th>
                                <td>{gamePrevious[0].team_opsp}</td>
                                <td>{gameCurrent[0].team_opsp}</td>
                            </tr>
                        </tbody>
                    </table>
                </li>
            </ul>
        </div>
        <br />
    </React.Fragment>
);

export default Team;