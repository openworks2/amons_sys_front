import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, Router, Switch } from 'react-router';
import { Link } from 'react-router-dom';
import { Form } from 'semantic-ui-react';
import styled from 'styled-components';
import SearchForm from '../../components/mobile/bleLog/SearchForm';
import TypeSelect from '../../components/mobile/bleLog/TypeSelect';
import { createPromiseThunkOfPost } from '../../lib/asyncUtils';
import { postRemainVehiclesSearch, postRemainWorkersSearch } from '../../modules/bles';
import { getCompanies } from '../../modules/companies';
import { getLocals } from '../../modules/locals';

const BleLogCompo = styled.div`
    width: 100%;
    height: 100%;
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

const initialState = {
    formData: {
        local_index: null,
        from_date: moment().format('YYYY-MM-DD'),
        // to_date: moment().add(1, 'days').format('YYYY-MM-DD'),
        to_date: moment().format('YYYY-MM-DD'),
        name: null,
        co_index: null
    }
}

const BleLogContainer = ({ match, history }) => {

    const { locals, companies, bleWorkers, bleVehicles } = useSelector(state => {
        return {
            locals: state.locals.locals,
            companies: state.companies.companies,
            bleWorkers: state.bles.bleWorkers,
            bleVehicles: state.bles.bleVehicles
        }
    });

    const [formData, setFormData] = useState(initialState.formData);

    const dispatch = useDispatch();

    const [selectType, setSelectType] = useState('worker');

    const [options, setOptions] = useState({
        locals: [],
        companies: []
    })

    useEffect(() => {
        getDispatch();
    }, []);

    useEffect(() => {
        if (locals.data) {
            onSetOptions(locals.data, 'locals');
        }
    }, [locals.data]);

    useEffect(() => {
        if (companies.data) {
            onSetOptions(companies.data, 'companies');
        }
    }, [companies.data]);


    const getDispatch = () => {
        dispatch(getLocals());
        dispatch(getCompanies());

    };

    const onSelectType = (type) => {
        setSelectType(type)
        setFormData(initialState.formData)
    }

    const onSetOptions = useCallback((items = [], key) => {
        if (items.length === 0) {
            return;
        }
        let tempArr = [
            { key: 0, text: '전체', value: null },
        ];
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
        else if (key === 'companies') {
            items.map(item => {
                const optionObj = {};
                optionObj.key = item.co_index;
                optionObj.text = item.co_name;
                optionObj.value = item.co_index;

                tempArr.push(optionObj)
                return item;
            });
        }
        setOptions({
            ...options,
            [key]: tempArr
        });
    }, [options]);


    const onChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        })
    }

    const onSelectItem = (e, key, index) => {
        setFormData({
            ...formData,
            [key]: index
        })
    }

    const onChangeDate = (key, value) => {

        if (key === 'from_date') {
            setFormData({
                ...formData,
                from_date: value,
                to_date: value
            })
        } else {
            setFormData({
                ...formData,
                to_date: value
            })
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const { from_date, to_date, local_index, co_index, name } = formData;
        if (selectType === 'worker') {
            const reqObj = {
                from_date: `${from_date} 00:00:00`,
                to_date: `${to_date} 23:59:59`,
                wname: name,
                local_index,
                co_index: co_index
            }
            
            dispatch(postRemainWorkersSearch(reqObj));
        }
        if (selectType === 'vehicle') {
            const reqObj = {
                from_date: `${from_date} 00:00:00`,
                to_date: `${to_date} 23:59:59`,
                name: name,
                local_index,
                co_index: co_index
            }
            // debugger
            dispatch(postRemainVehiclesSearch(reqObj));
        }

        history.push(`/amons/m.home/log/ble/${selectType}/result?fromDate=${formData.from_date}&toDate=${formData.to_date}&name=${formData.name}&localIndex=${formData.local_index}&coIndex=${formData.co_index}`
        )
    }


    return (
        <BleLogCompo className="blelog-container">
            <div className="top-component">
                <TypeSelect selectType={selectType} onSelectType={onSelectType} />
            </div>
            <div className="bottom-component">
                <SearchForm
                    selectType={selectType}
                    formData={formData}
                    options={options}
                    onChange={onChange}
                    onSelectItem={onSelectItem}
                    onChangeDate={onChangeDate}
                    onSubmit={onSubmit}
                />
            </div>
        </BleLogCompo>
    );
};

export default BleLogContainer;