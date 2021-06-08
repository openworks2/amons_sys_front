import React, { useEffect, useState } from 'react';
import { Form } from 'semantic-ui-react';
import styled from 'styled-components';
import CalendarComponent from '../CalendarComponent';
import { ko } from 'date-fns/locale'
import "react-nice-dates/build/style.css";
import moment from 'moment';

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
            input[name="from_date"],
            input[name="to_date"]{
                font-family: NotoSansKR-Regular;
            }
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
const SearchForm = ({
    selectType,
    formData,
    options,
    onChange,
    onSelectItem,
    onChangeDate,
    onSubmit
}) => {

    const [openCalendar, setOpen] = useState({
        key: null,   // 'fromDate' or 'toDate'
        open: false
    });
    // const [date, setDate] = useState(null)

    useEffect(() => {

    }, [selectType]);

    const onCalendarOpen = (key) => {
        setOpen({
            key,
            open: true
        })
    }

    const onCalendarClose = () => {
        setOpen({
            key: null,
            open: false
        })
    }

    const handleSelect = (_date) => {
        console.log(_date); // native Date object     
        console.log(openCalendar.key); // native Date object     
        // setDate(_date);
        const _formatDate = moment(_date).format('YYYY-MM-DD')
        // console.log(_formatDate)
        onChangeDate(openCalendar.key, _formatDate);
        onCalendarClose()
    }

    return (
        <SearchFormCompo className="search-form-component">
            <Form className="search-form" onSubmit={onSubmit}>
                <Form.Group className="field-group">
                    <Form.Input
                        className="fromDate-input"
                        fluid
                        label='시작일'
                        name='from_date'
                        icon='calendar alternate outline black'
                        color='black'
                        iconPosition='left'
                        onClick={() => onCalendarOpen('from_date')}
                        value={formData.from_date ? formData.from_date : ''}
                    />
                    <div id="tilde">~</div>
                    <Form.Input
                        className="toDate-input"
                        fluid
                        label='종료일'
                        name='to_date'
                        icon='calendar alternate outline'
                        iconPosition='left'
                        onClick={() => onCalendarOpen('to_date')}
                        value={formData.to_date ? formData.to_date : ''}
                    />
                </Form.Group>
                <Form.Select
                    className="location-select"
                    options={options.locals}
                    label='노선'
                    name='local_index'
                    placeholder='전체'
                    icon={'caret down'}
                    onChange={(e, { value }) => onSelectItem(e, 'local_index', value)}
                    value={formData.local_index ? formData.local_index : ''}
                />
                <Form.Select
                    className="company-select"
                    options={options.companies}
                    label='소속사'
                    name='co_index'
                    placeholder='전체'
                    icon={'caret down'}
                    onChange={(e, { value }) => onSelectItem(e, 'co_index', value)}
                    value={formData.co_index ? formData.co_index : ''}
                />
                <Form.Input
                    className="name-input"
                    fluid
                    label={selectType === 'worker' ? '작업자' : '차량종류'}
                    name='name'
                    onChange={onChange}
                    value={formData.name ? formData.name : ''}
                />
                <Form.Button className="submit-button">조회</Form.Button>
            </Form>
            {openCalendar.open
                && <CalendarComponent
                    key={openCalendar.key}
                    // onCalendarClose={onCalendarClose}
                    handleSelect={handleSelect}
                />}

        </SearchFormCompo >
    );
};

SearchForm.defaultProps = {
    selectType: 'worker'
}


export default SearchForm;