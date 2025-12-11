🔥 Fitihaber Ethiopia — INSA Summer Camp 2025 (Group 9)

Team Members:

    Tsehaynesh Biruh Birhanu

    Fikiretsion Tasew Tsegaye

    Dagim Mulat Chekol

    Alazar Wondifraw Assefa

Repository: Official backend + frontend code for Fitihaber Ethiopia, a cutting-edge LegalTech platform connecting lawyers, witnesses, and guarantors online.
📌 Project Overview

Project Name: Fitihaber Ethiopia
Sector / Industry: Legal Technology (LawTech)

Executive Summary:
Fitihaber Ethiopia is a modern, secure platform for lawyers, witnesses (Tekesash), and guarantors (Kesash) to communicate, schedule consultations, exchange documents, and track case progress. Built with a microservices architecture, the platform ensures scalability, security, and a seamless user experience.
and we make it muliti lingual local languge we use it there
Tech Stack:
       
    Frontend: React + Vite (fast HMR, responsive UI)

    Backend: Node.js + Express (REST APIs, microservices-ready)

    Database: PostgreSQL (relational + JSONB support)

    Realtime: Socket.IO (chat), WebRTC (video calls)

    DevOps: Docker, Kubernetes, CI/CD pipelines, CDN for global content

<<<<<<< HEAD
🛠 Problem Statement

Legal processes in Ethiopia are often:

    ⏳ Slow and paper-based

    📄 Hard to coordinate between lawyers, witnesses, and guarantors

    💸 Difficult to track payments or agreements

    📉 Prone to miscommunication and delays

This causes frustration, reduced trust, and inefficiencies in case management.
💡 Solution

Fitihaber Ethiopia solves these problems by providing:

    👩‍⚖️ Lawyer Dashboard: Manage clients, schedule consultations, handle payments

    🧑‍⚖️ Witness (Tekesash) & Guarantor (Kesash) Access: Verify agreements, communicate directly

    💬 Integrated Communication: Chat, video calls, and notifications

    🔒 Secure Document Management: Encrypted cloud storage with strict access controls

    🗓 Smart Scheduling: Calendar and reminders for court dates and consultations

    💳 Online Payments: Track and confirm transactions

🎯 Objectives / Mission

    Digitalize lawyer-client-witness-guarantor collaboration

    Build trust with secure, verified communications

    Speed up legal case processing

    Provide remote access to legal services

    Ensure compliance with Ethiopian legal and data protection standards

👥 Target Audience / Beneficiaries

    Lawyers & Law Firms: Streamlined case management

    Witnesses (Tekesash): Easy verification and participation

    Guarantors (Kesash): Track commitments securely

    General Public: Access legal help remotely

    Courts & Authorities: Organized, digital-ready case records

🏗 System Architecture Overview
Frontend

    React + Vite → lightning-fast hot reload

    Responsive UI + polished UX

Backend

    Node.js + Express → asynchronous and scalable

    REST APIs + microservices-ready structure

Database

    PostgreSQL → relational data handling, JSONB support

Microservices

    Auth Service 🔑 → Registration/login, RBAC

    Chat & Communication Service 💬 → Real-time messaging + video calls

    Calendar Service 📅 → Scheduling, reminders

    Payment Service 💳 → Online payments, status tracking

    Document Service 📄 → Encrypted uploads, access permissions

DevOps

    Docker + Kubernetes → containerized, scalable deployment

    CI/CD pipelines → automated testing and deployment

    CDN → fast global content delivery

🚀 Features / Roadmap

    ✅ User registration & login with JWT

    ✅ Role-Based Access Control (RBAC) → Admin, Lawyer, Witness, Guarantor

    ✅ Profile & dashboard management

    ✅ Secure file uploads and downloads

    ✅ Real-time chat & notifications

    ✅ Video call integration (WebRTC)

    ✅ Payment integration with local options (Telebirr / CBE Birr)

    🔜 Case timeline and legal document versioning

    🔜 Multi-language support (Amharic + English)

    🔜 Analytics dashboard for lawyers and admins
=======
🔥 INSA Summer Camp 2025 - Group 9  Welcome to Group 9’s official repository for the INSA Summer Camp 2025! We’re a team of four passionate students from INSA, working together to build a creative, impactful, and technically strong project. Stay tuned for updates as we bring our vision to life! 







1. Project Name

Fitihaber Ethiopia



2. Sector / Industry

Legal Technology (LawTech) — specializing in digital lawyer-client collaboration, witness (tekesash) and guarantor (kesash) integration, online legal consultancy, and case management.


3. Executive Summary

Fitihaber Ethiopia is a modern legal-tech platform designed to connect lawyers, witnesses, and guarantors in a secure and efficient online environment. The platform allows users to chat, schedule consultations, share legal documents, and manage payments all in one place.

Built with a scalable microservices architecture, it leverages React with Vite for a fast, responsive frontend, Node.js with Express for a robust backend, and PostgreSQL for secure relational data management. The system also supports real-time features like video calls (WebRTC) and instant messaging (Socket.IO), ensuring a seamless experience for legal professionals and clients.



4. Problem Statement


In Ethiopia and many other regions, the legal process is often slow, paper-based, and difficult to coordinate. Lawyers, witnesses, and guarantors often face challenges in:

    Scheduling and communication

    Securely exchanging documents

    Tracking payments and agreements

    Coordinating for case timelines and legal proceedings

This leads to delays, miscommunication, and reduced trust in the legal process.



5. Solution

   

Fitihaber Ethiopia solves this by creating a centralized, secure, and user-friendly platform where:

    Lawyers can manage clients, schedule consultations, and handle payments.

    Witnesses (Tekesash) and Guarantors (Kesash) can securely participate in the legal process, verify agreements, and communicate directly with lawyers.

    All parties can use integrated chat, video calls, and calendars to stay on track.

    Legal documents are stored in encrypted cloud storage with strict access controls.

The microservices approach ensures scalability, fault isolation, and independent deployment for features like chat, payments, and file handling.



6. Objectives / Mission
   

    Digitalize the connection between lawyers, witnesses, and guarantors.

    Enhance trust through secure, verified communications.

    Speed up legal case processing with online scheduling and payments.

    Provide access to legal services for remote users.

    Ensure compliance with Ethiopian legal and data protection standards
    

7. Target Audience / Beneficiaries

    Lawyers & Law Firms — streamline case management and client communication.

    Witnesses (Tekesash) — easily confirm agreements and participate remotely.

    Guarantors (Kesash) — securely verify legal commitments and track obligations.

    General Public — access legal help without geographical limitations.

    Courts & Legal Authorities — benefit from organized and digital-ready case records.

8. System Architecture Overview

    Frontend: React with Vite → fast HMR, optimized build, responsive UI.

    Backend: Node.js with Express → asynchronous, scalable, API-driven.

    Database: PostgreSQL → secure relational data handling with JSONB support.

    Microservices:

        Auth Service → registration/login, role-based access (lawyer, tekesash, kesash).

        Chat & Communication Service → real-time messaging (Socket.IO), video calls (WebRTC).

        Calendar Service → event scheduling, reminders, court dates.

        Payment Service → online payments, receipts, status tracking.

        Document Service → encrypted uploads, version tracking, access permissions.

    DevOps: Docker, Kubernetes, CI/CD, CDN for global content delivery.



Run npm install in both frontend and backend folders.
Start frontend: npm run dev (http://localhost:5173/)
Start backend: npx nodemon server.js (http://localhost:3000/)
docker run postgres:15-alpine

