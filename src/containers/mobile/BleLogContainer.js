import React, { useState } from 'react';
import { Form } from 'semantic-ui-react';
import styled from 'styled-components';

const BleLogCompo = styled.div`
    width: 100%;
    height: 100%;
    background-color: gray;
    .top-component{
        width: 100%;
        height: 48px;
        background-color: #2E2E2E;
    }
    .bottom-component{
        width: 100%;
        height: calc(100% - 48px);
    }
`;

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

const SearchFormCompo = styled.div`
    width: 100%;
    height: 100%;
    background-color: aquamarine;
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 20px;
    padding-top:26px;
    .search-form {
        width: 100%;
        height: 100%;
        font-family: NotoSansKR-Medium;
        font-weight: 100;
        .field>div{
                height: 46px;
            }
        .field{
            margin-bottom: 17px;
            .ui.selection.dropdown {
                padding-top: 15px;
            }
        }
        .field-group{
            margin-bottom: 17px;
            .field{
                width: 47.4%;
            }
            #tilde{
                margin-right: 3px;
                margin-left: 3px;
                display: flex;
                justify-content: center;
                padding-top: 33px;
            }
        }
        .submit-button{
            position: fixed;
            bottom: 74px;
            width: calc(100% - 43px);
            button {
                width: 100%;
                height: 55px;
                background-color: #F1592A;
                font-family: NotoSansKR-Medium;
                font-weight: 100;
                color: #fff;
                font-size: 18px;
            }
        }
    }
`;

const BleLogContainer = () => {

    const [selectType, setSelectType] = useState('worker');

    const onSelectType = (type) => {
        setSelectType(type)
    }
    const options = [
        { key: 'm', text: 'Male', value: 'male' },
        { key: 'f', text: 'Female', value: 'female' },
        { key: 'o', text: 'Other', value: 'other' },
    ]

    return (
        <BleLogCompo className="blelog-container">
            <div className="top-component">
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
            </div>
            <div className="bottom-component">
                <SearchFormCompo className="search-form-component">
                    <Form className="search-form">
                        <Form.Group className="field-group">
                            <Form.Input className="fromDate-input" fluid label='시작일' icon='users' iconPosition='left' />
                            <div id="tilde">~</div>
                            <Form.Input className="toDate-input" fluid label='종료일' icon='users' iconPosition='left' />
                        </Form.Group>
                        <Form.Select className="location-select" options={options} label='노선' placeholder='Gender' />
                        <Form.Select className="company-select" options={options} label='소속사' placeholder='Gender' />
                        <Form.Input className="name-input" fluid label='작업자' />
                        <Form.Button className="submit-button">조회</Form.Button>
                    </Form>
                </SearchFormCompo>
            </div>
        </BleLogCompo>
    );
};

export default BleLogContainer;