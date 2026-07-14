# Nepal Travel App — DB Schema v2

# Total Tables: 24
 
---
 
## AUTH & PROFILES (4 tables)
 
### profiles

- id                      uuid        PK

- auth_user_id            uuid        FK → auth.users

- full_name               text

- avatar_url              text

- bio                     text

- budget_min              numeric

- budget_max              numeric

- budget_currency         text        FK → currencies.code

- default_travel_style_id uuid        FK → travel_styles.id

- leaderboard_score       int

- created_at              timestamp
 
### travel_styles

- id                      uuid        PK

- name                    text
 
### interests

- id                      uuid        PK

- name                    text
 
### profile_interests

- profile_id              uuid        FK → profiles.id

- interest_id             uuid        FK → interests.id
 
---
 
## SHARED / LOOKUP (2 tables) — NEW
 
### currencies

- code                    text        PK  (e.g. "USD", "NPR", "EUR")

- name                    text            (e.g. "US Dollar")

- symbol                  text            (e.g. "$", "₨")
 
### cost_categories

- id                      uuid        PK

- name                    text            (e.g. "Accommodation", "Food", "Transport")
 
---
 
## BADGES (3 tables)
 
### badges

- id                      uuid        PK

- name                    text

- type                    text

- description             text

- icon_url                text
 
### badge_criteria — NEW

- id                      uuid        PK

- badge_id                uuid        FK → badges.id

- type                    text            (e.g. "trip_count", "district_count", "rating_min")

- target                  numeric         (e.g. 5, 3, 4.0)

- description             text
 
### user_badges

- id                      uuid        PK

- user_id                 uuid        FK → profiles.id

- badge_id                uuid        FK → badges.id

- earned_at               timestamp
 
---
 
## TRIPS (5 tables)
 
### destinations

- id                      uuid        PK

- name                    text

- region                  text

- district                text

- country                 text

- description             text

- latitude                numeric

- longitude               numeric

- difficulty_level        text
 
### trip_types

- id                      uuid        PK

- name                    text
 
### trips

- id                      uuid        PK

- user_id                 uuid        FK → profiles.id

- destination_id          uuid        FK → destinations.id

- title                   text

- duration_days           int

- budget_amount           numeric

- budget_currency         text        FK → currencies.code

- no_of_people            int

- trip_type_id            uuid        FK → trip_types.id

- ai_generated            boolean

- status                  text

- ai_prompt_raw           jsonb

- ai_response_raw         jsonb

- created_at              timestamp
 
### trip_days

- id                      uuid        PK

- trip_id                 uuid        FK → trips.id

- day_no                  int

- title                   text

- description             text

- weather_summary         text

- weather_raw             jsonb

- road_condition_summary  text

- road_condition_raw      jsonb

- map_data                jsonb
 
### trip_day_costs

- id                      uuid        PK

- trip_day_id             uuid        FK → trip_days.id

- category_id             uuid        FK → cost_categories.id

- estimated_amount        numeric

- currency                text        FK → currencies.code
 
---
 
## FEEDBACK (2 tables)
 
### trip_feedback

- id                      uuid        PK

- trip_id                 uuid        FK → trips.id

- user_id                 uuid        FK → profiles.id

- actual_total_cost       numeric

- actual_duration_days    int

- experience_rating       int

- difficulty_rating       int

- comment                 text

- submitted_at            timestamp
 
### trip_feedback_costs

- id                      uuid        PK

- feedback_id             uuid        FK → trip_feedback.id

- category_id             uuid        FK → cost_categories.id

- amount                  numeric

- currency                text        FK → currencies.code
 
---
 
## POSTS (7 tables)
 
### post_categories

- id                      uuid        PK

- name                    text
 
### tags

- id                      uuid        PK

- name                    text
 
### posts

- id                      uuid        PK

- user_id                 uuid        FK → profiles.id

- group_id                uuid        FK → groups.id

- trip_id                 uuid        FK → trips.id  (nullable, for trip_share posts)

- title                   text

- content                 text

- category_id             uuid        FK → post_categories.id

- post_type               text            (e.g. "standard", "trip_share", "guide")

- visibility              text            (e.g. "public", "private")

- created_at              timestamp
 
### post_tags

- post_id                 uuid        FK → posts.id

- tag_id                  uuid        FK → tags.id
 
### post_images

- id                      uuid        PK

- post_id                 uuid        FK → posts.id

- image_url               text

- sort_order              int
 
### post_polls — NEW

- id                      uuid        PK

- post_id                 uuid        FK → posts.id

- question                text

- created_at              timestamp
 
### post_poll_options — NEW

- id                      uuid        PK

- poll_id                 uuid        FK → post_polls.id

- option                  text

- votes                   int
 
---
 
## COMMUNITY (2 tables)
 
### groups

- id                      uuid        PK

- name                    text

- description             text

- type                    text            (e.g. "hiking", "photography") 

- visibility              text            (e.g. "public", "private")

- avatar_url              text

- created_by              uuid        FK → profiles.id

- created_at              timestamp
 
### group_members

- id                      uuid        PK

- group_id                uuid        FK → groups.id

- user_id                 uuid        FK → profiles.id

- role                    text            (e.g. "admin", "moderator", "member")

- status                  text            (e.g. "pending", "approved", "rejected")

- joined_at               timestamp
 
---
 
## NOTES FOR LATER

- leaderboard_events table (for tracking how score is earned) — skipped for now, add if needed
- profile_interests and post_tags are junction tables with no id PK — that's fine, but Supabase works a bit nicer if you define a composite primary key on them:
- sqlPRIMARY KEY (profile_id, interest_id)
- PRIMARY KEY (post_id, tag_id)
- Enable Row Level Security (RLS) on every table from the start — painful to add later
- The profiles table needs a trigger to auto-create a profile row when a new auth user signs up

 






