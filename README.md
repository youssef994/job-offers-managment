I'll create a README.md file based on the Overview wiki page content for the job-offers-management GitHub project.

# Job Offers Management System

A comprehensive microservices-based application designed to facilitate job postings, applications, and related functionalities in an employment ecosystem.

## System Purpose and Scope

This system serves as a complete job marketplace with extended capabilities including:

- Job posting and application management
- User profile management (both companies and candidates)
- Room booking system for interviews or events
- Content management through articles
- Exchange programs management
- Payment processing capabilities

## Core Architecture

The system is built on a microservices architecture with the following components:

```mermaid
flowchart TB
    Client["Client Browser"] --> FrontendApp["Angular Frontend Application<br>(microservice-frontApp)"]
    FrontendApp --> ApiGateway["API Gateway<br>(ApigatewayApplication)"]
    
    subgraph "Backend Microservices"
        ApiGateway --> IdentityService["Identity Service<br>(IdentityServiceApplication)"]
        ApiGateway --> CompanyService["Company Service<br>(CompanyServiceApplication)"]
        ApiGateway --> CandidatService["Candidat Service<br>(CandidatServiceApplication)"]
        ApiGateway --> ApplicationService["Application Service<br>(ApplicationServiceApplication)"]
        ApiGateway --> ArticleService["Article Service<br>(ArticleServiceApplication)"]
        ApiGateway --> ExchangeService["Exchange Service<br>(ExchangeServiceApplication)"]
        ApiGateway --> BookingService["Booking Service<br>(BookingServiceApplication)"]
        ApiGateway --> AvailabilityService["Availability Service<br>(AvailabilityServiceApplication)"]
        ApiGateway --> PaymentService["Payment Service<br>(PaiementApplication)"]
    end
    
    subgraph "Infrastructure Services"
        DiscoveryServer["Discovery Server<br>(DiscoveryserverApplication)"]
        DiscoveryServer -.-> ApiGateway
        DiscoveryServer -.-> IdentityService
        DiscoveryServer -.-> CompanyService
        DiscoveryServer -.-> CandidatService
        DiscoveryServer -.-> ApplicationService
        DiscoveryServer -.-> ArticleService
        DiscoveryServer -.-> ExchangeService
        DiscoveryServer -.-> BookingService
        DiscoveryServer -.-> AvailabilityService
        DiscoveryServer -.-> PaymentService
    end
```

## Frontend Application Structure

The frontend application is built with Angular and follows a component-based architecture. It's organized around two main layouts:

```mermaid
flowchart TD
    AppComponent["App Component<br>(app.component.ts)"] --> AdminLayoutComponent["Admin Layout Component<br>(admin-layout.component.ts)"]
    AppComponent --> AuthLayoutComponent["Auth Layout Component<br>(auth-layout.component.ts)"]
    
    AuthLayoutComponent --> LoginComponent["Login Component"]
    AuthLayoutComponent --> RegisterComponent["Register Component"]
    
    AdminLayoutComponent --> SidebarComponent["Sidebar Component<br>(sidebar.component.ts)"]
    AdminLayoutComponent --> NavbarComponent["Navbar Component"]
    AdminLayoutComponent --> FooterComponent["Footer Component"]
    AdminLayoutComponent --> RouterOutlet["Router Outlet<br>(Dynamic Content)"]
    
    RouterOutlet --> JobManagement["Job Management Components"]
    RouterOutlet --> CompanyManagement["Company Management Components"]
    RouterOutlet --> CandidateManagement["Candidate Management Components"]
    RouterOutlet --> BookingManagement["Booking Management Components"]
    RouterOutlet --> ArticleManagement["Article Management Components"]
    RouterOutlet --> ExchangeManagement["Exchange Program Management"]
```

## User Roles and Navigation

The system implements role-based access control with three primary user roles:

