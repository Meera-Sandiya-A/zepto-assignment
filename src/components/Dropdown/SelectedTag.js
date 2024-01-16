import "./selectedTag.css";

const SelectedTag = ({ user, removeSelectedUser }) => {
  return (
    <div className="tag-item">
      <div className="tag-icon" />

      <div className="tag-user">{user?.name}</div>

      <button className="tag-remove" onClick={() => removeSelectedUser(user)}>
        &times;
      </button>
    </div>
  );
};

export default SelectedTag;
