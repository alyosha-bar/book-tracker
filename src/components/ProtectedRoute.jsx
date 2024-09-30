import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../contexts/userContext';// Assume you have a UserContext for auth state

const ProtectedRoute = ({ children }) => {
    const { user } = useContext(UserContext); // Access user authentication status from context

    if (!user) {
        // If user is not authenticated, redirect to login page
        return <Navigate to="/login" replace />;
    }

    // If user is authenticated, render the child components (protected page)
    return children;
};

export default ProtectedRoute;


