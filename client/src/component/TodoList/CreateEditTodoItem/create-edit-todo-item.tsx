import React, { useEffect, useState } from 'react'
import { Button, DatePicker, Form, Input, Modal, Select } from 'antd'
import './create-edit-todo-item.css'
import { IPropsCreateEditItem } from '../../../modal/iTodoList';
import { Guid } from 'guid-typescript';

export const CreateEditTodoItem = (props: IPropsCreateEditItem) => {
    const [form] = Form.useForm();
    const { Option } = Select;
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

    useEffect(() => {
        setIsModalVisible(props.isModalVisible)
    }, [props.isModalVisible])

    const handleCancel:Function = () => {
        setIsModalVisible(false);
        props.openModalTodoItem();
        resetForm();
    };

    const layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 16 },
    };
      
    const onFinish = (values: INewTodoList) => {
        values.id = String(Guid.create());
        values.isActive = (values.isActive==='0') ? true : false;
        values.datetime = String(values.datetime);
        setIsModalVisible(false);
        props.addItem(values);
        props.openModalTodoItem();
        resetForm();
    };

    const resetForm:Function = () => {
        form.resetFields();
    }

    return (
        <div>
            <Modal title="New Item" visible={isModalVisible} onCancel={() => handleCancel()} footer={[]}>
                <Form
                    {...layout}
                    form={form}
                    name="basic"
                    initialValues={{ remember: false }}
                    onFinish={onFinish}
                    >
                    <Form.Item
                        label="Title"
                        name="title"
                        rules={[{ required: true, message: 'Please input your title!' }]}
                    >
                        <Input placeholder="Title..."/>
                    </Form.Item>

                    <Form.Item
                        label="Status"
                        name="isActive"
                        rules={[{ required: true, message: 'Please input your status!' }]}
                    >
                        <Select placeholder="Status..." allowClear>
                            <Option value="0">Active</Option>
                            <Option value="1">Completed</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Type"
                        name="type"
                        rules={[{ required: true, message: 'Please input your status!' }]}
                    >
                        <Select placeholder="Type..." allowClear>
                            <Option value="Work">Work</Option>
                            <Option value="Training">Training</Option>
                            <Option value="Outside">Outside</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Datetime"
                        name="datetime"
                        rules={[{ required: true, message: 'Please input your status!' }]}
                    >
                        <DatePicker renderExtraFooter={() => 'extra footer'} showTime />
                    </Form.Item>

                    <Form.Item className="footer-modal">
                        <div className="footer-modal">
                            <Button onClick={() => handleCancel()}>
                                Cancel
                            </Button>
                            <Button className="btn-submit" type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export interface INewTodoList {
    id: string,
    title: string,
    isActive: any, //isActive thay đổi type nên em chưa làm enum
    type: string,
    datetime: string
}
