import React, { useEffect, useState, useContext } from 'react';

import './HotelPaymentCheckOut.scss';
import axios from 'axios';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Outlet,
  useParams,
  useNavigate,
} from 'react-router-dom';
import ProductImg from '../../Hotel/img/banner.svg';
import ProgressBar from '../PaymentComponent/ProgressBar/ProgressBar';

import Modal from 'react-bootstrap/Modal';
import { ModalTitle } from 'react-bootstrap';
import RoomItem from '../PaymentComponent/RoomItem/RoomItem';
import RoomItemHotel from '../PaymentComponent/RoomItemHotel/RoomItemHotel';
import RoomBooker from '../PaymentComponent/RoomBooker/RoomBooker';
import RoomService from '../PaymentComponent/RoomServiceRule/RoomService';
import RoomRule from '../PaymentComponent/RoomServiceRule/RoomRule';
import RoomMemo from '../PaymentComponent/RoomMemo/RoomMemo';
import CheckOutCreditCard from '../PaymentComponent/CheckOutCreditCard/CheckOutCreditCard';
import PaymentMethod from '../PaymentComponent/PaymentMethod/PaymentMethod';
import UserData from '../PaymentComponent/UserData/UserData';
import { JwtCsrfTokenContext } from '../../../utils/csrf-hook/useJwtCsrfToken';
import { set } from 'date-fns';

const moment = require('moment');

