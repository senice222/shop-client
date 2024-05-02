import React, { useEffect, useState } from 'react';
import style from './AddModal.module.scss'
import { Button, Form, Input, notification } from "antd";
import axios from "../../../core/axios";
import { Select } from 'antd';
import UploadButton from "../../UploadButton/UploadButton";
import instance from '../../../core/axios';

const MyFormItemContext = React.createContext([]);

function toArr(str) {
    return Array.isArray(str) ? str : [str];
}

const MyFormItem = ({ name, ...props }) => {
    const prefixPath = React.useContext(MyFormItemContext);
    const concatName = name !== undefined ? [...prefixPath, ...toArr(name)] : undefined;
    return <Form.Item name={concatName} {...props} />;
};


const AddModal = ({ createModal, setCreateModal, update }) => {
    const [fileList, setFileList] = useState();
    const [category, setCategory] = useState()
    const [cityCheckbox, setCityCheckbox] = useState()
    const [city, setCity] = useState([])
    const [categories, setCategories] = useState()

    useEffect(() => {
        const getCategories = async () => {
            try {
                const { data } = await instance.get('/category/list')
                setCategories(data)
            } catch (e) {
                console.log(e)
            }
        }
        const getCity = async () => {
            try {
                const { data } = await instance.get('/city/list')
                setCity(data)
            } catch (e) {
                console.log(e)
            }
        }
        getCity()
        getCategories()
    }, [])

    const onFinish = async (value) => {
        const formData = new FormData();
        formData.append("title", value.title);
        formData.append("gramm", value.gramm);
        formData.append("city", cityCheckbox);
        formData.append("category", category);
        formData.append("price", value.price);
        fileList?.forEach(item => formData.append("image", item.originFileObj))

        try {
            const { data } = await axios.post(`/createProduct`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (data._id) {
                update()
                setCreateModal(false)
            }
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div className={createModal ? `${style.modal} ${style.active}` : style.modal}
            onClick={() => setCreateModal(false)}>
            <div className={style.modalContent} onClick={(e) => e.stopPropagation()}>
                <Form
                    name="form_item_path"
                    layout="vertical"
                    onFinish={onFinish}
                >
                    <MyFormItem name="image" label="Название">
                        <UploadButton
                            setFileList={setFileList}
                        />
                    </MyFormItem>
                    <MyFormItem name="title" label="Название">
                        <Input />
                    </MyFormItem>
                    <MyFormItem name="category" label="Категория">
                        {categories ? <Select
                            defaultValue="Выберите категорию"
                            style={{ width: '95%', zIndex: "999999" }}
                            onChange={setCategory}
                            options={
                                categories.map((item) => {
                                    return {
                                        value: item.category, label: item.category
                                    }
                                })
                            }
                        /> : <p>Loading...</p>}
                    </MyFormItem>
                    <MyFormItem name="city" label="Город">
                        {city ? <Select
                            defaultValue="Выберите город"
                            style={{ width: '95%', zIndex: "999999" }}
                            onChange={setCityCheckbox}
                            options={
                                city.map((item) => {
                                    return {
                                        value: item.city, label: item.city
                                    }
                                })
                            }
                        /> : <p>Loading...</p>}
                    </MyFormItem>
                    <MyFormItem name="gramm" label="Грамм">
                        <Input />
                    </MyFormItem>
                    <MyFormItem name="price" label="Цена">
                        <Input />
                    </MyFormItem>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default AddModal;
