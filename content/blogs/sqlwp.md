---
Title: Changing Location/Domain for WordPress
Description:
Template: blog
Date: April 6th, 2016
Lastupdated: April 6th, 2016
Category: blog
---

Something so simple shouldn't have so many gotcha's, but I found myself wishing that
half the methods out there weren't overly written. Anyway, this problem stems from
when you change the directory, url, or domain of WordPress. The official response to this issue
has been less than satisfying and somewhat tedious. 
This method should work for any and all of the cases above without installing extra software.

###1. Login to your Wordpress database server
A server could be on your local or external machine but note these steps depends
on the database system. The command line for logging with MySQL is:

```sql
mysql -u <username> -h <host-url-of-server> -p
//Insert password
```

###2. UPDATE
If you are following along with MySQL then your querry will look like this:
```
USE <wordpress-database>;
UPDATE wp_options SET option_value="<new-url>" WHERE option_name="siteurl";
```
Conversely, you can view your current site address with 
`SELECT * FROM wp_options WHERE option_name="siteurl";`.
Indeed, this method requires you to know your database login username/password, database name, and privileges
for the user modifying the url. 

###3. Login to the Admin-console
After executing the query, go to &lt;new-wordpress-url&gt;/wp-admin. Login and visit your Settings.
Your WordPress Address should be your &lt;new-url&gt;. Complete the process by changing your
Site Address to the same thing.

<br />
### Afterword

The benefits of using this method are that it does not require Wordpress to be available at all and works as long as the database is Active.
As well, this does not require phpMyAdmin nor editting any files in the wordpress directory. 


