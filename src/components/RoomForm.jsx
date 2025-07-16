import { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import {
    Button,
    Form,
    Input,
    InputNumber,
    Select,
    Space,
    Upload,
} from 'antd';
import { createRoom, editRoom, getRoomById, loadRoom } from '../services/Room.service';
import { useMessage } from '../hooks/useMessage';
import { useNavigate, useParams } from 'react-router-dom';
const { TextArea } = Input;

const normFile = (e) => {
    return e?.file.originFileObj;
};

const tailLayout = {
    wrapperCol: { offset: 4, span: 16 },
};

const RoomForm = () => {

    const { contextHolder, showSuccess, showError } = useMessage();
    const navigate = useNavigate();
    let params = useParams();
    const [editMode, setEditMode] = useState(false);

    const [form] = Form.useForm();

    useEffect(() => {


        if (params.id) {
            setEditMode(true);
            loadProductData(params.id);
        }
    }, []);


    async function loadRoomData(id) {
        const product = await getRoomById(id);
        form.setFieldsValue(product);
    }

    const onSubmit = async (item) => {
        let res = false;

        if (editMode) {
            item.id = params.id;
            res = await editRoom(item);
        }
        else {
            res = await createRoom(item);
        }

        if (!res)
            showError(`Failed to ${editMode ? "update" : "create"} Room!`);
        else {
            showSuccess(`Room ${editMode ? "updated" : "created"} successfully!`);
            // TODO: show success message globally
            // navigate('/products');
        }
    }
    const onCancel = () => {
        navigate(-1);
    };

    return (
        <>
            {contextHolder}
            <h2>{editMode ? "Edit Room" : "Create New Room"}</h2>
            <Form
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                style={{ maxWidth: 600 }}
                onFinish={onSubmit}
                form={form}
            >
                <Form.Item label="Title" name="title" rules={[
                    {
                        required: true,
                        message: 'Please input the Room title!',
                    },
                ]}>
                    <Input />
                </Form.Item>

                <Form.Item label="Description" name="description" rules={[
                    {
                        minLength: 10,
                    },
                ]}>
                    <TextArea rows={3} />
                </Form.Item>

                <Form.Item label="Category" name="category">
                    <Select
                        options={categories.map(cat => ({ label: cat.id || cat, value: cat }))}
                    />
                </Form.Item>

                <Form.Item label="Price" name="price" initialValue={100} rules={[
                    {
                        min: 0,
                        type: 'number',
                        message: 'Price must be a positive number!',
                    },
                ]}>
                    <InputNumber addonAfter="$" />
                </Form.Item>

                {/* <Form.Item label="Upload" name="image" valuePropName="fileList" getValueFromEvent={normFile}>
                    <Upload multiple={false} action="/upload.do" listType="picture-card">
                        <button
                            style={{ color: 'inherit', cursor: 'inherit', border: 0, background: 'none' }}
                            type="button"
                        >
                            <PlusOutlined />
                            <div style={{ marginTop: 8 }}>Upload</div>
                        </button>
                    </Upload>
                </Form.Item> */}
                <Form.Item
                    name="image"
                    label="Image URL"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the room image URL!',
                        },
                    ]}
                >
                    <Input placeholder="Enter room image URL" />
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Space>
                        <Button type="primary" htmlType="submit">
                            {editMode ? "Edit" : "Create"}
                        </Button>
                        <Button htmlType="button" onClick={onCancel}>
                            Cancel
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </>
    );
};
export default () => <RoomForm />;