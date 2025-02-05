import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegisterPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    merchant_name: '',
    company_name: '',
    email: '',
    telephone: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 入力変更時の処理
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // バリデーション処理
  const validate = () => {
    let formErrors = {};
    if (!formData.merchant_name) formErrors.merchant_name = "担当者名は必須です";
    if (!formData.company_name) formErrors.company_name = "会社名は必須です";
    if (!formData.email) {
      formErrors.email = "メールアドレスは必須です";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = "無効なメールアドレスの形式です";
    }
    if (!formData.telephone) {
      formErrors.telephone = "電話番号は必須です";
    } else if (!/^\d{2,3}-\d{2,4}-\d{4}$/.test(formData.telephone)) {
      formErrors.telephone = "電話番号は無効です (例: 03-1234-5678)";
    }
    if (!formData.password) {
      formErrors.password = "パスワードは必須です";
    } else if (formData.password.length < 6) {
      formErrors.password = "パスワードは6文字以上でなければなりません";
    }

    return formErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // バリデーションチェック
    const validationErrors = validate();
  
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      return;
    }
  
    // 送信データをログで確認
    console.log('送信するデータ:', { merchants: formData });
  
    try {
      const response = await axios.post('http://localhost:4000/merchants', { merchant: formData });
      alert('アカウントが登録されました');
      navigate('/login'); // 登録後にログイン画面に遷移
    } catch (error) {
      console.error('登録エラー:', error);
      alert('登録に失敗しました');
    } finally {
      setIsSubmitting(false);
    }
  };  

  return (
    <div style={{ padding: '20px' }}>
      <h1>アカウント登録ページ</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label>担当者名</label>
          <input
            type="text"
            name="merchant_name"
            value={formData.merchant_name}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px' }}
          />
          {errors.merchant_name && <p style={{ color: 'red' }}>{errors.merchant_name}</p>}
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>会社名</label>
          <input
            type="text"
            name="company_name"
            value={formData.company_name}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px' }}
          />
          {errors.company_name && <p style={{ color: 'red' }}>{errors.company_name}</p>}
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>メールアドレス</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px' }}
          />
          {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>電話番号</label>
          <input
            type="text"
            name="telephone"
            value={formData.telephone}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px' }}
          />
          {errors.telephone && <p style={{ color: 'red' }}>{errors.telephone}</p>}
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label>パスワード</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px' }}
          />
          {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
        </div>

        <div>
          <button type="submit" disabled={isSubmitting} style={{ padding: '10px 20px' }}>
            {isSubmitting ? '登録中...' : '登録'}
          </button>
        </div>
      </form>

      <button onClick={() => navigate(-1)} style={{ marginTop: '20px', padding: '10px 20px' }}>
        前のページに戻る
      </button>
    </div>
  );
};

export default RegisterPage;
