# University Dashboard Application

## Overview

This is a modern university dashboard web application built with React, TypeScript, and Express. The application features a clean, utility-focused interface with a fixed sidebar navigation and a gradient-styled main content area. It's designed to provide an efficient and visually appealing dashboard experience for university-related tasks and information display.

The project is branded as "OAK University" and follows a professional academic aesthetic with teal/emerald gradient themes. The current implementation showcases order management statistics (Open Orders, In Execution, Finished) as the primary dashboard content.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server with hot module replacement
- Wouter for lightweight client-side routing (instead of React Router)
- TanStack Query (React Query) for server state management and data fetching

**UI Component System**
- Shadcn/ui component library (New York style variant) for consistent, accessible UI components
- Radix UI primitives for headless component foundations
- Tailwind CSS for utility-first styling with custom theme configuration
- Class Variance Authority (CVA) for component variant management

**Styling Architecture**
- Custom CSS variables for theming (light/dark mode support)
- Gradient backgrounds: teal to cyan to emerald palette
- Fixed sidebar layout pattern (160px wide) with rounded corners (36px border radius)
- Spacing system based on Tailwind units (primarily 4, 5, 6)
- Custom shadow system for depth and elevation

**State Management Pattern**
- React Query for server state with infinite stale time and disabled refetching
- React hooks (useState, useContext) for local component state
- No global state management library (Redux, Zustand, etc.) currently implemented

### Backend Architecture

**Server Framework**
- Express.js with TypeScript for the API server
- Separate development and production entry points (index-dev.ts, index-prod.ts)
- Custom logging middleware with timestamp formatting
- Request/response tracking for API endpoints

**Development vs Production**
- Development: Vite middleware integration with Express for HMR and SSR
- Production: Serves pre-built static assets from dist/public directory
- Environment-based configuration through NODE_ENV

**API Design**
- RESTful API pattern with /api prefix for all endpoints
- JSON request/response format with body parsing middleware
- Raw body capture support for webhook verification scenarios
- Routes registered through centralized registerRoutes function

**Storage Layer**
- Interface-based storage abstraction (IStorage) for flexibility
- In-memory storage implementation (MemStorage) as default
- CRUD operations for User entities
- Designed to be swappable with database implementations

### Data Storage Solutions

**Database Configuration**
- Drizzle ORM configured for PostgreSQL dialect
- Neon serverless driver for PostgreSQL connections
- Schema-first approach with TypeScript types generated from Drizzle schema
- Database migrations stored in ./migrations directory

**Schema Design**
- Users table with UUID primary keys (auto-generated via gen_random_uuid())
- Username and password fields with unique constraint on username
- Zod validation schemas generated from Drizzle schemas for runtime validation

**Why This Approach**
- Drizzle provides type-safe database queries with minimal runtime overhead
- Neon serverless offers connection pooling and edge-compatible database access
- Schema-first design ensures database and TypeScript types stay synchronized
- Interface abstraction allows switching between in-memory and database storage without code changes

### Authentication and Authorization

**Current State**
- Basic user schema defined with username/password fields
- No authentication middleware currently implemented
- Session management infrastructure present (connect-pg-simple for PostgreSQL session store)
- Cookie-based session approach prepared but not active

**Intended Pattern**
- Session-based authentication using Express sessions
- PostgreSQL-backed session storage for production scalability
- User credentials validated against database records
- Protected routes would check session state before allowing access

### External Dependencies

**UI Component Libraries**
- @radix-ui/* packages: Headless component primitives (dialogs, dropdowns, popovers, etc.)
- lucide-react: Icon library for consistent iconography
- cmdk: Command palette component
- embla-carousel-react: Carousel/slider functionality
- react-day-picker: Calendar/date picker components
- vaul: Drawer component library
- recharts: Charting library integration prepared

**Form Handling**
- React Hook Form for form state management
- @hookform/resolvers for validation integration
- Zod for schema validation

**Utilities**
- clsx & tailwind-merge: Conditional className composition
- date-fns: Date manipulation and formatting
- nanoid: Unique ID generation

**Database & Backend**
- @neondatabase/serverless: PostgreSQL driver for serverless environments
- drizzle-orm: TypeScript ORM
- drizzle-kit: Database migration toolkit
- connect-pg-simple: PostgreSQL session store for Express

**Development Tools**
- @replit/vite-plugin-*: Replit-specific development tools (error overlay, cartographer, dev banner)
- tsx: TypeScript execution for Node.js
- esbuild: Bundling for production server code

**Type Safety**
- Drizzle-zod: Generate Zod schemas from Drizzle schemas
- Comprehensive TypeScript configuration with strict mode enabled