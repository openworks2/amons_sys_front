import React, { useState } from 'react';
import { DateRange, Calendar } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file 
import 'react-date-range/dist/theme/default.css'; // theme css file
import { ko } from 'date-fns/locale'
import styled from 'styled-components';

const CalendarCompo = styled.div`
    width: 100%;
    height: 100%;
    background-color: rgba(94,94,94,0.5);
    position: absolute;
    z-index: 999;
    display: flex;
    justify-content: center;
    top: 0px;
    left: 0px;
    justify-content: center;
    align-items: center;      
    .calendar-container{
        width: 92%;
        height: 49%;
        .calendar-wrapper{
            border-radius: 10px;
            button{
                font-family: NotoSansKR-Regular;
            }
        }
    }

`;

const CalendarComponent = ({ key, handleSelect }) => {

  //   const [date, setDate] = useState({
  //     startDate: new Date(),
  //     endDate: new Date(),
  //     key: 'selection'
  //   });

  const [date, setDate] = useState(null)

  console.log('key-->', key)

  const onRangeChange = (ranges) => {
    console.log(ranges); // native Date object
    setDate({
      startDate: ranges['selection'].startDate,
      endDate: ranges['selection'].endDate,
      key: ranges['selection'].key,
    });
  }

  //   const handleSelect = (_date) => {
  //     console.log(_date); // native Date object     
  //     setDate(_date);
  //     onCalendarClose()
  //   }

  return (
    <CalendarCompo>
      {/* <DateRange
        className='date-range'
        editableDateInputs={true}
        onChange={onRangeChange}
        moveRangeOnFirstSelection={false}
        ranges={[date]}
        locale={ko}
      /> */}
      <div className="calendar-container">
        <Calendar
          className="calendar-wrapper"
          startDate={new Date()}
          // endDate={PropTypes.object}
          minDate={new Date('2021-01-01')}
          maxDate={new Date('2031-12-31')}
          date={date}
          onChange={handleSelect}
          locale={ko}
          color={'#F1592A'}
        // scroll={{ enabled: true }}
        />
      </div>
    </CalendarCompo>
  );
};

export default CalendarComponent;