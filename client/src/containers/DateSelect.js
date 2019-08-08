import React, { Component } from 'react';

import Matchups from '../components/Matchups';

import { plusToDate } from '../API';
import { getDay } from '../API';
import { today } from '../API';

import { IconContext } from "react-icons";
import { FiArrowLeftCircle } from "react-icons/fi";
import { FiArrowRightCircle } from "react-icons/fi";

class DateSelect extends Component {
    state = {
        count: 0,
        date: new Date(),
        games: null
    }

    handleNext = async () => {
        let countobj = { ...this.state };
        let countcopy = countobj.count;
        countcopy = countcopy + 1
        this.componentDidMount(countcopy);
    }

    handlePrevious = async () => {
        let countobj = { ...this.state };
        let countcopy = countobj.count;
        countcopy = countcopy - 1;
        this.componentDidMount(countcopy);
    }

    componentDidMount = async (day) => {
        let countcopy = day !== undefined ? day : this.state.count
        let date_today = new Date();
        let date = await plusToDate(date_today, countcopy);
        let games = await getDay(today(date));

        this.setState({
            count: countcopy,
            date: date,
            games
        })

        console.log(this.state)
    }

    render() {
        return <React.Fragment>
            <div className="container">
                <div className="text-center">
                    <IconContext.Provider value={{ style: { verticalAlign: 'middle' } }}>
                        <h1>
                            <i onClick={(e) => this.handlePrevious(e)}>
                                <FiArrowLeftCircle />
                            </i> Today's Matchups <i onClick={(e) => this.handleNext(e)}>
                                <FiArrowRightCircle />
                            </i>
                        </h1>
                        <h2>{this.state.date.toLocaleDateString("en-CA")}</h2>
                    </IconContext.Provider>
                </div>
            </div>
            <Matchups
                date={this.state.date}
                games={this.state.games}
            />
        </React.Fragment>
    }
}

export default DateSelect;