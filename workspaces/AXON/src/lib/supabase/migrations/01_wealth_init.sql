-- MIGRATION: 01_WEALTH_INIT
-- PURPOSE: Establish the financial memory of the system.

-- 1. Create Assets Table
create table if not exists public.wealth_assets (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  type text not null check (type in ('SAAS', 'CRYPTO', 'CASH', 'REAL_ESTATE', 'OTHER')),
  value numeric default 0,
  currency text default 'USD',
  user_id uuid references auth.users(id) not null
);

-- 2. Create Transactions Table
create table if not exists public.wealth_transactions (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  asset_id uuid references public.wealth_assets(id) on delete cascade not null,
  amount numeric not null,
  type text not null check (type in ('INCOME', 'EXPENSE', 'INVESTMENT')),
  status text default 'COMPLETED',
  description text
);

-- 3. Enable RLS (Security)
alter table public.wealth_assets enable row level security;
alter table public.wealth_transactions enable row level security;

-- 4. Create Policies (Agent & User Access)
-- For now, we allow full access to authenticated users (The Agent acts as the user)
create policy "Enable all for authenticated users" on public.wealth_assets
for all using (auth.role() = 'authenticated');

create policy "Enable all for authenticated users" on public.wealth_transactions
for all using (auth.role() = 'authenticated');
