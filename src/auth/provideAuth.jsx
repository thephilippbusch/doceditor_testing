import React, { createContext, useContext, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';

const authContext = createContext();

export const useAuth = () => {
    return useContext(authContext);
}

const fakeAuth = {
    isAuthenticated: false,
    signin(cb) {
        fakeAuth.isAuthenticated = true;
        setTimeout(cb, 100);
    },
    signout(cb) {
        fakeAuth.isAuthenticated = false;
        setTimeout(cb, 100);
    }
}

const useProvideAuth = () => {
    const [user, setUser] = useState(null);

    const signin = cb => {
        return fakeAuth.signin(() => {
            setUser("user");
            cb();
        })
    }

    const signout = cb => {
        return fakeAuth.signout(() => {
            setUser(null);
            cb();
        })
    }

    return {
        user,
        signin,
        signout
    }
}

export const PrivateRoute = ({ children, ...rest }) => {
    let auth = useAuth();
    return (
      <Route
        {...rest}
        render={({ location }) =>
          auth.user ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }

const ProvideAuth = ({ children }) => {
    const auth = useProvideAuth();

    return(
        <authContext.Provider value={auth}>
            {children}
        </authContext.Provider>
    )
}

export default ProvideAuth;