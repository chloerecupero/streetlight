-- Streetlight Phase 3 — core schema + RLS
-- Run via Supabase CLI (`supabase db push`) or SQL editor.

-- -----------------------------------------------------------------------------
-- 1. profiles (1:1 with auth.users)
-- -----------------------------------------------------------------------------
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  email text,
  avatar_url text,
  created_at timestamptz not null default now()
);

comment on table public.profiles is
  'App-level user profile; id matches auth.users. Email may mirror auth email for convenience.';

-- -----------------------------------------------------------------------------
-- 2. households
-- -----------------------------------------------------------------------------
create table public.households (
  id uuid primary key default gen_random_uuid (),
  name text not null,
  neighborhood text,
  created_by uuid not null references public.profiles (id) on delete cascade,
  created_at timestamptz not null default now()
);

comment on table public.households is
  'A family or caregiving unit; activities and children are scoped to a household.';

-- -----------------------------------------------------------------------------
-- 3. household_members (parents / guardians in a household)
-- -----------------------------------------------------------------------------
create table public.household_members (
  id uuid primary key default gen_random_uuid (),
  household_id uuid not null references public.households (id) on delete cascade,
  user_id uuid not null references public.profiles (id) on delete cascade,
  role text not null check (role in ('parent', 'guardian')),
  created_at timestamptz not null default now (),
  unique (household_id, user_id)
);

comment on table public.household_members is
  'Links auth users (profiles) to households with a parent/guardian role.';

-- -----------------------------------------------------------------------------
-- 4. children
-- -----------------------------------------------------------------------------
create table public.children (
  id uuid primary key default gen_random_uuid (),
  household_id uuid not null references public.households (id) on delete cascade,
  first_name text not null,
  age_range text,
  avatar_url text,
  interests text[],
  created_at timestamptz not null default now ()
);

comment on table public.children is
  'Child profiles owned by a household; never tied directly to auth.users.';

-- -----------------------------------------------------------------------------
-- 5. activities
-- -----------------------------------------------------------------------------
create table public.activities (
  id uuid primary key default gen_random_uuid (),
  household_id uuid not null references public.households (id) on delete cascade,
  title text not null,
  description text,
  activity_type text,
  location_name text,
  starts_at timestamptz,
  ends_at timestamptz,
  max_participants int,
  status text not null default 'open' check (status in ('open', 'closed', 'cancelled')),
  created_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now ()
);

comment on table public.activities is
  'Neighborhood activities hosted by a household (organizer context).';

-- -----------------------------------------------------------------------------
-- 6. join_requests
-- -----------------------------------------------------------------------------
create table public.join_requests (
  id uuid primary key default gen_random_uuid (),
  activity_id uuid not null references public.activities (id) on delete cascade,
  child_id uuid not null references public.children (id) on delete cascade,
  household_id uuid not null references public.households (id) on delete cascade,
  status text not null default 'pending' check (
    status in ('pending', 'approved', 'declined', 'cancelled')
  ),
  parent_note text,
  created_at timestamptz not null default now (),
  unique (activity_id, child_id)
);

comment on table public.join_requests is
  'A household requests a child join an activity; host and requester households both need visibility.';

-- -----------------------------------------------------------------------------
-- Helper: household IDs for the current user (SECURITY DEFINER avoids RLS
-- recursion when policies on household_members reference membership.)
-- -----------------------------------------------------------------------------
create or replace function public.user_household_ids ()
returns setof uuid
language sql
stable
security definer
set search_path = public
as $$
  select hm.household_id
  from public.household_members hm
  where hm.user_id = auth.uid ();
$$;

comment on function public.user_household_ids () is
  'Returns all household UUIDs the current auth user belongs to; used by RLS policies.';

revoke all on function public.user_household_ids () from public;
grant execute on function public.user_household_ids () to authenticated;

