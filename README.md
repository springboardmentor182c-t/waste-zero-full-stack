# waste-zero-full-stack
Wastezero folder Structure
├── frontend/ # Angular project
├── backend/ # Node.js/Express API
├── .gi􀆟gnore
├── README.md
├── package.json # For root dependencies if needed
├── docker-compose.yml # Op􀆟onal: for running both apps together
├── .env # Environment variables
frontend/
├── src/
│ ├── app/
│ │ ├── core/ # Services, interceptors, guards, models
│ │ ├── features/ # Modules grouped by feature (user, admin, pickup, etc.)
│ │ │ ├── auth/ # Authen􀆟ca􀆟on module (login, signup)
│ │ │ ├── dashboard/ # User dashboard module
│ │ │ ├── pickup/ # Waste pickup booking
│ │ │ ├── recycle/ # Recycling info, history
│ │ │ ├── admin/ # Admin management interface
│ │ ├── shared/ # Shared components (bu􀆩ons, cards, pipes)
│ │ ├── assets/ # Images, icons, styles
│ │ ├── environments/ # Environment files (dev, prod)
│ ├── index.html
│ ├── styles.css # Global styles
├── angular.json
├── package.json
├── tsconfig.json
Backend Node Js:
├── src/
│ ├── controllers/ # Business logic
│ │ ├── authController.js
│ │ ├── pickupController.js
│ │ ├── userController.js
│ │ └── recycleController.js
│ ├── models/ # Database schemas
│ │ ├── User.js
│ │ ├── Pickup.js
│ │ └── Recycle.js
│ ├── routes/ # API endpoints
│ │ ├── authRoutes.js
│ │ ├── pickupRoutes.js
│ │ ├── userRoutes.js
│ │ └── recycleRoutes.js
│ ├── middleware/ # Middleware func􀆟ons
│ │ ├── authMiddleware.js
│ │ └── errorMiddleware.js
│ ├── config/ # Database connec􀆟on & environment setup
│ │ └── db.js
│ ├── u􀆟ls/ # U􀆟lity func􀆟ons
│ │ ├── tokenHelper.js
│ │ └── validator.js
│ ├── server.js # Main applica􀆟on file
├── .env # Environment variables
├── .gi􀆟gnore
├── package.json
├── README.md