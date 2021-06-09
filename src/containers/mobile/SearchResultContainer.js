import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import ResultItem from '../../components/mobile/searchResult/ResultItem';
import qs from 'qs';
import { postRemainWorkersSearch } from '../../modules/bles';

const SearchResultCompo = styled.div`
    width: 100%;
    height: 91.2vh;
     padding-top: 10px;
    /*padding-left: 10px;
    padding-right: 10px; */
    background-color: #D4D7DE;

    .top-container{
        width: 100%;
        height: 4.7%;
        padding-left: 10px;
        padding-right: 10px;
        .list-count{
            font-size: 16px;
            color: #2E2E2E;
            font-family: NotoSansKR-Regular;
        }
    }
    .bottom-container{
        width: 100%;
        height: 95.3%;
        overflow: auto;
        padding-left: 10px;
        padding-right: 10px;
        ul.item-list-box {
            width: 100%;
            height: 100%;
            padding: 0;
            margin: 0;
            list-style: none;
        }
    }
`;


const SearchResultContainer = ({ match, history }) => {

    const { bleWorkers, bleVehicles } = useSelector(state => {
        return {
            bleWorkers: state.bles.bleWorkers,
            bleVehicles: state.bles.bleVehicles
        }
    });

    const dispatch = useDispatch();

    const [type, setType] = useState(null);

    const [items, setItems] = useState([]);


    useEffect(() => {
        const pathName = history.location.pathname;
        const splitPath = pathName.split('/');
        const currentType = splitPath[splitPath.length - 2];
        console.log(currentType)
        setType(currentType);
        console.log('SearchResultContainer->>', bleWorkers);
        if (currentType === 'worker') {
            if (bleWorkers.data) {
                setItems(bleWorkers.data);
            } else {
                const query = qs.parse(history.location.search, {
                    ignoreQueryPrefix: true
                });
                const { fromDate: from_date, toDate: to_date, localIndex: local_index, coIndex: wk_co_index, name: wk_name } = query;
                const reqObj = {
                    from_date: `${from_date} 00:00:00`,
                    to_date: `${to_date} 23:59:59`,
                    wk_name: wk_name !== 'null' ? wk_name : null,
                    local_index: local_index !== 'null' ? local_index : null,
                    wk_co_index: wk_co_index !== 'null' ? wk_co_index : null
                }
                dispatch(postRemainWorkersSearch(reqObj));
            }
        }
        else if (currentType === 'vehicle') {
            if (bleWorkers.data) {
                setItems(bleVehicles.data);
            } else {
                const query = qs.parse(history.location.search, {
                    ignoreQueryPrefix: true
                });
                const { fromDate: from_date, toDate: to_date, localIndex: local_index, coIndex: vh_co_index, name: vh_name } = query;
                const reqObj = {
                    from_date: `${from_date} 00:00:00`,
                    to_date: `${to_date} 23:59:59`,
                    vh_name: vh_name !== 'null' ? vh_name : null,
                    local_index: local_index !== 'null' ? local_index : null,
                    vh_co_index: vh_co_index !== 'null' ? vh_co_index : null
                }
                dispatch(postRemainWorkersSearch(reqObj));
            }
        }

    }, [bleWorkers.data, bleVehicles.data]);

    const itemRender = (items = []) => {
        return items.map(item =>
            item && <ResultItem type={type} item={item} />
        );
    }
     
    return (
        <SearchResultCompo>
            <div className="top-container">
                <p className="list-count">{items && `${items.length}건`}</p>
            </div>
            <div className="bottom-container">
                <ul className="item-list-box">
                    {/* <ResultItem /> */}
                    {items && itemRender(items)}
                </ul>
            </div>
        </SearchResultCompo>
    );
};

export default SearchResultContainer;