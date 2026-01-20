# Elevate Task - Post Management System

## Project Overview

This project is a modern React-based web application designed for managing and displaying posts. It interacts with the [JSONPlaceholder API](https://jsonplaceholder.typicode.com/) to fetch and display data, providing a clean, responsive, and high-performance interface. The application demonstrates best practices in React development, including state management with Redux, routing, and form handling with validation.

## Key Features

- **Post Listing**: Displays a list of posts fetched from the JSONPlaceholder API.
- **Post Details**: Detailed view for individual posts, showing full content and author information.
- **Post Creation**: A user-friendly form to simulate creating new posts, complete with Zod-based validation.
- **Responsive Design**: Fully responsive layout built with Tailwind CSS 4 and Shadcn UI components.
- **State Management**: Efficient data fetching and global state synchronization using Redux Toolkit and RTK Query.
- **Premium UI**: Modern aesthetics featuring clean typography, smooth transitions, and polished components.

## Technologies Used

- **Core**: [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/), RTK Query
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/), [Shadcn UI](https://ui.shadcn.com/)
- **Routing**: [React Router DOM v6](https://reactrouter.com/)
- **Forms & Validation**: [React Hook Form](https://react-hook-form.com/), [Zod](https://zod.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)

## Getting Started

### Prerequisites

- **Node.js**: Version 18 or higher recommended.
- **Package Manager**: npm (comes with Node.js) or yarn.

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Abdosamiir/elevate-taks.git
   ```
2. **Navigate to the project folder**:
   ```bash
   cd elevate-taks
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```

### Running Locally

1. **Start the development server**:
   ```bash
   npm run dev
   ```
2. **Access the application**:
   Open your browser and go to `http://localhost:5173` (or the URL displayed in your terminal).

### Building for Production

To generate a production-ready build:

```bash
npm run build
```

The optimized files will be available in the `dist` directory.

## Future Improvements

- **Full Backend Integration**: Replace the placeholder API with a real backend (e.g., Supabase, Node.js/Express) for persistent data storage.
- **User Authentication**: Implement JWT or OAuth-based login/signup for personalized user experiences.
- **Search & Filter**: Add advanced search bars and category filters for easier post navigation.
- **Testing Suite**: Integrate Vitest and React Testing Library for robust unit and integration testing.
- **Animations**: Enhance user experience with Framer Motion for more dynamic UI transitions.

---

_Created as part of the Elevate Task assignment._
