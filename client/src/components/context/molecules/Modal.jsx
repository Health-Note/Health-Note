import React from 'react';
import { Modal } from 'antd';
import moment from 'moment';

function ModalComponent({
  title,
  modalState,
  toggleModal,
  clickedDate,
  children,
  selectedMember,
  createOneSchedule,
}) {
  const handleOk = () => {
    toggleModal();
    createOneSchedule(clickedDate, selectedMember);
  };

  return (
    <>
      <Modal
        title={title}
        visible={modalState}
        onOk={handleOk}
        onCancel={toggleModal}
        mask={false}
        cancelText={'닫기'}
        okText={'확인'}
      >
        <p>{moment(clickedDate).format('MM월 DD일 HH시 mm분')}</p>
        {children}
      </Modal>
    </>
  );
}

export default ModalComponent;
