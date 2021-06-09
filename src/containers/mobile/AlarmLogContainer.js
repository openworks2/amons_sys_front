import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import AlarmItem from '../../components/mobile/AlarmLog/AlarmItem';
import { getAlarmsLimit } from '../../modules/alarms';

const AlarmLogCompo = styled.div`
    width: 100%;
    height: 100%;
    padding-top: 20px;
    padding-left: 20px;
    padding-right: 20px;
    overflow: auto;
    padding-bottom: 20px;
    .contents-container{
        width: 100%;
        height: 100%;
        ul.contents-box {
            padding: 0;
            margin: 0;
            list-style: none;
        }
    }
`;



const AlarmLogContainer = () => {

    const { data } = useSelector(state => state.alarms.alarms);

    const dispatch = useDispatch();

    const [items, setItems] = useState([]);

    // useEffect(() => {
    //     dispatch(getAlarmsLimit())
    // }, []);

    useEffect(() => {
        if (data) {
            setItems(data);
        }
    }, [data]);

    const alarmItemRender = (items = []) => {
        return items.map(item => (
            item && <AlarmItem item={item} />
        ));
    }


    return (
        <AlarmLogCompo>
            <div className="contents-container">
                <ul className="contents-box">
                    {items && alarmItemRender(items)}
                </ul>
            </div>
        </AlarmLogCompo>
    );
};

export default AlarmLogContainer;