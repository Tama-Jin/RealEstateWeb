import React, { useState } from 'react';  // useState import
import { useNavigate } from 'react-router-dom';  // useNavigate import
import axios from 'axios';  // axios import

const LoginPage = () => {
  const [email, setEmail] = useState('');  // メールアドレスの状態管理
  const [password, setPassword] = useState('');  // パスワードの状態管理
  const [error, setError] = useState('');  // エラーメッセージの状態管理
  const navigate = useNavigate();  // ページ遷移のためのフック

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:4000/login', { email, password });
      
      // ログイン成功後にtokenと業者IDをlocalStorageに保存
      localStorage.setItem('token', response.data.token);  // トークン保存
      localStorage.setItem('merchant_id', response.data.merchant_id);  // 業者ID保存
  
      // 他の処理（例: ダッシュボードへリダイレクト）
      navigate('/property-list');
    } catch (error) {
      console.error('ログインエラー:', error);
      alert('ログインに失敗しました');
    }
  };
  

  return (
    <div className="login-container">
      <h1>ログインページ</h1>
      <input
        type="email"
        placeholder="メールアドレス"
        value={email}
        onChange={(e) => setEmail(e.target.value)}  // メールアドレスの入力値を更新
      />
      <input
        type="password"
        placeholder="パスワード"
        value={password}
        onChange={(e) => setPassword(e.target.value)}  // パスワードの入力値を更新
      />
      {error && <p>{error}</p>}
      <button onClick={handleLogin}>ログイン</button>
    </div>
  );
};

export default LoginPage;
