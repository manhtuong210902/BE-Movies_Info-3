-- table movies
DROP TABLE IF EXISTS Movies;
CREATE TABLE Movies (
  	id varchar(20) NOT NULL PRIMARY KEY,
  	img varchar NOT NULL,
	title varchar(255) NOT NULL,
	year int4,
	topRank int4,
	rating float,
	ratingCount int4,
	genres varchar NOT NULL
)
;

-- table casts
DROP TABLE IF EXISTS Casts;
CREATE TABLE Casts (
   	id varchar(20) NOT NULL PRIMARY KEY,
  	image varchar,
  	legacyNameText varchar(50),
  	name varchar(50),
  	birthDay varchar,
  	birthPlace varchar,
	gender varchar(50),
	heightCentimeters float
)
;

-- table movie_cast
DROP TABLE IF EXISTS Movie_Cast;
CREATE TABLE Movie_Cast (
	movieid varchar(20) NOT NULL,
	castid varchar(20) NOT NULL,
	characters varchar(50) NOT NULL,
	PRIMARY KEY (movieid, castid),
	FOREIGN KEY (movieid) REFERENCES Movies(id),
	FOREIGN KEY (castid) REFERENCES Casts(id)
);

-- table reviews
DROP TABLE IF EXISTS Reviews;
CREATE TABLE Reviews (
	movieid varchar(20) NOT NULL,
	author varchar(255),
	reviewText varchar,
	reviewTitle varchar,
	FOREIGN KEY (movieid) REFERENCES Movies(id)
);


-- table users
DROP TABLE IF EXISTS Users;
CREATE TABLE Users (
  	id int4 NOT NULL UNIQUE,
  	username varchar(50) NOT NULL,
  	password varchar(255) NOT NULL
)
;

--bảng favorite
CREATE TABLE Favorite(
	uid int4 NOT NULL,
	movieid varchar(20) NOT NULL,
	PRIMARY KEY (uid, movieid),
	FOREIGN KEY (uid) REFERENCES Users(id),
	FOREIGN KEY (movieid) REFERENCES Movies(id)
);




































