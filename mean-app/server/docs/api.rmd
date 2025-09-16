# waste-zero-full-stack
WasteZero Project - Milestone 1 API List

Authentication APIs:
Endpoint               Method      Request Body:
1)./api/auth/register      POST        {name,email,password,role,skills,
                                    location,bio}   
2)./api/auth/login         POST        {email,password}
3)./api/auth/logout        POST           ---

User Profile APIs:
Endpoint                Method       Request Body:
1)./api/users/:id           GET            ---
                                       
2)./api/users               GET             ---

3)./api/users           POST       {name,skills,location,bio
                                   password?},(creates
                                    user with id)
                                      
4)./api/users/:id           PUT       {name,skills,    
                                     location, bio
                                   password?},(updates profile of
                                    user with id)

5)./api/users/:id           DELETE           ---
                                   
                                
