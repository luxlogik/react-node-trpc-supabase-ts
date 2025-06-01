-- Enable necessary extensions
create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";

-- Create users table
create table public.users (
  id uuid references auth.users on delete cascade primary key,
  name text,
  email text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create user_settings table
create table public.user_settings (
  user_id uuid references public.users on delete cascade primary key,
  theme text default 'light' check (theme in ('light', 'dark', 'system')),
  notifications boolean default true,
  language text default 'en' check (language in ('en', 'es', 'fr')),
  timezone text default 'UTC',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table public.users enable row level security;
alter table public.user_settings enable row level security;

-- Create policies for users
create policy "Users can view own user"
  on public.users for select
  using ( auth.uid() = id );

create policy "Users can insert own user"
  on public.users for insert
  with check ( auth.uid() = id );

create policy "Users can update own user"
  on public.users for update
  using ( auth.uid() = id );

-- Create policies for user_settings
create policy "Users can view own settings"
  on public.user_settings for select
  using ( auth.uid() = user_id );

create policy "Users can insert own settings"
  on public.user_settings for insert
  with check ( auth.uid() = user_id );

create policy "Users can update own settings"
  on public.user_settings for update
  using ( auth.uid() = user_id );

-- Create a trigger to automatically update the updated_at timestamp
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Create triggers for updated_at
create trigger on_users_updated
  before update on public.users
  for each row
  execute procedure public.handle_updated_at();

create trigger on_user_settings_updated
  before update on public.user_settings
  for each row
  execute procedure public.handle_updated_at();

-- Create a function to handle new user signups
create or replace function public.handle_new_user()
returns trigger as $$
begin
  -- Create user
  insert into public.users (id, name, email)
  values (new.id, new.raw_user_meta_data->>'name', new.email);
  
  -- Create user settings with defaults
  insert into public.user_settings (user_id)
  values (new.id);
  
  return new;
end;
$$ language plpgsql security definer;

-- Create a trigger to automatically create user and settings when a new user signs up
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();