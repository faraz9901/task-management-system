# Engineering Decision Document

## Smart Internal Operations System

### Author

Full Stack Developer Assignment

### Objective

The goal of this project was to design and implement a Smart Internal Operations System that improves operational efficiency, accountability, and task visibility within an organization.

The assignment intentionally provided limited requirements to evaluate product thinking, architectural decisions, and engineering trade-offs. Instead of building a generic CRUD application, the focus was placed on creating a structured workflow with clear ownership and responsibility.

---

# 1. System Architecture

## Overview

The system follows a client-server architecture consisting of:

* React (Frontend)
* NestJS (Backend)
* PostgreSQL (Database)
* Prisma ORM
* JWT Authentication

```text
┌─────────────┐
│   React UI  │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  NestJS API │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ PostgreSQL  │
└─────────────┘
```

The frontend consumes REST APIs exposed by the NestJS backend. The backend handles authentication, authorization, business logic, validation, and database interactions through Prisma.

The architecture was designed to remain simple while maintaining a clear separation of concerns and supporting future scalability.

---

# 2. Product Design Decisions

## Chosen Core Module: Task Management

Task Management was selected because it directly addresses the operational challenges mentioned in the assignment:

* Lack of accountability
* Poor workflow visibility
* Difficulty tracking work ownership
* Team coordination challenges

The implemented workflow follows a hierarchical structure:

```text
Admin
│
├── Creates Managers
└── Creates Users

Manager
│
└── Creates and Assigns Tasks

User
│
└── Updates Assigned Tasks
```

This structure creates a controlled and auditable flow of work.

---

# 3. Authentication Strategy

## Decision

JWT-based authentication was chosen.

## Why

JWT provides:

* Stateless authentication
* Easy frontend integration
* Scalability
* Minimal infrastructure requirements

Each authenticated request includes a JWT token that contains user identity and role information.

## Alternative Considered

Session-based authentication.

## Why Not Chosen

Session management introduces additional server-side state and complexity that was unnecessary for the scope of this assignment.

---

# 4. Authorization Strategy

## Decision

Authorization is implemented using two layers:

### 1. Role-Based Access Control (RBAC)

Roles:

* ADMIN
* MANAGER
* USER

### 2. Ownership Validation

Role checks alone were insufficient because users within the same role should not necessarily manage each other's resources.

For example:

* Managers can manage tasks they created.
* Managers cannot modify tasks created by another manager.

This ownership validation is enforced on sensitive endpoints such as update and delete operations.

## Why

This approach improves accountability and better reflects real-world systems where resource ownership matters in addition to role permissions.

---

# 5. Role Definitions

## Admin

Responsibilities:

* Create managers
* Create users
* View all tasks
* Modify any task
* Delete any task
* Access system-wide analytics

Admin acts as the organizational owner of the system.

---

## Manager

Responsibilities:

* Create tasks
* Assign tasks to users
* Update tasks created by them
* Delete tasks created by them
* Track assigned work

Managers are responsible for task delegation and progress monitoring.

---

## User

Responsibilities:

* View assigned tasks
* Update task status
* Update task description

Users are intentionally restricted from modifying task ownership, priority, or assignment information.

---

# 6. Database Design

## Design Principles

The database was intentionally kept small and focused.

Goals:

* Maintain clarity
* Reduce complexity
* Support future extensibility

## User Entity

Stores:

* Name
* Email
* Password Hash
* Role

The User table acts as the central identity source for the application.

## Task Entity

Stores:

* Title
* Description
* Status
* Priority
* Due Date
* Creator
* Assignee

The Task table represents the operational unit of work.

## Relationships

### User → Created Tasks

One user can create many tasks.

```text
User (1)
   │
   ▼
Task (N)
```

### User → Assigned Tasks

One user can be assigned many tasks.

```text
User (1)
   │
   ▼
Task (N)
```

This design enables ownership tracking and assignment tracking without introducing unnecessary entities.

---

# 7. Validation and Error Handling

## Validation

Validation is handled using:

* DTOs
* class-validator

Input validation occurs before business logic execution.

Examples:

* Required fields
* Email validation
* Enum validation
* Data type validation

## Error Handling

A global exception handling strategy is used to ensure consistent API responses.

Benefits:

* Predictable API behavior
* Cleaner controllers
* Centralized error management

---

# 8. Search and Filtering

To improve operational visibility, task filtering capabilities were implemented.

Supported filters:

### User Filters

* Name
* Email
* Role

### Task Filters

* Title
* Status
* Priority

These filters allow administrators and managers to quickly locate relevant records as the system grows.

---

# 9. Creative Feature

## Workload Insights Dashboard

### Problem

Task management systems often become difficult to monitor as the number of users and tasks increases.

Managers and administrators need visibility into workload distribution and task completion trends.

### Solution

A Workload Insights Dashboard was added.

The dashboard provides:

* Total Tasks
* Completed Tasks
* Pending Tasks
* Tasks by Priority
* Tasks per User

Data is visualized using charts to improve readability and decision-making.

### Value

This feature transforms the system from a simple task tracker into an operational monitoring tool.

Administrators can:

* Identify overloaded users
* Monitor completion trends
* Understand workload distribution
* Improve task allocation decisions

---

# 10. Key Trade-Offs

## What Was Not Built

### Activity Logging

Activity tracking was not implemented.

Reason:

The feature would require additional database structures, audit tracking logic, and UI components that were beyond the assignment timeframe.

---

### Notifications

Notification functionality was excluded.

Reason:

The assignment focused primarily on operational workflows and authorization rather than communication features.

---

### Report Generation

Exportable reports were not implemented.

Reason:

Generating PDF or downloadable reports would add significant complexity while providing limited additional value for the assignment scope.

---

### Automated Testing

Automated tests were not included.

Reason:

Given the limited development time, priority was placed on delivering core functionality and architecture.

Testing would be one of the first improvements added in a production environment.

---

# 11. Scaling Strategy

## Expected Bottlenecks

If usage grows beyond 10,000 users, the first challenges would likely be:

* Search operations
* Database read performance
* Large task datasets

The PostgreSQL database would eventually become the primary bottleneck.

## Scaling Improvements

### Database Indexing

Add indexes on:

* Email
* Role
* Task Status
* Task Priority
* Assigned User

### Query Optimization

Optimize filtering and dashboard aggregation queries.

### Caching

Introduce Redis caching for:

* Dashboard metrics
* Frequently accessed lookups
* Analytics queries

---

# 12. Future Improvements

If given two additional days, the following improvements would be prioritized:

## Activity Logging

Track:

* Task creation
* Assignment changes
* Status changes
* Task completion

This would significantly improve accountability.

---

## Audit and Reporting

Generate downloadable operational reports for managers and administrators.

---

# 13. Starter Template Usage

The backend application was initially bootstrapped using the NestJS Starter Template.

The template was used to accelerate project setup and establish a clean project structure.

All business logic, RBAC implementation, task workflows, database design, API development, frontend functionality, analytics dashboard, and authorization rules were implemented specifically for this assignment.

---

# Conclusion

This project focuses on building a secure and structured internal operations platform rather than a simple CRUD application.

The system emphasizes:

* Accountability through ownership validation
* Security through RBAC
* Operational visibility through analytics
* Maintainability through modular architecture

The result is a scalable foundation that can evolve into a more comprehensive internal operations platform as organizational needs grow.
