import { notificationsGetChannels, notificationsPutChannelsSubscriptions, notificationsPostChannels } from './api';

let ws;
let currentChannel;
let callbackFunctionForUserTargets = (presence) => {
  console.error('callbackFunctionForUserTargets not registered yet');
};

export const initializeNotifications = async (uid) => {
  try {
    const channels = await notificationsGetChannels();
    if (!Array.isArray(channels) || channels.length === 0) {
      currentChannel = await notificationsPostChannels();
    } else {
      currentChannel = channels[0];
    }
    await notificationsPutChannelsSubscriptions(currentChannel.id, [`v2.users.${uid}.presence`]);
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
    if (msg.topicName.includes('v2.users.') && msg.topicName.includes('.presence')) {
      // <user presence>
      const presence = msg.eventBody.presenceDefinition.systemPresence;
      if (presence) {
        callbackFunctionForUserTargets(presence);
      }
      // </user presence>
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

export const registerCallbackFunctionForUserTargets = (func) => {
  callbackFunctionForUserTargets = func;
};
