import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import AppliedRoute from "./components/AppliedRoute";
import Signup from "./containers/Signup";
import NewEmail from "./containers/NewEmail";
import Emails from "./containers/Emails";
import EmailSys from "./containers/EmailSys";
import ListEmails from "./containers/ListEmails";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";





export default ({ childProps }) =>
  <Switch>
    <AppliedRoute path="/" exact component={Home} props={childProps} />
    <UnauthenticatedRoute path="/login" exact component={Login} props={childProps} />
    <UnauthenticatedRoute path="/signup" exact component={Signup} props={childProps} />
    <AuthenticatedRoute path="/email-sys" exact component={EmailSys} props={childProps} />
    <AuthenticatedRoute path="/email-sys/emails/new" exact component={NewEmail} props={childProps} />
    <AuthenticatedRoute path="/email-sys/emails" exact component={ListEmails} props={childProps} />
    <AuthenticatedRoute path="/email-sys/emails/send" exact component={Emails} props={childProps} />
    { /* Finally, catch all unmatched routes */ }
    <Route component={NotFound} />
  </Switch>;

