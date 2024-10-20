# 🎉 Auction-Bid System

Welcome to the **Auction-Bid System**! This MERN application is designed to manage auctions, bids, and users.

#### It features:

-   **Backend**: Built with **Node.js** and **Express**. https://github.com/Manoj-T-V/ApiAuctionBid
-   **Frontend**: Developed using **React**.
-   **Styling**: Developed using **Styled-components**.
-   **Database**: Uses **MongoDB** for data storage hosted on Mongoatlas.
-   **Authentication**: Managed with **JWT** (JSON Web Tokens).
-   **Password Security**: Handled with **bcrypt** for hashing passwords.
-   **API Documentation**: Done using Swagger UI.

## 📂 Directory Structure

```plaintext
project/
├── backend/
│   ├── config/
│   │   └── db.js            # Database configuration and connection setup
│   │   └── passport.js      # Google authentication configuration and connection setup
│   ├── controllers/
│   │   ├── auctionController.js  # Business logic for auction management
│   │   ├── bidController.js      # Business logic for bid management
│   │   └── userController.js     # Business logic for user management
│   ├── middleware/
│   │   └── authMiddleware.js     # Middleware for authentication
│   ├── models/
│   │   ├── AuctionItem.js        # Mongoose schema for auction items
│   │   ├── Bid.js                # Mongoose schema for bids
│   │   └── User.js               # Mongoose schema for users
│   ├   └── Notification.js       # Mongoose schema for notifications
│   ├── routes/
│   │   ├── auctionRoutes.js      # API routes for auction-related requests
│   │   ├── bidRoutes.js          # API routes for bid-related requests
│   │   └── userRoutes.js         # API routes for user-related requests
│   └── index.js                  # Entry point for the backend server

├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Footer.js         # Component for footer
│   │   │   ├── NavBar.js         # Component for Navbar
│   │   │   ├── ErrorHandler.js   # Custom error handler
│   │   │   ├── PrivateRoute.jsx  # Authorizing components
│   │   │   
│   │   ├── pages/
│   │   │   └── AuctionItem.js    # Displaying auction details
│   │   │   └── CreateAuction.js  # creating auction 
│   │   │   └── Home.js           # Homepage
│   │   │   └── Login.js          # Login page
│   │   │   └── MyAuctionEdit.js  # auction edit
│   │   │   └── Myauctions.js     # Displaying logged in user auctions
│   │   │   └── MyBid.js          # Displaying logged in user Bids
│   │   │   └── Notifications.js  # Displaying logged in notifications
│   │   │   └── Profile.js        # Displaying logged in user bids, auctions
│   │   │   └── Register.js       # Regsiter page
│   │   │   └── Welcome.js        # Displaying Welcome
│   │   ├── App.jsx               # Main application component
│   │   ├── index.js              # Entry point for the React app
│   ├───├── assets                # projects icons, images
│   └── index.html                # Main HTML file for the frontend
└── README.md                     # This file
```


## 🚀 Getting Started

### Prerequisites

-   **Node.js** (v14 or later)
-   **npm** (v6 or later) or **yarn**

### Installation

#### Backend


1. Install dependencies in backend directory:

    ```bash
    npm install
    ```

3. Set up environment variables:
    - Create a `.env` file in the `backend` directory with the following content:
        ```plaintext
        MONGODB_URI=your_mongo_uri
        JWT_SECRET=your_jwt_secret
        GOOGLE_CLIENT_ID=
        GOOGLE_CLIENT_SECRET=
        SESSION_SECRET=
        ```

#### Frontend

1. Install dependencies in frontend directory:

    ```bash
    npm install
    ```

2. Set up environment variables:
    - Create a `.env` file in the `frontend` directory with the following content:
        ```plaintext
        TARGET=http://localhost:5000 or url of backend
        ```

## 🏃‍♂️ Running the Project

### Backend

1. Start the backend server:

    ```bash
    npm start
    ```

    The backend will run on [http://localhost:5000](http://localhost:5000).

### Frontend

1. Start the frontend development server:

    ```bash
    npm start
    ```

    The frontend will run on [http://localhost:3000](http://localhost:3000).

## Database Design

### 1. User Schema

The `User` model stores information about the users who register and participate in the auction.
   ```bash
{
  _id: ObjectId(""),
  firstName: String,         // User's first name
  lastName: String,          // User's last name
  email: String,             // User's email (used for authentication)
  password: String,          // Hashed password
  createdAt: Date,           // Account creation date
  updatedAt: Date            // Last profile update timestamp
}
```
### 2. AuctionItem Schema

The `AuctionItem` model defines each auction item being listed for bidding.
   ```bash
{
  _id: ObjectId(""),
  title: String,                  // Title of the auction item
  description: String,            // Brief description of the auction item
  startingBid: Number,            // Starting bid amount
  currentHighestBid: Number,      // Current highest bid on the item
  createdBy: ObjectId(""),        // Reference to the user who created the auction
  endDate: Date,                  // Auction end date and time
  bids: Array,                    // Array of bid references
  highestBidder: ObjectId(""),    // Reference to the current highest bidder
  createdAt: Date                 // Timestamp when the auction was created
}
```
### 3. Bid Schema

The Bid model represents the bids placed by users on auction items.
   ```bash
{
  _id: ObjectId(""),
  amount: Number,                 // The amount bid by the user
  bidder: ObjectId(""),           // Reference to the user who placed the bid
  auctionItem: ObjectId(""),      // Reference to the auction item
  createdAt: Date                 // Timestamp when the bid was placed
}
```
### 4. Notification Schema

The Notification model manages notifications sent to users when certain events occur, like being outbid
   ```bash
{
  _id: ObjectId(""),
  user: ObjectId(""),                          // Reference to the user who will receive the notification
  message: String,                             // Notification message
  email: String,                               // Email of the user for notification
  isRead: Boolean,                             // Whether the notification has been read or not
  createdAt: Date                              // Timestamp when the notification was created
}
```
#### A user can create multiple auction items. Each AuctionItem has a createdBy field referencing a User.
#### Each AuctionItem can have many bids, represented by the bids array containing references to the Bid model. Each Bid also references an AuctionItem.
#### A user can place multiple bids, each Bid has a bidder field referencing a User.
#### Each notification is linked to a user. The Notification model references the User model to send notifications based on actions like bidding.


## API Documentation
### Swagger link
 Navigate to baseurl/api-docs/  (get bearer key from login and use in following requests)
### Api Json 
 Navigate to baseurl/swagger.json
