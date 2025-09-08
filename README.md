# CLERK! The Student Management System(SMS) Frontend

A React-based frontend for managing student records with course assignments and image uploads.

## Features

- Student management (CRUD operations)
- Course management
- Image upload support
- Toast notifications
- Responsive design with Tailwind CSS
- Route-based views

## Prerequisites

- Node.js >= 14
- npm or yarn
- Backend API running (see student-backend project)

## Project Structure

```
student-dashboard/
├── src/
│   ├── components/      # Reusable UI components
│   ├── context/        # React context providers
│   ├── hooks/          # Custom React hooks
│   ├── pages/          # Page layouts
│   ├── services/       # API services
│   └── views/          # Route views
├── public/             # Static assets
└── index.html          # Entry HTML
```

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```env
VITE_API_BASE_URL=your_backend_api_url
```

3. Start development server:
```bash
npm run dev
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Technology Stack

- React 18
- React Router v6
- Tailwind CSS
- Vite
- Context API for state management

## Key Components

### Context Providers
- `StudentContext` - Manages student and course data
- `ToastContext` - Manages notifications

### Views
- `DisplayStudentsView` - List all students
- `AddStudentsView` - Add new student
- `EditStudentsView` - Modify existing students
- `CoursesView` - Manage courses

### Components
- `StudentForm` - Reusable form for student data
- `ConfirmDialog` - Modal for confirmations
- `Loader` - Loading state indicator

## Styling

This project uses Tailwind CSS for styling. Custom components and utilities are defined in `index.css`.

## Development

1. Run backend server first
2. Start frontend development server
3. Access at http://localhost:5173

## Production Build

```bash
npm run build
```

Production files will be in `dist/` directory.

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| VITE_API_BASE_URL | Backend API URL | your_backend_api_url |

## Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Open pull request
