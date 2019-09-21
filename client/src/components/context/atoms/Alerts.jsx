import React, { useContext } from 'react';
import { Alert } from 'antd';
import { AlertContext } from '../../../contexts/alert.context';

const Alerts = () => {
  const alertContext = useContext(AlertContext);

  return (
    alertContext.alerts.length > 0 &&
    alertContext.alerts.map(alert => (
      <div key={alert.id}>
        <Alert message={alert.msg} type={alert.alertType} closable />
      </div>
    ))
  );
};

export default Alerts;
