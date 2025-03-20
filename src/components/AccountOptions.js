// src/app/components/AccountOptions.js

const AccountOptions = ({
  role,
  isCreatingAccount,
  setIsCreatingAccount,
  invitationCode,
  setInvitationCode,
}) => {
  if (role !== "parent") return null; // Solo se muestra si el rol es 'parent'

  return (
    <div style={styles.container}>
      <label htmlFor="account-option" style={styles.label}>
        Cuenta Parental:
      </label>
      <select
        id="account-option"
        name="account-option"
        onChange={(e) => setIsCreatingAccount(e.target.value === "create")}
        required
        style={styles.input}
      >
        <option value="create">Crear una nueva cuenta parental</option>
        <option value="use-code">Usar código de invitación</option>
      </select>
      {!isCreatingAccount && (
        <input
          type="text"
          value={invitationCode}
          onChange={(e) => setInvitationCode(e.target.value)}
          placeholder="Código de invitación"
          required
          style={styles.input}
        />
      )}
    </div>
  );
};

const styles = {
  container: {
    width: "100%",
    textAlign: "center",
    marginBottom: "12px",
  },
  label: {
    display: "block",
    fontSize: "16px",
    marginBottom: "6px",
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    padding: "12px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    fontSize: "16px",
    boxSizing: "border-box",
  },
};

export default AccountOptions;
