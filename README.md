


## DB structure 

## users : 
 [
 
  | id         | SERIAL PRIMARY KEY
  
  | name       | text NOT NULL
  
  | mail       | text NOT NULL
  
  | password   | text NOT NULL
  
  | created_at | timestamp with time zone DEFAULT CURRENT_TIMESTAMP
  
  | avatar     | text
  
  | phone      | text
]

## sessions : 
[

  | id            | SERIAL PRIMARY KEY
  
  | user_id       | int NOT NULLL REFERENCES users (id)
  
  | ip cidr       | NOT NULL
  
  | os            | text
  
  | browser       | text
  
  | user_agent    | text
  
  | refresh_token | character varying(40)
  
  | expired_at    | timestamp with time zone
  
  | created_at    | timestamp with time zone
  
  | name          | text
]

## books :
[

  | id            | SERIAL PRIMARY KEY
  
  | user_id       | int NOT NULLL REFERENCES users (id)
  
  | title         | text NOT NULL
  
  | author        | text NOT NULL
  
  | description   | text NOT NULL
  
  | coer          | text NOT NULL
  
  | price         | money NOT NULL
  
  | created_at    | timestamp with time zone DEFAULT CURRENT_TIMESTAMP
  
]
