


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
  
  | cover          | text NOT NULL
  
  | price         | money NOT NULL
  
  | created_at    | timestamp with time zone DEFAULT CURRENT_TIMESTAMP
  
]

## shop_cart :
[

  | id            | SERIAL PRIMARY KEY
  
  | user_id       | bigint NOT NULLL REFERENCES users (id) ON DELETE CASCADE
  
  | book_id       | bigint NOT NULLL REFERENCES users (id) ON DELETE CASCADE
   
  | count         |smallint CHECK (count > 0 ) DEFAULT 1
  
  | cost          | numeric NOT NULL
  
]

## comments :

id | SERIAL PRIMARY KEY

book_id | REFERENCES books (id) ON DELETE CASCADE

text | text NOT NULL

created_at | timestamp with time zone DEFAULT CURRENT_TIMESTAMP

is_read | boolean DEFAULT false

author_name | text

stars | smallint
