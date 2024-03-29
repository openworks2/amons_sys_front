import React, { useEffect, useState } from 'react';
import { Form, Input, TextArea } from 'semantic-ui-react';
import styled from 'styled-components';
import CircularProgressBar from '../CircularProgressBar';
import 'react-date-range/dist/styles.css'; // main style file 
import 'react-date-range/dist/theme/default.css'; // theme css file
import moment from 'moment';
import DrillCalendar from './DrillCalendar';

const DrillRateCompo = styled.div`
    width: 100%;
    height: 100%;
    padding-top: 26px;
    padding-left: 20px;
    padding-right: 20px;
    position: relative;
    .form-container{
        width: 100%;
        height: 100%;
        /* background-color: aliceblue; */
        padding-bottom: 15px;
        .field {
            margin-bottom: 16px !important;
            font-family: NotoSansKR-Regular;
            i.caret.down.icon {
                position: absolute;
                right: 10px;
            }
            &.dig-length-field{
                &::after {
                    /* content: "**굴진량은 0~100m 사이의 값을 입력하세요."; */
                }
                &.error::after{
                    content:${props => `"*이전 입력일에 입력 된 굴진량(${props.digRange.minLength}m)보다 커야합니다."`};
                    /* color: rgba(46, 46, 46, 0.5); */
                    font-size: 12px;  
                    color: #ff0000;
                }  
            }
        }
        .visible.menu.transition {
            min-height: 150px !important;
        }
        .location-info-container{
            width: 100%;
            height: 128px;
            display: flex;
            margin-top: 26px !important;
            margin-bottom: 26px !important;
            .progress-area{
                width: 50%;
                height: 100%;
                /* background-color: aliceblue; */
                display: flex;
                justify-content: center;
                .circle-text{
                    font-family: NotoSansKR-Medium;
                    fill: #000 !important;
                }
            }
            .drill-info-area{
                width: 50%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                .info-box{
                    font-family: NotoSansKR-Regular;
                    .location-info-box{
                        display: flex;
                        .info-title{
                            color:#7C7C7C;
                            width: 65px;
                            text-align: end;
                            margin-right: 10px;
                        }
                        .info-value{
                            color:#2E2E2E;
                            font-family: NotoSansKR-Medium;
                        }
                    }
                }
                .info-box > div{
                    height: 23px;
                }
            }
        }
        .submit-button{
            /* position: fixed;
            bottom: 74px; */
            /* width: calc(100% - 43px); */
            padding-bottom: 20px !important;
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
        textarea{
            resize: none;
        }
    }
`;

const DrillRateForm = ({
    options,
    formData,
    digRange,
    onSelectItem,
    onChangeDate,
    onTextChange,
    onSubmit,
    minDate
}) => {
    const {
        local_index,
        plan_length,
        dig_seq,
        dig_length,
        record_date,
        prev_dig_length,
        prev_record_date,
        description,
        action
    } = formData;

    const [date, setDate] = useState(null)

    const [calendarOpen, setCalendarOpen] = useState(false);


    useEffect(() => {
    }, []);

    const onOpenCalendar = () => {
        setCalendarOpen(true)
    }
    const onCloseCalendar = () => {
        setCalendarOpen(false)
    }

    /**
     * @description 캘린더 외 영역 클릭시 캘린더 닫기 이벤트 핸들러
     */
    const onPanelClick = (e) => {
        if (e.target !== e.currentTarget) return;
        setCalendarOpen(false)
    }

    const percentCalc = (dig, plan) => {
        const percent = (dig / plan) * 100;
        const diviPercent = Math.round(percent * 10) / 10;
        return diviPercent;
    };

    // 천단위 콤마
    const numberOfDigitsHandler = (number) => {
        var len, point, str;

        number = number + "";
        point = number.length % 3;
        len = number.length;

        str = number.substring(0, point);
        while (point < len) {
            if (str !== "") str += ",";
            str += number.substring(point, point + 3);
            point += 3;
        }

        return str;
    };

    const handleSelect = (date) => {
        const _date = moment(date).format('YYYY-MM-DD')

        setDate(_date);
        onChangeDate(_date);
        onCloseCalendar()
    }


    return (
        <DrillRateCompo digRange={digRange} dig_length={dig_length}>
            <div className="form-container">
                <Form className="drillRate-form" onSubmit={onSubmit}>
                    <Form.Select
                        className="location-select"
                        options={options.locals}
                        label='노선'
                        name='local_index'
                        placeholder='노선 선택'
                        icon={'caret down'}
                        onChange={(e, { value }) => onSelectItem(e, 'local_index', value)}
                        value={local_index ? local_index : ''}
                    />
                    <Form.Field className="location-info-container">
                        <div className="progress-area">
                            <CircularProgressBar
                                sqSize={128}
                                percentage={percentCalc(prev_dig_length, plan_length)}
                                strokeWidth={8}
                            />
                        </div>
                        <div className="drill-info-area">
                            <div className="info-box">
                                <div className="location-info-box plan-length-value">
                                    <div className="info-title">계획연장</div>
                                    <div className="info-value">{`${numberOfDigitsHandler(plan_length)}m`}</div>
                                </div>
                                <div className="location-info-box drill-length-value">
                                    <div className="info-title">누적굴진</div>
                                    <div className="info-value">{`${numberOfDigitsHandler(prev_dig_length)}m`}</div>
                                </div>
                                <div className="location-info-box drill-recordDate-value">
                                    <div className="info-title">입력일</div>
                                    <div className="info-value"> {`${(prev_record_date)}`}</div>
                                </div>
                            </div>
                        </div>
                    </Form.Field>
                    <Form.Field
                        className="dig-length-field"
                        error={dig_length && (dig_length < digRange.minLength || dig_length > digRange.maxLength)}>
                        <label>누적 굴진량</label>
                        <Input
                            placeholder='누적 굴진량을 입력해 주세요.'
                            label={{ basic: true, content: 'm' }}
                            labelPosition='right'
                            name="dig_length"
                            onChange={onTextChange}
                            value={dig_length || dig_length === 0 ? dig_length : ""}
                        // type="number"
                        // readOnly={dig_length === 0}
                        />
                    </Form.Field>
                    {/* <Form.Input
                        className="toDate-input"
                        fluid
                        label='입력일'
                        name='record_date'
                        icon='calendar alternate outline'
                        iconPosition='left'
                        onClick={() => onOpenCalendar()}
                        value={record_date}
                        // error={(moment(to_date).isBefore(from_date) && true)}
                        // error={btnEnable}
                        readOnly
                    /> */}
                    <Form.Field
                        control={TextArea}
                        label='비고'
                        placeholder='비고 입력란'
                        name='description'
                        onChange={onTextChange}
                        value={description !== null ? description : ""}
                        readOnly={dig_length === 0}
                    />
                    <Form.Button
                        className="submit-button"
                        disabled={dig_length < digRange.minLength || dig_length > digRange.maxLength}
                    >{action === 'update' ? '수정' : '등록'}</Form.Button>
                </Form>
            </div>
            {
                // calendarOpen &&
                false &&
                <DrillCalendar
                    date={record_date}
                    handleSelect={handleSelect}
                    onPanelClick={onPanelClick}
                    minDate={minDate}
                />
            }
        </DrillRateCompo>
    );
};

export default DrillRateForm;