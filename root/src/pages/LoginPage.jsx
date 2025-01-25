import React, { useState } from 'react';  // useState import
import { useNavigate } from 'react-router-dom';  // useNavigate import

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const rootUsername = 'root';
  const rootPassword = '1234';

  const handleLogin = () => {
    if (username === rootUsername && password === rootPassword) {
      navigate('/app');
    } else {
      setError('ユーザー名またはパスワードが間違っています');
    }
  };

  return (
    <div className="login-container">
      <h1>ログインページ</h1>
      <input
        type="text"
        placeholder="ユーザー名"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="パスワード"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <p>{error}</p>}
      <button onClick={handleLogin}>ログイン</button>
    </div>
  );
};

export default LoginPage;  // 기본 내보내기
