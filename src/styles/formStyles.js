const formStyles = {
  container: {
    maxWidth: "400px",
    margin: "auto",
    padding: "20px",
    background: "#FFFFFF",
    borderRadius: "8px",
    boxShadow: "0 2px 10px var(--background-color)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  input: {
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#0070f3",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  cancelButton: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#eaeaea",
    color: "black",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  error: {
    color: "red",
  },
};

export default formStyles;
