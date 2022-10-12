# Assignment2_3813ICT

## yoneyamakazuki@north-10-21-13-77 Assignment2_3813ICT backend % npm run dev
## yoneyamakazuki@north-10-21-13-77 frontend % ng serve

### GIT
Link: https://github.com/kazu09161999/Assignment2_3813ICT.git
The layout of my git repository is containing the project folder which includes frontend and backend and a README file. The default branch is called main.

### GIT version control
<img width="1310" alt="スクリーンショット 2022-10-12 午後8 18 02" src="https://user-images.githubusercontent.com/55030235/195317314-e48bb942-3744-4018-aabb-759710198bed.png">
My approach to commit when I developed is commit every time, I made something like user interface, function, server, data and so on to avoid losing the data with any happening and error.

### User login
user register is working but login is not.. and the data is saving to MongoDB
<img width="1440" alt="スクリーンショット 2022-10-12 午後8 29 58" src="https://user-images.githubusercontent.com/55030235/195319928-fd50c69f-0503-400c-9233-275f327e0b36.png">

### Data Structure
There is a user data structure used in this program.
user is an array that consists of a user object. A user has name, number, email and password.
They cannot duplicate for email address.

### REST API

Description | this route checks the user registeration. Otherwise it display error message if email is already used or password is not matching.
------------ | -------------
Route | /register
Method | post
Parameters | user: {name: string, number: number, email: string, password: string}
Technical Explanation | This route receives user information and if there is no error send it to mongoDB as registerusers

Description | this route checks
------------ | -------------
Route | /login
Method | post
Parameters | user: {email: string, password: string}
Technical Explanation | This route receives user email and password to login with checking in mongoDB as registerusers
### Angular Architecture


#### Socket
userJoin(): this method let user join to chat.
getCurrentUser(): this method to get current user.
userLeave(): this method let user leave from chat.
getRoomUsers(): this method to get room users.
