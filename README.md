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
├── package.json
├── package-lock.json
├── .prettierrc
├── README.md
├── src
│   ├── app.module.ts
│   ├── common
│   │   ├── filters
│   │   │   └── GlobalExceptionFilter.ts
│   │   └── shared
│   │       ├── constants
│   │       │   ├── security-injection-detector-messages.ts
│   │       │   └── security-injection-detector.ts
│   │       ├── domain
│   │       │   ├── errors
│   │       │   │   ├── BadRequestDomainException.ts
│   │       │   │   ├── BaseDomainException.ts
│   │       │   │   ├── ConflictDomainException.ts
│   │       │   │   ├── NotFoundDomainException.ts
│   │       │   │   └── UnauthorizedDomainException.ts
│   │       │   ├── ports
│   │       │   │   ├── IBaseRepositoryPort.ts
│   │       │   │   ├── IJwtServicePort.ts
│   │       │   │   └── IPasswordHasherPort.ts
│   │       │   ├── repositories
│   │       │   └── value-objects
│   │       │       ├── BaseValueObject.ts
│   │       │       ├── VOBaseArray.ts
│   │       │       ├── VOBaseBoolean.ts
│   │       │       ├── VOBaseEmail.ts
│   │       │       ├── VOBaseNumber.ts
│   │       │       ├── VOBaseObject.ts
│   │       │       └── VOString.ts
│   │       ├── dto
│   │       │   └── base-response.dto.ts
│   │       ├── exceptions
│   │       ├── infrastructure
│   │       │   ├── adapters
│   │       │   │   └── security
│   │       │   │       ├── BcryptPasswordHasherAdapter.ts
│   │       │   │       └── JwtAdapter.ts
│   │       │   ├── config
│   │       │   │   ├── database.config.ts
│   │       │   │   └── envs.ts
│   │       │   ├── controller
│   │       │   │   └── BaseController.ts
│   │       │   ├── database
│   │       │   │   ├── database.module.ts
│   │       │   │   ├── migrations
│   │       │   │   ├── repositories
│   │       │   │   │   └── base-repository.ts
│   │       │   │   └── seeders
│   │       │   ├── logging
│   │       │   │   ├── logger.config.ts
│   │       │   │   ├── logger.service.ts
│   │       │   │   └── logger.ts
│   │       │   ├── security
│   │       │   │   └── middlewares
│   │       │   │       └── security-injection-detector.middleware.ts
│   │       │   └── services
│   │       └── utils
│   │           └── security-injection-detector.util.ts
│   ├── main.ts
│   └── modules
│       ├── auth
│       │   ├── application
│       │   │   ├── dto
│       │   │   │   └── LoginUserDto.ts
│       │   │   ├── mappers
│       │   │   │   └── UserMapper.ts
│       │   │   ├── ports
│       │   │   │   └── login.port.ts
│       │   │   ├── types
│       │   │   │   └── LoginResponse.ts
│       │   │   └── use-cases
│       │   │       └── LoginUserUseCase.ts
│       │   ├── auth.module.ts
│       │   ├── domain
│       │   │   ├── entities
│       │   │   │   └── UserEntity.ts
│       │   │   ├── repositories
│       │   │   │   └── IUserRepository.ts
│       │   │   └── value-objects
│       │   │       ├── VOEmail.ts
│       │   │       └── VOPassword.ts
│       │   └── infrastructure
│       │       ├── controllers
│       │       │   └── AuthController.ts
│       │       ├── database
│       │       │   └── models
│       │       │       └── UserModel.ts
│       │       └── repositories
│       │           └── UserRepositoryImpl.ts
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
