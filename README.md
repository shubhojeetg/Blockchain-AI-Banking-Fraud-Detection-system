# Blockchain-Based AI Loan Fraud Detection System

## Overview

The Blockchain-Based AI Loan Fraud Detection System is a full-stack fintech application designed to help banks identify suspicious or fraudulent loan enquiries before loan processing.

The system analyzes customer loan enquiries using a risk-based fraud detection engine and securely stores every enquiry in a blockchain ledger to ensure data integrity and prevent tampering.

---

## Problem Statement

Banks receive a large number of loan enquiries every day. Manual verification can be time-consuming and may fail to detect suspicious patterns such as:

* Multiple enquiries using the same PAN
* Same phone number linked to different PANs
* Unusually high loan requests compared to income
* Customers requesting assets they already own
* Excessive existing loans

This project automates fraud analysis and creates a tamper-proof audit trail using blockchain technology.

---

## Key Features

### Employee Authentication

* Secure employee login
* Password hashing
* Bank employee management

### Loan Enquiry Management

* Customer information collection
* PAN validation
* Loan type selection
* Risk analysis

### Fraud Detection Engine

* Risk scoring mechanism
* Fraud classification
* Suspicious activity detection
* PAN-phone linkage analysis

### Blockchain Security

* Immutable record storage
* SHA-256 hashing
* Blockchain validation
* Tamper detection

### Dashboard Analytics

* Total enquiries
* Fraud cases
* Genuine cases
* Blockchain statistics
* Fraud analytics chart
* Recent enquiries table

---

## Technology Stack

### Frontend

* React.js
* Tailwind CSS
* Axios
* React Router
* Chart.js

### Backend

* FastAPI
* Python

### Database

* MongoDB

### Security & Blockchain

* SHA-256 Hashing
* Custom Blockchain Implementation

---

## System Architecture

```text
Bank Employee
      │
      ▼
React Frontend
      │
      ▼
FastAPI Backend
      │
 ┌────┴────┐
 ▼         ▼
Fraud      MongoDB
Engine     Database
 │
 ▼
Blockchain
Ledger
```

---

## Application Workflow

### Step 1

Employee logs into the system.

### Step 2

Employee creates a loan enquiry.

### Step 3

Backend validates PAN number.

### Step 4

Fraud Detection Engine calculates risk score.

### Step 5

Enquiry is classified as:

* Genuine
* Suspicious
* Fraud

### Step 6

Enquiry is stored in MongoDB.

### Step 7

Blockchain block is generated.

### Step 8

Dashboard analytics update automatically.

---

## Fraud Detection Logic

The project currently uses a rule-based AI fraud detection system.

### Rules Used

#### High Loan Amount

If:

```text
Requested Amount > Annual Income × 5
```

Risk score increases.

---

#### Existing Loans

If:

```text
Existing Loans >= 3
```

Risk score increases.

---

#### Duplicate Asset Request

Example:

```text
Owns Car = True
Loan Type = Car Loan
```

Risk score increases.

---

#### Multiple PAN Enquiries

If multiple enquiries exist using the same PAN number:

```text
Risk score increases.
```

---

#### Same Phone Number with Different PANs

If one phone number is associated with multiple PAN numbers:

```text
Risk score increases significantly.
```

---

## Risk Classification

| Risk Score | Classification |
| ---------- | -------------- |
| 0 – 29     | Genuine        |
| 30 – 59    | Suspicious     |
| 60+        | Fraud          |

---

## Blockchain Implementation

Each enquiry is converted into a blockchain block.

### Block Structure

```json
{
  "index": 1,
  "timestamp": "2025-01-01",
  "data": {},
  "previous_hash": "...",
  "hash": "..."
}
```

### Block Contents

* Block Index
* Timestamp
* Enquiry Data
* Previous Hash
* Current Hash

### Security

Every block references the previous block hash.

If any block is modified:

* Hash changes
* Chain becomes invalid
* Validation fails

---

## Database Collections

### bank_users

Stores employee accounts.

```json
{
  "employee_id": "EMP101",
  "password": "hashed_password"
}
```

### enquiries

Stores all loan enquiries.

### blockchain

Stores blockchain records.

---

## APIs

### Authentication

#### Register Employee

```http
POST /register
```

#### Employee Login

```http
POST /login
```

---

### Loan Processing

#### Create Loan Enquiry

```http
POST /loan-enquiry
```

---

### Dashboard

#### Dashboard Statistics

```http
GET /dashboard-stats
```

#### Recent Enquiries

```http
GET /recent-enquiries
```

---

### Blockchain

#### View Blockchain

```http
GET /blockchain
```

#### Validate Blockchain

```http
GET /validate-blockchain
```

---

## Screenshots

### Login Page

Add screenshot:

```text
screenshots/login.png
```

### Dashboard

Add screenshot:

```text
screenshots/dashboard.png
```

### Loan Enquiry Form

Add screenshot:

```text
screenshots/enquiry.png
```

### Blockchain Viewer

Add screenshot:

```text
screenshots/blockchain.png
```

---

## Future Enhancements

* Machine Learning Fraud Detection Model
* OCR PAN Verification
* Aadhaar Verification
* JWT Authentication
* Role-Based Access Control
* Docker Deployment
* Cloud Deployment
* Kafka Event Streaming

---

## Interview Highlights

This project demonstrates:

* Full Stack Development
* REST API Development
* MongoDB Integration
* React Frontend Development
* Fraud Detection Systems
* Blockchain Concepts
* Data Integrity Validation
* Secure Application Design

---

## Author

**Shubhojeet Ghosh**
**Shreyasi Mitra**

Blockchain-Based AI Loan Fraud Detection System

Built using React, FastAPI, MongoDB, and Blockchain Technology.
