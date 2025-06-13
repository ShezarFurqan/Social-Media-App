Auth

POST /auth/register - Register ✅

POST /auth/login - Login ✅

🔹 Users

GET /users/:id - Get profile ✅

PUT /users/:id - Edit profile ✅

DELETE /users/:id - Delete account ✅

PUT /users/:id/follow - Follow/unfollow ✅

🔹 Posts

POST /posts/ - Create post ✅

GET /posts/ - Get all posts ✅

GET /posts/:id - Get post by ID ✅

PUT /posts/:id/like - Like/unlike post ✅

POST /posts/:id/comment - Comment on post ✅

DELETE /posts/:id - Delete post ✅

🔹 Chat / Messages

GET /chats/:userId - Get user chats ✅

POST /chats - Create chat

POST /messages - Send message

GET /messages/:chatId - Get messages

🔹 Notifications

GET /notifications/:userId ✅

PUT /notifications/mark-read/:userId ✅