# cs340_project
This is the final project for CS340, group name "Anything Fines I Think". The database is designed to support a site that facilitates purchasing video games,
as well as discussing these video games with other users and friends on the site. In each page, the controls allow the user to generate SQL queries to
manipulate the database. Some controls, such as those on retrieve statements, can be left blank. If they are blank, then these controls will match anything
in the database. For example, leaving all the controls blank on a retrieve will select everything. If 1 control is filled in, then it will only retrieve
rows that match that one control. If multiple are filled in, it will match rows that match ALL controls.
# Dependencies
express, express-handlebars, handlebars, mysql. The server also uses the npm package forever to run. 
# Running
The source code connects to Jordan's database by default, which is cs340_brantnej, and the password must be passed in as a commandline argument. 
The second commandline argument must be the port that you wish to run the site on.
# Authors
Remy Rouyer, Jordan Brantner
