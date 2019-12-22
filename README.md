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

# Описание:

При регистрации введенные данные с клиента проверяются на наличие аналогичных данных в БД в таблице `users`. Если соответсвий не обнаруженно то создается новый пользователь. 

При входе в лк пользователь вводит данные, на сервере проверяются пароль и логин. 
В случае соответствия проводится проверка на наличие уже имеющейся сессии с данным пользователем в таблице `sessions`, если сессия имеется то она удалается и создается новая сессия, т.к количество возможных сессий одна и на клиент отправляется `token` и `refresh_token`.

В ЛК пользователь имеет возможность:
<ul>
<li>добавить аватар</li>
<li>"выставить на продажу" книги т.е добавить:
<ul>
<li>обложку</li>
<li>описание</li>
<li>название</li>
<li>цену</li>
<li>автора</li>
</ul>
</li>
<li>Просмотреть выставленные "на продажу" книги</li>
<li>Посмотреть новинки добавленные в течении последних 24ч</li>
<li>Увидеть отзывы оставленные под добавленными книгами</li>
<li>Просмотреть избранные товары / удалить из избранных</li>
</ul>

### Карточка продукта - книги

В карточке продукта - книги имеется возможность ознакомиться c:
<ul>
<li>описанием</li>
<li>рейтингом</li>
<li>отзывами</li>
</ul>

##### Функционал

<ul>
<li> добавить необходимое количестов товара в корзину</li>
<li>добавить в избранное</li>
<li> оставить отзыв и рейтинг</li>
</ul>

### Главная страница

<ul>
<li>Поиск по имеющимся товарам</li>
<li>Фильтр по категориям</li>
<li>Фильтр по цене</li>
<li>Сортировка по :
<ul>
<li>Умолчанию ("Сортируется по дате добавления")</li>
<li>По цене</li>
<li>По названию</li>
<li>По Автору</li>
</ul>
</li>
<li>По возрастанию - убыванию</li>
</ul>