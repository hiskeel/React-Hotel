import { message } from "antd";
import axios from "axios";

const deleteRoom = async (id) => {
    try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return true;
    } catch (error) {
        console.error('Error deleting Room:', error);
        return false;
    }
}

const loadRoom = async () => {
    try {
        const response = await fetch(`https://fakestoreapi.com/products/categories`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error deleting Room:', error);
        return null;
    }
}

const createRoom = async (model) => {
    try {
        const res = await axios.post(`https://fakestoreapi.com/products`, model);
        return res.data;
    } catch (error) {
        console.error('Error deleting Room:', error);
        return null;
    }
}

const editRoom = async (model) => {
    try {
        const res = await axios.put(`https://fakestoreapi.com/products/${model.id}`, model);
        return res.data;
    } catch (error) {
        console.error('Error updating product:', error);
        return null;
    }
}

const getRoomById = async (id) => {
    try {
        const res = await axios.get(`https://fakestoreapi.com/products/${id}`);
        return res.data;
    } catch (error) {
        console.error('Error getting Room by ID', error);
        return null;
    }
}

export { deleteRoom, loadRoom, createRoom, getRoomById, editRoom }