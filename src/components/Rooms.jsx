
import React, { useEffect } from 'react';


import { Space, Table, Tag } from 'antd';




const columns = [
    {
        title: 'Size',
        dataIndex: 'room_size',
        key: 'room_size',
        render: text => <span>{text}</span>,
    },
    {
        title: 'Category',
        dataIndex: 'room_category',
        key: 'room_category',
        render: text => <span>{text}</span>,
    },
    {
        title: 'People Living',
        dataIndex: 'people_living',
        key: 'people_living',
        render: text => <span>{text}</span>,
    },
    {
        title: 'Is Booked',
        dataIndex: 'is_booked',
        key: 'is_booked',
        render: text => <a>{text}</a>,
    },



];

const Rooms = () => {

    const [rooms, setRooms] = React.useState([]);

    useEffect(() => {
        fetchRooms();
    }, []);

    async function fetchRooms() {
        const res = await fetch("RoomsData.json");
        const data = await res.json();
        setRooms(data);
    }



    const onRoomDelete = async (id) => {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
            method: 'DELETE',
        });
        if (!res.ok) {
            console.error('Failed to delete room');
            return;
        }
        setRooms(rooms.filter(room => room.id !== id));
    };
    return (
        <>
            {contextHolder}
            <h2>Rooms</h2>

            <Link to="/create">
                <Button type="primary" style={{ marginBottom: '12px' }}>Create New Room</Button>
            </Link>
            <Table columns={getColumns(onRoomDelete)} dataSource={rooms} rowKey={i => i.id} />
        </>
    )
};
export default Rooms;
