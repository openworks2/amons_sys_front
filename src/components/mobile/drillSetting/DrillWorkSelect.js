import React from 'react';
import styled from 'styled-components';

const DrillWorkSelectCompo = styled.div`
    width: 100%;
    height: 100%;
    background-color: inherit;
    .type-list-box{
        padding: 0;
        margin: 0;
        list-style: none;
        display: flex;
        color: rgba(255, 255, 255, 0.3);
        font-size: 16px;
        font-family: NotoSansKR-Medium;
        font-weight: 100;
        li.type-item{
            width: 50%;
            height: 100%;
            &.active{
                .item-name{
                    color: rgba(255, 255, 255, 1);
                }
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

const DrillWorkSelect = ({ workType, onSelectType }) => {
    return (
        <DrillWorkSelectCompo>
            <ul className="type-list-box">
                <li
                    className={`type-item ${workType === 'process' && 'active'}`}
                    onClick={() => onSelectType('process')}
                >
                    <div className="item-name">공정상태</div>
                    <div className="active-bar"></div>
                </li>
                <li
                    className={`type-item ${workType === 'drillRate' && 'active'}`}
                    onClick={() => onSelectType('drillRate')}
                >
                    <div className="item-name">굴진량</div>
                    <div className="active-bar"></div>
                </li>
            </ul>
        </DrillWorkSelectCompo>
    );
};

export default DrillWorkSelect;