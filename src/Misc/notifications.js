import { notificationsGetChannels, notificationsPutChannelsSubscriptions, notificationsPostChannels } from './api';

let ws;
let currentChannel;

let callbackFunctionForChatMessages = (msg) => {
  console.error('callbackFunctionForChatMessages not registered yet');
};

export const initializeNotificationsChatMessages = async (cid) => {
  try {
    const channels = await notificationsGetChannels();
    if (!Array.isArray(channels.entities) || channels.entities.length === 0) {
      currentChannel = await notificationsPostChannels();
    } else {
      currentChannel = channels.entities[0];
    }
    await notificationsPutChannelsSubscriptions(currentChannel.id, [`v2.conversations.chats.${cid}.messages`]);
    initializeWebSocket();
  } catch (err) {
    console.error(err);
  }
};

const initializeWebSocket = () => {
  if (ws) {
    ws.close();
  }
  ws = new WebSocket(currentChannel.connectUri);
  ws.onopen = () => {
    console.log('WEBSOCKET on open');
  };
  ws.onmessage = (e) => {
    const msg = JSON.parse(e.data);
    console.log('dddd', msg);
    if (msg.topicName.includes('v2.conversations.chats.') && msg.topicName.includes('.messages')) {
      if (msg.eventBody.bodyType === 'standard') {
        callbackFunctionForChatMessages(msg.eventBody.body);
      }
    }
  };

  ws.onclose = (e) => {
    ws = undefined;
  };
  ws.onerror = (err) => {
    console.error('WEBSOCKET on error');
    console.error(err);
    ws.close();
  };
};

export const registerCallbackFunctionForChatMessages = (func) => {
  callbackFunctionForChatMessages = func;
};
