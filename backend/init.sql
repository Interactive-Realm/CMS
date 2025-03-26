create extension if not exists "uuid-ossp";

create table public.users(
    uid bigint primary key generated always as identity
    created_at timestamp with time zone not null default timezone('utc'::text, now()),
    phone_number text not null,
    email text not null,
    first_name text,
    last_name text,
    age big
    address text,
    gender text,
    constraint unique_user_identity unique (phone_number, email)
);

create table public.engagements (
  id bigint primary key generated always as identity,
  created_at timestamp with time zone not null default timezone('utc'::text, now()),
  duration_seconds integer,
  user_id bigint,
  eng_type engagement_type not null, 
  latitude numeric(9,6), 
  longitude numeric(9,6),
  device_type text not null check (
    device_type ~* '^(PC|Mobile),(Windows|MacOS|Linux|iOS|Android|Windows)$'
  ),
  browser_type text not null,
  redirect text not null,
  constraint fk_engagement_user foreign key (user_id) references public.users(uid) on delete set null
);

create table public.score_table(
    id bigint primary key generated always as identity,
    created_at timestamp with time zone not null default timezone('utc'::text, now()),
    user_id bigint,
    score text,
    constraint fk_engagement_user foreign key (user_id) references public.users(uid) on delete set null
);

create table public.reward_pool_table(
    id bigint primary key generated always as identity,
    message text,
    chance numeric(5,4),
    amount bigint
);

create table public.reward_log_table (
    id bigint primary key generated always as identity,
    created_at timestamp with time zone not null default timezone('utc'::text, now()),
    user_id bigint,
    reward_id bigint,
    
    constraint fk_reward_log_user
    foreign key (user_id)
    references public.users(uid)
    on delete set null,

    constraint fk_reward_log_reward
    foreign key (reward_id)
    references public.reward_pool_table(id)
    on delete cascade
);


create table public.raffle_table(
    created_at timestamp with time zone not null default timezone('utc'::text, now()),
    user_id bigint,

    constraint fk_raffle_user
    foreign key (user_id)
    references public.users(id)
    on delete cascade,
);