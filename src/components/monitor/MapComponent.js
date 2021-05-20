import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTag, faExpand } from "@fortawesome/pro-solid-svg-icons";

const MapCompo = styled.div`
    width: 100%;
    height: 100%;
    background-image: url('http://192.168.0.39:3001/map/map_bg.png');
    background-repeat: no-repeat;
    position:relative;
        .buttom-box{
            width: 39px;
            height: 39px;
            color:#FFFFFF;
            background-color:#171717;
            /* opacity: 0.5; */
            font-size: 18px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            position: absolute;

            &:hover{
                cursor: pointer;
                background-color:#000000;
            }
            &.tag-button-box{
                top: 10px;
                left: 10px;
            }
            &.expand-button-box{
                top: 10px;
                left: 959px;
            }
        }
        .map-area{
            width: 85%;
            height: 82%;
            position: absolute;
            /* background-color:#171717; */
            /* opacity: 0.7; */
            left: 103px;
            top: 60px;
            .block{
                position: absolute;
                /* background-color: #fff */
                div{
                    position: absolute;
                }
                .worker-icon{
                    width: 37px;
                    height: 44px;
                    top: 43px;
                    left: 33px;
                    .worker-count-box {
                        position: absolute;
                        top: -24px;
                        left: 22px;
                        background: #171717;
                        color: #fff;
                        width: 22px;
                        height: 22px;
                        text-align: center;
                    }
                }
                .vehicle-icon{
                    width: 62px;
                    height: 52px;
                    top: 68px;
                    left: 57px;
                    .vehicle-count-box {
                        position: absolute;
                        top: -21px;
                        left: 38px;
                        background: #171717;
                        color: #fff;
                        width: 22px;
                        height: 22px;
                        text-align: center;
                    }
                }
                .scanner-icon{
                    right: 132px;
                    top: 0px;
                    .scanner-img{
                        background-image: url(../../map/scanTag.png);
                        background-repeat: no-repeat;
                        width: 13px;
                        height: 13px;
                        top: 16px;
                        left: 14px;
                    }
                    .scanner-device-box {
                        background-image: url(../../map/deviceBox.png);
                        background-repeat: no-repeat;
                        width: 13px;
                        height: 18px;
                        top: 28px;
                        left: 16px;
                    }
                }
                .cctv-icon{
                    top: 0px;
                    right: 129px;
                    .cctv-img{
                        background-image: url(../../map/cctvTag.png);
                        background-repeat: no-repeat;
                        width: 13px;
                        height: 13px;
                        top: 6px;
                        left: 37px;
                    }
                    .cctv-device-box {
                        background-image: url(../../map/deviceBox.png);
                        background-repeat: no-repeat;
                        width: 13px;
                        height: 18px;
                        top: 17px;
                        left: 36px;
                    }
                }
            }
        }
    .entrance-image{
        position: absolute;
        &#entrance001{
            top: 305px;
            left: -11px;
            z-index: 100;
        }
        &#entrance002{
            top: -36px;
            left: 585px;
        }
        &#entrance003{
            top: 385px;
            left: 131px;
            z-index: 100;
        }
        &#entrance004{
            top: 44px;
            left: 728px;
        }
    }
    .tag-list-box {
        width: 100px;
        height: 105px;
        background-color: #000000;
        border: 1px solid #5e5e5e;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        left: 56px;
        top: 10px;
        ul.tag-list {
            padding-left: 0;
            margin: 0;
            list-style: none;
            width: 65%;
            height: 83px;
            li.list-item{       
                margin-bottom: 3px;
                label{
                    margin-left: 5px;
                    color: #ffffff;
                }
                input:hover{
                    cursor: pointer;
                }
            }
        }
    }
`;
const MapComponent = ({ setOpenExpandMapHandler, data, bleData }) => {
    const [checkBox, setCheckBox] = useState(false);
    const [showItem, setItem] = useState({
        worker: true,
        vehicle: true,
        cctv: true
    });
    /*
        const [first, setFirst] = useState({
            total_length: 3359, // 총 굴진거리
            forward_Length: 2547, // 정방향 굴진거리 (함양 시점 방향)
            forward_dig: 2500, // 정방향 진행 굴진거리
            revers_length: 812,// 역방향 굴진거리 (함양 종점 방향)
            revers_dig: 812, // 역방향 진행 굴진거리
            block_Amount: 10 // 맵 블록 갯수
        })
    
        const [second, setSecond] = useState({
            total_length: 3359, // 총 굴진거리
            forward_Length: 2547, // 정방향 굴진거리 (함양 시점 방향)
            forward_dig: 2547, // 정방향 진행 굴진거리
            revers_length: 812,// 역방향 굴진거리 (함양 종점 방향)
            revers_dig: 812, // 역방향 진행 굴진거리
            block_Amount: 10 // 맵 블록 갯수
        })
    */

    const [first, setFirst] = useState({
        total_length: data[0].plan_length + data[1].plan_length, // 총 굴진거리
        forward_index: data[0].local_index,
        forward_Length: data[0].plan_length, // 정방향 굴진거리 (함양 시점 방향)
        forward_dig: data[0].dig_length, // 정방향 진행 굴진거리
        forward_device: {
            cctv: data[0].cctv_id ? data[0].cctv_pos_x : 0
        },
        revers_index: data[1].local_index,
        revers_length: data[1].plan_length,// 역방향 굴진거리 (함양 종점 방향)
        revers_dig: data[1].dig_length, // 역방향 진행 굴진거리
        revers_device: {
            cctv: data[1].cctv_id ? data[1].cctv_pos_x : 0
        },
        block_Amount: 10, // 맵 블록 갯수
    });


    const [second, setSecond] = useState({
        total_length: data[2].plan_length + data[3].plan_length, // 총 굴진거리
        forward_index: data[2].local_index,
        forward_Length: data[2].plan_length, // 정방향 굴진거리 (함양 시점 방향)
        forward_dig: data[2].dig_length, // 정방향 진행 굴진거리
        forward_device: {
            cctv: data[2].cctv_id ? data[2].cctv_pos_x : 0
        },
        revers_index: data[3].local_index,
        revers_length: data[3].plan_length,// 역방향 굴진거리 (함양 종점 방향)
        revers_dig: data[3].dig_length, // 역방향 진행 굴진거리
        revers_device: {
            cctv: data[3].cctv_id ? data[3].cctv_pos_x : 0
        },
        block_Amount: 10 // 맵 블록 갯수
    })




    const [dig1, setDig1] = useState([]);
    const [dig2, setDig2] = useState([]);

    const bind = (data, callback) => {
        const block_Length = data.total_length / data.block_Amount; // 1개 블록 당 거리

        let mapArr = []
        for (let i = 1; i <= data.block_Amount; i++) {
            const obj = {
                id: i,
                value: i,
                local_index: (block_Length * i) <= data.forward_Length ? data.forward_index : data.revers_index,
                total_length: data.total_length,
                open: (block_Length * i) <= data.forward_Length
                    ? (data.forward_dig >= (block_Length * i)
                        ? true  // 굴착   
                        : false   // 미굴착
                    )     //정방향 이라면 
                    : (data.revers_dig + 306 >= (data.total_length - (block_Length * (i - 1))) // 1블럭당 306m로 구간이 짧아 1블럭을 기본으로 추가 해준다.
                        ? true // 굴착
                        : false // 미굴착
                    ),    //역방향 이라면
                worker: false,
                worker_count: 0,
                vehicle: false,
                vehicle_count: 0,
                scanner: false,
                cctv: (block_Length * i) <= data.forward_Length
                    ? (
                        (data.forward_device.cctv > block_Length * i && data.forward_device.cctv < block_Length * (i + 1))
                            ? true
                            : false
                    )   //정방향 이라면 
                    : (data.revers_dig + 306 >= (data.total_length - (block_Length * (i - 1)))   // 1블럭당 306m로 구간이 짧아 1블럭을 기본으로 추가 해준다.
                        ? (
                            (data.revers_device.cctv < (data.total_length - (block_Length * (i - 1)))
                                && data.revers_device.cctv > (data.total_length - (block_Length * (i))))
                                ? true
                                : false
                        )
                        : false
                    ),
                revers: (block_Length * i) <= data.forward_Length ? false : true,
                divisionLeng: block_Length * i,
                show: {
                    worker: true,
                    vehicle: true,
                    cctv: true,
                    scanner: false
                }
            };
            mapArr = [
                ...mapArr,
                obj
            ]
        }
        callback(mapArr)
    }

    const setStateDig1 = (data) => {
        setDig1(data);
    }
    const setStateDig2 = (data) => {
        setDig2(data);
    }

    const bleDataBinding = (data, dig, callback) => {
        const updateDig = dig.map((item, index, array) => {
            let tempItem = {
                ...item,
                worker: false,
                worker_count: 0,
                vehicle: false,
                vehicle_count: 0
            };

            data.map(bleItem => {
                if (item.local_index === bleItem.local_index) {
                    if (!tempItem.revers) {
                        if (bleItem.scn_pos_x > tempItem.divisionLeng && bleItem.scn_pos_x < array[index + 1].divisionLeng) {
                            if (bleItem.wk_id) {
                                tempItem = {
                                    ...tempItem,
                                    worker: true,
                                    worker_count: tempItem.worker_count + 1
                                }
                            }
                            if (bleItem.vh_id) {
                                tempItem = {
                                    ...tempItem,
                                    vehicle: true,
                                    vehicle_count: tempItem.vehicle_count + 1
                                }
                            }
                        }

                    } else if (tempItem.revers) {
                        if (bleItem.scn_pos_x > tempItem.total_length - tempItem.divisionLeng && array[index - 1] && bleItem.scn_pos_x < tempItem.total_length - array[index - 1].divisionLeng) {
                            if (bleItem.wk_id) {
                                tempItem = {
                                    ...tempItem,
                                    worker: true,
                                    worker_count: tempItem.worker_count + 1
                                }
                            }
                            if (bleItem.vh_id) {
                                tempItem = {
                                    ...tempItem,
                                    vehicle: true,
                                    vehicle_count: tempItem.vehicle_count + 1
                                }
                            }
                        }
                    }
                }
                return bleItem;
            });

            // console.log('tempItem--->', tempItem)
            return tempItem;
        });

        callback(updateDig)

    }
    useEffect(() => {
        bind(first, setStateDig1);
        bind(second, setStateDig2);
    }, [first, second]);

    useEffect(() => {
        // bind(first, setStateDig1);
        // bind(second, setStateDig2);
        if(dig1.length===0){
            bind(first, setStateDig1);
        }
        if(dig2.length===0){
            bind(second, setStateDig2);
        }
        if (bleData && dig1 && dig2) {
            bleDataBinding(bleData, dig1, setDig1);
            bleDataBinding(bleData, dig2, setDig2);
        }
    }, [bleData]);

    const setOpenCheckBox = () => {
        setCheckBox(!checkBox);
    }

    const onCheckChange = (e) => {
        const { name } = e.target;
        onUpdateDig(dig1, name, setStateDig1);
        onUpdateDig(dig2, name, setStateDig2);
        setItem({
            ...showItem,
            [name]: !showItem[name]
        });
    }
    const onUpdateDig = (data, name, callback) => {
        const setDig = data.map(item => {
            item.show[name] = !item.show[name];
            return item;
        });
        callback(setDig);
    }



    const rendering = (initTopPoint, initLeftPoint, items) => {
        return <>
            {items.map((item, index) => {
                const _blockStyled = {
                    top: `${initTopPoint - (33.4 * index)}px`,
                    left: `${initLeftPoint + (58 * index)}px`,
                    zIndex: `${99 - index}`,
                }
                const _imgStyled = {
                    width: "135px",
                    height: "124px"
                }

                const workerStyled = {
                    backgroundImage: item.revers ? 'url("../../map/workerRev.png")' : 'url("../../map/workerFor.png")',
                    backgroundRepeat: 'no-repeat',
                }

                const vehicleStyled = {
                    backgroundImage: item.revers ? 'url("../../map/vehRev.png")' : 'url("../../map/vehFor.png")',
                    backgroundRepeat: 'no-repeat',
                }

                return <div className="block block " id={`block-${item.value}`} key={index} style={_blockStyled}>
                    <img src={item.open ? `../../map/open.png` : `../../map/close.png`} alt="close" style={_imgStyled} />
                    {item.show['worker'] && item.open && item.worker
                        && <div className="worker-icon" style={workerStyled}>
                            <div className="worker-count-box">{item.worker_count}</div>
                        </div>}
                    {item.show['vehicle'] && item.open && item.vehicle
                        && <div className="vehicle-icon" style={vehicleStyled}>
                            <div className="vehicle-count-box">{item.vehicle_count}</div>
                        </div>}
                    {item.show['scanner'] && item.open && item.scanner && <div className="scanner-icon">
                        <div className="scanner-img"></div>
                        <div className="scanner-device-box"></div>
                    </div>}
                    {item.show['cctv'] && item.open && item.cctv && <div className="cctv-icon">
                        <div className="cctv-img"></div>
                        <div className="cctv-device-box"></div>
                    </div>}
                </div>
            })}
        </>
    }

    return (
        <MapCompo className="map-component">
            <div className="tag-button-box buttom-box" onClick={setOpenCheckBox}>
                <FontAwesomeIcon icon={faTag} />
            </div>
            <div className="expand-button-box buttom-box" onClick={setOpenExpandMapHandler}>
                <FontAwesomeIcon icon={faExpand} />
            </div>
            <div className="map-area">
                <img src="../../map/entrance.png" alt="입구" className="entrance-image" id="entrance001" />
                {
                    rendering(273, 4, dig1)
                }
                <img src="../../map/entrance.png" alt="입구" className="entrance-image" id="entrance002" />
                <img src="../../map/entrance.png" alt="입구" className="entrance-image" id="entrance003" />
                {
                    rendering(353, 147, dig2)
                }
                <img src="../../map/entrance.png" alt="입구" className="entrance-image" id="entrance004" />
            </div>
            {
                checkBox &&
                <div className="tag-list-box">
                    <ul className="tag-list">
                        <li className="list-item">
                            <input
                                type="checkbox"
                                name="worker"
                                onChange={onCheckChange}
                                checked={showItem.worker}
                            />
                            <label>작업자</label>
                        </li>
                        <li className="list-item">
                            <input
                                type="checkbox"
                                name="vehicle"
                                onChange={onCheckChange}
                                checked={showItem.vehicle}

                            />
                            <label>차량</label>
                        </li>
                        <li className="list-item">
                            <input
                                type="checkbox"
                                name="cctv"
                                onChange={onCheckChange}
                                checked={showItem.cctv}
                            />
                            <label>CCTV</label>
                        </li>
                    </ul>
                </div>
            }
        </MapCompo>
    );
};

export default MapComponent;