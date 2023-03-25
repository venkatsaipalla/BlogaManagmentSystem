import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import Home from "./components/Home";
import UpdateBlog from "./components/UpdateBlog";
import AddBlog from "./components/AddBlog";
import NotFound from "./components/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";

function App() {
  return (
    <>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
          integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
          crossOrigin="anonymous"
        ></link>
      </head>
      <body>
        <BrowserRouter>
          <Switch>
            <Route exact path="/login" component={LoginForm} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/updateBlog" component={UpdateBlog} />
            <ProtectedRoute exact path="/addBlog" component={AddBlog} />
            <Route path="/not-found" component={NotFound} />
            <Redirect to="not-found" />
          </Switch>
        </BrowserRouter>
        <script
          src="https://kit.fontawesome.com/20c5629a29.js"
          crossOrigin="anonymous"
        ></script>
      </body>
    </>
  );
}

export default App;
