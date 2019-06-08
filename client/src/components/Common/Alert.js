import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'react-bootstrap';
import { connect } from 'react-redux';

const alert = ({ alerts }) => {
    return alerts !== null && alerts.length > 0 && alerts.map(alert => (
        <Alert dismissible key={alert.id} variant={alert.alertType}>
            {alert.msg}
        </Alert>
    ));
};

alert.propTypes = {
    alerts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    alerts: state.alert
});

export default connect(mapStateToProps)(alert);