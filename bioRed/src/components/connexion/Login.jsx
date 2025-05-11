import React, { useState, useEffect } from 'react';
import './Login.css'
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
// Importez ce CSS si vous le placez dans un fichier séparé
// import './auth.css';

function Login() {
  // State pour le formulaire actif
  const [isLoginActive, setIsLoginActive] = useState(true);
  const navigate = useNavigate();
  // State pour les données de formulaire
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  
  const [registerData, setRegisterData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: ''
  });
  
  // State pour les messages
  const [loginMessage, setLoginMessage] = useState('');
  const [registerMessage, setRegisterMessage] = useState('');
  
  // Utilisateurs depuis localStorage
  const [comptes, setComptes] = useState([]);
  
  // Regex pour validation
  const emailV = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordV = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  const nameV = /^[a-zA-Z]+$/;
  
  // Charger les utilisateurs depuis localStorage
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('comptes')) || [];
    setComptes(storedUsers);
  }, []);
  
  // Basculer entre login et register
  const toggleForm = (formType) => {
    if (formType === 'login' && !isLoginActive) {
      setIsLoginActive(true);
    } else if (formType === 'register' && isLoginActive) {
      setIsLoginActive(false);
    }
  };
  
  // Gérer les changements dans le formulaire de connexion
  const handleLoginChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
  };
  
  // Gérer les changements dans le formulaire d'inscription
  const handleRegisterChange = (e) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value
    });
  };
  
  // Traiter l'inscription
  const handleRegister = (e) => {
    e.preventDefault();
    const { firstname, lastname, email, password } = registerData;
    
    // Validation
    if (!firstname || !nameV.test(firstname)) {
      setRegisterMessage("Prénom non valide");
      return;
    }
    else if (!lastname || !nameV.test(lastname)) {
      setRegisterMessage("Nom non valide");
      return;
    }
    else if (!email || !emailV.test(email)) {
      setRegisterMessage("Email non valide");
      return;
    }
    else if (!password || !passwordV.test(password)) {
      setRegisterMessage("Mot de passe non valide (min 8 caractères, au moins une lettre et un chiffre)");
      return;
    }
    
    // Vérifier si l'email existe déjà
    if (comptes.some(user => user.email === email)) {
      setRegisterMessage("Cet email existe déjà");
      return;
    }
    
    // Ajouter le nouvel utilisateur
    const updatedUsers = [...comptes, { firstname, lastname, email, password }];
    setComptes(updatedUsers);
    localStorage.setItem('comptes', JSON.stringify(updatedUsers));
    setRegisterMessage("Inscription réussie !");
    
    // Vider le formulaire
    setRegisterData({
      firstname: '',
      lastname: '',
      email: '',
      password: ''
    });
  };
  
  // Traiter la connexion
  const handleLogin = (e) => {
    e.preventDefault();
    const { email, password } = loginData;
    
    // Validation
    if (!email || !emailV.test(email)) {
      setLoginMessage("Format d'email invalide");
      return;
    }
    if (!password) {
      setLoginMessage("Mot de passe requis");
      return;
    }
    
    // Vérifier les identifiants
    const user = comptes.find(user => user.email === email && user.password === password);
    if (user) {
      setLoginMessage(`Bienvenue, ${user.firstname}!`);
      // Redirection vers dashboard
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } else {
      setLoginMessage("Email ou mot de passe invalide");
    }
    
    // Vider le formulaire
    setLoginData({
      email: '',
      password: ''
    });
  };
  
  return (
    <div className="wrapper">
      <div className="nav">
        <div className="nav-button">
          <button 
            className={`btn ${isLoginActive ? 'white-btn' : ''}`}
            onClick={() => toggleForm('login')}
          >
            Sign In
          </button>
          <button 
            className={`btn ${!isLoginActive ? 'white-btn' : ''}`}
            onClick={() => toggleForm('register')}
          >
            Register
          </button>
        </div>
      </div>
      
      <div className="form-box">
        {/* Login Form */}
        <div 
          className="login-container"
          style={{
            left: isLoginActive ? '4px' : '-520px',
            opacity: isLoginActive ? 1 : 0
          }}
        >
          <header>Login Form</header>
          <form onSubmit={handleLogin}>
            <div className="input-box">
              <input
                type="text"
                name="email"
                className="input-field"
                placeholder="Email"
                value={loginData.email}
                onChange={handleLoginChange}
                required
              />
              <i><FontAwesomeIcon icon={faEnvelope} /></i>
            </div>
            <div className="input-box">
              <input
                type="password"
                name="password"
                className="input-field"
                placeholder="Password"
                value={loginData.password}
                onChange={handleLoginChange}
                required
              />
              <i><FontAwesomeIcon icon={faLock} /></i>
            </div>
            {loginMessage && <div className="message">{loginMessage}</div>}
            <div className="input-box">
              <input type="submit" className="submit" value="Sign In" />
            </div>
            <div className="two-col">
              <div className="one">
                <input type="checkbox" id="login-check" />
                <label htmlFor="login-check">Remember Me</label>
              </div>
              <div className="two">
                <label><a href="#">Forgot password?</a></label>
              </div>
            </div>
          </form>
        </div>
        
        {/* Register Form */}
        <div 
          className="register-container"
          style={{
            right: isLoginActive ? '-520px' : '4px',
            opacity: isLoginActive ? 0 : 1
          }}
        >
          <header>Register Form</header>
          <form onSubmit={handleRegister}>
            <div className="two-forms">
              <div className="input-box">
                <input
                  type="text"
                  name="firstname"
                  className="input-field"
                  placeholder="First Name"
                  value={registerData.firstname}
                  onChange={handleRegisterChange}
                  required
                />
                <i><FontAwesomeIcon icon={faUser} /></i>
              </div>
              <div className="input-box">
                <input
                  type="text"
                  name="lastname"
                  className="input-field"
                  placeholder="Last Name"
                  value={registerData.lastname}
                  onChange={handleRegisterChange}
                  required
                />
                <i><FontAwesomeIcon icon={faUser} /></i>
              </div>
            </div>
            <div className="input-box">
              <input
                type="text"
                name="email"
                className="input-field"
                placeholder="Email"
                value={registerData.email}
                onChange={handleRegisterChange}
                required
              />
              <i><FontAwesomeIcon icon={faEnvelope} /></i>
            </div>
            <div className="input-box">
              <input
                type="password"
                name="password"
                className="input-field"
                placeholder="Password"
                value={registerData.password}
                onChange={handleRegisterChange}
                required
              />
              <i><FontAwesomeIcon icon={faLock} /></i>
            </div>
            {registerMessage && <div className="message">{registerMessage}</div>}
            <div className="input-box">
              <input type="submit" className="submit" value="Register" />
            </div>
            <div className="two-col">
              <div className="one">
                <input type="checkbox" id="register-check" />
                <label htmlFor="register-check">Remember Me</label>
              </div>
              <div className="two">
                <label><a href="#">Terms & conditions</a></label>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;