# **Package:** `@itsrighttime/socket-io`

### Scalable & High-Performance Socket.IO Management

`@itsrighttime/socket-io` is a **modular and efficient Socket.IO wrapper** designed for **real-time event handling, scalability, and performance optimization**. It includes **throttling, debouncing, compression, and Redis-based scaling** for handling large concurrent connections. The package supports **one-to-one messaging, broadcasting, room-based communication, server-wide announcements**, and **secure authentication & connection management**.

---

## **🚀 Features**

✔ **One-to-One Communication** – Secure private channels with message acknowledgment.  
✔ **Broadcasting Support** – Event broadcasting to all clients, namespaces, or filtered users.  
✔ **Room-Based Messaging** – Dynamic room joining, leaving, and targeted messaging.  
✔ **Global Announcements** – Emit messages across all namespaces and rooms.  
✔ **Connection Management** – Track user states, reconnections, and enforce connection limits.  
✔ **Performance Optimization** – **Throttling, debouncing, compression, Redis scaling** for efficiency.  
✔ **Security & Authentication** – Enforce access control, validate events, and encrypt data.  
✔ **Scalability & Load Balancing** – Redis integration and worker threads for event distribution.

---

## **📦 Installation (GitHub Package Registry)**

Authenticate with GitHub’s npm registry before installing:

### **1. Authenticate GitHub Registry**

```sh
npm login --registry=https://npm.pkg.github.com
```

### **2. Install the Package**

```sh
npm install @itsrighttime/socket-io
```

---

## **🛠 Usage Example**

### **Basic Setup with Express**

```javascript
import { Socket } from "@itsrighttime/socket-io";
import express from "express";
import http from "http";

const app = express();
const server = http.createServer(app);
const mySocket = new Socket(server);

server.listen(3000, () => console.log("Socket.IO running on port 3000"));
```

---

## **📌 Why Use `@itsrighttime/socket-io`?**

✅ **Simplifies complex Socket.IO setups**  
✅ **Reduces server load with optimized event handling**  
✅ **Provides built-in security and authentication**  
✅ **Designed for high-traffic, real-time applications**

## **📡 Socket.IO Event Management**

### **1. One-to-One Communication**

```javascript
mySocket.io.on("connection", (socket) => {
  socket.on("private-message", (data) => {
    const { recipientId, message } = data;
    socket
      .to(recipientId)
      .emit("private-message", { sender: socket.id, message });
  });
});
```

---

### **2. Broadcasting Events**

```javascript
mySocket.io.on("connection", (socket) => {
  socket.on("broadcast-message", (message) => {
    socket.broadcast.emit("broadcast-message", message);
  });
});
```

---

### **3. Room-Based Communication**

```javascript
mySocket.io.on("connection", (socket) => {
  socket.on("join-room", (room) => {
    socket.join(room);
    socket.to(room).emit("user-joined", { user: socket.id, room });
  });
});
```

---

### **4. Global Announcements**

```javascript
mySocket.io.emit("global-update", {
  message: "Server maintenance scheduled.",
});
```

---

## **🛡 Security & Connection Management**

```javascript
mySocket.io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  if (validateToken(token)) {
    return next();
  }
  return next(new Error("Unauthorized"));
});
```

---

## **📊 Performance & Scalability**

```javascript
import { Performance } from "@itsrighttime/socket-io";

const throttledUpdate = Performance.throttle((data) => {
  console.log("Data received:", data);
}, 2000);

mySocket.io.on("connection", (socket) => {
  socket.on("update", throttledUpdate);
});
```

---

## **⚙ Scalability & Load Balancing**

```javascript
import { Performance } from "@itsrighttime/socket-io";

Performance.optimizeBroadcast(mySocket.io, "news", {
  title: "New update available!",
});
```

---

## **📜 API Reference**

### **Linked Class Documentation**

