### **Updated `README.md` for `@itsrighttime/utils`**

# **Developer Guide: Using `@itsrighttime/utils`**

This guide provides a comprehensive overview of the `@itsrighttime/utils` package, which includes essential utility functions for **error handling, logging, validation, ID generation, formatting, and security**. These utilities help streamline development by providing ready-to-use functions for common tasks.

---

## **📌 Table of Contents**

1. [Installation](#installation)
2. [Error Handling Utilities](/docs/error.md)
3. [Logger Utilities](/docs/logger.md)
4. [Validator Utilities](/docs/validator.md)
5. [ID Generator](/docs/idGenerator.md)
6. [Date and Time Formatting](/docs/dateTime.md)
7. [General Formatters](/docs/formatter.md)
8. [String Formatters](/docs/stringFormatter.md)
9. [Security (Encryption & Decryption)](/docs/aesUtil.md)

---

## **Installation**

To use `@itsrighttime/utils` in your project, install it via npm or yarn:

```sh
npm install @itsrighttime/utils
```

Or, using Yarn:

```sh
yarn add @itsrighttime/utils
```

After installation, import the required utilities in your project:

```javascript
import { logger, errorHandler, AESUtil } from "@itsrighttime/utils";
```

---

## **Error Handling Utilities**

The error utilities simplify error management by providing a structured approach to handling exceptions.

### **🛠️ Async Error Handler (`asyncErrorHandler`)**

Handles errors in `async` functions and prevents application crashes.

```javascript
import { asyncErrorHandler } from "@itsrighttime/utils";

const fetchData = asyncErrorHandler(async (req, res) => {
  const data = await getData();
  res.json(data);
});
```

### **🚨 Common Errors (`commonErrors`)**

Predefined errors for standard HTTP responses.

```javascript
import { commonErrors } from "@itsrighttime/utils";

throw commonErrors.notFound("Requested resource not found");
```

### **🔧 Global Error Handler (`errorHandler`)**

Middleware for handling errors in Express applications.

```javascript
import express from "express";
import { errorHandler } from "@itsrighttime/utils";

const app = express();
app.use(errorHandler);
```

### **HTTP Codes (`HttpCode`)**

Provides human-readable constants for HTTP status codes.

```javascript
import { HttpCode } from "@itsrighttime/utils";

res.status(HttpCode.BAD_REQUEST).json({ error: "Invalid request" });
```

### **🛑 Custom Errors (`AppError`, `BadRequestError`, etc.)**

Use built-in error classes for better exception handling.

```javascript
import { BadRequestError } from "@itsrighttime/utils";

throw new BadRequestError("Invalid user input");
```

---

## **Logger Utilities**

The logging utilities provide structured and configurable logging.

### **📝 Basic Logger (`logger`)**

Logs messages to the console and files based on the environment.

```javascript
import { logger } from "@itsrighttime/utils";

const log = logger("MyService");
log.info("Service started successfully");
log.error("An error occurred");
```

### **📂 Folder-Based Logger (`folderLogger`)**

Stores logs in organized folders for better log management.

```javascript
import { folderLogger } from "@itsrighttime/utils";

const log = folderLogger("logs", "appLogs", "MyService");
log.warn("This is a warning message");
```

### **📌 Logger Manager (`createLoggerManager`)**

Ensures a single logger instance per service.

```javascript
import { createLoggerManager } from "@itsrighttime/utils";

const loggerManager = createLoggerManager("UserService");
loggerManager.logger.info("User service initialized");
```

---

## **Validator Utilities**

### **🔍 General Validator (`validator`)**

Provides validation functions for common data formats.

```javascript
import { validator } from "@itsrighttime/utils";

if (!validator.isEmail("test@example.com")) {
  throw new BadRequestError("Invalid email format");
}
```

---

## **ID Generator**

Generate **non-tracking and tracking IDs** easily.

### **🆔 Non-Tracking ID Generator (`idGenerator`)**

Generates unique IDs without tracking.

```javascript
import { idGenerator } from "@itsrighttime/utils";

const newId = idGenerator();
console.log("Generated ID:", newId);
```

### **Tracking ID Generator (`idGeneratorTrack`)**

Creates IDs with tracking capabilities.

```javascript
import { idGeneratorTrack } from "@itsrighttime/utils";

const trackedId = idGeneratorTrack("USER");
console.log("Tracking ID:", trackedId);
```

---

## **Date and Time Formatting**

### **Date-Time Utility (`dateTime`)**

Simplifies working with timestamps, dates, and time zones.

```javascript
import { dateTime } from "@itsrighttime/utils";

const formattedDate = dateTime.formatDate(new Date());
console.log("Formatted Date:", formattedDate);
```

---

## **General Formatters**

### **String Formatter (`StringFormatter`)**

Provides string manipulation functions.

```javascript
import { StringFormatter } from "@itsrighttime/utils";

const formattedText = StringFormatter.capitalize("hello world");
console.log("Capitalized Text:", formattedText);
```

### **Generic Formatter (`formatter`)**

Formats various data types.

```javascript
import { formatter } from "@itsrighttime/utils";

const formattedCurrency = formatter.formatCurrency(1000, "USD");
console.log("Formatted Currency:", formattedCurrency);
```

---

## **Security (Encryption & Decryption)**

### **AES Encryption Utility (`AESUtil`)**

Encrypts and decrypts data securely using AES-256-CBC.

#### **🔸 Encrypting Data**

```javascript
import { AESUtil } from "@itsrighttime/utils";

const secretKey = "01234567890123456789012345678901"; // 32-byte key
const iv = "0123456789012345"; // 16-byte IV

const aes = new AESUtil(secretKey, iv);
const encryptedData = aes.encrypt("Sensitive Data");

console.log("Encrypted:", encryptedData);
```

#### **🔹 Decrypting Data**

```javascript
const decryptedData = aes.decrypt(encryptedData);
console.log("Decrypted:", decryptedData);
```

---

## **Conclusion**

The `@itsrighttime/utils` package is a powerful collection of utilities for **error handling, logging, validation, ID generation, formatting, and encryption**. These utilities enhance development efficiency and code maintainability.

For **detailed documentation**, refer to:

- 📖 [Error Handling Guide](/docs/error.md)
- 📖 [Logger Guide](/docs/logger.md)
- 📖 [Validation Guide](/docs/validator.md)

🚀 **Start using `@itsrighttime/utils` today to improve your project's reliability and maintainability!**
