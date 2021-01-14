import React, { useState } from "react";
import { List, Divider, Button } from "antd";
import "antd/dist/antd.css";
import "./todo-list.css";
import Search from "antd/lib/input/Search";
import { TodoItem } from "./todo-item";
import { ITodoList } from "../../modal/iTodoList";
import { CreateEditTodoItem } from "./CreateEditTodoItem/create-edit-todo-item";
import { gql, useMutation, useQuery } from "@apollo/client";

export const TodoList = () => {
    const [valueTodoFilter, setValueTodoFilter] = useState<number>(0);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

    const GET_ALL_TODO = gql`
        query {
            getAllTodo{
                id
                title
                isActive
                type
                datetime
            }
        }
    `;

    const GET_ALL_ACTIVE = gql`
        mutation GetAllActive($text: String) {
            getAllActive(text: $text)
        }
    `;

    const CREATE_TODO_ITEM = gql`
        mutation CreateTodoItem ($newItem: TodoInput){
            createTodoItem(item: $newItem)
        }
    `;

    const PUT_ACTIVE_ITEM = gql`
        mutation PutItemActive ($newItem: TodoInput){
            putItemActive(item: $newItem)
        }
    `;

    const DELETE_ITEM = gql`
        mutation DeleteTodo ($id: String!){
            deleteTodo(id: $id)
        }
    `;

    const [getAllActive] = useMutation(GET_ALL_ACTIVE);
    const [createTodoItem] = useMutation(CREATE_TODO_ITEM);
    const [putItemActive] = useMutation(PUT_ACTIVE_ITEM);
    const [delTodo] = useMutation(DELETE_ITEM);

    const { loading, data:dataTodo, refetch } = useQuery(GET_ALL_TODO);
    if (loading) return <div>Loading...</div>

    const allActiveItem = async () => {
        await getAllActive();
        refetch();
    }

    const checkBoxActive = async (item:ITodoList) => {
        await putItemActive({ variables: { newItem : item }});
        refetch();
    };

    const onSearch = () => { };

    const delItem = async (item: ITodoList) => {
        await delTodo({ variables: { id: item.id} });
        refetch();
    };

    const addItem = async (item: ITodoList) => {
        await createTodoItem({ variables: { newItem : item }});
        refetch();
    }

    const filterItem = () => {
        return (valueTodoFilter===0) ? dataTodo.getAllTodo : (valueTodoFilter===1) ? dataTodo.getAllTodo.filter((e: ITodoList) => e.isActive === true) : dataTodo.getAllTodo.filter((e: ITodoList) => e.isActive === false);
    }

    const openModalTodoItem = (value: boolean) => {
        setIsModalVisible(value);
    }

    return (
        <div className="todo">
            <div className="todo-title">
                <Divider orientation="center" className="f-s-24">
                    Total List TSX
        </Divider>
            </div>
            <div className="todo-main">
                <List
                    header={
                        <div className="list-header">
                            <Button onClick={() => allActiveItem()} type="primary">
                                <div className="check-all"></div>
                            </Button>
                            <Search placeholder="Search text" onSearch={onSearch} enterButton style={{ width: 440 }} />
                            <Button onClick={() => openModalTodoItem(true)} type="primary">New Item</Button>
                        </div>
                    }
                    footer={
                        <div className="list-footer">
                            <div className="total-active">{dataTodo.getAllTodo.filter((e : ITodoList) => e.isActive === true).length} items left</div>
                            <Button onClick={() => setValueTodoFilter(0)} type="primary">All</Button>
                            <Button onClick={() => setValueTodoFilter(1)} type="primary">Active</Button>
                            <Button onClick={() => setValueTodoFilter(2)} type="primary">Completed</Button>
                        </div>
                    }
                    bordered
                    dataSource={filterItem()}
                    renderItem={(item : ITodoList) => (
                        <List.Item>
                            <TodoItem item={item} isActiveItem={() => checkBoxActive(item)} delItem={() => delItem(item)}></TodoItem>
                        </List.Item>
                    )}
                />
            </div>
            <CreateEditTodoItem isModalVisible={isModalVisible} addItem={addItem} openModalTodoItem={() => openModalTodoItem(false)}></CreateEditTodoItem>
        </div>
    );
};
