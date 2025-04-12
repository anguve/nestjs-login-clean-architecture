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
- Security best practices (bcrypt, headers, xss, sql, etc.)

---

## Project Structure

```bash
.
├── .docker
│   └── Dockerfile
├── .env
├── .env.example
├── eslint.config.mjs
├── .git
├── .gitignore
├── LICENSE
├── nest-cli.json
├── package.json
├── package-lock.json
├── .prettierrc
├── README.md
├── src
│   ├── app.module.ts
│   ├── common
│   │   ├── core
│   │   └── shared
│   │       ├── domain
│   │       │   └── value-objects
│   │       │       ├── VOArray.ts
│   │       │       ├── VOBoolean.ts
│   │       │       ├── VONumber.ts
│   │       │       ├── VOObject.ts
│   │       │       └── VOString.ts
│   │       ├── errors
│   │       │   └── BaseError.ts
│   │       ├── exceptions
│   │       │   ├── BadRequestException.ts
│   │       │   ├── ConflictException.ts
│   │       │   ├── NotFoundException.ts
│   │       │   └── UnauthorizedException.ts
│   │       └── infrastructure
│   │           ├── config
│   │           │   ├── database.config.ts
│   │           │   ├── jwt.config.ts
│   │           │   └── server.config.ts
│   │           ├── logging
│   │           │   ├── logger.config.ts
│   │           │   ├── logger.service.ts
│   │           │   └── logger.ts
│   │           ├── middlewares
│   │           │   ├── auth.middleware.ts
│   │           │   └── permissions.middleware.ts
│   │           └── security
│   │               ├── encryption.service.ts
│   │               └── password-hasher.ts
│   ├── main.ts
│   └── modules
│       ├── auth
│       │   ├── application
│       │   │   ├── dto
│       │   │   │   └── LoginUserDto.ts
│       │   │   ├── mappers
│       │   │   │   └── UserMapper.ts
│       │   │   ├── queries
│       │   │   │   └── GetUserDetailsQuery.ts
│       │   │   └── use-cases
│       │   │       └── LoginUserUseCase.ts
│       │   ├── auth.module.ts
│       │   ├── domain
│       │   │   ├── entities
│       │   │   │   └── UserEntity.ts
│       │   │   ├── repositories
│       │   │   │   └── IUserRepository.ts
│       │   │   ├── services
│       │   │   │   └── AuthDomainService.ts
│       │   │   └── value-objects
│       │   │       ├── VOEmail.ts
│       │   │       └── VOPassword.ts
│       │   └── infrastructure
│       │       ├── controllers
│       │       │   └── AuthController.ts
│       │       ├── repositories
│       │       │   └── UserRepositoryImpl.ts
│       │       └── services
│       │           └── JwtService.ts
│       └── user-registration
│           ├── application
│           │   ├── dto
│           │   │   └── CreateUserDto.ts
│           │   ├── mappers
│           │   │   └── UserMapper.ts
│           │   ├── queries
│           │   │   └── GetRegisterUsersDetailsQuery.ts
│           │   └── use-cases
│           │       └── RegisterUserUseCase.ts
│           ├── domain
│           │   ├── entities
│           │   │   └── UserEntity.ts
│           │   ├── repositories
│           │   │   └── IUserRepository.ts
│           │   ├── services
│           │   │   └── RegisterUsersDomainService.ts
│           │   └── value-objects
│           │       ├── VOEmail.ts
│           │       ├── VOId.ts
│           │       ├── VOLastName.ts
│           │       ├── VOName.ts
│           │       └── VOPassword.ts
│           ├── infrastructure
│           │   ├── controllers
│           │   │   └── RegisterUsersController.ts
│           │   └── repositories
│           │       └── RegisterUsersRepositoryImpl.ts
│           └── register-users.module.ts
├── test
│   ├── app.e2e-spec.ts
│   ├── auth
│   │   ├── application
│   │   ├── domain
│   │   └── infrastructure
│   ├── jest-e2e.json
│   └── register
│       ├── application
│       ├── domain
│       └── infrastructure
├── tsconfig.build.json
└── tsconfig.json


```
