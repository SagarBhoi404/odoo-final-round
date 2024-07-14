import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email || !password) {
      toast.error("All fields are required.");
      return;
    }

    try {
      const response = await axios.post("http://192.168.2.232:8000/api/auth/login", {
        email,
        password,
      });
      
      if (response.status === 200) {
        const role = response.data.User.role;
        // console.log(role);
        if(role == 'librarian'){
          localStorage.setItem("token", response.data.token);
          navigate("Librarian/Librariandashboard");
          toast.success('Login Successfully!');
        }else{
          localStorage.setItem("token", response.data.token);
          navigate("Admin/Admindashboard");
          toast.success('Login Successfully!');

        }
     
      } else {
        toast.error("Invalid login credentials.");
      }
    } catch (error) {
      toast.error("Invalid login credentials.");

    }
  };

  return (
    <>
      <main>
        <div className="container">
          <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                  <div className="d-flex justify-content-center py-4">
                    <a href="index.html" className="logo d-flex align-items-center w-auto">
                      <img src="assets/img/logo.png" alt="Logo" />
                      <span className="d-none d-lg-block">Library Management System</span>
                    </a>
                  </div>
                  <Toaster />
                  <div className="card mb-3">
                    <div className="card-body">
                      <div className="pt-4 pb-2">
                        <h5 className="card-title text-center pb-0 fs-4">
                          Login to Your Account
                        </h5>
                        <p className="text-center small">
                          Enter your email & password to login
                        </p>
                      </div>

                      <form className="row g-3 needs-validation" onSubmit={handleSubmit} noValidate>
                        <div className="col-12">
                          <label htmlFor="yourEmail" className="form-label">
                            Email
                          </label>
                          <div className="input-group has-validation">
                            <span className="input-group-text" id="inputGroupPrepend">
                              @
                            </span>
                            <input
                              type="email"
                              name="email"
                              className="form-control"
                              id="yourEmail"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                            />
                            <div className="invalid-feedback">
                              Please enter your email.
                            </div>
                          </div>
                        </div>

                        <div className="col-12">
                          <label htmlFor="yourPassword" className="form-label">
                            Password
                          </label>
                          <input
                            type="password"
                            name="password"
                            className="form-control"
                            id="yourPassword"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          />
                          <div className="invalid-feedback">
                            Please enter your password!
                          </div>
                        </div>

                        <div className="col-12">
                          <button className="btn btn-primary w-100" type="submit">
                            Login
                          </button>
                        </div>
                       
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

export default Login;
