create extension if not exists "pgcrypto";

create table if not exists public.email_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamp with time zone not null default timezone('utc', now())
);

alter table public.email_subscribers enable row level security;

drop policy if exists "Allow anonymous inserts" on public.email_subscribers;

create policy "Allow anonymous inserts" on public.email_subscribers
for insert
to anon
with check (true);
