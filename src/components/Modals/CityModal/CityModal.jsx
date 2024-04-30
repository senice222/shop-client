import React from 'react';
import style from './CityModal.module.scss'
import {Button, Form, Input, notification} from "antd";
import axios from "../../../core/axios";

const MyFormItemContext = React.createContext([]);

function toArr(str) {
    return Array.isArray(str) ? str : [str];
}

const MyFormItem = ({name, ...props}) => {
    const prefixPath = React.useContext(MyFormItemContext);
    const concatName = name !== undefined ? [...prefixPath, ...toArr(name)] : undefined;
    return <Form.Item name={concatName} {...props} />;
};

const CityModal = ({update, createModal, setCreateModal}) => {

    const onFinish = async (value) => {
        try {
            console.log(value)
            await axios.post(`/city/create`, value)
            notification.success({
                message: 'Успех.',
                description: 'Вы добавили город.',
                duration: 1.5
            });
            setCreateModal(false)
            update()
        } catch (e) {
            console.log(e)
        }
    };

    return (
        <div className={`${style.modal} ${createModal ? style.active : ""}`}
             onClick={() => setCreateModal(false)}>
            <div className={style.modalContent} onClick={(e) => e.stopPropagation()}>
                <Form
                    name="form_item_path"
                    layout="vertical"
                    onFinish={onFinish}
                >
                    <MyFormItem name="city" label="Название">
                        <Input/>
                    </MyFormItem>
                    <Button type="primary" htmlType="submit">
                        Добавить
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default CityModal;
