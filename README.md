# WorkoutBuddy 🏋️‍♂️

A modern web application to track and manage your workouts with a beautiful UI and intuitive user experience.

## Features ✨

- **User Authentication**
  - Secure signup and login system
  - Protected routes and API endpoints
  - JWT-based authentication

- **Workout Management**
  - Create new workouts with detailed information
  - Track workout progress and completion status
  - View workout history with timestamps
  - Filter workouts by status (All/Completed/Pending)

- **Progress Tracking**
  - Visual progress bar showing completion rate
  - Statistics dashboard with completed and pending workouts
  - Time-based tracking with relative timestamps

- **Modern UI/UX**
  - Clean and intuitive interface
  - Responsive design for all devices
  - Smooth animations and transitions
  - Real-time feedback and notifications

## Tech Stack 🛠

### Frontend
- React.js
- Tailwind CSS for styling
- Framer Motion for animations
- React Router for navigation
- React Icons for beautiful icons
- React Hot Toast for notifications

### Backend
- Node.js
- Express.js
- MongoDB for database
- JWT for authentication
- RESTful API architecture

## Getting Started 🚀

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/sakibnjr/WorkoutBuddy.git
cd WorkoutBuddy
```

2. Install dependencies
```bash
# Install backend dependencies
cd Backend
npm install

# Install frontend dependencies
cd ../Frontend
npm install
```

3. Set up environment variables
```bash
# In Backend directory
cp .env.example .env
# Add your MongoDB URI and JWT secret
```

4. Start the development servers
```bash
# Start backend server (from Backend directory)
npm run dev

# Start frontend server (from Frontend directory)
npm run dev
```

5. Open your browser and visit `http://localhost:5173`

## Project Structure 📁

```
WorkoutBuddy/
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   └── App.jsx
│   └── package.json
├── Backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── server.js
└── README.md
```

## Contributing 🤝

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License 📝

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments 🙏

- Icons by [React Icons](https://react-icons.github.io/react-icons/)
- UI inspiration from various modern web applications
- Thanks to all contributors who have helped shape this project 