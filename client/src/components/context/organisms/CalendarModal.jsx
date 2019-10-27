import React, { useState } from 'react';
import Modal from '../molecules/Modal';
import AntdSelect from '../atoms/AntdSelect';

function CalendarModal({
  title,
  modalState,
  toggleModal,
  clickedDate,
  createOneSchedule,
  members,
}) {
  const [selectedMember, setMember] = useState({});
  return (
    <>
      <Modal
        title={title}
        modalState={modalState}
        toggleModal={toggleModal}
        clickedDate={clickedDate}
        selectedMember={selectedMember}
        createOneSchedule={createOneSchedule}
      >
        <AntdSelect members={members} setMember={setMember}/>
      </Modal>
    </>
  );
}

export default CalendarModal;
