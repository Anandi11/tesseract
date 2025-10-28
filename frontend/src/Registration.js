import React, { useState } from 'react';

// Simple icon components
const UserIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

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
const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="20,6 9,17 4,12"/>
  </svg>
);

export default function RegistrationPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Simple validation
  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password || formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await fetch("http://localhost:8080/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.name,
          email: formData.email,
          password: formData.password
        }),
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();
      setSuccessMessage("Registration successful! You can now log in.");
      setFormData({ name: "", email: "", password: "" });
      setErrors({});
    } catch (error) {
      console.error("Registration error:", error);
      setSuccessMessage("Failed to register. Please try again.");
    }
  };


  const styles = {
    container: {
      minHeight: '100vh',
      height: '100vh',
      width: '100vw',
      display: 'flex',
      margin: 0,
      padding: 0,
      position: 'fixed',
      top: 0,
      left: 0,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      background: 'linear-gradient(135deg, #eaba66ff 0%, #a29f4bff 100%)'
    },
    leftPanel: {
      flex: 1,
      background: 'linear-gradient(135deg, #ea9b66ff 0%, #b7cb38ff 100%)',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      color: 'white'
    },
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.2)'
    },
    leftContent: {
      position: 'relative',
      zIndex: 10,
      textAlign: 'center',
      maxWidth: '400px'
    },
    welcomeTitle: {
      fontSize: '3rem',
      fontWeight: 'bold',
      marginBottom: '1rem',
      lineHeight: '1.2'
    },
    welcomeSubtitle: {
      fontSize: '1.25rem',
      color: 'rgba(255, 255, 255, 0.9)',
      marginBottom: '2rem'
    },
    featureList: {
      textAlign: 'left',
      fontSize: '1rem'
    },
    featureItem: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '1rem',
      color: 'rgba(255, 255, 255, 0.9)'
    },
    featureIcon: {
      marginRight: '0.75rem',
      color: '#4ade80'
    },
    rightPanel: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'white',
      padding: '2rem',
      overflowY: 'auto'
    },
    formContainer: {
      width: '100%',
      maxWidth: '450px'
    },
    header: {
      textAlign: 'center',
      marginBottom: '2rem'
    },
    title: {
      fontSize: '2rem',
      fontWeight: 'bold',
      color: '#111827',
      marginBottom: '0.5rem'
    },
    subtitle: {
      color: '#6B7280',
      fontSize: '1rem'
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.25rem'
    },
    row: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '1rem'
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
      paddingRight: '0.75rem',
      paddingTop: '0.75rem',
      paddingBottom: '0.75rem',
      border: '1px solid #D1D5DB',
      borderRadius: '0.5rem',
      fontSize: '0.875rem',
      outline: 'none',
      transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out',
      boxSizing: 'border-box'
    },
    select: {
      width: '100%',
      paddingLeft: '2.5rem',
      paddingRight: '0.75rem',
      paddingTop: '0.75rem',
      paddingBottom: '0.75rem',
      border: '1px solid #D1D5DB',
      borderRadius: '0.5rem',
      fontSize: '0.875rem',
      outline: 'none',
      transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out',
      boxSizing: 'border-box',
      backgroundColor: 'white'
    },
    error: {
      fontSize: '0.75rem',
      color: '#DC2626',
      marginTop: '0.25rem'
    },
    submitButton: {
      width: '100%',
      padding: '0.875rem',
      backgroundColor: '#eab566ff',
      color: 'white',
      border: 'none',
      borderRadius: '0.5rem',
      fontSize: '0.875rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'background-color 0.15s ease-in-out, transform 0.1s ease-in-out',
      marginTop: '0.5rem'
    },
    submitButtonHover: {
      backgroundColor: '#d8cd5aff',
      transform: 'translateY(-1px)'
    },
    successMessage: {
      padding: '0.75rem',
      backgroundColor: '#D1FAE5',
      border: '1px solid #A7F3D0',
      borderRadius: '0.5rem',
      color: '#065F46',
      fontSize: '0.875rem',
      marginBottom: '1rem',
      display: 'flex',
      alignItems: 'center'
    },
    successIcon: {
      marginRight: '0.5rem',
      color: '#10B981'
    },
    loginLink: {
      textAlign: 'center',
      marginTop: '1.5rem'
    },
    loginText: {
      fontSize: '0.875rem',
      color: '#6B7280'
    },
    loginLinkStyle: {
      color: '#667eea',
      textDecoration: 'none',
      fontWeight: '500'
    }
  };

  return (
    <>
      {/* CSS Reset */}
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        html, body, #root {
          margin: 0;
          padding: 0;
          height: 100%;
          overflow-x: hidden;
        }
      `}</style>
      
      <div style={styles.container}>
        {/* Left Panel */}
        <div style={styles.leftPanel}>
          <div style={styles.overlay}></div>
          <div style={styles.leftContent}>
            <h1 style={styles.welcomeTitle}>Join Our Finance Community</h1>
            <p style={styles.welcomeSubtitle}>Start your journey to a more organized, financially-abled you</p>
            
            <div style={styles.featureList}>
              <div style={styles.featureItem}>
                <div style={styles.featureIcon}>
                  <CheckIcon />
                </div>
                Easy-to-use budgeting tools
              </div>
              <div style={styles.featureItem}>
                <div style={styles.featureIcon}>
                  <CheckIcon />
                </div>
                Track your expenses
              </div>
              <div style={styles.featureItem}>
                <div style={styles.featureIcon}>
                  <CheckIcon />
                </div>
                Visualize your spending patterns
              </div>
              <div style={styles.featureItem}>
                <div style={styles.featureIcon}>
                  <CheckIcon />
                </div>
                Achieve your spending goals
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div style={styles.rightPanel}>
          <div style={styles.formContainer}>
            <div style={styles.header}>
              <h2 style={styles.title}>Create Account</h2>
              <p style={styles.subtitle}>Fill in your details to get started</p>
            </div>

            {successMessage && (
              <div style={styles.successMessage}>
                <div style={styles.successIcon}>
                  <CheckIcon />
                </div>
                {successMessage}
              </div>
            )}

            <div style={styles.form}>
              {/* Name and Email Row */}
              <div style={styles.row}>
                <div style={styles.fieldContainer}>
                  <label style={styles.label}>Full Name</label>
                  <div style={styles.inputWrapper}>
                    <div style={styles.inputIcon}>
                      <UserIcon />
                    </div>
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleChange}
                      style={styles.input}
                    />
                  </div>
                  {errors.name && <div style={styles.error}>{errors.name}</div>}
                </div>

                <div style={styles.fieldContainer}>
                  <label style={styles.label}>Email</label>
                  <div style={styles.inputWrapper}>
                    <div style={styles.inputIcon}>
                      <MailIcon />
                    </div>
                    <input
                      type="email"
                      name="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      style={styles.input}
                    />
                  </div>
                  {errors.email && <div style={styles.error}>{errors.email}</div>}
                </div>
              </div>

              {/* Password */}
              <div style={styles.fieldContainer}>
                <label style={styles.label}>Password</label>
                <div style={styles.inputWrapper}>
                  <div style={styles.inputIcon}>
                    <LockIcon />
                  </div>
                  <input
                    type="password"
                    name="password"
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={handleChange}
                    style={styles.input}
                  />
                </div>
                {errors.password && <div style={styles.error}>{errors.password}</div>}
              </div>

              {/* Submit Button */}
              <button
                type="button"
                onClick={handleSubmit}
                style={styles.submitButton}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = styles.submitButtonHover.backgroundColor;
                  e.target.style.transform = styles.submitButtonHover.transform;
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = styles.submitButton.backgroundColor;
                  e.target.style.transform = 'none';
                }}
              >
                Create Account
              </button>
            </div>

            {/* Login Link */}
            <div style={styles.loginLink}>
              <p style={styles.loginText}>
                Already have an account?{' '}
                <a href="/login" style={styles.loginLinkStyle}>Sign in</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}