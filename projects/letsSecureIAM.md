# **LetsSecureIAM SDK – Developer Usage Guide**

The `LetsSecureIAM` SDK is a lightweight client for securely communicating with the `letsSecure` system. It handles TLS, key management, and secure request transport internally, allowing developers to focus solely on identity and access control operations.

## **1. Installation**

Ensure your SDK is installed and aliased properly (with path aliases like `#core`, `#utils` configured via `module-alias` or similar tools).

## **2. Importing the SDK**

```js
import LetsSecureIAM from "@itsrighttime/letssecure-iam";
```

## **3. Initialization**

You must initialize the SDK before sending secure requests. This step ensures key generation, TLS certificate availability, and secure channel setup.

```js
const letsSecure = new LetsSecureIAM({
  letsSecureBaseUrl: "https://api.letssecure.com",
  decisionCaching: true,
  enforceCertPinning: true,
});

await letsSecure.initialize();
```

## **4. Core Features**

### **4.1. Access Decision**

Ask letsSecure if a specific user is allowed to perform an action on a resource.

```js
const decision = await letsSecure.getAccessDecision("user123", "fileX", "read");

console.log(decision); // { allowed: true }
```

### **4.2. Get User Permissions**

Fetch all permissions associated with a user (useful for dashboards or policy introspection).

```js
const permissions = await letsSecure.getUserPermissions("user123");

console.log(permissions); // { permissions: [...] }
```

### **4.3. Get Security Advisory**

Request policy-based advisory for a given user and resource. This provides reasoning or recommendations from the server.

```js
const advisory = await letsSecure.getSecurityAdvisory("user123", "fileX");

console.log(advisory); // { suggestedActions: [...], warnings: [...] }
```

### **4.4. Send Custom Secure Request (Advanced Use)**

Send arbitrary JSON payloads to letsSecure through the secure channel. This is intended for internal integrations or advanced flows.

```js
const response = await letsSecure.sendCustomRequest({
  userId: "user123",
  extraData: "example",
});

console.log(response);
```

## **5. Internals and Security Notes**

- **Keys & Certificates**
  The SDK automatically generates or loads:

  - Signing & encryption key pairs for secure communication
  - Self-signed TLS certificates for secure HTTPS requests

- **No Auto-Renewal for TLS**
  The built-in certificate manager **does not** support certificate expiration tracking or automatic renewal. Use with caution in long-running environments.

- **Local File Dependency**
  All key and certificate operations rely on the local file system. Ensure read/write access is available.

## **6. Configuration Options**

You may pass the following optional keys into the constructor:

| Option           | Description                              | Default              |
| ---------------- | ---------------------------------------- | -------------------- |
| `keyStoragePath` | Path to store/load local key pairs       | `./.letssecure_keys` |
| (TLS options)    | Custom TLS certs (if override supported) | `self-signed`        |

## **7. Logging**

The SDK uses a built-in `logger` utility. Ensure your logger is properly configured to view logs for debugging or tracing request flows.

## **8. Recommended Use Cases**

- Secure SDK-to-server communication over mutual TLS
- Lightweight IAM integration for microservices
- Secure RBAC enforcement at request level
- Policy insight and permission resolution at runtime

## **9. Known Limitations**

- TLS certificate is self-signed and not suitable for production internet-facing applications without a proper internal CA or signed certs.
- No key rotation, expiration monitoring, or certificate revocation support built-in (can be added externally).
- Currently synchronous for most operations; batching and retries are not supported.
