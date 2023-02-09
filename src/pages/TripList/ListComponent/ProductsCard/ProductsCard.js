import './ProductsCard.scss';
import pic3 from './dolphins_hotel.jpg';
import { useState } from 'react';

export default function ProductCard({ tripName, introduction, region }) {
  const introJSON = JSON.parse(introduction);
  const introText = introJSON.introduction;
  const [focusState, SetStateToFocus] = useState(false);

  function activateTheCard(e) {
    console.log('active');
    SetStateToFocus(true);
  }
  function deactivateTheCard(e) {
    console.log('deactivate');
    SetStateToFocus(false);
  }

  // function throttle(fn, timeout = 200) {
  //   let last;
  //   let timer;

  //   return function () {
  //     const context = this;
  //     const args = arguments;
  //     const now = +new Date();

  //     if (last && now < last + timeout) {
  //       clearTimeout(timer);
  //       timer = setTimeout(function () {
  //         last = now;
  //         fn.apply(context, args);
  //       }, timeout);
  //     } else {
  //       last = now;
  //       fn.apply(context, args);
  //     }
  //   };
  // }

  return (
    <>
      <div
        className="products-card-wrapper d-flex"
        onMouseEnter={activateTheCard}
        onMouseLeave={deactivateTheCard}
      >
        <div className="products-card d-flex mb-4">
          <div>
            <img
              src={pic3}
              className="products-card-pic my-border-radius"
              alt="pic3"
            ></img>
          </div>
          <div className="products-content mx-3 my-2">
            <h5 className="products-name nav-foot" title={tripName}>
              {tripName}
            </h5>
            <p className="description my-p" title={introText}>
              {introText}
            </p>
            <ul className="products-tag-list list-unstyled d-flex">
              <li>
                <button className="tag my-border-radius my-p mx-1">泳池</button>
              </li>
              <li>
                <button className="tag my-border-radius my-p mx-1">泳池</button>
              </li>
              <li>
                <button className="tag my-border-radius my-p mx-1">泳池</button>
              </li>
              <li>
                <button className="tag my-border-radius my-p mx-1">泳池</button>
              </li>
              <li>
                <button className="tag my-border-radius my-p mx-1">泳池</button>
              </li>
            </ul>
            <div className="d-flex justify-content-between my-p">
              <div className="d-flex">
                <div class="material-symbols-outlined">location_on</div>
                <p>{region}</p>
              </div>
              <div className="d-flex">
                <div class="material-symbols-outlined">monetization_on</div>
                <p>1000 / 晚</p>
              </div>
              <div className="d-flex">
                <div class="material-symbols-outlined bookmark">bookmark</div>
                <p>收藏</p>
              </div>
            </div>
          </div>
        </div>
        <button
          className={
            `products-card-link\t` + (focusState ? 'active' : 'none-active')
          }
        >
          訂票去
        </button>
      </div>
    </>
  );
}
