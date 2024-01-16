import "./dropdownList.css";

const DropdownList = ({ user, selectUser }) => {
  return (
    <div
      onMouseDown={(e) => {
        e?.preventDefault();
        selectUser(user);
      }}
      className="dropdown-list"
    >
      <div className="user-field">
        <div className="user-icon" />

        <p className="user-name">{user?.name}</p>
      </div>

      <p className="user-email">{user?.email}</p>
    </div>
  );
};

export default DropdownList;
