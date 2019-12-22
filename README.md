# СУБД:
Используемая СУБД postgreSQL

Структура базы данных имеет слудующий вид:

Таблица пользователей `users`
<table>
<tr>
<td>id</td><td>name</td><td>mail</td><td>password</td><td>created_at</td><td>avatar</td><td>phone</td>
</tr>
<tr>
<td>SERIAL PRIMARY KEY</td>
<td>text NOT NULL</td>
<td>text NOT NULL</td>
<td>text NOT NULL</td>
<td>timestamp with time zone DEFAULT CURRENT_TIMESTAMP</td>
<td>text</td>
<td>text</td>
</tr>
  </table>

Таблица текущих сессий `sessions`
<table>
<tr>
<td>id</td><td>user_id</td><td>ip</td><td>os</td><td>browser</td><td>user_agent</td>
<td>refresh_token</td><td>expired_at</td><td>created_at</td><td>name</td>
</tr>
<tr>
<td>SERIAL PRIMARY KEY</td>
<td>bigint NOT NULLL REFERENCES users (id)</td>
<td>cidr NOT NULL</td>
<td>text</td> 
<td>text</td>
<td>text</td>
<td>text</td>
<td>timestamp with time zone</td>
<td>timestamp with time zone</td>
<td>text</td>
</tr>
</table>

Таблица всех продуктов - книг `books`
<table>
<tr>
<td>id</td><td>user_id</td><td>title</td><td>author</td><td>description</td><td>cover</td>
<td>price</td><td>created_at</td><td>rating</td><td>category</td><td>sale</td>
</tr>
<tr>
<td>SERIAL PRIMARY KEY</td>
<td>bigint NOT NULLL REFERENCES users (id)</td>
<td>text NOT NULL</td>
<td>text NOT NULL</td>
<td>text NOT NULL</td>
<td>text NOT NULL</td>
<td>money NOT NULL</td>
<td>timestamp with time zone DEFAULT CURRENT_TIMESTAMP</td>
<td>real</td>
<td>text</td>
<td>boolean DEFAULT false</td>
</tr>
</table>

Таблица отзывов - комментариев `comments`
<table>
<tr>
<td>id</td><td>book_id</td><td>text</td><td>created_at</td>
<td>is_read</td><td>author_name</td><td>rating</td>
</tr>
<tr>
<td>SERIAL PRIMARY KEY</td>
<td>bigint REFERENCES books (id) ON DELETE CASCADE</td>
<td>text NOT NULL</td>
<td>timestamp with time zone DEFAULT CURRENT_TIMESTAMP</td>
<td>boolean DEFAULT false</td>
<td>text</td>
<td>smallint</td>
</tr>
</table>

Таблица избранных товаров `favorites`
<table>
<tr>
<td>book_id</td><td>user_id</td><td>id</td>
</tr>
<tr>
<td>bigint REFERENCES books (id) ON DELETE CASCADE</td>
<td>bigint REFERENCES users (id) ON DELETE CASCADE</td>
<td>SERIAL PRIMARY KEY</td>
</tr>
</table>
