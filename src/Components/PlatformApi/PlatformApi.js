import React from 'react';
import PropTypes from 'prop-types';
import ReactJson from 'react-json-view';
import { Card } from 'antd';

const PlatformApi = (props) => {
  return (
    <Card title='Platform API' style={{ marginTop: '20px' }}>
      /api/v2/users/me
      <div style={{ overflow: 'auto', height: '300px', maxHeight: '300px', backgroundColor: '#f5f5f5', border: '1px solid #dddddd', borderRadius: '5px', padding: '10px' }}>
        <ReactJson src={props.jsonObj} />
      </div>
    </Card>
  );
};

PlatformApi.propTypes = {
  jsonObj: PropTypes.object.isRequired,
};

export default PlatformApi;
