import React from 'react';
import PropTypes from 'prop-types';
import RepeatMonthlyOn from './On';
import RepeatMonthlyOnThe from './OnThe';
import numericalFieldHandler from '../../../utils/numericalFieldHandler';

class RepeatMonthly  extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      monthly: this.props.monthly,
      index: this.props.index
    };
   
  }
render () {

  const { monthly, index } = this.state;
  console.log(monthly);
  const { handleChange } = this.props;
  const { mode, on, onThe, options } = monthly;
  const isTheOnlyOneMode = option => options.modes === option;
  const isOptionAvailable = option => !options.modes || isTheOnlyOneMode(option);

  return (
    <div>
      <div className="form-group row d-flex align-items-sm-center">
        <div className="col-sm-2 offset-sm-2">
          every
        </div>
        <div className="col-sm-3">
          <input
            name="repeat.monthly.interval"
            aria-label="Repeat monthly interval"
            className="form-control"
            value={monthly.interval}
            onChange={numericalFieldHandler(handleChange)}
          />
        </div>
        <div className="col-sm-3">
          month(s)
        </div>
      </div>

      {isOptionAvailable('on') && (
        <RepeatMonthlyOn
          mode={mode}
          on={on}
          hasMoreModes={!isTheOnlyOneMode('on')}
          handleChange={handleChange}
          monthly = {monthly}
          index = {index}
        />
      )}
      {isOptionAvailable('on the') && (
        <RepeatMonthlyOnThe
          mode={mode}
          onThe={onThe}
          hasMoreModes={!isTheOnlyOneMode('on the')}
          handleChange={handleChange}
          monthly = {monthly}
          index = {index}
        />
      )}

    </div>
    );
  }
}
RepeatMonthly.propTypes = {
  monthly: PropTypes.shape({
    mode: PropTypes.oneOf(['on', 'on the']).isRequired,
    interval: PropTypes.number.isRequired,
    on: PropTypes.object.isRequired,
    onThe: PropTypes.object.isRequired,
    options: PropTypes.shape({
      modes: PropTypes.oneOf(['on', 'on the']),
    }).isRequired,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default RepeatMonthly;
