import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from 'semantic-ui-react';
import styled from 'styled-components';
import SearchForm from '../../components/mobile/bleLog/SearchForm';
import TypeSelect from '../../components/mobile/bleLog/TypeSelect';
import { createPromiseThunkOfPost } from '../../lib/asyncUtils';
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
        to_date: moment().add(1, 'days').format('YYYY-MM-DD'),
        name: null,
        co_index: null
    }
}

const BleLogContainer = () => {

    const { locals, companies } = useSelector(state => {
        return {
            locals: state.locals.locals,
            companies: state.companies.companies
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
        console.log(e.target)
        const { name, value } = e.target;
        console.log('name=>', name)
        console.log('value=>', value)

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
        console.log('key=>', key)
        console.log('value=>', value)
        setFormData({
            ...formData,
            [key]: value
        })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(formData)
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