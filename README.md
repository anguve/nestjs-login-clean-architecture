# nestjs-login-clean-architecture# Secure Login API - NestJS + Hexagonal Architecture 

This is a basic authentication project (Login + Registration) built with NestJS and structured using **Hexagonal Architecture** principles and **Domain-Driven Design (DDD)**.

---

## Features

- Registration and login with JWT + Refresh Tokens  
- Credentials validation using DTOs  
- Clean and independent domain layer  
- Clear separation between infrastructure, application, and domain  
- Simple unit testing included  
- Docker and environment variables setup  
- Security best practices (bcrypt, headers, etc.)

---

## Project Structure

```bash
src/
├── app/                    # Use Cases (Application Layer)
│   └── auth/
│       └── use-cases/
│       └── dto/
├── domain/                 # Business Logic (Domain Layer)
│   └── auth/
│       └── entities/
│       └── interfaces/     # Domain contracts
├── infrastructure/         # Adapters (Infrastructure Layer)
│   └── controllers/
│   └── services/
│   └── repositories/
│   └── jwt/
├── shared/                 # Utilities, exceptions, constants (Shared layer)
├── main.ts                 # Entry point
