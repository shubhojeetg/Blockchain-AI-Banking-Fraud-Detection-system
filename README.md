# Blockchain-Based AI Loan Fraud Detection System

## Overview

The Blockchain-Based AI Loan Fraud Detection System is a full-stack fintech application that helps banks identify suspicious and fraudulent loan enquiries before processing loans.

The system performs fraud analysis using a risk-based AI logic engine and stores every enquiry inside a blockchain ledger to ensure data integrity, transparency, and tamper-proof record keeping.

---

## Project Highlights

* Full Stack Application
* Fraud Detection Engine
* Blockchain-Based Record Storage
* Real-Time Dashboard Analytics
* Employee Authentication System
* MongoDB Integration
* React + FastAPI Architecture

---

## Problem Statement

Banks receive a large number of loan enquiries every day.

Manual verification can miss suspicious activities such as:

* Multiple enquiries using the same PAN
* Same phone number linked to multiple PAN cards
* Unusually large loan requests
* Customers hiding existing liabilities
* Duplicate asset loan requests

This project automates fraud detection and creates an immutable blockchain audit trail for every enquiry.

---

## Features

### Employee Authentication

* Secure Login System
* Employee Registration
* Password Hashing

### Loan Enquiry Processing

* Customer Information Collection
* PAN Validation
* Loan Type Selection
* Risk Analysis

### Fraud Detection

* Risk Score Calculation
* Genuine Classification
* Suspicious Classification
* Fraud Classification

### Blockchain Security

* Blockchain Ledger
* SHA-256 Hashing
* Blockchain Validation
* Tamper Detection

### Dashboard Analytics

* Total Enquiries
* Fraud Cases
* Genuine Cases
* Blockchain Status
* Fraud Distribution Chart
* Recent Enquiries Table

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

### Security

* SHA-256 Hashing
* Blockchain Validation

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

## Workflow

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

Record is stored in MongoDB.

### Step 7

Blockchain block is generated.

### Step 8

Dashboard analytics update automatically.

---

## Fraud Detection Rules

### Rule 1

High loan amount compared to income.

Example:

```text
Income = ₹7,00,000
Requested Loan = ₹50,00,000
```

Risk score increases.

---

### Rule 2

Too many existing loans.

```text
Existing Loans >= 3
```

Risk score increases.

---

### Rule 3

Customer already owns a car but requests a car loan.

Risk score increases.

---

### Rule 4

Multiple enquiries using the same PAN.

Risk score increases.

---

### Rule 5

Same phone number linked with different PAN numbers.

Risk score increases significantly.

---

## Risk Classification

| Risk Score | Status     |
| ---------- | ---------- |
| 0 - 29     | Genuine    |
| 30 - 59    | Suspicious |
| 60+        | Fraud      |

---

## Blockchain Implementation

Each enquiry becomes a blockchain block.

### Block Structure

```json
{
  "index": 1,
  "timestamp": "2026-01-01",
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

### Benefits

* Tamper Proof Records
* Immutable Audit Trail
* Blockchain Validation
* Secure Data Storage

---

## Database Collections

### bank_users

Stores employee credentials.

### enquiries

Stores loan enquiry records.

### blockchain

Stores blockchain blocks.

---

## APIs

### Authentication

```http
POST /register
POST /login
```

### Loan Processing

```http
POST /loan-enquiry
```

### Analytics

```http
GET /dashboard-stats
GET /recent-enquiries
```

### Blockchain

```http
GET /blockchain
GET /validate-blockchain
```

---

# Application Screenshots

## Login Page

![Login](screenshots/bank%20login.png)

---

## Dashboard

![Dashboard](screenshots/dashboard.png)

---

## Loan Enquiry Form

![Loan Enquiry](screenshots/loan%20enquiry%20form.png)

---

## Blockchain Viewer

![Blockchain Viewer](screenshots/blockchain%20viewer.png)

---

## Future Enhancements

* Machine Learning Fraud Detection Model
* OCR PAN Verification
* Aadhaar Verification
* JWT Authentication
* Docker Deployment
* Cloud Deployment
* Role-Based Access Control

---

## Interview Talking Points

### AI Component

Currently uses rule-based fraud analysis and risk scoring. The system can later be upgraded with machine learning models trained on historical banking fraud datasets.

### Blockchain Component

Each enquiry is stored as a blockchain block. Hash linkage and blockchain validation ensure records cannot be modified without detection.

### Database

MongoDB stores employee accounts, loan enquiries, and blockchain records.

### Full Stack Development

The project demonstrates integration of React frontend, FastAPI backend, MongoDB database, blockchain concepts, analytics dashboards, and fraud detection logic.

---

## Author

**Shubhojeet Ghosh**

Blockchain-Based AI Loan Fraud Detection System

Built using React, FastAPI, MongoDB, Blockchain Technology, and Fraud Detection Analytics.
