import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Outlet,
  useOutletContext,
} from 'react-router-dom';
// NOTE 飯店評價
import ProductImg from '../../../Hotel/img/banner.svg';

const RoomItemHotel = (props) => {
  const paymentRoomDetail = props.paymentRoomDetail;

  return (
    <>
      <div className="hotel-name room-info d-flex h-100 align-items-center px-3 py-4  mb-5">
        <div className=" col-3 align-items-start mx-3">
          <img
            className="img-fluid item-image overflow-hidden"
            src={ProductImg}
            alt="行程票券商品圖"
          />
        </div>
        <div className="item-context col-9 mx-3 align-self-center ">
          <h4>{paymentRoomDetail.hotel}</h4>
          <p>{paymentRoomDetail.address}</p>
          <p className="d-flex align-items-center">
            <span className="material-symbols-rounded text-warning">star</span>
            {} / 5
          </p>
        </div>
      </div>
    </>
  );
};

export default RoomItemHotel;
