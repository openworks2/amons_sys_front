import React from 'react';
import styled from 'styled-components';

const TypeSelectCompo = styled.div`
    width: 100%;
    height: 100%;
    background-color: inherit;
    .type-list-box{
        padding: 0;
        margin: 0;
        list-style: none;
        display: flex;
        color: #FFFFFF;
        font-size: 16px;
        font-family: NotoSansKR-Medium;
        font-weight: 100;
        li.type-item{
            width: 50%;
            height: 100%;
            &.active{
                .active-bar{
                    background-color: #F1592A;
                }
            }
            .item-name{
                width: 100%;
                height: 44px;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .active-bar{
                width: 100%;
                height: 4px;
            }
        }
    }
`;


const TypeSelect = ({ selectType, onSelectType}) => {
    return (
        <TypeSelectCompo className="type-select-component">
        <ul className="type-list-box">
            <li
                className={`type-item ${selectType === 'worker' && 'active'}`}
                onClick={() => onSelectType('worker')}
            >
                <div className="item-name">작업자</div>
                <div className="active-bar"></div>
            </li>
            <li
                className={`type-item ${selectType === 'vehicle' && 'active'}`}
                onClick={() => onSelectType('vehicle')}
            >
                <div className="item-name">차량</div>
                <div className="active-bar"></div>
            </li>
        </ul>
    </TypeSelectCompo>
    );
};


TypeSelect.defaultProps = {
    selectType: 'worker'
}

export default TypeSelect;