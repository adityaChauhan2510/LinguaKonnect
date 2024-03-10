// import { createContext, useContext, useState } from "react";
// import axios from "axios";

// const AuthContext = createContext();

// function AuthProvider({ children }) {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [user, setUser] = useState({});
//   const [tutor, setTutor] = useState({});

//   return (
//     <AuthContext.Provider
//       value={{
//         isAuthenticated,
//         setIsAuthenticated,
//         loading,
//         setLoading,
//         user,
//         setUser,
//         tutor,
//         setTutor,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }

// function useAuth() {
//   const context = useContext(AuthContext);
//   if (context === undefined)
//     throw new Error("This context was used outside the AuthProvider.");

//   return context;
// }

// export { AuthProvider, useAuth };
