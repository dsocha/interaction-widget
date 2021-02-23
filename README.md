# Sample Interaction Widget

This application is a sample Interaction Widget for Genesys Cloud. It shows how to create the widget in React JS that handles ClientApp SDK, Platform API, Notifications.

- To launch the widget locally you will need to execute following commands:

  - yarn install
  - yarn start

- The application expects following query string parameters to be provided:

  - env - GC enviroinment
  - cid - an id of current conversation
  - oau - a client id of oAuth client (implicint grant)

- Useful documentation links:

  - https://help.mypurecloud.com/articles/set-up-an-interaction-widget-integration/
  - https://help.mypurecloud.com/articles/create-an-oauth-client/
  - https://developer.mypurecloud.com/api/client-apps/sdk/index.html
  - https://developer.mypurecloud.com/api/rest/
  - https://developer.mypurecloud.com/api/rest/v2/notifications/notification_service.html

- See an example url that you can use when configuring the interaction widget in your Genesys Cloud organization (replace 1234 with a real client id):

```
https://localhost:3000?env={{pcEnvironment}}&cid={{pcConversationId}}&oau=1234
```
