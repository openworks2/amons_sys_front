import React, { useState } from 'react';
import styled from 'styled-components';

const MonitorCompo = styled.div`
    width: 100%;
    height: 100%;
    background-color: #D4D7DE;
    .list-container{
        width: 100%;
        height: 7%;
        min-height: 48px;
        ul.location-list{
            margin: 0;
            padding: 0;
            display: flex;
            list-style: none;
            width: 100%;
            height: 100%;
            background-color: #2E2E2E;
            li.loaction-item{
                width: 25%;
                color: rgba(255, 255, 255, 0.3);
                &.active{
                    color: rgba(255, 255, 255, 1);
                    .bar{
                        background-color: #F1592A;
                    }
            }
            .location-name{
                width: 100%;
                height: 91%;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 16px;
                font-family: NotoSansKR-Medium;
                    .name-text{
                        width: 5em;
                        text-align: center;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        overflow: hidden;
                    }
                }
                .bar{
                    width: 100%;
                    height: 9%;
                }
            }
        }
    }
    .descrition-container{
        width: 100%;
        height: 91%;
        background-color:green;
        /* background-color: #3d67c8; */
        /* .contents-header{
            width: 100%;
            height: 20%;
            background-color: antiquewhite;
        }
        .contents-body{
            width: 100%;
            height: 80%;
            background-color: aqua;
        } */
    }
`;

const MonitorContainer = () => {

    const [locationAct, setLocationAct] = useState('loc001');

    const [location, setLoctaion] = useState([
        { local_index: 'loc001', local_name: "시점 함양" },
        { local_index: 'loc002', local_name: "종점 함양" },
        { local_index: 'loc003', local_name: "시점 울산" },
        { local_index: 'loc004', local_name: "종점 울산" }
    ]);

    const onChangeLocation = (e, index) => {
        setLocationAct(index)
    }

    const renderList = (items = []) => {
        if (items.length === 0) return;
        return items.map(item => {
            return <li
                className={locationAct === item.local_index ? "loaction-item active" : "loaction-item"}
                onClick={(e) => onChangeLocation(e, item.local_index)}
            >
                <div className="location-name">
                    <div className="name-text">{item.local_name}</div>
                </div>
                <div className="bar"></div>
            </li>
        });
    }

    return (
        <MonitorCompo>
            <div className="list-container">
                <ul className="location-list">
                    {
                        renderList(location)
                    }
                </ul>
            </div>
            <div className="descrition-container">
                <div className="contents-header"></div>
                <div className="contents-body"></div>
            </div>
        </MonitorCompo>
    );
};

export default MonitorContainer;