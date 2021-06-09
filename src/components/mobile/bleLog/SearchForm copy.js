import React, { useEffect, useState } from 'react';
import { Form } from 'semantic-ui-react';
import styled from 'styled-components';
import CalendarComponent from '../CalendarComponent';
import { DateRangePicker, START_DATE, END_DATE, useDateInput } from "react-nice-dates";
import { ko } from 'date-fns/locale'
import "react-nice-dates/build/style.css";

const SearchFormCompo = styled.div`
    width: 100%;
    height: 100%;
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
                i.caret.down.icon {
                    position: absolute;
                    right: 0px;
                    font-size: 20px;
                }
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
    .date-range {
        display: flex;
    }
    .date-range input {
        width: 145px !important;
        height: 46px;
    }
    .nice-dates-day {
        height: 50px !important;
    }
    .nice-dates-day:before {
        background-color: #F1592A;
    }
    .nice-dates-popover {
        border: 1px solid #ddd;
        width: 100%;
        transition: none;
    }
`;
const SearchForm = ({ selectType, options }) => {

    // const options = [
    //     { key: 'm', text: 'Male', value: 'male' },
    //     { key: 'f', text: 'Female', value: 'female' },
    //     { key: 'o', text: 'Other', value: 'other' },
    // ]

    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();

    useEffect(() => {

    }, [selectType]);



    return (
        <SearchFormCompo className="search-form-component">
            <Form className="search-form">
                <Form.Group className="field-group">
                    {/* <Form.Input
                        className="fromDate-input"
                        fluid
                        label='시작일'
                        icon='calendar alternate outline black'
                        color='black'
                        iconPosition='left'
                    // size='large'
                    />
                    <div id="tilde">~</div>
                    <Form.Input
                        className="toDate-input"
                        fluid
                        label='종료일'
                        icon='calendar alternate outline'
                        iconPosition='left'
                    /> */}
                    <DateRangePicker
                        startDate={startDate}
                        endDate={endDate}
                        onStartDateChange={setStartDate}
                        onEndDateChange={setEndDate}
                        minimumDate={new Date()}
                        format="yyyy-MM-dd"
                        locale={ko}
                    >
                        {({ startDateInputProps, endDateInputProps, focus }) => (
                            <div className="date-range">
                                <div class="input-container">
                                    <input
                                        className={"input" + (focus === START_DATE ? " -focused fromDate-input" : " fromDate-input")}
                                        {...startDateInputProps}
                                        placeholder="Start date"
                                    />
                                </div>
                                <span className="date-range_arrow">~</span>
                                <div class="input-container">
                                    <input
                                        className={"input" + (focus === END_DATE ? " -focused toDate-input" : " toDate-input")}
                                        {...endDateInputProps}
                                        placeholder="End date"
                                    />
                                </div>
                            </div>
                        )}
                    </DateRangePicker>
                </Form.Group>
                <Form.Select
                    className="location-select"
                    options={options.locals}
                    label='노선'
                    placeholder='전체'
                    icon={'caret down'}
                />
                <Form.Select
                    className="company-select"
                    options={options.companies}
                    label='소속사'
                    placeholder='전체'
                    icon={'caret down'}
                />
                <Form.Input
                    className="name-input"
                    fluid
                    label={selectType === 'worker' ? '작업자' : '차량종류'}
                    name={selectType === 'worker' ? 'worker' : 'vehicle'}
                />
                <Form.Button className="submit-button">조회</Form.Button>
            </Form>
            {/* <CalendarComponent /> */}
        </SearchFormCompo >
    );
};

SearchForm.defaultProps = {
    selectType: 'worker'
}


export default SearchForm;