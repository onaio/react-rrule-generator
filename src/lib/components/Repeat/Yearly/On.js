import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import numericalFieldHandler from '../../../utils/numericalFieldHandler';
import { MONTHS } from '../../../constants/index';
import '../../../styles/index.css';

class RepeatYearlyOn  extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     mode: this.props.mode,
     on: this.props.on,
     hasMoreModes: this.props.hasMoreModes,
     yearly: this.props.yearly,
     index: this.props.index,
     isActive: this.props.mode === 'on',
     activeOpt: this.props.activeOpt,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { yearly, index } = nextProps;
    const { mode } = yearly;
    const modeVal = `mode${index}`;
    this.setState({
      activeOpt: nextProps.activeOpt,
      yearly: yearly,
      isActive: modeVal && yearly[modeVal] ? yearly[modeVal] === 'on' : mode === 'on'
    });
  }

  render () {
  const daysInMonth = moment(this.state.on.month || "Jan", 'MMM').daysInMonth();
  const { handleChange, index } = this.props;
  const { yearly, activeOpt } = this.state;
  const isActive = activeOpt === 'on';
  return (
    <div className={`form-group row d-flex align-items-sm-center ${!isActive && 'opacity-50'}`}>
      <div className="col-sm-1 offset-sm-3">
        {this.state.hasMoreModes && (
          <input
            type="radio"
            name={`repeat.yearly.mode${this.state.index}`}
            key={this.state.index}
            id={`repeat.yearly.mode.on-${this.state.index}`}
            aria-label="Repeat yearly on"
            value="on"
            checked={isActive}
            onChange={handleChange}
            onClick={(e) => this.props.handleClick(e)}
          />
        )}
      </div>

      <div className="col-sm-1">
        on
      </div>

      <div className="month-on col-sm-3">
        <select
          name="repeat.yearly.on.month"
          aria-label="Repeat yearly on month"
          className="form-control"
          value={yearly.on.month}
          disabled={!isActive}
          onChange={handleChange}
        >
          {MONTHS.map(month => <option key={month} value={month}>{month}</option>)}
        </select>
      </div>

      <div className="day-on col-sm-3">
        <select
          name="repeat.yearly.on.day"
          aria-label="Repeat yearly on a day"
          className="form-control"
          value={yearly.on.day}
          disabled={!isActive}
          onChange={numericalFieldHandler(handleChange)}
        >
          {[...new Array(daysInMonth)].map((day, i) => (
            <option key={i} value={i + 1}>{i + 1}</option>
          ))}
        </select>
      </div>
    </div>
    );
  }
}

RepeatYearlyOn.propTypes = {
  mode: PropTypes.oneOf(['on', 'on the']).isRequired,
  on: PropTypes.shape({
    month: PropTypes.oneOf(MONTHS).isRequired,
    day: PropTypes.number.isRequired,
  }).isRequired,
  hasMoreModes: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default RepeatYearlyOn;
