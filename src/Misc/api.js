import { getToken } from './sessionStorage';

var apiEnv = null;
var apiCid = null;

export const setEnv = (v) => (apiEnv = v);
export const setCid = (v) => (apiCid = v);

const handleResponse = (response) => {
  // for fetch
  if (response.ok) return response.json();
  if (response.status < 200 || response.status > 299) handleError(response);
};

const handleError = (resp) => {
  console.error('API call failed: [' + resp.status + '] ' + resp.statusText);
  if (resp.status === 401) {
    window.location.href = `login.html?en=${apiEnv}&ci=a5ae6ff5-841e-46cb-833e-46f6bde5ddb6&ta=${encodeURIComponent(`/?env=${apiEnv}&cid=${apiCid}`)}`;
    return;
  }
  throw new Error(resp.statsuText);
};

export const getMe = async () => {
  const gcToken = getToken();
  try {
    const resp = await fetch(`https://api.${apiEnv}/api/v2/users/me`, {
      method: 'GET',
      headers: {
        Authorization: `bearer ${getToken()}`,
        'Content-Type': 'application/json',
      },
    });
    return handleResponse(resp);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getNotificationChannel = async () => {
  const gcToken = getToken();
  try {
    const resp = await fetch(`https://api.${apiEnv}/api/v2/users/me`, {
      method: 'GET',
      headers: {
        Authorization: `bearer ${getToken()}`,
        'Content-Type': 'application/json',
      },
    });
    return handleResponse(resp);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const notificationsGetChannels = async () => {
  const gcToken = getToken();
  try {
    const resp = await fetch(`https://api.${apiEnv}/api/v2/notifications/channels`, {
      method: 'GET',
      headers: {
        Authorization: `bearer ${getToken()}`,
        'Content-Type': 'application/json',
      },
    });
    return handleResponse(resp);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const notificationsPostChannels = async () => {
  const gcToken = getToken();
  try {
    const resp = await fetch(`https://api.${apiEnv}/api/v2/notifications/channels`, {
      method: 'POST',
      headers: {
        Authorization: `bearer ${getToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    });
    return handleResponse(resp);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const notificationsPutChannelsSubscriptions = async (channelId, body) => {
  const gcToken = getToken();
  try {
    const resp = await fetch(`https://api.${apiEnv}/api/v2/notifications/channels/${channelId}/subscriptions`, {
      method: 'PUT',
      headers: {
        Authorization: `bearer ${getToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    return handleResponse(resp);
  } catch (error) {
    console.error(error);
    throw error;
  }
};
