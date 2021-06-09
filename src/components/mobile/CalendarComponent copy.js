import React from 'react';
import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css'; // Make sure to import the default stylesheet
import styled from 'styled-components';
import ko from "date-fns/locale/ko";
import moment from 'moment';

const CalendarCompo = styled.div`
    width: 100%;
    height: 100%;
    background-color: rgba(94, 94, 94, 0.5);
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    .calendar-container{
        width: 86%;
        height: 86%;
        .Cal__Container__root {
            width: 100% !important;
            height: 100% !important;
        }
    }
    
`;


const CalendarComponent = () => {

    var today = new Date();
    var lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);

    return (
        <CalendarCompo>
            <div className="calendar-container">
                <InfiniteCalendar
                    width={300}
                    height={300}
                    selected={today}
                    disabledDays={[0, 6]}
                    minDate={lastWeek}
                    locale={{
                        locale: require('date-fns/locale/ko'),
                        headerFormat: 'MM월DD일',
                        weekdays: ["일", "월", "화", "수", "목", "금", "토"],
                        months: [
                            "1월",
                            "2월",
                            "3월",
                            "4월",
                            "5월",
                            "6월",
                            "7월",
                            "8월",
                            "9월",
                            "10월",
                            "11월",
                            "12월",
                          ],
                        blank: 'Aucune date selectionnee',
                        todayLabel: {
                            long: '오늘',
                            short: '오늘'
                        }
                    }}
                />
            </div>
        </CalendarCompo>
    );
};

export default CalendarComponent;