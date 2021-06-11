import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Form } from 'semantic-ui-react';

const ProcessFormCompo = styled.div`
    width: 100%;
    height: 100%;
    padding-top: 26px;
    padding-left: 20px;
    padding-right: 20px;
    .form-container{
        width: 100%;
        height: 100%;
        /* background-color: aliceblue; */
        padding-bottom: 15px;
        label{
            font-family: NotoSansKR-Regular;
            font-size: 14px;
        }
        .grouped.fields > label{
            font-family: NotoSansKR-Medium;

        }
        .field {
            margin-bottom: 16px !important;
            i.caret.down.icon {
                position: absolute;
                right: 10px;
            }
        }
        input[type='radio'] {
            background-color: rgba(255, 255, 255, 1) !important;
            border: 1px solid #D6D6D7 ;
            margin-right: 5px;
        }
        .submit-button{
            /* position: fixed;
            bottom: 74px; */
            width: calc(100% - 43px);
            padding-bottom: 20px !important;
            button {
                width: 22rem;
                height: 55px;
                background-color: #F1592A;
                font-family: NotoSansKR-Medium;
                font-weight: 100;
                color: #fff;
                font-size: 18px;
            }
        }

    }

`;

const ProcessForm = ({
    options,
    onSelectItem,
    formData,
    onRadioChange,
    onSubmit
}) => {

    const code = {
        1: '미착공',
        2: '천공',
        3: '장약',
        4: '발파',
        5: '버력처리',
        6: '숏크리트',
        7: '강지보',
        8: '격자지보',
        9: '록볼트',
        10: '방수시트',
        11: '라이닝',
        12: '근무교대',
        13: '장비점검',
        14: '기타',
    }
    const { local_index, pcs_state, prev_pcs_state } = formData;
    useEffect(() => {

    }, []);

    console.log('prev_pcs_state-->', prev_pcs_state)
    return (
        <ProcessFormCompo className="processForm-component">
            <div className="form-container">
                <Form className="process-form" onSubmit={onSubmit}>
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
                    <Form.Group grouped>
                        <label>현재공정</label>
                        <Form.Field
                            label={code[prev_pcs_state]}
                            control='input'
                            type='radio'
                            name='current_process'
                            checked
                        />
                    </Form.Group>
                    <Form.Group grouped>
                        <label>공정상태 선택</label>
                        <Form.Field
                            label='미착공'
                            control='input'
                            type='radio'
                            name='1'
                            onChange={onRadioChange}
                            checked={pcs_state === 1}
                            disabled={prev_pcs_state === 1}
                        />
                        <Form.Field
                            label='천공'
                            control='input'
                            type='radio'
                            name='2'
                            onChange={onRadioChange}
                            checked={pcs_state === 2}
                            disabled={prev_pcs_state === 2}
                        />
                        <Form.Field
                            label='장약'
                            control='input'
                            type='radio'
                            name='3'
                            onChange={onRadioChange}
                            checked={pcs_state === 3}
                            disabled={prev_pcs_state === 3}
                        />
                        <Form.Field
                            label='발파'
                            control='input'
                            type='radio'
                            name='4'
                            onChange={onRadioChange}
                            checked={pcs_state === 4}
                            disabled={prev_pcs_state === 4}
                        />
                        <Form.Field
                            label='버력처리'
                            control='input'
                            type='radio'
                            name='5'
                            onChange={onRadioChange}
                            checked={pcs_state === 5}
                            disabled={prev_pcs_state === 5}
                        />
                        <Form.Field
                            label='숏크리트'
                            control='input'
                            type='radio'
                            name='6'
                            onChange={onRadioChange}
                            checked={pcs_state === 6}
                            disabled={prev_pcs_state === 6}
                        />
                        <Form.Field
                            label='강지보'
                            control='input'
                            type='radio'
                            name='7'
                            onChange={onRadioChange}
                            checked={pcs_state === 7}
                            disabled={prev_pcs_state === 7}
                        />
                        <Form.Field
                            label='격자지보'
                            control='input'
                            type='radio'
                            name='8'
                            onChange={onRadioChange}
                            checked={pcs_state === 8}
                            disabled={prev_pcs_state === 8}
                        />
                        <Form.Field
                            label='록볼트'
                            control='input'
                            type='radio'
                            name='9'
                            onChange={onRadioChange}
                            checked={pcs_state === 9}
                            disabled={prev_pcs_state === 9}
                        />
                        <Form.Field
                            label='방수시트'
                            control='input'
                            type='radio'
                            name='10'
                            onChange={onRadioChange}
                            checked={pcs_state === 10}
                            disabled={prev_pcs_state === 10}
                        />
                        <Form.Field
                            label='라이닝'
                            control='input'
                            type='radio'
                            name='11'
                            onChange={onRadioChange}
                            checked={pcs_state === 11}
                            disabled={prev_pcs_state === 11}
                        />
                        <Form.Field
                            label='근무교대'
                            control='input'
                            type='radio'
                            name='12'
                            onChange={onRadioChange}
                            checked={pcs_state === 12}
                            disabled={prev_pcs_state === 12}
                        />
                        <Form.Field
                            label='장비점검'
                            control='input'
                            type='radio'
                            name='13'
                            onChange={onRadioChange}
                            checked={pcs_state === 13}
                            disabled={prev_pcs_state === 13}
                        />
                        <Form.Field
                            label='기타'
                            control='input'
                            type='radio'
                            name='14'
                            onChange={onRadioChange}
                            checked={pcs_state === 14}
                            disabled={prev_pcs_state === 14}
                        />
                        <Form.Button
                            className="submit-button"
                            disabled={pcs_state === prev_pcs_state}
                        >등록</Form.Button>
                    </Form.Group>
                </Form>
            </div>
        </ProcessFormCompo>
    );
};

export default ProcessForm;