| Property      | Class                                               |
| ------------- | --------------------------------------------------- |
| `auth`        | [`AuthService`](#authservice-explore)               |
| `broadcast`   | [`BroadcastService`](#broadcastservice-explore)     |
| `connection`  | [`ConnectionService`](#connectionservice-explore)   |
| `delivery`    | [`DeliveryService`](#deliveryservice-explore)       |
| `event`       | [`EventService`](#eventservice-explore)             |
| `global`      | [`GlobalService`](#globalservice-explore)           |
| `oneToOne`    | [`OneToOneService`](#onetooneservice-explore)       |
| `performance` | [`PerformanceService`](#performanceservice-explore) |
| `presence`    | [`PresenceService`](#presenceservice-explore)       |
| `room`        | [`RoomService`](#roomservice-explore)               |
| `socket`      | [`SocketService`](#SocketService-explore)           |

---

### **Linked Class Methods Documentation**

### _`AuthService`_ [(Explore)](./docs/auth.md)

| **Method**                                                          | **Description**                                    |
| ------------------------------------------------------------------- | -------------------------------------------------- |
| [`verifyToken`](./docs/auth.md#1-verifytoken)                       | Verifies a JWT token and extracts user data.       |
| [`storeUser`](./docs/auth.md#2-storeuser)                           | Stores user session data by socket ID.             |
| [`getUser`](./docs/auth.md#3-getuser)                               | Retrieves stored user session data.                |
| [`removeUser`](./docs/auth.md#4-removeuser)                         | Removes a user session when they disconnect.       |
| [`hasPermission`](./docs/auth.md#5-haspermission)                   | Checks if a user has permission for an action.     |
| [`authenticateConnection`](./docs/auth.md#6-authenticateconnection) | Middleware to authenticate WebSocket connections.  |
| [`restrictEvent`](./docs/auth.md#7-restrictevent)                   | Middleware to restrict event access by user roles. |

### _`BroadcastService`_ [(Explore)](./docs/broadcast.md)

| **Method**                                                                 | **Description**                                              |
| -------------------------------------------------------------------------- | ------------------------------------------------------------ |
| [`registerHandlers`](./docs/broadcast.md#1-registerhandlers)               | Registers event listeners for the broadcast service.         |
| [`toAll`](./docs/broadcast.md#2-toall)                                     | Sends an event to all connected clients (including sender).  |
| [`toAllExceptSender`](./docs/broadcast.md#3-toallexceptsender)             | Sends an event to all clients except the sender.             |
| [`toFilteredUsers`](./docs/broadcast.md#4-tofilteredusers)                 | Sends an event only to users matching a filter condition.    |
| [`toAllWithAck`](./docs/broadcast.md#5-toallwithack)                       | Sends an event and waits for acknowledgment from clients.    |
| [`toAllWithPriority`](./docs/broadcast.md#6-toallwithpriority)             | Sends an event with a specified priority level.              |
| [`toNamespace`](./docs/broadcast.md#7-tonamespace)                         | Sends an event to a specific namespace.                      |
| [`toNamespaceExceptSender`](./docs/broadcast.md#8-tonamespaceexceptsender) | Sends an event to all in a namespace except the sender.      |
| [`toMultipleNamespaces`](./docs/broadcast.md#9-tomultiplenamespaces)       | Sends an event to multiple namespaces.                       |
| [`toRoleBased`](./docs/broadcast.md#10-torolebased)                        | Sends an event to users with a specific role in a namespace. |
| [`toSegmentedUsers`](./docs/broadcast.md#11-tosegmentedusers)              | Sends an event to a segmented group of users in a namespace. |

### _`ConnectionService`_ [(Explore)](./docs/connection.md)

| **Method**                                                                 | **Description**                               |
| -------------------------------------------------------------------------- | --------------------------------------------- |
| [`handleConnection`](./docs/connection.md#1️-handleconnection)             | Handles a new user connection.                |
| [`registerHandlers`](./docs/connection.md#2️-registerhandlers)             | Registers lifecycle event handlers.           |
| [`enforceTimeout`](./docs/connection.md#3️-enforcetimeout)                 | Disconnects inactive users.                   |
| [`generateToken`](./docs/connection.md#4️-generatetoken-static) (static)   | Generates a JWT token for authentication.     |
| [`verifyToken`](./docs/connection.md#5️-verifytoken-static) (static)       | Verifies and decodes JWT tokens.              |
| [`isUserOnline`](./docs/connection.md#6️-isuseronline)                     | Checks if a user is currently online.         |
| [`getConnectedUsersCount`](./docs/connection.md#7️-getconnecteduserscount) | Retrieves the total count of connected users. |
| [`disconnectUser`](./docs/connection.md#8️-disconnectuser)                 | Manually disconnects a user.                  |
| [`enforceConnectionLimit`](./docs/connection.md#9️-enforceconnectionlimit) | Limits concurrent connections per user.       |
| [`monitorConnection`](./docs/connection.md#10-monitorconnection)           | Monitors WebSocket connection stability.      |

### _`DeliveryService`_ [(Explore)](./docs/delivery.md)

| **Method**                                                                  | **Description**                               |
| --------------------------------------------------------------------------- | --------------------------------------------- |
| [`emitWithRetry`](./docs/delivery.md#1-emitwithretry)                       | Sends an event with automatic retry logic.    |
| [`emitWithAcknowledgment`](./docs/delivery.md#2-emitwithacknowledgment)     | Sends an event and waits for acknowledgment.  |
| [`storeUndeliveredMessage`](./docs/delivery.md#3-storeundeliveredmessage)   | Saves undelivered messages for offline users. |
| [`retryUndeliveredMessages`](./docs/delivery.md#4-retryundeliveredmessages) | Resends stored messages when users reconnect. |

### _`EventService`_ [(Explore)](./docs/event.md)

| **Method**                                                                 | **Description**                                     |
| -------------------------------------------------------------------------- | --------------------------------------------------- |
| [`applyMiddlewares`](./docs/event.md#1-applymiddlewares)                   | Applies multiple middleware functions sequentially. |
| [`preventDuplicateListeners`](./docs/event.md#2-preventduplicatelisteners) | Prevents duplicate event registrations.             |
| [`registerEvent`](./docs/event.md#3-registerevent)                         | Dynamically registers an event.                     |
| [`unregisterEvent`](./docs/event.md#4-unregisterevent)                     | Dynamically removes an event listener.              |
| [`validateEvent`](./docs/event.md#5-validateevent)                         | Validates an event before processing.               |
| [`logEvent`](./docs/event.md#6-logevent)                                   | Logs event activity for debugging.                  |
| [`cleanupEvents`](./docs/event.md#7-cleanupevents)                         | Removes all event listeners on socket disconnect.   |

### _`GlobalService`_ [(Explore)](./docs/global.md)

| **Method**                                                          | **Description**                                                |
| ------------------------------------------------------------------- | -------------------------------------------------------------- |
| [`registerHandlers`](./docs/global.md#1-registerhandlers)           | Registers global event listeners for incoming socket messages. |
| [`toAll`](./docs/global.md#2-toall)                                 | Sends an event to all connected clients across namespaces.     |
| [`toNamespace`](./docs/global.md#3-tonamespace)                     | Sends an event to all clients in a specific namespace.         |
| [`toAllRoomsInNamespace`](./docs/global.md#4-toallroomsinnamespace) | Sends an event to all rooms within a namespace.                |
| [`toClientInNamespace`](./docs/global.md#5-toclientinnamespace)     | Sends an event to a specific client in a namespace.            |
| [`toAllRooms`](./docs/global.md#6-toallrooms)                       | Sends an event to all rooms across all namespaces.             |
| [`toSpecificUsers`](./docs/global.md#7-tospecificusers)             | Sends an event to specific users across namespaces.            |
| [`toAuthenticatedUsers`](./docs/global.md#8-toauthenticatedusers)   | Sends an event only to authenticated users.                    |
| [`toRoleBasedUsers`](./docs/global.md#9-torolebasedusers)           | Sends an event to users based on their role.                   |
| [`toDeviceBasedUsers`](./docs/global.md#10-todevicebasedusers)      | Sends an event to users based on their device type.            |
| [`toAllExceptNamespace`](./docs/global.md#11-toallexceptnamespace)  | Sends an event to all namespaces except one.                   |
| [`toSelectedNamespaces`](./docs/global.md#12-toselectednamespaces)  | Sends an event only to selected namespaces.                    |
| [`toPriorityBroadcast`](./docs/global.md#13-toprioritybroadcast)    | Sends an event based on priority levels.                       |

### _`OneToOneService`_ [(Explore)](./docs/one-to-one.md)

| **Method**                                                                            | **Description**                                                                 |
| ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| [`toSocket`](./docs/one-to-one.md#1-toSocket)                                         | Emits an event to a specific user using their socket ID.                        |
| [`toUser`](./docs/one-to-one.md#2-toUser)                                             | Emits an event to a specific user using their stored user ID.                   |
| [`toUserWithAck`](./docs/one-to-one.md#3-toUserWithAck)                               | Emits an event with acknowledgment from the receiver.                           |
| [`toUserWithRetry`](./docs/one-to-one.md#4-toUserWithRetry)                           | Emits an event with retries if acknowledgment is not received within a timeout. |
| [`secureMessage`](./docs/one-to-one.md#5-secureMessage)                               | Sends a secure direct message with authentication validation.                   |
| [`establishPrivateChannel`](./docs/one-to-one.md#6-establishPrivateChannel)           | Establishes a private communication channel between two users.                  |
| [`toNamespaceUser`](./docs/one-to-one.md#7-toNamespaceUser)                           | Emits an event to a specific user within a namespace.                           |
| [`restrictedDirectMessage`](./docs/one-to-one.md#8-restrictedDirectMessage)           | Restricts direct communication based on user roles or permissions.              |
| [`crossNamespacePrivateMessage`](./docs/one-to-one.md#9-crossNamespacePrivateMessage) | Handles private messaging across different namespaces securely.                 |

### _`PerformanceService`_ [(Explore)](./docs/performance.md)

| **Method**                                                                 | **Description**                                                |
| -------------------------------------------------------------------------- | -------------------------------------------------------------- |
| [`initRedisAdapter`](./docs/performance.md#1-initRedisAdapter)             | Initializes the Redis adapter for multi-server scalability.    |
| [`monitorConnections`](./docs/performance.md#2-monitorConnections)         | Tracks socket connection performance metrics.                  |
| [`enforceConnectionLimit`](./docs/performance.md#3-enforceConnectionLimit) | Restricts users from exceeding the allowed socket connections. |
| [`broadcastGlobalEvent`](./docs/performance.md#4-broadcastGlobalEvent)     | Sends an event to all connected clients globally.              |
| [`cleanupUnusedListeners`](./docs/performance.md#5-cleanupUnusedListeners) | Removes stale event listeners on socket disconnection.         |
| [`batchEvents`](./docs/performance.md#6-batchEvents)                       | Batches events and sends them in optimized chunks.             |

### _`PresenceService`_ [(Explore)](./docs/presence.md)

| **Method**                                              | **Description**                                                  |
| ------------------------------------------------------- | ---------------------------------------------------------------- |
| [`setUserOnline`](./docs/presence.md#1-setUserOnline)   | Marks a user as online and updates their status in Redis.        |
| [`setUserOffline`](./docs/presence.md#2-setUserOffline) | Marks a user as offline, updates last seen, and notifies others. |
| [`handleTyping`](./docs/presence.md#3-handleTyping)     | Sends typing status updates for one-to-one or group chats.       |
| [`getLastSeen`](./docs/presence.md#4-getLastSeen)       | Retrieves the last seen timestamp of a user.                     |
| [`getUserStatus`](./docs/presence.md#5-getUserStatus)   | Gets the current online/offline status of a user.                |
| [`debounceTyping`](./docs/presence.md#6-debounceTyping) | Debounces typing events to optimize performance.                 |

### _`RoomService`_ [(Explore)](./docs/room.md)

| **Method**                                                                   | **Description**                                          |
| ---------------------------------------------------------------------------- | -------------------------------------------------------- |
| [`toRoom`](./docs/room.md#1-toRoom)                                          | Emits an event to all users in a specific room.          |
| [`toRoomExceptSender`](./docs/room.md#2-toRoomExceptSender)                  | Emits an event to all users in a room except the sender. |
| [`toMultipleRooms`](./docs/room.md#3-toMultipleRooms)                        | Emits an event to multiple rooms at once.                |
| [`joinRoom`](./docs/room.md#4-joinRoom)                                      | Allows a user to join a room dynamically.                |
| [`leaveRoom`](./docs/room.md#5-leaveRoom)                                    | Allows a user to leave a room dynamically.               |
| [`toRoomWithAck`](./docs/room.md#6-toRoomWithAck)                            | Emits an event to a room with acknowledgment support.    |
| [`restrictRoomAccess`](./docs/room.md#7-restrictRoomAccess)                  | Restricts room access based on permissions.              |
| [`toRoomInNamespace`](./docs/room.md#8-toRoomInNamespace)                    | Emits an event to a room inside a specific namespace.    |
| [`toAllRoomsInNamespace`](./docs/room.md#9-toAllRoomsInNamespace)            | Emits an event to all rooms within a namespace.          |
| [`manageRoomLifecycle`](./docs/room.md#10-manageRoomLifecycle)               | Handles dynamic room creation and deletion.              |
| [`enforceNamespaceRoomAccess`](./docs/room.md#11-enforceNamespaceRoomAccess) | Enforces access control for namespace-specific rooms.    |
| [`createTemporaryRoom`](./docs/room.md#12-createTemporaryRoom)               | Creates a temporary room for ephemeral communications.   |

### _`SocketService`_ [(Explore)](./docs/socket.md)

| **Method**                                                       | **Description**                                                       |
| ---------------------------------------------------------------- | --------------------------------------------------------------------- |
| [`registerNamespace`](./docs/socket.md#1-registernamespace)      | Registers a new namespace with a handler service.                     |
| [`registerRoom`](./docs/socket.md#2-registerroom)                | Registers a new room inside a namespace.                              |
| [`toSocket`](./docs/socket.md#3-tosocket)                        | Sends a one-to-one message to a specific socket ID.                   |
| [`broadcast`](./docs/socket.md#4-broadcast)                      | Sends a broadcast message to all clients except the sender.           |
| [`broadcastAll`](./docs/socket.md#5-broadcastall)                | Sends a global broadcast to all connected clients.                    |
| [`room`](./docs/socket.md#6-room)                                | Sends a message to all clients in a specific room within a namespace. |
| [`namespaceBroadcast`](./docs/socket.md#7-namespacebroadcast)    | Sends a message to all clients in a specific namespace.               |
| [`globalBroadcast`](./docs/socket.md#8-globalbroadcast)          | Sends a message to all clients across all namespaces.                 |
| [`handleConnection`](./docs/socket.md#9-handleconnection)        | Handles new user connections and stores socket ID mapping.            |
| [`handleDisconnection`](./docs/socket.md#10-handledisconnection) | Handles user disconnection and removes socket ID mapping.             |
| [`privateMessage`](./docs/socket.md#11-privatemessage)           | Sends a private message between two users.                            |
| [`joinRoom`](./docs/socket.md#12-joinroom)                       | Adds a user to a specific room within a namespace.                    |
| [`leaveRoom`](./docs/socket.md#13-leaveroom)                     | Removes a user from a specific room within a namespace.               |

---

## **📄 License**

This package is private to itsRIGHTtime and cannot be used outside the organization without written permission.

---

## **📬 Support & Contributions**

**GitHub Repository:** [itsRIGHTtime/socket-io](https://github.com/itsrighttime/socket-io.git)
