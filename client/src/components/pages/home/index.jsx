import React, { useContext, useEffect } from 'react';
import { Carousel } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

const contentStyle = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

const Home = () => {
 
  return (
    <div>
      <h1> 헬스노트 홈 </h1>
      <Carousel autoplay>
        <div>
          <h3 style={contentStyle}>1</h3>
        </div>
        <div>
          <h3 style={contentStyle}>2</h3>
        </div>
        <div>
          <h3 style={contentStyle}>3</h3>
        </div>
        <div>
          <h3 style={contentStyle}>4</h3>
        </div>
      </Carousel>,
    </div>
  );
};

export default Home;
