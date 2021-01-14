import React, { useEffect, useState } from 'react'
import './todo-item.css';
import classNames from 'classnames';
import { DeleteTwoTone, ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal, Tag } from 'antd';
import { IPropsTodoItem } from '../../modal/iTodoList';
import moment from 'moment';

export const TodoItem = (props: IPropsTodoItem) => {
    const { confirm } = Modal;
    const [isDeadLine, setIsDeadLine] = useState<boolean>(false);
    
    useEffect(() => {
        onDeadline();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.item])

    const onDeadline = () => {
        let dateline = new Date(props.item.datetime);
        var dateNow = new Date();
        let timeSecond = (dateline.getTime() - dateNow.getTime());
        if (timeSecond < 60*15*1000) 
            setIsDeadLine(true);
        else {
            setIsDeadLine(false);
            setTimeout(() => { 
                setIsDeadLine(true); 
            }, timeSecond - 60*15*1000);
        }
    }

    const showConfirm = () => {
        confirm({
          title: 'Delete Item',
          icon: <ExclamationCircleOutlined />,
          content: 'Do you want to delete these items?',
          onOk() {
            props.delItem();
          },
          onCancel() {},
        });
    }   
    
    return (
        <div className="todo-item">
            <div className="d-flex item-left"> 
                <div onClick={props.isActiveItem} className={classNames("checkbox", {'checkbox-done' : !props.item.isActive})}></div>
                <div className={classNames("title", {'title-done' : !props.item.isActive})}>{props.item.title}</div>
                <Tag className="item-type" color="#2db7f5">{props.item.type}</Tag>     
            </div>
            <div className="d-flex item-right">
                { isDeadLine ? <Tag className="deadline" color="#f50">Deadline</Tag> : ""}
                <Tag className="item-datetime" color="#f50">{moment(props.item.datetime).format('h:mm:ss A, DD/MM/YYYY')}</Tag>    
                <DeleteTwoTone className="icon-del" twoToneColor="#ff0000" onClick={showConfirm}/>
            </div> 
        </div>
    )
}
