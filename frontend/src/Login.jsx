import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

const LockIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <circle cx="12" cy="7" r="4"/>
    <path d="M8 11V7a4 4 0 0 1 8 0v4"/>
  </svg>
);

const EyeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const EyeOffIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
);

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
    const response = await fetch("http://localhost:8080/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      throw new Error("Network response was not OK");
    }

    const data = await response.json();
    console.log("Login response:", data);
    if (data.message === "Login successful!") {
      localStorage.setItem("userId", data.id);
      localStorage.setItem("userEmail", data.email);
      navigate("/dashboard");
    } else {
      alert("❌ " + data.message);
    }
  } catch (error) {
    console.error("Login failed:", error);
    alert("Something went wrong. Check console.");
  }
  };
  const styles = {
    container: {
      minHeight: '100vh',
      display: 'flex',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    },
    leftPanel: {
      flex: 1,
      background: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 50%, #F59E0B 100%)',
      position: 'relative',
      display: 'flex',
      alignItems: 'flex-end',
      padding: '2rem',
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FFFFFF' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      color: 'white'
    },
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.3)'
    },
    leftContent: {
      position: 'relative',
      zIndex: 10
    },
    welcomeTitle: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      marginBottom: '0.5rem',
      lineHeight: '1.2'
    },
    welcomeSubtitle: {
      fontSize: '1.125rem',
      color: 'rgba(255, 255, 255, 0.9)'
    },
    rightPanel: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'white',
      padding: '2rem'
    },
    formContainer: {
      width: '100%',
      maxWidth: '400px'
    },
    header: {
      textAlign: 'center',
      marginBottom: '2rem'
    },
    title: {
      fontSize: '1.875rem',
      fontWeight: 'bold',
      color: '#111827',
      marginBottom: '0.5rem'
    },
    subtitle: {
      color: '#a358eaff'
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem'
    },
    fieldContainer: {
      display: 'flex',
      flexDirection: 'column'
    },
    label: {
      fontSize: '0.875rem',
      fontWeight: '500',
      color: '#374151',
      marginBottom: '0.5rem'
    },
    inputWrapper: {
      position: 'relative'
    },
    inputIcon: {
      position: 'absolute',
      left: '0.75rem',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#9CA3AF',
      pointerEvents: 'none'
    },
    input: {
      width: '100%',
      paddingLeft: '2.5rem',
      paddingRight: '2.5rem',
      paddingTop: '0.75rem',
      paddingBottom: '0.75rem',
      border: '1px solid #D1D5DB',
      borderRadius: '0.5rem',
      fontSize: '0.875rem',
      outline: 'none',
      transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out',
      boxSizing: 'border-box'
    },
    inputFocus: {
      borderColor: '#111827',
      boxShadow: '0 0 0 3px rgba(17, 24, 39, 0.1)'
    },
    eyeButton: {
      position: 'absolute',
      right: '0.75rem',
      top: '50%',
      transform: 'translateY(-50%)',
      background: 'none',
      border: 'none',
      color: '#9CA3AF',
      cursor: 'pointer',
      padding: '0.25rem'
    },
    checkboxRow: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    checkboxContainer: {
      display: 'flex',
      alignItems: 'center'
    },
    checkbox: {
      marginRight: '0.5rem'
    },
    checkboxLabel: {
      fontSize: '0.875rem',
      color: '#374151'
    },
    forgotLink: {
      fontSize: '0.875rem',
      color: '#111827',
      textDecoration: 'none',
      fontWeight: '500'
    },
    signInButton: {
      width: '100%',
      padding: '0.75rem',
      backgroundColor: '#111827',
      color: 'white',
      border: 'none',
      borderRadius: '0.5rem',
      fontSize: '0.875rem',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'background-color 0.15s ease-in-out'
    },
    signInButtonHover: {
      backgroundColor: '#1F2937'
    },
    divider: {
      position: 'relative',
      margin: '1.5rem 0',
      textAlign: 'center'
    },
    dividerLine: {
      position: 'absolute',
      top: '50%',
      left: 0,
      right: 0,
      height: '1px',
      backgroundColor: '#D1D5DB'
    },
    dividerText: {
      backgroundColor: 'white',
      padding: '0 0.5rem',
      fontSize: '0.875rem',
      color: '#6B7280',
      position: 'relative',
      zIndex: 1
    },
    socialButtons: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '1rem'
    },
    socialButton: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0.625rem 1rem',
      border: '1px solid #D1D5DB',
      borderRadius: '0.5rem',
      backgroundColor: 'white',
      fontSize: '0.875rem',
      fontWeight: '500',
      color: '#374151',
      cursor: 'pointer',
      transition: 'background-color 0.15s ease-in-out'
    },
    socialButtonHover: {
      backgroundColor: '#F9FAFB'
    },
    socialIcon: {
      marginRight: '0.5rem'
    },
    footer: {
      marginTop: '2rem',
      textAlign: 'center'
    },
    footerText: {
      fontSize: '0.875rem',
      color: '#6B7280'
    },
    createAccountLink: {
      color: '#111827',
      textDecoration: 'none',
      fontWeight: '500'
    }
  };

  return (
    <div style={styles.container}>
      {/* Left Panel */}
      <div style={styles.leftPanel}>
        <div style={styles.overlay}></div>
        <div style={styles.leftContent}>
          <h1 style={styles.welcomeTitle}>Welcome back</h1>
          <p style={styles.welcomeSubtitle}>Sign in to continue your journey.</p>
        </div>
      </div>

      {/* Right Panel */}
      <div style={styles.rightPanel}>
        <div style={styles.formContainer}>
          <div style={styles.header}>
            <h2 style={styles.title}>Sign in</h2>
            <p style={styles.subtitle}>Welcome back. We're happy to see you.</p>
          </div>

          <div style={styles.form}>
            {/* Email Field */}
            <div style={styles.fieldContainer}>
              <label style={styles.label}>Email</label>
              <div style={styles.inputWrapper}>
                <div style={styles.inputIcon}>
                  <MailIcon />
                </div>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={styles.input}
                />
              </div>
            </div>

            {/* Password Field */}
            <div style={styles.fieldContainer}>
              <label style={styles.label}>Password</label>
              <div style={styles.inputWrapper}>
                <div style={styles.inputIcon}>
                  <LockIcon />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={styles.input}
                />
                <button
                  type="button"
                  style={styles.eyeButton}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div style={styles.checkboxRow}>
              <div style={styles.checkboxContainer}>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  style={styles.checkbox}
                />
                <label style={styles.checkboxLabel}>Remember me</label>
              </div>
              <a href="#" style={styles.forgotLink}>Forgot password?</a>
            </div>

            {/* Sign In Button */}
            <button
              onClick={() => handleLogin()}
              style={styles.signInButton}
              onMouseOver={(e) => e.target.style.backgroundColor = styles.signInButtonHover.backgroundColor}
              onMouseOut={(e) => e.target.style.backgroundColor = styles.signInButton.backgroundColor}
            >
              Sign in
            </button>

            {/* Divider */}
            <div style={styles.divider}>
              <div style={styles.dividerLine}></div>
              <span style={styles.dividerText}>or continue with</span>
            </div>

            {/* Social Buttons */}
          </div>

          {/* Footer */}
          <div style={styles.footer}>
            <p style={styles.footerText}>
              Don't have an account?{' '}
              <a href="/register" style={styles.createAccountLink}>Create one</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}