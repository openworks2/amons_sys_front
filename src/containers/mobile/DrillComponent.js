import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import DrillRateForm from '../../components/mobile/drillSetting/DrillRateForm';
import DrillWorkSelect from '../../components/mobile/drillSetting/DrillWorkSelect';
import ProcessForm from '../../components/mobile/drillSetting/ProcessForm';
import { getDigs } from '../../modules/digs';
import { getLocals } from '../../modules/locals';
import { postProcess } from '../../modules/processes';

const DrillCompo = styled.div`
    width: 100%;
    height: 100%;
    /* background-color: aliceblue; */
    .top-conponent{
        width: 100%;
        height: 48px;
        background-color: #2E2E2E;
    }
    .bottom-component{
        width: 100%;
        height: calc(100% - 48px);
        /* min-height: 509px; */
        overflow: auto;
    }
    @media screen and (max-width:412px){   
       /*  .top-conponent{
            position: fixed;
            top: 50px;
        }     */
        .bottom-component{
            /* background-color: red; */
            /* height: calc(100% - 48px); */
            /* overflow: auto; */
        }
    }
    @media screen and (max-height:554px){   

    }
`;




const initialState = {
    formData: {
        process: {
            local_index: null,
            prev_pcs_state: null,
            pcs_state: null,
            pcs_description: null
        },
        drillRate: {
            local_index: null,
            plan_length: null,
            dig_seq: null,
            record_date: null,
            curr_dig_length: null,
            dig_length: null,
            description: null
        }
    }
}


