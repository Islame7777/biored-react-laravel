import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import logo from "../../images/logo (2).png";
import backgroundImg from "../../images/photo5log.png";

const LoginRegister = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'Utilisateur',
  });

  const navigate = useNavigate();

  const toggleForm = () => setIsLogin(!isLogin);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    try {
      const response = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const user = await response.json();
        alert("Connexion réussie !");
        if (user.role?.toLowerCase() === 'admin') {
          navigate('/admin');
        } else {
          navigate('/home');
        }
      } else {
        alert("Échec de la connexion.");
      }
    } catch (err) {
      console.error('Erreur de connexion :', err);
      alert('Erreur réseau ou serveur.');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.email || !formData.password) {
      alert('Tous les champs doivent être remplis');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/compte', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        await response.json();
        alert('Compte créé avec succès !');
        setIsLogin(true);
      } else {
        const error = await response.json();
        alert('Erreur : ' + (error.message || 'Échec de l’inscription.'));
      }
    } catch (err) {
      console.error('Erreur lors de l’inscription :', err);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
          font-family: 'Poppins', sans-serif;
        }

  body, html, .wrapper {
  height: 100%;
  margin: 0;
  padding: 0;

  background-image: url(${backgroundImg});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;  /* L’image couvre tout le fond sans déformation */
  background-attachment: fixed; /* L’image reste fixe lors du scroll */

  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

        .wrapper {
          position: relative;
          width: 100%;
        }

        .background-overlay {
          position: fixed;
          top: 0;
          left: 0;
          height: 100%;
          width: 100%;
          backdrop-filter: blur(3px);
          z-index: 0;
        }

        .nav {
          position: fixed;
          top: 0;
          width: 100%;
          height: 90px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 30px;
          z-index: 2;
        }

        .nav-button {
          display: flex;
          gap: 10px;
        }

        .btn {
          padding: 10px 20px;
          border: none;
          border-radius: 25px;
          cursor: pointer;
          background-color: #0167c5;
          color: white;
          font-weight: bold;
          transition: background 0.3s ease;
        }

        .btn:hover {
          background-color: #2c2fd8;
        }

        .btn.white-btn {
          background: white;
          color: #0167c5;
        }

        .form-box {
          background-color: rgba(255, 255, 255, 0.95);
          padding: 30px;
          border-radius: 20px;
          width: 400px;
          z-index: 1;
          box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
        }

        header {
          font-size: 24px;
          color: #333;
          margin-bottom: 20px;
          text-align: center;
        }

        .input-box {
          margin-bottom: 15px;
        }

        .input-field {
          width: 100%;
          padding: 12px;
          border: 1px solid #ccc;
          border-radius: 20px;
          font-size: 14px;
        }

        .submit {
          width: 100%;
          padding: 12px;
          background-color: #0167c5;
          color: white;
          border: none;
          border-radius: 20px;
          font-size: 16px;
          cursor: pointer;
        }

        .submit:hover {
          background-color: #2c2fd8;
        }
      `}</style>

      <div className="wrapper">
        <div className="background-overlay"></div>
        <nav className="nav">
          <img src={logo} alt="Logo" width="150" />
          <div className="nav-button">
            <button className={`btn ${isLogin ? 'white-btn' : ''}`} onClick={() => setIsLogin(true)}>
              Se connecter
            </button>
            <button className={`btn ${!isLogin ? 'white-btn' : ''}`} onClick={() => setIsLogin(false)}>
              S'inscrire
            </button>
          </div>
        </nav>

        <div className="form-box">
          {isLogin ? (
            <div className="login-container">
              <form onSubmit={handleLogin}>
                <header>Connexion</header>
                <div className="input-box">
                  <input
                    type="email"
                    id="email"
                    className="input-field"
                    placeholder="Email"
                    onChange={handleChange}
                    value={formData.email}
                    required
                  />
                </div>
                <div className="input-box">
                  <input
                    type="password"
                    id="password"
                    className="input-field"
                    placeholder="Mot de passe"
                    onChange={handleChange}
                    value={formData.password}
                    required
                  />
                </div>
                <input type="submit" className="submit" value="Se connecter" />
              </form>
            </div>
          ) : (
            <div className="register-container">
              <form onSubmit={handleRegister}>
                <header>Inscription</header>
                <div className="input-box">
                  <input
                    type="text"
                    id="username"
                    className="input-field"
                    placeholder="Nom d'utilisateur"
                    onChange={handleChange}
                    value={formData.username}
                    required
                  />
                </div>
                <div className="input-box">
                  <input
                    type="email"
                    id="email"
                    className="input-field"
                    placeholder="Email"
                    onChange={handleChange}
                    value={formData.email}
                    required
                  />
                </div>
                <div className="input-box">
                  <input
                    type="password"
                    id="password"
                    className="input-field"
                    placeholder="Mot de passe"
                    onChange={handleChange}
                    value={formData.password}
                    required
                  />
                </div>
                <input type="submit" className="submit" value="S'inscrire" />
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default LoginRegister;
