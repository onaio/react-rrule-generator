import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'moment/locale/en-gb';
import 'moment/locale/en-ca';

import { DATE_TIME_FORMAT } from '../../constants/index';

class EndOnDate  extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: this.props.onDate.date,
      onDate: this.props.onDate
    };
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      onDate: nextProps.onDate,
      date: nextProps.onDate.date
    });
  }

  handleDateChange(date) {
    const editedEvent = {
      target: {
        value: moment(date.target.value).format(DATE_TIME_FORMAT),
        name: 'end.onDate.date',
      },
    };

   

    this.setState({
      date: date.target.value,
    });
    
    this.props.handleChange(editedEvent);
  }

  render() {
    
    const { handleChange } = this.props;
    const { onDate } = this.state;
    const { date, options } = onDate;
   
    return(
      <div className="col-6 col-sm-6">
      {
        <input
            type ="date"
            className = "form-control"
            name = "end.onDate.date"
            value={this.state.date}
            onChange={(e) => this.handleDateChange(e)}
          />
      }
    </div>
    );
  }
}

EndOnDate.propTypes = {
  onDate: PropTypes.shape({
    date: PropTypes.string.isRequired,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default EndOnDate;
