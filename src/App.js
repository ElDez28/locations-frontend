import React, { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import NewPlace from "./places/pages/NewPlace";
import UpdatePlace from "./places/pages/UpdatePlace";
import UserPlaces from "./places/pages/UserPlaces";
import MainNavigation from "./shared/Navigation/MainNavigation";
import Users from "./user/pages/Users";
import Auth from "./user/pages/Auth";
import cookie from "react-cookies";
import Cookies from "js-cookie";
import { useState } from "react";
import ProtectedRoute from "./user/components/ProtectedRoute";
import { AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import { loginActions } from "./places/store/store";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(() => {
    const id = localStorage.getItem("id");
    const token = localStorage.getItem("jwt");
    const expDate = localStorage.getItem("exp");
    if (token && expDate > new Date()) {
      dispatch(loginActions.login(token));
      dispatch(loginActions.setId(id));
    }
  }, [dispatch]);

  return (
    <>
      <MainNavigation></MainNavigation>
      <main>
        <AnimatePresence exitBeforeEnter>
          <Routes location={location} key={location.key}>
            <Route path="/users/*" element={<Users></Users>}></Route>

            <Route
              path="users/:userId/places"
              element={<UserPlaces></UserPlaces>}
            ></Route>
            <Route element={<ProtectedRoute></ProtectedRoute>}>
              <Route path="/places/*">
                <Route path="new" element={<NewPlace></NewPlace>}></Route>
                <Route path=":id" element={<UpdatePlace></UpdatePlace>}></Route>
              </Route>
            </Route>
            <Route path="/auth" element={<Auth></Auth>}></Route>
            <Route path="*" element={<Navigate replace to="/users" />}></Route>
          </Routes>
        </AnimatePresence>
      </main>
    </>
  );
}

export default App;
