# AGENTS.md

# Medkit.com AI Development Guide

## Project Overview

Medkit.com is a responsive medicine reminder and healthcare management platform that allows users to

- Manage medicines
- Set medicine reminders
- Upload prescriptions
- View health records
- Order medicines
- Save emergency contacts
- Track schedules
- Manage user profile

The UI should match the provided Figma design.

---

# Tech Stack

Frontend

- HTML5
- CSS3
- JavaScript (ES6)
- React.js
- React Router DOM

Backend

- Node.js
- Express.js

Database

- MongoDB
- Mongoose

Authentication

- JWT
- bcrypt

File Upload

- Multer

API Communication

- Axios

Notifications

- React Toastify

Icons

- React Icons

Charts (Future)

- Chart.js

Deployment

Frontend
- Vercel

Backend
- Render

Database
- MongoDB Atlas

---

# Folder Structure

```
medkit/

frontend/
│
├── public/
│
├── src/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   ├── layouts/
│   ├── context/
│   ├── hooks/
│   ├── services/
│   ├── routes/
│   ├── utils/
│   ├── styles/
│   ├── App.jsx
│   └── main.jsx

backend/

├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── uploads/
├── services/
├── utils/
├── server.js

```

---

# Theme

Primary Background

```
#DFF7F3
```

Sidebar

```
#FFDADA
```

Primary Button

```
#000000
```

Cards

```
#F9D6D6
```

Text

```
#1F1F1F
```

Border Radius

```
15px
```

Shadow

```
0 5px 15px rgba(0,0,0,.08)
```

---

# Typography

Font

```
Poppins
```

Headings

```
700
```

Body

```
400
```

Buttons

```
600
```

---

# Global Components

## Navbar

Contains

- Logo
- Home
- Shop
- About
- Articles
- Contact
- Profile Icon

---

## Sidebar

Contains

Dashboard

Medicines

Reminders

Orders

Health Records

Emergency

Profile

Settings

Help & Support

Active item highlighted.

---

## Button Component

Props

```
text

variant

icon

loading

onClick

disabled
```

Variants

- Primary
- Secondary
- Outline

---

## Card Component

Reusable for

Medicine

Reminder

Upload

History

Reports

Schedule

Categories

---

## Input Component

Supports

Email

Password

Search

Phone

Textarea

Validation

---

## Modal Component

Reusable

Confirmation

Delete

Edit Reminder

Upload Prescription

---

## Loader

Animated spinner

---

# Pages

---

## Landing Page

Sections

Hero

CTA

Feature Cards

Footer

Buttons

Get Started

Learn More

Animations

Fade Up

Hover Cards

---

## Login

Fields

Email

Password

Forgot Password

Login

Google Login

Facebook Login

Apple Login

Validation required.

---

## Register

Fields

Full Name

Email

Password

Confirm Password

Already have account

Signup

---

## Dashboard

Greeting

Today's medicine

Next dose timer

Upload Prescription

Text Reports

Medical History

Reminder Creator

Recent Orders

---

## Medicines

Display medicine categories

Grid layout

Search

Filter

Medicine Cards

---

## Medicine Details

Image

Name

Price

Description

Dosage

How to Use

Quantity Selector

Add to Cart

---

## Reminder Page

Calendar

Today's Schedule

Upcoming reminders

Completed reminders

Create reminder

Edit reminder

Delete reminder

---

## Health Records

Upload Reports

Download Reports

Medical History

Search

Filter

---

## Emergency

Emergency Contacts

Hospital Numbers

Call Button

Add Contact

Delete Contact

---

## Profile

Avatar

Edit Profile

Saved Address

Orders

Payment Methods

Settings

Rewards

---

## Settings

Dark Mode

Notification Toggle

Language

Logout

Delete Account

---

# Backend Modules

Auth

User

Medicine

Reminder

Prescription

Orders

Reports

Emergency

Profile

Notification

---

# MongoDB Collections

Users

```
name

email

password

avatar

phone

createdAt
```

Medicines

```
name

price

description

dosage

image

category

stock
```

Reminders

```
userId

medicineId

time

date

repeat

status
```

Orders

```
userId

items

total

status

payment

createdAt
```

HealthReports

```
userId

title

file

type

createdAt
```

EmergencyContacts

```
userId

name

phone

relation
```

---

# API Routes

Authentication

POST

```
/api/auth/register
```

POST

```
/api/auth/login
```

GET

```
/api/auth/profile
```

Medicines

GET

```
/api/medicines
```

GET

```
/api/medicines/:id
```

POST

```
/api/medicines
```

PUT

```
/api/medicines/:id
```

DELETE

```
/api/medicines/:id
```

Reminder

GET

```
/api/reminders
```

POST

```
/api/reminders
```

PUT

```
/api/reminders/:id
```

DELETE

```
/api/reminders/:id
```

Orders

GET

```
/api/orders
```

POST

```
/api/orders
```

Reports

POST

```
/api/reports/upload
```

GET

```
/api/reports
```

Emergency

GET

```
/api/emergency
```

POST

```
/api/emergency
```

---

# Authentication

JWT

Password encrypted with bcrypt.

Private routes

```
Dashboard

Profile

Reminder

Orders

Health Records
```

---

# Validation

Frontend

React validation

Backend

Express Validator

Required

Email format

Password

Minimum 8 characters

Confirm password

---

# Responsive Breakpoints

Desktop

```
1200+
```

Laptop

```
992px
```

Tablet

```
768px
```

Mobile

```
480px
```

---

# Animations

Page Fade

Sidebar Slide

Card Hover

Button Scale

Loading Skeleton

Smooth Scroll

Dropdown Animation

Toast Notifications

---

# Coding Standards

Use Functional Components only.

Use Hooks only.

One component per file.

No inline CSS.

Use CSS Modules or plain CSS.

Create reusable components.

Never duplicate UI.

Use async/await.

Always handle API errors.

Always show loading state.

---

# Accessibility

All images need alt text.

Buttons must have aria labels.

Keyboard navigation required.

Proper heading hierarchy.

High contrast text.

---

# Performance

Lazy load pages.

Memoize heavy components.

Compress images.

Optimize API requests.

Pagination where needed.

Debounced Search.

---

# Future Features

Medicine OCR

QR Scanner

AI Medicine Suggestions

Doctor Consultation

Online Payment

Push Notifications

SMS Reminder

Voice Reminder

Medicine Stock Alerts

Wearable Device Integration

---

# AI Agent Rules

When generating code:

1. Match the Figma layout exactly.
2. Keep components reusable.
3. Never hardcode repeated UI.
4. Use React best practices.
5. Separate frontend and backend.
6. Follow REST API conventions.
7. Use clean folder architecture.
8. Write maintainable code.
9. Handle loading and error states.
10. Make every page responsive.
11. Use semantic HTML.
12. Follow accessibility standards.
13. Use environment variables for secrets.
14. Validate all user inputs.
15. Comment only complex logic.
16. Maintain consistent spacing and typography.
17. Keep code modular and scalable.

---

# Project Goal

Build a modern, scalable, responsive medicine reminder and healthcare management platform that faithfully reproduces the provided Figma design while following industry-standard React, Node.js, Express.js, MongoDB, and Mongoose architecture.