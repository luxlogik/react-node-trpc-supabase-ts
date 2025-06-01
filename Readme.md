# tRPC Full Stack App

A modern full-stack application built with tRPC, React, Express, and Supabase.

## Tech Stack

- **Frontend**: React + TypeScript + TailwindCSS
- **Backend**: Node.js + Express + tRPC
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Styling**: TailwindCSS + shadcn/ui

## Project Structure

```
trpc-app/
├── frontend/                # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── lib/           # Utilities and configurations
│   │   └── pages/         # Next.js pages
│   └── public/            # Static assets
├── backend/               # Express backend
│   ├── src/
│   │   ├── routers/       # tRPC routers
│   │   ├── server/        # Server setup
│   │   └── utils/         # Utilities
│   └── supabase/          # Database migrations
└── shared/                # Shared types and utilities
```


## Prerequisites

- Node.js (v18 or later)
- npm  
- Docker (for local Supabase)
- Git

## Getting Started
### 0. go to git_root_dir
cd <git_root_dir>

### 1. Install Dependencies
```bash
# Install root dependencies
npm install

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

### 2. Set Up Supabase

#### Local Development

1. Install Supabase CLI:
```bash
npm install -g supabase-cli
```

2. Start Supabase locally:
```bash
cd ..
supabase db reset
```

3. Get your local Supabase credentials:
```bash
supabase status
```

### 3. Environment Setup

1. Create `.env` files:

Frontend (`.env.local`):
```env
NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_API_URL=http://localhost:3001
```

Backend (`.env`):
```env
SUPABASE_URL=http://localhost:54321
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
PORT=3001
NODE_ENV=development
```

### 4. Start Development Servers

1. Start the backend:
```bash
cd backend
npm run dev
```

2. Start the frontend (in a new terminal):
```bash
cd frontend
npm run dev
```

The application should now be running at:
- Frontend: http://localhost:3000
- Backend: http://localhost:3001
- Supabase Studio: http://localhost:54323



#### After making DB changes: Database Migrations[Optional] []

1. Create a new migration:
```bash
cd backend
supabase migration new <migration-name>
```

2. Edit the generated SQL file in `backend/supabase/migrations`

3. Apply migrations:
```bash
supabase db reset
```

## Available Scripts

### Backend

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run linter
npm run test         # Run tests
```

### Frontend

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run linter
npm run test         # Run tests
```

## Database Schema

The application uses the following main tables:

```sql
-- Users table (managed by Supabase Auth)
create table public.profiles (
  id uuid references auth.users on delete cascade,
  name text,
  email text,
  settings jsonb default '{"theme": "light", "notifications": true}',
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now()),
  primary key (id)
);

-- Enable RLS
alter table public.profiles enable row level security;

-- Create policies
create policy "Users can view own profile"
  on public.profiles for select
  using ( auth.uid() = id );

create policy "Users can update own profile"
  on public.profiles for update
  using ( auth.uid() = id );
```

## Authentication Flow

1. User signs up/logs in through Supabase Auth
2. Frontend stores the JWT token
3. Token is sent with each tRPC request
4. Backend validates token and creates user context
5. Protected routes check for valid user context

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Run tests and linting
4. Submit a pull request

## License

MIT