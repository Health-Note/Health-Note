import React, { useContext } from 'react';
import { Alert, message } from 'antd';
import { AlertContext } from '../../../contexts/alert.context';

const Alerts = () => {
  const alertContext = useContext(AlertContext);
  // <Alert message={alert.msg} type={alert.alertType} closable />

  return (
    alertContext.alerts.length > 0 &&
    alertContext.alerts.map(alert => (
      <div key={alert.id}>
        {alert.alertType === "success" && message.success(alert.msg)}
        {alert.alertType === "error" && message.error(alert.msg)}
      </div>
    ))
  );
};

export default Alerts;
