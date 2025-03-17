// src/app/components/AccountOptions.js

const AccountOptions = ({
  isCreatingAccount,
  setIsCreatingAccount,
  invitationCode,
  setInvitationCode,
}) => {
  return (
    <>
      <label htmlFor="account-option">Cuenta Parental:</label>
      <select
        id="account-option"
        name="account-option"
        onChange={(e) => setIsCreatingAccount(e.target.value === "create")}
        required
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
        />
      )}
    </>
  );
};

export default AccountOptions;
