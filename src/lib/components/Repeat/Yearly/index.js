import React from 'react';
import PropTypes from 'prop-types';
import RepeatYearlyOn from './On';
import RepeatYearlyOnThe from './OnThe';

class RepeatYearly  extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      yearly: this.props.yearly,
      index: this.props.index,
      activeOpt: 'on',
    };
    this.handleClick = this.handleClick.bind(this);
  }
  componentWillMount() {
    
  }
  componentWillReceiveProps(nextprops) {
    this.setState({
      yearly: nextprops.yearly,
    });
  }

  handleClick(e) {
    this.setState({
      activeOpt: e.target.value,
    });
  }

// const RepeatYearly = ({
//   yearly: {
//     mode,
//     on,
//     onThe,
//     options,
//     key
//   },
//   handleChange,
// }) => {
  render () {
  const { yearly, index, activeOpt } = this.state;
  const { handleChange, checked } = this.props;
  const { mode, on, onThe, options } = yearly;
  const isTheOnlyOneMode = option => options.modes === option;
  const isOptionAvailable = option => !options.modes || isTheOnlyOneMode(option);
  return (
    <div>
      {isOptionAvailable('on') && (
        <RepeatYearlyOn
          checked={checked}
          index={index}
          mode={mode}
          on={on}
          yearly={yearly}
          hasMoreModes={!isTheOnlyOneMode('on')}
          handleChange={handleChange}
          activeOpt={activeOpt}
          handleClick={this.handleClick}
        />
      )}
      {isOptionAvailable('on the') && (
        <RepeatYearlyOnThe
          index={index}
          checked={checked}
          mode={mode}
          yearly={yearly}
          onThe={onThe}
          hasMoreModes={!isTheOnlyOneMode('on the')}
          handleChange={handleChange}
          activeOpt={activeOpt}
          handleClick={this.handleClick}
        />
      )}
    </div>
  );
  }
}

RepeatYearly.propTypes = {
  yearly: PropTypes.shape({
    mode: PropTypes.oneOf(['on', 'on the']).isRequired,
    on: PropTypes.object.isRequired,
    onThe: PropTypes.object.isRequired,
    options: PropTypes.shape({
      modes: PropTypes.oneOf(['on', 'on the']),
    }).isRequired,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
};


export default RepeatYearly;
