import { Modal } from 'antd';

const { confirm } = Modal;

  export const showConfirm = ({title, content}) => {
    confirm({
      title: title,
      content: content,
      onOk() {
        return new Promise((resolve, reject) => {
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        }).catch(() => console.log('Oops errors!'));
      },
      onCancel() {},
    });
  }


