import React, {useEffect, useState} from 'react';
import style from './EditProductModal.module.scss'
import {Button, Form, Input, notification} from 'antd';
import axios from "../../../core/axios";
import { Select } from 'antd'


const MyFormItemContext = React.createContext([]);

function toArr(str) {
    return Array.isArray(str) ? str : [str];
}

const MyFormItem = ({name, ...props}) => {
    const prefixPath = React.useContext(MyFormItemContext);
    const concatName = name !== undefined ? [...prefixPath, ...toArr(name)] : undefined;
    return <Form.Item name={concatName} {...props} />;
};

const EditProductModal = ({product, modal, setModal}) => {
    const [values, setValues] = useState({
        title: '',
        category: '',
        gramm: '',
        price: '',
    });
    const {title, category, gramm, price} = values;
    const [category2, setCategory2] = useState()
    const [categories, setCategories] = useState()

    useEffect(() => {
        const getCategories = async () => {
            try {
                const {data} = await axios.get('/category/list')
                    setCategories(data)    
                    console.log(categories)     
            } catch (e) {
                console.log(e)
            }
        }
        getCategories()
    }, [ ])
    const handleCategory = (item) => {
        setValues({
            title: values.title,
            category: item,
            gramm: values.gramm,
            price: values.price
        })
    }
    const loadProfile = () => {
        setValues(prev => {
            return {
                ...prev,
                title: product?.title,
                category: product?.category, // тут категория из бд должна быть
                gramm: product?.gramm,
                price: product?.price
            };
        });
    }

    useEffect(() => {
        loadProfile();
    }, [product]);

    const onFinish = async (value) => {
        try {
            await axios.put(`/editProduct/${product?._id}`, value)
            notification.success({
                message: 'Успех.',
                description: 'Перезагрузите страницу.',
                duration: 1.5
            });
        } catch (e) {
            console.log(e)
        }
    };

    return (
        <div className={modal ? `${style.modal} ${style.active}` : style.modal}
             onClick={() => setModal(false)}>
            <div className={style.modalContent} onClick={(e) => e.stopPropagation()}>
                <Form
                    name="form_item_path"
                    layout="vertical"
                    onFinish={onFinish}
                    fields={[
                        {
                            name: ["title"],
                            value: title,
                        },
                        {
                            name: ["category"],
                            value: category,
                        },
                        {
                            name: ["gramm"],
                            value: gramm,
                        },
                        {
                            name: ["price"],
                            value: price,
                        },
                    ]}
                >
                    <MyFormItem name="title" label="Название">
                        <Input/>
                    </MyFormItem>
                    <MyFormItem name="category" label="Категория">
                    {categories ? <Select
                            defaultValue={category}
                            style={{ width: '95%', zIndex: "999999" }}
                            onChange={handleCategory}
                            options={
                                categories.map((item) => {
                                    return {
                                        value: item.category, label: item.category
                                    }
                                })
                            }
                        />   : <p>Loading...</p>} 
                    </MyFormItem>
                    <MyFormItem name="gramm" label="Грамм">
                        <Input/>
                    </MyFormItem>
                    <MyFormItem name="price" label="Цена">
                        <Input/>
                    </MyFormItem>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default EditProductModal;
