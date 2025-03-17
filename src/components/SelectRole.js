// src/app/components/SelectRole.js

const SelectRole = ({ rolesList, value, onChange }) => {
  return (
    <>
      <label htmlFor="role">Rol:</label>
      <select id="role" name="role" value={value} onChange={onChange} required>
        <option value="" disabled>
          Selecciona un rol
        </option>
        {rolesList.map((role) => (
          <option key={role.id} value={role.name}>
            {role.name}
          </option>
        ))}
      </select>
    </>
  );
};

export default SelectRole;
