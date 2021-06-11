import React, { useEffect, useState } from 'react';
import { DateRange, Calendar } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file 
import 'react-date-range/dist/theme/default.css'; // theme css file
import { ko } from 'date-fns/locale'
import styled from 'styled-components';

const CalendarCompo = styled.div`
    width: 100%;
    height: 100vh;
    background-color: rgba(94,94,94,0.5);
    position: absolute;
    z-index: 999;
     display: flex; 
    justify-content: center;
    /* align-items: center;        */
    top: 0px;
    left: 0px;
    justify-content: center;
    .calendar-container{
        width: 92%;
        height: 49%;
        position: absolute;
        display: flex;
        justify-content: center;
        .calendar-wrapper{
            border-radius: 10px;
            max-height: 332px;
            button{
                font-family: NotoSansKR-Regular;
            }
        }
    }

`;

const DrillCalendar = ({ date, handleSelect, onPanelClick }) => {

  //   const [date, setDate] = useState({
  //     startDate: new Date(),
  //     endDate: new Date(),
  //     key: 'selection'
  //   });

  // const [date, setDate] = useState(null)

  //   const handleSelect = (_date) => {
  //     console.log(_date); // native Date object     
  //     setDate(_date);
  //     onCalendarClose()
  //   }

  useEffect(() => {
    const perentTarget = document.getElementsByClassName('bottom-component')[0];
    const target = document.getElementsByClassName('calendar-container')[0];
    const scrollTop = perentTarget.scrollTop;
    perentTarget.style.overflow = 'hidden';
    target.style.top = `${scrollTop + 50}px`;

    return () => {
      perentTarget.style.overflow = 'auto';
    }
  }, []);

  return (
    <CalendarCompo className="calendar-component" onClick={onPanelClick}>
      <div className="calendar-container">
        <Calendar
          className="calendar-wrapper"
          startDate={new Date()}
          minDate={new Date('2021-01-01')}
          maxDate={new Date('2031-12-31')}
          date={new Date(date)}
          onChange={handleSelect}
          locale={ko}
          color={'#F1592A'}
        />
      </div>
    </CalendarCompo>
  );
};

export default DrillCalendar;