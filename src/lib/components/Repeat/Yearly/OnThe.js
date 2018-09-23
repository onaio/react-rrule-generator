import React from 'react';
import PropTypes from 'prop-types';

import { MONTHS, DAYS } from '../../../constants/index';
class RepeatYearlyOnThe  extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: this.props.mode,
      onThe: this.props.onThe,
      hasMoreModes: this.props.hasMoreModes,
      yearly: this.props.yearly,
      index: this.props.index,
      isActive: this.props.mode === 'on the',
      activeOpt: this.props.activeOpt
    };
  }

  componentWillReceiveProps(nextProps) {
    const { yearly, index } = nextProps;
    const { mode } = yearly;
    const modeVal = `mode${index}`;
    this.setState({
      activeOpt: nextProps.activeOpt,
      yearly: yearly,
      isActive: modeVal && yearly[modeVal] ? yearly[modeVal] === 'on the' : mode === 'on the'
    });
  }

 render () {
  const { handleChange, index } = this.props;
  const { yearly, activeOpt } = this.state;
  const isActive = activeOpt === 'on the';
  return (
    <div className={`form-group row d-flex align-items-sm-center ${!isActive && 'opacity-50'}`}>
      <div className="col-sm-1 offset-sm-3">
        {this.state.hasMoreModes && (
          <input
            type="radio"
            aria-label="Repeat yearly on the"
            name={`repeat.yearly.mode${this.state.index}`}
            key={index}
            id={`repeat.yearly.mode.on-the-$${this.state.index}`}
            checked={isActive}
            value="on the"
            onChange={handleChange}
            onClick={(e) => this.props.handleClick(e)}
          />
        )}
      </div>
      <div className="col-sm0">
        on the
      </div>

      <div className="col-sm-3">
        <select
          name="repeat.yearly.onThe.which"
          aria-label="Repeat yearly on the which"
          className="form-control"
          value={yearly.onThe.which}
          disabled={!isActive}
          onChange={handleChange}
        >
          <option value="First">First</option>
          <option value="Second">Second</option>
          <option value="Third">Third</option>
          <option value="Fourth">Fourth</option>
          <option value="Last">Last</option>
        </select>
      </div>

      <div className="col-sm-3">
        <select
          name="repeat.yearly.onThe.day"
          aria-label="Repeat yearly on the day"
          className="form-control"
          value={yearly.onThe.day}
          disabled={!isActive}
          onChange={handleChange}
        >
          {DAYS.map(day => <option key={day} value={day}>{day}</option>)}
        </select>
      </div>

      <div className="col-sm0">
        of
      </div>

      <div className="col-sm-3">
        <select
          name="repeat.yearly.onThe.month"
          aria-label="Repeat yearly on the month"
          className="form-control"
          value={yearly.onThe.month}
          disabled={!isActive}
          onChange={handleChange}
        >
          {MONTHS.map(month => <option key={month} value={month}>{month}</option>)}
        </select>
      </div>

    </div>
  );
};

}
RepeatYearlyOnThe.propTypes = {
  mode: PropTypes.oneOf(['on', 'on the']).isRequired,
  onThe: PropTypes.shape({
    which: PropTypes.oneOf(['First', 'Second', 'Third', 'Fourth', 'Last']).isRequired,
    month: PropTypes.oneOf(MONTHS).isRequired,
    day: PropTypes.oneOf(DAYS).isRequired,
  }).isRequired,
  hasMoreModes: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default RepeatYearlyOnThe;
