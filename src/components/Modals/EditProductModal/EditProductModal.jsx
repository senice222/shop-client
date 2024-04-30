import React, {useEffect, useState} from 'react';
import style from './EditProductModal.module.scss'
import {Button, Form, Input, notification} from 'antd';
import axios from "../../../core/axios";
import {Select} from 'antd'


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
        city: '',
        gramm: '',
        price: '',
    });
    const {title, category, gramm, city, price} = values;
    const [categories, setCategories] = useState()
    const [cities, setCities] = useState()

    useEffect(() => {
        const getCategories = async () => {
            try {
                const {data} = await axios.get('/category/list')
                setCategories(data)
            } catch (e) {
                console.log(e)
            }
        }
        const getCity = async () => {
            try {
                const {data} = await axios.get('/city/list')
                setCities(data)
            } catch (e) {
                console.log(e)
            }
        }
        getCity()
        getCategories()
    }, [])

    const handleCategory = (item) => {
        setValues(prevValues => ({
            ...prevValues,
            category: item
        }));
    }

    const handleCity = (item) => {
        setValues(prevValues => ({
            ...prevValues,
            city: item
        }));
    }

    const loadProfile = () => {
        setValues(prev => {
            return {
                ...prev,
                title: product?.title,
                category: product?.category,
                city: product?.city,
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
                            name: ["city"],
                            value: city,
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
                            style={{width: '95%', zIndex: "999999"}}
                            onChange={handleCategory}
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
                        {cities ? <Select
                            defaultValue={category}
                            style={{width: '95%', zIndex: "999999"}}
                            onChange={handleCity}
                            options={
                                cities.map((item) => {
                                    return {
                                        value: item.city, label: item.city
                                    }
                                })
                            }
                        /> : <p>Loading...</p>}
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
