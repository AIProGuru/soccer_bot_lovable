
create table public.analyses (
  id uuid default gen_random_uuid() primary key,
  team_name text not null,
  play_style text not null,
  analysis text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  user_id uuid references auth.users(id)
);

-- Enable RLS
alter table public.analyses enable row level security;

-- Create policy to allow authenticated users to insert their own analyses
create policy "Users can insert their own analyses"
  on public.analyses
  for insert
  with check (auth.uid() = user_id);

-- Create policy to allow users to view their own analyses
create policy "Users can view their own analyses"
  on public.analyses
  for select
  using (auth.uid() = user_id);
