# InternTrack - Internship Application Manager

InternTrack is a centralized and intuitive web application designed to help students organize and track their internship or job searches effectively. This project is developed within the framework of the PV247 User Interfaces course at Masaryk University.

## Team Members
* Gatien Auffret
* Baptiste Cojean
* Matéo Serrandour
* Aubin Bergeret

## Project Specification and Scope

InternTrack serves as a professional tool for managing the lifecycle of internship applications. It fulfills all technical requirements set by the PV247 course:

* **User Authentication**: Secure session-based authentication system to manage personal application boards.
* **Database (CRUD)**: Full integration with a Turso database using Drizzle ORM to Create, Read, Update, and Delete applications.
* **Rendering**: Implementation of Server-Side Rendering (SSR) for data fetching alongside Client-Side Rendering (CSR) for interactive filtering.
* **Responsive Design**: Optimized interface for seamless use across mobile, tablet, and desktop devices.
* **Metadata**: Proper SEO and document metadata configuration for professional web standards.
* **Deployment**: Hosted online and continuously deployed via Vercel.

## Technological Requirements

The application is built using the following modern web stack:

* **Framework**: Next.js 15+ (App Router)
* **Database**: Turso (SQLite via LibSQL)
* **ORM**: Drizzle ORM
* **Styling**: Tailwind CSS
* **Icons**: Lucide React
* **State Management & Forms**: React Hook Form & Zod
* **Deployment**: Vercel

## Project Structure

Following the modular architecture requirements for the course, the code is organized within the src directory:

src/
├── actions/        # Server Actions for database mutations and auth
├── app/            # Next.js App Router (Layouts, Pages, and Metadata)
├── components/     # Global reusable UI and form components
├── db/             # Database connection and Drizzle schema definitions
├── lib/            # Utility functions and shared logic
└── modules/        # Domain-specific components (Application & User logic)

## Getting Started

### Prerequisites

You need a Turso database and a GitHub account. Ensure you have a .env.local file containing the following variables:

TURSO_DATABASE_URL=your_database_url
TURSO_AUTH_TOKEN=your_auth_token

### Installation and Development

1. Clone the repository.
2. Install dependencies:
   npm install
3. Run the development server:
   npm run dev
4. Build the project:
   npm run build

## Git Collaboration and Submission

Following the course guidelines, this project uses GitHub for collaboration. Each team member has contributed to the codebase. The project is submitted via the Feedback Pull Request system as instructed by the FI MUNI tutoring team. Automatic pipelines for building and linting are used to ensure code quality before every merge.