const DrillComponent = () => {

    // const { locals } = useSelector(state => state.locals.locals);
    const { locals, digs } = useSelector(state => {
        return {
            locals: state.locals.locals.data,
            digs: state.digs.digs.data
        }
    });

    const dispatch = useDispatch();

    const [processFormData, setProcessFormData] = useState(initialState.formData.process);

    const [drillRateFormData, setDrillRateFormData] = useState(initialState.formData.drillRate);

    const [workType, setWorkType] = useState('drillRate'); // 공정상태: process /  굴진량: drillRate

    const [localList, setLocalList] = useState([]);
    const [digList, setDigList] = useState([]);

    const [localDig, setLocalDigList] = useState({
        local_index: undefined,
        items: []
    });

    const [digRange, setDigRange] = useState({
        minLength: null,
        maxLength: null,
    });

    const [options, setOptions] = useState({
        locals: []
    })

    useEffect(() => {
        getDispatch();

    }, []);

    useEffect(() => {
        if (digs) {
            setDigList(digs);
        }
    }, [digs]);

    useEffect(() => {
        if (locals) {
            onSetOptions(locals, 'locals');
            setLocalList(locals);
            setProcessFormData({
                ...processFormData,
                local_index: locals[0].local_index,
                pcs_state: locals[0].pcs_state,
                prev_pcs_state: locals[0].pcs_state,
                pcs_description: '모바일 등록'
            });

            setDrillRateFormData({
                ...processFormData,
                local_index: locals[0].local_index,
                plan_length: locals[0].plan_length,
                dig_seq: locals[0].dig_seq,
                record_date: moment(locals[0].record_date).format('YYYY-MM-DD'),
                curr_dig_length: locals[0].dig_length,
                dig_length: locals[0].dig_length,
                description: locals[0].description,
            })
            setDigRange({
                minLength: locals[0].dig_length,
                maxLength: locals[0].plan_length
            });

        }
    }, [locals]);

    useEffect(() => {
        if (locals && digs) {
            setLocalDigList({
                local_index: locals[0].local_index,
                items: digs.filter(item => item.local_index === drillRateFormData.local_index ? item : null)
            })
        }
    }, [locals, digs]);


    const onSelectType = (type) => {
        setWorkType(type)
    }

    const getDispatch = () => {
        dispatch(getLocals());
        dispatch(getDigs());
    };

    const onSelectItem = (e, key, index) => {
        const findItem = localList.find(item => item.local_index === index);
        console.log(findItem)
        console.log(workType)
        if (workType === 'process') {
            setProcessFormData({
                ...processFormData,
                local_index: findItem.local_index,
                pcs_state: findItem.pcs_state,
                prev_pcs_state: findItem.pcs_state,
            })
        } else if (workType === 'drillRate') {
            console.log('drillRate->', findItem)
            setDrillRateFormData({
                ...drillRateFormData,
                local_index: findItem.local_index,
                plan_length: findItem.plan_length,
                record_date: moment(findItem.record_date).format('YYYY-MM-DD'),
                curr_dig_length: findItem.dig_length,
                dig_length: findItem.dig_length,
                description: findItem.description,
            });

            setDigRange({
                minLength: findItem.dig_length,
                maxLength: findItem.plan_length
            });
            setLocalDigList({
                local_index: findItem.local_index,
                items: digs.filter(item => item.local_index === findItem.local_index ? item : null)
            })
        }
    }

    const onRadioChange = (e) => {
        setProcessFormData({
            ...processFormData,
            pcs_state: Number(e.currentTarget.name)
        })
    }
    const onTextChange = (e) => {
        const { name, value } = e.target;
        if (name === 'dig_length') {
            const _number = Number(value);
            console.log(_number)
            if (isNaN(_number)) {
                return
            }
        }

        setDrillRateFormData({
            ...drillRateFormData,
            [name]: value
        })
    }

    const onSetOptions = useCallback((items = [], key) => {
        if (items.length === 0) {
            return;
        }
        let tempArr = [];
        if (key === 'locals') {
            items.map(item => {
                const optionObj = {};
                optionObj.key = item.local_index;
                optionObj.text = item.local_name;
                optionObj.value = item.local_index;

                tempArr.push(optionObj)
                return item;
            });
        }
        setOptions({
            ...options,
            [key]: tempArr
        });
    }, [options]);

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(processFormData);
        if (workType === 'process') {
            dispatch(postProcess(processFormData));
            const updateLocals = localList.map(item =>
            (item.local_index === processFormData.local_index
                ? { ...item, prev_pcs_state: processFormData.pcs_state, pcs_state: processFormData.pcs_state }
                : item));

            setProcessFormData({
                ...processFormData,
                prev_pcs_state: processFormData.pcs_state,
                pcs_state: processFormData.pcs_state
            })
            setLocalList(updateLocals);
        }
    }

    const onChangeDate = (date) => {
        let minDateArr = [];
        let maxDateArr = [];
        const findDig = localDig.items.find((item, index, array) => {
            const recordDate = moment(item.record_date).format('YYYY-MM-DD');
            if (item.local_index === drillRateFormData.local_index) {
                if (moment(date).isSame(recordDate)) {
                    return item;
                }
            }

            if (moment(recordDate).isBefore(date)) {
                minDateArr.push(item);
            }
            if (moment(recordDate).isAfter(date)) {
                maxDateArr.push(item)
            }
            return null
        });

        setDigRange({
            minLength: minDateArr.length !== 0 ? minDateArr[minDateArr.length - 1].dig_length : 0,
            maxLength: maxDateArr.length !== 0 ? maxDateArr[0].dig_length : drillRateFormData.plan_length
        });

        setDrillRateFormData({
            ...drillRateFormData,
            record_date: date,
            dig_seq: findDig ? findDig.seq : null,
            dig_length: findDig ? findDig.dig_length : null,
            description: '모바일 등록'
        })
    }

    return (
        <DrillCompo className="drill-component">
            <div className="top-conponent">
                <DrillWorkSelect workType={workType} onSelectType={onSelectType} />
            </div>
            <div className="bottom-component">
                {
                    workType === 'process' ?
                        <ProcessForm
                            options={options}
                            formData={processFormData}
                            onSelectItem={onSelectItem}
                            onRadioChange={onRadioChange}
                            onSubmit={onSubmit}
                        />
                        :
                        <DrillRateForm
                            options={options}
                            formData={drillRateFormData}
                            digRange={digRange}
                            onSelectItem={onSelectItem}
                            onChangeDate={onChangeDate}
                            onTextChange={onTextChange}
                        />
                }
            </div>
        </DrillCompo>
    );
};

export default DrillComponent;