import React from 'react';
import { Link } from 'react-router-dom';
import pic1 from './images/pic1.png';

import { useQuery } from 'react-query';
const TList = () => {
  const getUser = async () => {
    const response = await fetch('http://localhost:3001/api/stocks');
    const data = await response.json();
    return data;
  };
  const { data, isLoading } = useQuery('user', getUser, {
    retry: false,
    refetchOnWindowFocus: false,
  });
  console.log(data);
  return (
    <>
      {data?.map((v, i) => {
        return (
          <div className="overlap-group-1">
            <img className="rectangle-1911" src={pic1} alt="Rectangle 1911" />
            <div className="text">
              <div className="notosans-normal-old-copper-20px">{v.name}</div>
              <div className="notosans-normal-sepia-16px">2022-12-31 15:00</div>
              <div className="notosans-normal-sepia-16px">
                實付金額：NT$ 7200
              </div>
            </div>

            <div className="button">
              <Link to="/profile/listdetail">
                <button className=" button-1 notosans-normal-old-copper-16px">
                  查看憑證
                </button>
              </Link>
              <button className="button-1 notosans-normal-old-copper-16px">
                撰寫評價
              </button>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default TList;
