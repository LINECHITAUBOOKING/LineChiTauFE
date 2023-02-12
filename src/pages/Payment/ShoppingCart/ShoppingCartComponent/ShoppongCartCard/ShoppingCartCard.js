import React, { useState, useEffect } from 'react';
import '../../../../../css/global-style.scss';
import './ShoppingCartCard.scss';
// 用url引入圖片得使用import，並在jsx裡面使用{}求值的語法
// import logo from './dohpins_hotel.jpg';
import ProductImg from '../../../../Hotel/img/banner.svg';

export default function ShoppingCartCard(props) {
  console.log('itemssssss', props.cartItem);
  const storage = localStorage;
  const [itemDetail, setItemDetail] = useState({});
  // const [amountA, setAmountA] = useState(props.cartItem.amountA);
  // const [amountC, setAmountC] = useState(props.cartItem.amountC);
  // const [amountE, setAmountE] = useState(props.cartItem.amountE);
  // const [priceA, setPriceA] = useState(props.cartItem.priceA);
  // const [priceC, setPriceC] = useState(props.cartItem.priceC);
  // const [priceE, setPriceE] = useState(props.cartItem.priceE);
  // const [totalPrice, setTotalPrice] = useState(props.cartItem.totalPrice);
  // const [departTime, setDepartTime] = useState(props.cartItem.departTime);
  const [isChecked, setIsChecked] = useState(false);

  // useEffect(() => {
  //   setItemDetail(props.cartItem);
  // }, []);
  // const cartItemDetail = {
  //   tripName: props.cartItem.tripName,
  //   planId: props.cartItem.planId,
  //   planName: props.cartItem.planName,
  //   amountA: amountA,
  //   amountC: amountC,
  //   amountE: amountE,
  //   priceA: priceA,
  //   priceC: priceC,
  //   priceE: priceE,
  //   totalPrice: totalPrice,
  //   departTime: departTime,
  //   isChecked: isChecked,
  // };
  // useEffect(() => {
  //   props.updateValue.setItemDetail(itemDetail);
  // }, [itemDetail]);
  // useEffect(() => {
  //   if (props.cartItemsToPay.length > 0) {
  //     const newCartItems = [...props.cartItemsToPay];
  //     newCartItems.push(itemDetail);
  //     props.updateValue.setCartItemsToPay(newCartItems);
  //     console.log('cart-detail', newCartItems);
  //     // setModalOpen(true);
  //   } else {
  //     const newCartItems = [];
  //     newCartItems.push(itemDetail);
  //     props.updateValue.setCartItemsToPay(newCartItems);
  //     console.log('cart-detail', newCartItems);
  //     // setModalOpen(true);
  //   }
  // }, [isChecked]);
  // console.log('itemDEtail', itemDetail);
  // // console.log(`cartItemINCard+${cartItemDetail.planId}`, cartItemDetail);
  const handleRemove = function (e, index) {
    const newCartItems = [...props.cartItem];
    console.log('remove props.cart', props.cartItem);
    props.updateValue.setCartItems(newCartItems.splice(index, 1));
  };
  return (
    <>
      {props.cartItem.map((item, index) => {
        return (
          <div className="cart-item-card" key={index}>
            <div className="cart-item-body d-flex row align-items-center justify-content-between mx-0 py-4">
              <div
                className="justify-content-center text-center align-items-center h-100 col-1 cart-pointer"
                onClick={(e) => {
                  const newCartItems = [...props.cartItem];
                  console.log('remove props.cart', props.cartItem);
                  console.log('be-newCartItems', newCartItems);
                  const newCartItemR = newCartItems.splice(index, 1);
                  console.log('af-newCartItems', newCartItems);
                  console.log('R-newCartItems', newCartItemR);
                  props.updateValue.setCartItems(newCartItems);
                }}
              >
                <span class="material-symbols-outlined ">
                  disabled_by_default
                </span>
              </div>
              <div className="item-box col-7">
                <div className="img-box">
                  <img
                    src={ProductImg}
                    alt="海豚圖片"
                    className="object-cover my-border-radius"
                  />
                </div>
                <div className="text-box  mx-2">
                  <h1 className="nav-foot text-truncate ">{item.tripName}</h1>
                  <p className="my-p">方案：{item.planName}</p>
                  <p className="my-p">時間：{item.departTime}</p>
                  <div className="d-flex justify-content-bweteen">
                    <p className="my-p ">人數：</p>
                    <span className="">
                      {' '}
                      {item.amountA === 0 ? '' : '成人 x' + item.amountA}
                    </span>
                    <span className="">
                      {' '}
                      {item.amountC === 0 ? '' : '小孩 x' + item.amountC}
                    </span>
                    <span className="">
                      {item.amountE === 0 ? '' : '老人 x' + item.amountE}
                    </span>
                  </div>
                </div>
              </div>
              <div className="expire-date-box text-center my-p col-2">
                兌換期內皆適用
                <br />
                當地時間
              </div>
            </div>
            <div className="cart-item-bottom d-flex align-items-center justify-content-between px-3 py-3">
              <div className="price my-heading">小計：</div>
              <div className="price my-heading">NT${item.totalPrice} </div>
              {/* {itemDetail.totalPrice} */}
            </div>
          </div>
        );
      })}
    </>
  );
}