| Role | Description | Primary Functions |
|------|-------------|------------------|
| VISITEUR | Regular job seekers/candidates | Create profile, view jobs, apply to jobs, manage articles |
| ADHERANT | Companies/organizations | Create company profile, post jobs, review applications, manage rooms |
| ADMIN | System administrators | Manage users, access all system functions | [1](#0-0) 

## Authentication and Authorization Flow

```mermaid
sequenceDiagram
    participant User
    participant FrontEnd as "Angular Frontend"
    participant Gateway as "API Gateway"
    participant Identity as "IdentityServiceApplication"
    participant Resources as "Protected Resources"
    
    User->>FrontEnd: Login (username/password)
    FrontEnd->>Gateway: Authentication Request
    Gateway->>Identity: Validate Credentials
    Identity->>Identity: Process Authentication
    Identity-->>Gateway: JWT Token + User Role
    Gateway-->>FrontEnd: JWT Token + User Role
    FrontEnd->>FrontEnd: Store token in localStorage
    
    Note over FrontEnd,Resources: Subsequent Requests
    
    User->>FrontEnd: Request Protected Resource
    FrontEnd->>Gateway: Request with JWT Token
    Gateway->>Identity: Validate Token
    Identity-->>Gateway: Token Valid + User Role
    
    alt Authorized
        Gateway->>Resources: Forward Request
        Resources-->>Gateway: Response
        Gateway-->>FrontEnd: Success Response
    else Unauthorized
        Gateway-->>FrontEnd: 401/403 Error
    end
```

## Technical Implementation Details

### Microservices Communication

Each microservice is registered with the Eureka Discovery Server, which enables service discovery. The services can communicate with each other using Feign clients.

| Microservice | Main Purpose | Key Dependencies |
|--------------|--------------|------------------|
| Identity Service | User authentication and authorization | Eureka Client, Feign |
| Company Service | Company profile and job management | Eureka Client, Feign |
| Candidat Service | Candidate profile management | Eureka Client, Feign |
| Application Service | Job application processing | Eureka Client, Feign |
| Article Service | Content management | Eureka Client |
| Exchange Service | Exchange program management | Eureka Client, Feign |
| Booking Service | Room booking | Eureka Client |
| Availability Service | Room availability management | Eureka Client |
| Payment Service | Payment processing | Eureka Client |

### Frontend Design

The frontend application uses the Argon Dashboard Angular template, providing a responsive and modern user interface. The application is built with Angular and uses various UI components from the NgBootstrap and PrimeNG libraries. [2](#0-1) 

## Getting Started

### Prerequisites

- Java 11+
- Node.js and npm
- MySQL database
- Maven

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/youssef994/job-offers-managment.git
   cd job-offers-managment
   ```

2. Start the backend services:
   ```
   cd backend-microservices
   
   # Start Discovery Server first
   cd discoveryserver
   mvn spring-boot:run
   
   # Start API Gateway
   cd ../api-gateway
   mvn spring-boot:run
   
   # Start other services
   # (Start each in a separate terminal)
   ```

3. Start the frontend application:
   ```
   cd microservice-frontApp
   npm install
   ng serve
   ```

4. Access the application at `http://localhost:4200`

## File Structure

The project is organized into two main directories:

- `backend-microservices/`: Contains all the Java Spring Boot microservices
- `microservice-frontApp/`: Contains the Angular frontend application

## Browser Support

The application supports the latest two versions of the following browsers:
- Chrome
- Firefox
- Edge
- Safari
- Opera [3](#0-2) 

## License

This project is licensed under the MIT License.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

Notes:
This README was created based on the Overview wiki page from the job-offers-managment repository. The content has been formatted for GitHub with appropriate sections and diagrams. The installation instructions were added as a standard section for a README file, though specific details may need to be adjusted based on the actual setup requirements.

Wiki pages you might want to explore:
- [Overview (youssef994/job-offers-managment)](/wiki/youssef994/job-offers-managment#1)
