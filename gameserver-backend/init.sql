create extension if not exists "uuid-ossp";

CREATE TABLE public.users (
    uid BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    phone_number TEXT,
    email TEXT,
    first_name VARCHAR(25),
    last_name VARCHAR(25),
    age INTEGER,
    address TEXT,
    gender TEXT,

    CONSTRAINT at_least_one_contact CHECK (
        phone_number IS NOT NULL OR email IS NOT NULL
    ),

    CONSTRAINT unique_email UNIQUE (email),
    CONSTRAINT unique_phone UNIQUE (phone_number)
);

-- Enum first
CREATE TYPE engagement_type AS ENUM ('play', 'visit');

-- Table
create table public.engagements (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  created_at timestamp with time zone not null default timezone('utc'::text, now()),
  duration_seconds integer,
  user_id bigint,
  eng_type engagement_type not null, 
  -- 9,6 = numeric(precision, scale) decimaltal
  latitude numeric(9,6), 
  longitude numeric(9,6),
  device_type text check (
    device_type ~* '^(PC|Mobile),(Windows|MacOS|Linux|iOS|Android|Windows)$'
  ),
  browser_type text,
  redirect text,
  
  constraint fk_engagement_user foreign key (user_id) references public.users(uid) on delete set null
);

create table public.score_table(
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    created_at timestamp with time zone not null default timezone('utc'::text, now()),
    user_id bigint not null,
    score integer not null,
    constraint fk_engagement_user foreign key (user_id) references public.users(uid) on delete set null
);

-- Needs changes
create table public.reward_pool_table(
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    message text,
    chance integer,
    amount bigint
);

create table public.reward_log_table (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    created_at timestamp with time zone not null default timezone('utc'::text, now()),
    user_id bigint not null,
    reward_id bigint not null,
    
    constraint fk_reward_log_user
    foreign key (user_id)
    references public.users(uid)
    on delete set null,

    constraint fk_reward_log_reward
    foreign key (reward_id)
    references public.reward_pool_table(id)
);


create table public.raffle_table(
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    created_at timestamp with time zone not null default timezone('utc'::text, now()),
    user_id bigint not null,
    
    constraint fk_raffle_user
    foreign key (user_id)
    references public.users(uid)
    on delete set null
);