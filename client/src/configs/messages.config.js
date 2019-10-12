import { message } from 'antd';

export const setupMessagesConfig = () => message.config({
	duration: 2,
	maxCount: 1
});
