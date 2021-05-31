import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const NoticeCompo = styled.div`
    width: 100%;
    height: 100%;
    border-radius: 5px;
    display: flex;
    font-family:"NanumSquareR";
    .left-component{
        height: 100%;
        width: 19%;
        color: #FFFFFF;
        display: flex;
        align-items: center;
        justify-content:center;
        font-size:16px;
    }
    .right-component{
        height: 100%;
        width:81%;
        display: flex;
        align-items: center;
        justify-content:center;
        font-size:15px;
        color:rgba(255,255,255,0.5);
        padding-right: 10.7px;
        padding-left: 10.7px;
        .rolling_box{
            width: 100%;
            height: 60%;
            /* text-align: center; */
            /* border: 1px solid #848484; */
        }

        .rolling_box ul {
            width: 100%;
            height: 100%;
            overflow: hidden;
            position: relative;
            display: inline-grid;
            margin-bottom: 0px;
            margin-top: 0px;
        }

        .rolling_box ul li {
            width: 100%;
            height: 100%;
            transition: .5s;
            position:absolute;
            transition: top .75s;
            top: 100%;
            z-index: 1;
            color: #1c1c1c;
            opacity: 0.7;
            display:flex;
            align-items:center;

        }

        .card_sliding{
            top: 0 !important;
            z-index: 100 !important;
            color: rgba(255, 255, 255, 0.7) !important;
        } 

        .card_sliding_after{
            top: -100% !important;
            z-index: 10 !important;
            color: rgba(0, 0, 0, 0.7);
            /* opacity: 0.7; */
        }

        .rolling_box ul li p {
            font-size: 15px;
            height: 41px;
            white-space: normal;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .before_slide {
            transform: translateY(0);
        }

        .after_slide {
            transform: translateY(100%);
        }
    }
`;

const Notice = ({ announceList, rollingCount }) => {

    const [rollingData, setRollData] = useState([]);

    let intervalId = useRef();
    const rollingAction = (items = []) => {

       let rollingData = items

        let timer = rollingCount // 롤링되는 주기 입니다 (1000 => 1초)

        let first = document.getElementById('first'),
            second = document.getElementById('second'),
            third = document.getElementById('third')
        let move = 2
        let dataCnt = 1
        let listCnt = 1

        //위 선언은 따로 완전히 수정하지 않는 한 조정할 필요는 없습니다.

        first.children[0].innerHTML = rollingData[0]

        intervalId = setInterval(() => {
            if (move === 2) {
                first.classList.remove('card_sliding')
                first.classList.add('card_sliding_after')

                second.classList.remove('card_sliding_after')
                second.classList.add('card_sliding')

                third.classList.remove('card_sliding_after')
                third.classList.remove('card_sliding')

                move = 0
            } else if (move === 1) {
                first.classList.remove('card_sliding_after')
                first.classList.add('card_sliding')

                second.classList.remove('card_sliding_after')
                second.classList.remove('card_sliding')

                third.classList.remove('card_sliding')
                third.classList.add('card_sliding_after')

                move = 2
            } else if (move === 0) {
                first.classList.remove('card_sliding_after')
                first.classList.remove('card_sliding')

                second.classList.remove('card_sliding')
                second.classList.add('card_sliding_after')

                third.classList.remove('card_sliding_after')
                third.classList.add('card_sliding')

                move = 1
            }

            if (dataCnt < (rollingData.length - 1)) {
                document.getElementById('rolling_box').children[listCnt].children[0].innerHTML = rollingData[dataCnt]
                dataCnt++
            } else if (dataCnt === rollingData.length - 1) {
                document.getElementById('rolling_box').children[listCnt].children[0].innerHTML = rollingData[dataCnt]
                dataCnt = 0
            }

            if (listCnt < 2) {
                listCnt++
            } else if (listCnt === 2) {
                listCnt = 0
            }

            console.log(listCnt)
        }, timer);
    }

    const dataBinding = () => {
        let titleList = [];
        announceList.map(item => {
            if (item.ann_preview === 1) {
                titleList.push(item.ann_title)
            }
            return item;
        });
        setRollData(titleList)
        if (titleList.length > 1) {
            rollingAction(titleList);
        } else if(titleList.length === 1){

            let first = document.getElementById('first'),
                second = document.getElementById('second'),
                third = document.getElementById('third')
            first.classList.remove('card_sliding')
            first.classList.add('card_sliding_after')

            second.classList.remove('card_sliding_after')
            second.classList.add('card_sliding')

            third.classList.remove('card_sliding_after')
            third.classList.remove('card_sliding')
            document.getElementById('rolling_box').children[1].children[0].innerHTML = titleList[0]

        }
    };

    useEffect(() => {
        // rollingAction();
        if (announceList) {
            dataBinding();
        }
        return () => {
            clearInterval(intervalId);
        }
    }, [announceList])

    return (
        <NoticeCompo>
            <div className="left-component">공지사항</div>
            <div className="right-component">
                <div className="rolling_box">
                    <ul id="rolling_box">
                        <li className="card_sliding" id="first"><p></p></li>
                        <li className="" id="second"><p></p></li>
                        <li className="" id="third"><p></p></li>
                    </ul>
                </div>
            </div>
        </NoticeCompo>
    );
};

export default Notice;