-- -----------------------------------------------------------------------------
-- Helper: activity exists and is joinable (definer bypasses RLS on activities
-- so requesters can reference another household's activity_id on insert.)
-- -----------------------------------------------------------------------------
create or replace function public.activity_is_joinable (activity_uuid uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.activities a
    where a.id = activity_uuid
      and a.status = 'open'
  );
$$;

comment on function public.activity_is_joinable (uuid) is
  'True if the activity row exists and status is open; used by join_requests INSERT RLS.';

revoke all on function public.activity_is_joinable (uuid) from public;
grant execute on function public.activity_is_joinable (uuid) to authenticated;

-- -----------------------------------------------------------------------------
-- Row level security
-- -----------------------------------------------------------------------------
alter table public.profiles enable row level security;
alter table public.households enable row level security;
alter table public.household_members enable row level security;
alter table public.children enable row level security;
alter table public.activities enable row level security;
alter table public.join_requests enable row level security;

-- -----------------------------------------------------------------------------
-- profiles
-- -----------------------------------------------------------------------------
-- Policy: Users can read their own profile row.
create policy "profiles_select_own"
  on public.profiles
  for select
  to authenticated
  using (id = auth.uid ());

comment on policy "profiles_select_own" on public.profiles is
  'Each user can SELECT their own profile (id = auth.uid()).';

-- Policy: Users can read profiles of other users in any household they share.
create policy "profiles_select_cohousehold"
  on public.profiles
  for select
  to authenticated
  using (
    exists (
      select 1
      from public.household_members hm_self
      join public.household_members hm_other
        on hm_self.household_id = hm_other.household_id
      where hm_self.user_id = auth.uid ()
        and hm_other.user_id = profiles.id
    )
  );

comment on policy "profiles_select_cohousehold" on public.profiles is
  'Members can read profiles of users who share at least one household (for RSVPs, hosts, etc.).';

-- Policy: Users insert only their own profile row (typical signup hook).
create policy "profiles_insert_self"
  on public.profiles
  for insert
  to authenticated
  with check (id = auth.uid ());

comment on policy "profiles_insert_self" on public.profiles is
  'Users may only create a profile row for themselves (id must match auth.uid()).';

-- Policy: Users update only their own profile.
create policy "profiles_update_self"
  on public.profiles
  for update
  to authenticated
  using (id = auth.uid ())
  with check (id = auth.uid ());

comment on policy "profiles_update_self" on public.profiles is
  'Users may UPDATE only their own profile.';

-- Policy: Users delete only their own profile (optional cleanup).
create policy "profiles_delete_self"
  on public.profiles
  for delete
  to authenticated
  using (id = auth.uid ());

comment on policy "profiles_delete_self" on public.profiles is
  'Users may DELETE only their own profile row.';

-- -----------------------------------------------------------------------------
-- households
-- -----------------------------------------------------------------------------
-- Policy: Members can read households they belong to.
create policy "households_select_member"
  on public.households
  for select
  to authenticated
  using (id in (select public.user_household_ids ()));

comment on policy "households_select_member" on public.households is
  'Authenticated users can read a household only if they are in household_members for that id.';

-- Policy: Authenticated users can create a household they own (created_by = self).
create policy "households_insert_creator"
  on public.households
  for insert
  to authenticated
  with check (created_by = auth.uid ());

comment on policy "households_insert_creator" on public.households is
  'New households must list the current user as created_by (bootstrap before adding members).';

-- Policy: Members can update households they belong to.
create policy "households_update_member"
  on public.households
  for update
  to authenticated
  using (id in (select public.user_household_ids ()))
  with check (id in (select public.user_household_ids ()));

comment on policy "households_update_member" on public.households is
  'Only members of the household may update its row.';

-- Policy: Members can delete households they belong to (tight MVP; tighten to admins later if needed).
create policy "households_delete_member"
  on public.households
  for delete
  to authenticated
  using (id in (select public.user_household_ids ()));

comment on policy "households_delete_member" on public.households is
  'Only members may delete the household row (cascades to members, children, activities).';

-- -----------------------------------------------------------------------------
-- household_members
-- -----------------------------------------------------------------------------
-- Policy: Members can see other members in the same households.
create policy "household_members_select_same_household"
  on public.household_members
  for select
  to authenticated
  using (household_id in (select public.user_household_ids ()));

comment on policy "household_members_select_same_household" on public.household_members is
  'Users can read membership rows only for households they belong to.';

-- Policy: Creator can add themselves; existing members can add rows for their household.
create policy "household_members_insert_bootstrap_or_member"
  on public.household_members
  for insert
  to authenticated
  with check (
    (
      user_id = auth.uid ()
      and exists (
        select 1
        from public.households h
        where h.id = household_id
          and h.created_by = auth.uid ()
      )
    )
    or (household_id in (select public.user_household_ids ()))
  );

comment on policy "household_members_insert_bootstrap_or_member" on public.household_members is
  'Insert allowed if (a) user adds self to a household they created, or (b) user is already a member inviting others.';

-- Policy: Members can update membership rows in their households.
create policy "household_members_update_member"
  on public.household_members
  for update
  to authenticated
  using (household_id in (select public.user_household_ids ()))
  with check (household_id in (select public.user_household_ids ()));

comment on policy "household_members_update_member" on public.household_members is
  'Members may update membership rows only within their households.';

-- Policy: Members can remove membership rows in their households.
create policy "household_members_delete_member"
  on public.household_members
  for delete
  to authenticated
  using (household_id in (select public.user_household_ids ()));

comment on policy "household_members_delete_member" on public.household_members is
  'Members may delete membership rows only within their households (e.g. leave or revoke).';

-- -----------------------------------------------------------------------------
-- children
-- -----------------------------------------------------------------------------
-- Policy: Household members can read children in their households.
create policy "children_select_member"
  on public.children
  for select
  to authenticated
  using (household_id in (select public.user_household_ids ()));

comment on policy "children_select_member" on public.children is
  'Users can read children only for households they belong to.';

-- Policy: Household members can add children to their households.
create policy "children_insert_member"
  on public.children
  for insert
  to authenticated
  with check (household_id in (select public.user_household_ids ()));

comment on policy "children_insert_member" on public.children is
  'Only members of a household may insert children for that household_id.';

-- Policy: Household members can update children in their households.
create policy "children_update_member"
  on public.children
  for update
  to authenticated
  using (household_id in (select public.user_household_ids ()))
  with check (household_id in (select public.user_household_ids ()));

comment on policy "children_update_member" on public.children is
  'Members may update child rows only within their households.';

-- Policy: Household members can delete children in their households.
create policy "children_delete_member"
  on public.children
  for delete
  to authenticated
  using (household_id in (select public.user_household_ids ()));

comment on policy "children_delete_member" on public.children is
  'Members may delete child rows only within their households.';

-- -----------------------------------------------------------------------------
-- activities
-- -----------------------------------------------------------------------------
-- Policy: Household members can read activities for their households.
create policy "activities_select_member"
  on public.activities
  for select
  to authenticated
  using (household_id in (select public.user_household_ids ()));

comment on policy "activities_select_member" on public.activities is
  'Users can read activities hosted by households they belong to.';

-- Policy: Members can create activities for their households.
create policy "activities_insert_member"
  on public.activities
  for insert
  to authenticated
  with check (
    household_id in (select public.user_household_ids ())
    and (created_by is null or created_by = auth.uid ())
  );

comment on policy "activities_insert_member" on public.activities is
  'Members insert activities only for their households; created_by must be self or null.';

-- Policy: Members can update activities for their households.
create policy "activities_update_member"
  on public.activities
  for update
  to authenticated
  using (household_id in (select public.user_household_ids ()))
  with check (household_id in (select public.user_household_ids ()));

comment on policy "activities_update_member" on public.activities is
  'Members may update activities only for their own households.';

-- Policy: Members can delete activities for their households.
create policy "activities_delete_member"
  on public.activities
  for delete
  to authenticated
  using (household_id in (select public.user_household_ids ()));

comment on policy "activities_delete_member" on public.activities is
  'Members may delete activities only for their own households.';

-- -----------------------------------------------------------------------------
-- join_requests
-- -----------------------------------------------------------------------------
-- Policy: Requesting household members OR hosting household members can read a join request.
create policy "join_requests_select_participant"
  on public.join_requests
  for select
  to authenticated
  using (
    household_id in (select public.user_household_ids ())
    or exists (
      select 1
      from public.activities a
      where a.id = join_requests.activity_id
        and a.household_id in (select public.user_household_ids ())
    )
  );

comment on policy "join_requests_select_participant" on public.join_requests is
  'Readable by members of the requesting household or members of the activity host household.';

-- Policy: Requesting household can create a join request for their child on an activity.
create policy "join_requests_insert_requesting_household"
  on public.join_requests
  for insert
  to authenticated
  with check (
    household_id in (select public.user_household_ids ())
    and exists (
      select 1
      from public.children c
      where c.id = child_id
        and c.household_id = join_requests.household_id
    )
    and public.activity_is_joinable (activity_id)
  );

comment on policy "join_requests_insert_requesting_household" on public.join_requests is
  'Inserts only from a household the user belongs to; child must belong to that household; activity must exist and be open (validated via activity_is_joinable so RLS on activities does not block cross-household requests).';

-- Policy: Requesting or hosting household members can update (approve/decline/cancel).
create policy "join_requests_update_participant"
  on public.join_requests
  for update
  to authenticated
  using (
    household_id in (select public.user_household_ids ())
    or exists (
      select 1
      from public.activities a
      where a.id = join_requests.activity_id
        and a.household_id in (select public.user_household_ids ())
    )
  )
  with check (
    household_id in (select public.user_household_ids ())
    or exists (
      select 1
      from public.activities a
      where a.id = join_requests.activity_id
        and a.household_id in (select public.user_household_ids ())
    )
  );

comment on policy "join_requests_update_participant" on public.join_requests is
  'Updates allowed for members of the requesting household or the activity host household.';

-- Policy: Same parties can delete (e.g. withdraw request).
create policy "join_requests_delete_participant"
  on public.join_requests
  for delete
  to authenticated
  using (
    household_id in (select public.user_household_ids ())
    or exists (
      select 1
      from public.activities a
      where a.id = join_requests.activity_id
        and a.household_id in (select public.user_household_ids ())
    )
  );

comment on policy "join_requests_delete_participant" on public.join_requests is
  'Deletes allowed for members of the requesting household or the activity host household.';

-- -----------------------------------------------------------------------------
-- Indexes (RLS subqueries + FK lookups)
-- -----------------------------------------------------------------------------
create index idx_household_members_user_id on public.household_members (user_id);
create index idx_household_members_household_id on public.household_members (household_id);
create index idx_children_household_id on public.children (household_id);
create index idx_activities_household_id on public.activities (household_id);
create index idx_join_requests_activity_id on public.join_requests (activity_id);
create index idx_join_requests_household_id on public.join_requests (household_id);

-- -----------------------------------------------------------------------------
-- API access (Supabase PostgREST uses the authenticated role)
-- -----------------------------------------------------------------------------
grant select, insert, update, delete on public.profiles to authenticated;
grant select, insert, update, delete on public.households to authenticated;
grant select, insert, update, delete on public.household_members to authenticated;
grant select, insert, update, delete on public.children to authenticated;
grant select, insert, update, delete on public.activities to authenticated;
grant select, insert, update, delete on public.join_requests to authenticated;