const HotelPaymentCheckOut = () => {
  const currentStep = 3;
  const { jwtToken, userF, jwtDecodedData } = useContext(JwtCsrfTokenContext);
  console.log(jwtToken);

  const { orderId } = useParams();
  console.log('orderId', orderId);
  let navigate = useNavigate();

  const storage = localStorage;
  const hotelName = storage.getItem('companyName');
  const roomName = storage.getItem('roomName');
  const [orderDetail, setOrderDetail] = useState([]);
  const [getStartDate, setStartDate] = useState('');
  const [getEndDate, setEndDate] = useState('');

  const [testOrderId, setTestOrderId] = useState(orderId);
  // NOTE userEffect
  useEffect(() => {
    console.log('orderId', orderId);
    async function getOrderDetail() {
      let response = await axios.get(
        `http://localhost:3001/api/payment/CheckOut/Hotel/${orderId}`
      );
      console.log('responseDATA', response.data);
      if (!response.data[0]) return;
      setOrderDetail(response.data[0]);
      setStartDate(response.data[0].start_date);
      setEndDate(response.data[0].end_date);
      console.log(
        '=-======+++======orderDetail====++++++++++++=========',
        orderDetail
      );
    }
    getOrderDetail();
  }, []);
  const [userCreditCard, setUserCreditCard] = useState({});
  const [number, setNumber] = useState('');
  const [name, setName] = useState('');
  const [expDate, setExpDate] = useState('');
  const [cvc, setCvc] = useState('');
  const [focus, setFocus] = useState('');
  const creditCard = {
    number: number,
    name: name,
    expDate: expDate,
    cvc: cvc,
    focus: focus,
  };
  const updateValue = {
    setNumber: (value) => {
      setNumber(value);
    },
    setName: (value) => {
      setName(value);
    },
    setExpDate: (value) => {
      setExpDate(value);
    },
    setCvc: (value) => {
      setCvc(value);
    },
    setFocus: (value) => {
      setFocus(value);
    },
  };
  async function handleGetCard(e) {
    e.preventDefault();
    // !關閉表單預設行為
    console.log('=======jwtDecodedData.email========', jwtDecodedData.email);
    // * ajax
    try {
      let response = await axios.get(
        `http://localhost:3001/api/payment/CheckOut/Hotel/creditCard/${jwtDecodedData.email}`,
        {
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
          },
        }
      );
      setUserCreditCard(response.data[0]);
      console.log('OPENAI好厲害比人還會說話', response.data[0]);
    } catch (e) {
      alert('沒有信用卡資料');
    }

    setNumber(userCreditCard.card_number);

    setName(userCreditCard.cardholder_name);

    setExpDate(moment(userCreditCard.exp_date).format('MM/YY'));

    setCvc(userCreditCard.cvc);
  }
  console.log('OPENAI好厲害比人還會說話00000', creditCard);

  const startDate = moment(getStartDate).format('YYYY-MM-DD');
  console.log('==========startDate=======', startDate);
  const endDate = moment(getEndDate).format('YYYY-MM-DD');
  console.log('==========startDate=======', endDate);

  const orderItem = {
    startDate: startDate,
    endDate: endDate,
    conditions: {
      room: orderDetail.amount,
    },
  };
  console.log('=-============orderItem======================', orderItem);
  console.log(
    '=-============conditions======================',
    orderItem.conditions
  );
  console.log(
    '=-============room======================',
    orderItem.conditions.room
  );
  console.log('=-============orderDD======================', orderDetail);
  return (
    <>
      <ProgressBar currentStep={currentStep} />

      <main className="container main-width px-0">
        {/* <!-- TODO 訂房商品資訊、飯店+房型+訂房個資--> */}
        <div className="row w-100 my-3  mx-0 px-0">
          {/* <!-- NOTE  訂房商品資訊--> */}
          <div className="col-4 p-0 mx-0">
            <RoomItem paymentRoomDetail={orderDetail} orderItem={orderItem} />
          </div>
          {/* <!-- NOTE  飯店+房型+訂房規則--> */}
          <div className="col-8  p-0 h-100 mx-0">
            {/* <!-- NOTE 飯店名 --> */}
            <div className="hotel-room-profile ms-3 ">
            
              <RoomItemHotel paymentRoomDetail={orderDetail} />
              <div className="room-info   px-3 pb-5">
                {/* <!-- NOTE 房型服務資訊 --> */}
                <RoomService paymentRoomDetail={orderDetail} />
                <RoomRule />
              </div>
            </div>
          </div>
        </div>

        {/* <!-- TODO 付款方式、MEMO --> */}
        <div className="row w-100 mb-3 mx-0">
          {/* <!-- NOTE 選擇付款方式 --> */}
          <div className="col-4 p-0 ">
            <UserData />
          </div>
          <div className="col-8 p-0 d-flex">
            {/* <!-- NOTE MEMO+ARRIVE --> */}
            <RoomMemo />
            {/* <!-- NOTE 抵達時間 資訊 --> */}
            <div className="arrive-data d-flex align-items-baseline ps-5 col-4">
              <div className=" arrive-time-data d-flex flex-column p-3">
                <h5>預計抵達時間</h5>
                12:00
                <ul>
                  <small>
                    <li> 您的客房將會在 15:00 開放辦理入住</li>
                  </small>
                  <small>
                    <li>
                      24 小時接待櫃檯－在您有需要的時候，隨時都能為您提供服務！
                    </li>
                  </small>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- TODO 付款方式資料 --> */}
        <div className=" row w-100 mx-0">
          <div className="col-12 p-0">
            <div className="payment-detail d-flex flex-column mb-3 px-5 ">
              <div className="contact-title d-flex align-items-center justify-content-between my-3 px-0 pt-3">
                <h3 className="title">填寫付款資料</h3>
                <button
                  className="my-btn d-flex align-items-center justify-content-around  "
                  onClick={handleGetCard}
                >
                  <span className="material-symbols-rounded">credit_card</span>
                  <span>我的信用卡</span>
                </button>
              </div>
              <CheckOutCreditCard
                creditCard={creditCard}
                userCreditCard={userCreditCard}
                updateValue={updateValue}
              />
              <div className="notice w-100 py-3 text-right">
                <h5 className="d-flex justify-content-end">
                  本訂單無須CVC 安全碼
                </h5>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- TODO 提醒 --> */}
        <div className="row w-100 mb-3 mx-0">
          {/* <!-- TODO 提醒--> */}
          <div className=" memo-form col-12 d-flex justify-content-center align-items-center px-5 py-4  mb-3">
            <h4 className="my-0">計畫有變？</h4>
            <ul className="my-0">
              <li className="">
                {' '}
                別擔心，在2022年12月19日之前您都可以隨需要更改日期，
                房客詳細資料，新增特別要求或者取消預定。
              </li>
            </ul>
          </div>
          {/* <!-- TODO 分析與情報通知 --> */}
          <div className="col-4 p-0">
            <div className=" memo-form  d-flex justify-content-center align-items-center px-5 py-4">
              <span>
                所選日期台北住宿數量有限：
                <br />1 間相似的五星級飯店於本站已無法預訂
              </span>
            </div>
          </div>
          <div className="col-8 p-0 ps-3">
            <div className="memo-form h-100">
              <div className="notice px-5 d-flex flex-column">
                <div className="poicy py-2 d-flex justify-content-end align-items-center">
                  <div className="checked   py-1 ">
                    <input type="checkbox" name="" id="" className=" mx-3" />
                  </div>
                  <span className="">
                    我想優先收到<span>來七桃</span>
                    的最新優惠訊息並希望定期收到電子報。查看
                    <a href="">隱私權條款</a>以了解更多相關資訊。
                  </span>
                </div>
                <div className="poicy-argee px-5 py-2">
                  <input type="checkbox" name="" id="" className="mx-3" />
                  是，我同意接收 來七桃行銷電子報，通知我來七桃優惠資訊。
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- TODO 前往付款button --> */}
        <div className="topay d-flex justify-content-center w-25 mx-auto pt-4 pb-5 row ">
          <button className=" my-btn col-auto align-items-center mx-1 py-1">
            <Link
              className="text-decoration-none d-flex align-items-center"
              to={'/'}
            >
              返回<span className="material-symbols-rounded">undo</span>
            </Link>
          </button>
          <button className=" my-btn col text-decoration-none mx-1">
            <Link
              className="text-decoration-none "
              to={'/payment/HotelPaymentCheckOut'}
            >
              確認付款
            </Link>
          </button>
        </div>
      </main>
    </>
  );
};

export default HotelPaymentCheckOut;
