import { useState } from 'react';

type NotificationType =
    'success' |
    'notification' |
    'warning' |
    'error';

export interface NotificationInterface {
    id: string, title: string, type: NotificationType
}

function makeid(length: number) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}

const useAppNotificaions = () => {

    const [notifications, setNotifications] = useState<NotificationInterface[]>([])

    const addNotification = (value: NotificationInterface) => {
        setNotifications([...notifications, value])
    }

    const getNotifications = () => {
        return notifications
    }

    const removeNotification = (id: string | undefined) => {
        setNotifications(notifications.filter(item => item.id != id))
    }

    const addError = (title: string) => {
        console.log('error', notifications)
        setNotifications([...notifications, { id: makeid(25), title, type: 'error' }])
        console.log(notifications)
    }

    return { addNotification, addError, getNotifications, notifications, removeNotification }
}

export default useAppNotificaions