import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  const styles = {
    root: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "calc(100vh - 70px)",
      backgroundColor: "#f8f9fa",
    },

    label: {
      textAlign: "center",
      fontWeight: 900,
      fontSize: "220px",
      lineHeight: 1,
      marginBottom: "24px",
      color: "#444",
      "@media (max-width: 600px)": {
        fontSize: "120px",
      },
    },

    title: {
      fontFamily: "Greycliff CF, sans-serif",
      textAlign: "center",
      fontWeight: 900,
      fontSize: "38px",
      "@media (max-width: 600px)": {
        fontSize: "32px",
      },
    },

    description: {
      maxWidth: "500px",
      margin: "auto",
      marginTop: "32px",
      marginBottom: "48px",
    },

    button: {
      padding: "16px 32px",
      backgroundColor: "#007bff",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      fontSize: "18px",
      cursor: "pointer",
      transition: "background-color 0.2s ease-in-out",
      ":hover": {
        backgroundColor: "#0069d9",
      },
    },
  };

  return (
    <>
      <div style={styles.root}>
        <div style={styles.label}>404</div>
        <h1 style={styles.title}>You have found a secret place.</h1>
        <p style={styles.description}>
          Unfortunately, this is only a 404 page. You may have mistyped the
          address, or the page has been moved to another URL.
        </p>
        <Link to="/">
          <button style={styles.button}>Take me back to home page</button>
        </Link>
      </div>
    </>
  );
};

export default ErrorPage;
