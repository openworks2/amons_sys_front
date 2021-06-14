import React from 'react';
import { Button, Header, Modal } from 'semantic-ui-react';
import '../../../css/ModalComponent.css'


const ModalComponent = ({ open, onModalClose, modalObj, onDispatchByDrillRate }) => {

    const { action, record_date, local, length, description } = modalObj;

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

    return (
        <Modal
            className="modal-container"
            size={'mini'}
            open={open}
        >
            <Modal.Header className="modal-title">{action === 'insert' ? '등록' : '수정'}</Modal.Header>
            <Modal.Content>
                <Modal.Description>
                    <div className="modal-description">
                        <span className="desc-title">노&emsp;&emsp;&emsp;선:</span>
                        &nbsp;&nbsp;
                        <span className="modal-value">{local}</span>
                    </div>
                    <div className="modal-description">
                        <span className="desc-title">누적 굴진량:</span>
                        &nbsp;&nbsp;
                        <span className="modal-value"> {`${numberOfDigitsHandler(length)}m`}</span>
                    </div>
                    <div className="modal-description">
                        <span className="desc-title"> 입&emsp;력&emsp;일:</span>
                        &nbsp;&nbsp;
                        <span className="modal-value">{record_date}</span>
                    </div>
                    <div className="modal-description">
                        <span className="desc-title">비&emsp;&emsp;&emsp;고:</span>
                        &nbsp;&nbsp;
                        <span className="modal-value" id="description-value">{description}</span>
                    </div>
                    <Header>
                        위에 정보를&nbsp;<span className="action-text">{action === 'insert' ? '등록' : '수정'}</span>&nbsp;하시겠습니까?
                    </Header>
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button
                    className="cancle-button"
                    content="취소"
                    labelPosition='left'
                    icon='close'
                    color='grey'
                    onClick={onModalClose}
                >
                </Button>
                <Button
                    className="positive-button"
                    content={action === 'insert' ? '등록' : '수정'}
                    labelPosition='left'
                    icon='checkmark'
                    onClick={() => onDispatchByDrillRate()}
                />
            </Modal.Actions>
        </Modal>
    );
};

export default ModalComponent;