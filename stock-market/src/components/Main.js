import React, { useState } from 'react';
import "./Main.css";
import profitimg from './../images/download.jpg'
import lossImg from './../images/loss-istock.gif'

export default function Main() {
    const [costPrice, setcostPrice] = useState('');
    const [quanity, setQuanity] = useState('');
    const [sellingPrice, setsellingPrice] = useState('');

    const [lossAmount, setLossAmount] = useState('');
    const [percentLoss, setPercentLoss] = useState('');
    const [lossDisplay, setLossDisplay] = useState(false);

    const [profitAmount, setProfitAmount] = useState('');
    const [percentProfit, setPercentProfit] = useState('');
    const [profitDisplay, setProfitDisplay] = useState(false);

    const [nonZeroValue, setNonZeroValue] = useState(false);

    const [profitImage, setProfitImage] = useState(false)
    const [lossImage, setLossImage] = useState(false)

    let formISValid = false;
    if (quanity && costPrice && sellingPrice) {
        formISValid = true;
    }

    // var options = {
    //     method: 'GET',
    //     url: 'https://stock-and-options-trading-data-provider.p.rapidapi.com/straddle/intc',
    //     headers: {
    //       'x-rapidapi-key': '402288f211msh4843e9a50ef255dp18d636jsnb81d76f724b9',
    //       'x-rapidapi-host': 'stock-and-options-trading-data-provider.p.rapidapi.com'
    //     }
    //   };
    // const gettingData = () => {
    //     axios.request(options).then(function (response) {
    //         console.log(response.data);
    //     }).catch(function (error) {
    //         console.error(error);
    //     });
    // }

    // useEffect( () => {
    //     gettingData()
    // },[])

    const calculateProfitAndLoss = (CostPrice, SellingPrice, Quantity) => {
        if (Number(CostPrice) <= 0 || Number(SellingPrice) <= 0 || Number(Quantity) <= 0) {
            setNonZeroValue(true);
            setLossDisplay(false);
            setProfitDisplay(false);
            setLossImage(false);
            setProfitImage(false);

        }
        if (CostPrice > 0 && SellingPrice > 0 && Quantity > 0) {
            // if cost price is greater than selling price then we will suffer loss
            if (CostPrice > SellingPrice) {
                /// calculating loss amount
                let LossAmount;
                // debugger;
                LossAmount = ((CostPrice - SellingPrice) * Quantity).toFixed(2);
                if(Number(lossAmount) <= 0){
                    setNonZeroValue(true);
                    setLossDisplay(false);
                    setProfitDisplay(false);
                    setLossImage(false);
                    setProfitImage(false);
                }
                setLossAmount(LossAmount)
                //// calculating Percentage loss
                let lossPercentage;
                lossPercentage = (((CostPrice - SellingPrice) * 100) / CostPrice).toFixed(2)
                setPercentLoss(lossPercentage);
                setLossDisplay(true);
                setProfitDisplay(false);
                setNonZeroValue(false);
                setLossImage(false);
                setProfitImage(false);
                percentLosstMoreThan50(lossPercentage)
            }
            else {
                // if selling price  is greater than cost price then we will get win
                // const profit = ((SP-CP)*Qty).toFixed(2)
                // const profitPer=(((SP-CP)*100)/CP).toFixed(2) 
                /// calculating Profit amount
                // debugger
                let ProfitAmount;
                ProfitAmount = ((SellingPrice - CostPrice) * Quantity).toFixed(2);
                if(Number(profitAmount) <= 0){
                    setNonZeroValue(true);
                    setNonZeroValue(true);
                    setLossDisplay(false);
                    setProfitDisplay(false);
                    setLossImage(false);
                    setProfitImage(false);
                }
                setProfitAmount(ProfitAmount);
                let PercentageProfit;
                PercentageProfit = (((SellingPrice - CostPrice) * 100) / CostPrice).toFixed(2)
                setPercentProfit(PercentageProfit);
                setProfitDisplay(true);
                setLossDisplay(false);
                setNonZeroValue(false);
                setLossImage(false);
                setProfitImage(false);
                percentProfitMoreThan50(PercentageProfit)


            }

        }
    }
    const percentProfitMoreThan50 = (pProfit) => {
        if (pProfit > 50) {
            setProfitImage(true);
            setLossImage(false)
        }
    }

    const percentLosstMoreThan50 = (pLoss) => {
        if (pLoss > 50) {
            setLossImage(true);
            setProfitImage(false);
        }
    }

    const onFormSubmit = (e) => {
        e.preventDefault();
        console.log(costPrice, quanity, sellingPrice)
        calculateProfitAndLoss(costPrice, sellingPrice, quanity);
        setcostPrice('');
        setsellingPrice('');
        setQuanity('');
    }



    return (
        <div>
            <div className="main-content">
                <div className="header">
                    <ul className="header-list">
                        <li ><a className="header-list-item" href="https://vrushabhdhatak10-portfolio.netlify.app/">VD</a></li>
                        <li ><a className="header-list-item" href="https://github.com/Rishi05051997">GitHub</a></li>
                        <li ><a className="header-list-item" href="https://www.linkedin.com/in/vrushabh-dhatrak-328ab0148/">contact me</a></li>
                    </ul>
                </div>
                <div className="content">
                    <h2>Are You Stock Aspirant I will be helping you <br /> Check your Profit\Loss here 👇</h2>
                    <form onSubmit={onFormSubmit}>
                        <div className="input-field">
                            <label>Cost Price</label>
                            < input type="number" value={costPrice} onChange={(e) => setcostPrice(e.target.value)} />
                        </div>
                        <div className="input-field">
                            <label>Stock Quantity</label>
                            < input type="number" value={quanity} onChange={(e) => setQuanity(e.target.value)} />
                        </div>
                        <div className="input-field">
                            <label>Selling Price</label>
                            < input type="number" value={sellingPrice} onChange={(e) => setsellingPrice(e.target.value)} />
                        </div>
                        <div className="btn-field">
                            < button disabled={!formISValid} type="submit">Check</button>
                        </div>
                    </form>
                    <div className={!nonZeroValue ? "displayNone" : "error"}>
                        {
                            nonZeroValue &&
                            <p> <strong>Non zero</strong> or <strong>Negative value</strong> not accepted</p>
                        }
                    </div>
                    <div className={!lossDisplay ? "displayNone" : "error"}>
                        {
                            lossDisplay && <p>You lost <strong>{percentLoss}%</strong>. Your total loss is ₹ <strong>{lossAmount}</strong> </p>
                        }
                    </div>
                    <div className={!profitDisplay ? "displayNone" : "error"}>
                        {
                            profitDisplay && <p>You gained <strong>{percentProfit}%</strong>. Your total profit is ₹ <strong>{profitAmount}</strong>.</p>
                        }
                    </div>


                </div>
                {
                    profitImage && 
                    <div className="Image">
                        <img src={profitimg} alt="" />
                    </div>
                }
                {
                    lossImage && 
                    <div className="Image">
                        <img src={lossImg} alt="" width="400px" />
                    </div>
                }
            </div>
        </div>
    )
}
