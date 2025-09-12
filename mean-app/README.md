# waste-zero-full-stack
WasteZero Project - Milestone 1 API List

Authentication APIs
Endpoint               Method      Request Body
/api/auth/register      POST        {name,email,password,role,skills,
                                    location,bio}   
/api/auth/login         POST        {email,password}
/api/auth/logout        POST           ---

User Profile APIs
Endpoint                Method       Request Body
/api/users/:id           GET            ---
                                       
/api/users               GET             ---

/api/users           POST       {name,skills,location,bio
                                   password?},(updates profile of
                                    user with id)
                                      
/api/users/:id           PUT       {name,skills,location,bio
                                   password?},(updates profile of
                                    user with id)

/api/users/:id           DELETE           ---
                                   
                                
