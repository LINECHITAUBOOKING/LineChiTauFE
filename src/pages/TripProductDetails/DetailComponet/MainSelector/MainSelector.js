import '../../../../css/global-style.scss';
import './MainSelector.scss';
import { useState } from 'react';
import PlanSelector from './PlanSelector/PlanSelector';
import PlanDetails from './PlanDetails/PlanDetails';
import AmountSelector from './AmountSelector/AmountSelector';

export default function MainSelector({ planData }) {
  //! 正在瀏覽何種方案
  const [viewingPlan, setViewingPlan] = useState('0');
  let displayPlan = planData[viewingPlan];

  function handlePlanSelect(e) {
    setViewingPlan(e.target.id);
  }
  //購票數量
  const [buyingAmount, setBuyingAmount] = useState({
    adult: 0,
    elder: 0,
    child: 0,
  });

  // function AdultSelect({ buyingAmount, setBuyingAmount }) {
  //   const [adultAmount, setAdultAmount] = useState();
  //   return (
  //     <AmountSelector
  //       setBuyingAmount={setBuyingAmount}
  //       buyingAmount={buyingAmount.adult}
  //     />
  //   );
  // }
  // function ElderSelect({ buyingAmount, setBuyingAmount }) {
  //   const [elderAmount, setElderAmount] = useState();
  //   return (
  //     <AmountSelector
  //       setBuyingAmount={setBuyingAmount}
  //       buyingAmount={buyingAmount.elder}
  //     />
  //   );
  // }
  function ChildSelect({ buyingAmount, setBuyingAmount }) {
    const [childAmount, setChildAmount] = useState();
    return (
      <AmountSelector
        setBuyingAmount={setChildAmount({
          ...buyingAmount,
          child: childAmount,
        })}
        buyingAmount={childAmount}
      />
    );
  }

  return (
    <>
      {/* <div className="mt-3 d-flex justify-content-between"> */}
      <div className="main-selector">
        <div className="title-and-clear-btn d-flex justify-content-between">
          <h3 className="title-underline box-title">選擇日期及方案</h3>
          <div className="round-btn">清除全部</div>
        </div>
        <p className="my-p">請選擇參加日期</p>
        <div className="time-selector-wrapper d-flex">
          <div className="preserved-date round-btn d-flex align-content-center justify-content-between">
            2022/12/29
            <span className="material-symbols-outlined show-btn my-p">
              change_history
            </span>
          </div>
        </div>
        <p className="my-p">請選擇方案類型</p>
        <div className="plan-wrapper d-flex flew-wrap">
          {planData.map((item, i) => (
            <button className="service">{item.plan_name}</button>
          ))}
        </div>
        <p className="my-p">人數</p>
        <div className="preserved-amount-wrapper d-flex flex-wrap">
          {/* <adultSelect />
          <elderSelect /> */}
          {/* <ChildSelect /> */}
          {/* <div className="preserved-amount adult d-flex justify-content-between">
            成人
            <div className="control-wrapper d-flex">
              <span className="material-symbols-outlined">add_circle</span>1
              <span className="material-symbols-outlined">
                do_not_disturb_on
              </span>
            </div>
          </div> */}
          {/* <div className="preserved-amount kiddo d-flex justify-content-between">
            兒童
            <div className="control-wrapper d-flex">
              <span className="material-symbols-outlined">add_circle</span>1
              <span className="material-symbols-outlined">
                do_not_disturb_on
              </span>
            </div>
          </div> */}
          {/* <div className="preserved-amount elder d-flex justify-content-between">
            長者
            <div className="control-wrapper d-flex">
              <span className="material-symbols-outlined">add_circle</span>1
              <span className="material-symbols-outlined">
                do_not_disturb_on
              </span>
            </div>
          </div> */}
        </div>
        <div className="final-total my-topic d-flex justify-content-between">
          NT$ 2400
          <div className="cart-and-buy d-flex justify-content-evenly">
            <div className="do-cart round-btn my-p d-flex align-items-center">
              放入購物車
            </div>
            <div className="do-buy round-btn my-p d-flex align-items-center">
              立即下單
            </div>
          </div>
        </div>
      </div>
      <PlanDetails
        PlanDescription={['test', 'test2']}
        PlanSuggestion="帶備用衣物"
        PlanDisclamer="費用不包含交通費"
      />
      {/* </div> */}
    </>
  );
}
