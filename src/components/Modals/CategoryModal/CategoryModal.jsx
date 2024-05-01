import React, {useEffect, useState} from 'react';
import style from './CategoryModal.module.scss'
import {Button, Form, Input, notification, Select} from "antd";
import axios from "../../../core/axios";

const MyFormItemContext = React.createContext([]);

function toArr(str) {
    return Array.isArray(str) ? str : [str];
}

const MyFormItem = ({ name, ...props }) => {
    const prefixPath = React.useContext(MyFormItemContext);
    const concatName = name !== undefined ? [...prefixPath, ...toArr(name)] : undefined;
    return <Form.Item name={concatName} {...props} />;
};

const CategoryModal = ({ update, createModal, setCreateModal }) => {
    const [cities, setCities] = useState()
    const [cityCheckbox, setCityCheckbox] = useState()

    const onFinish = async (value) => {
        try {
            await axios.post(`/category/create`, value)
            notification.success({
                message: 'Успех.',
                description: 'Вы добавили категорию.',
                duration: 1.5
            });
            setCreateModal(false)
            update()
        } catch (e) {
            console.log(e)
        }
    };

    useEffect(() => {
        const getCity = async () => {
            try {
                const { data } = await axios.get('/city/list')
                setCities(data)
            } catch (e) {
                console.log(e)
            }
        }
        getCity()
    }, [])
    return (
        <div className={`${style.modal} ${createModal ? style.active : ""}`}
            onClick={() => setCreateModal(false)}>
            <div className={style.modalContent} onClick={(e) => e.stopPropagation()}>
                <Form
                    name="form_item_path"
                    layout="vertical"
                    onFinish={onFinish}
                >
                    <MyFormItem name="category" label="Название">
                        <Input />
                    </MyFormItem>
                    <MyFormItem name="city" label="Город">
                        {cities ? <Select
                            defaultValue="Выберите город"
                            style={{ zIndex: "10000 !important" }}
                            onChange={setCityCheckbox}
                            options={
                                cities.map((item) => {
                                    return {
                                        value: item.city, label: item.city
                                    }
                                })
                            }
                        /> : <p>Loading...</p>}
                    </MyFormItem>
                    <Button type="primary" htmlType="submit">
                        Добавить
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default CategoryModal;
