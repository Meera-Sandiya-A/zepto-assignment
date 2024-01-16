import { useCallback, useEffect, useRef, useState } from "react";

import SelectedTag from "./SelectedTag";
import DropdownList from "./DropdownList";

import "./style.css";

const userList = [
  { id: 1, name: "John Smith", email: "johnsmith@example.com" },
  { id: 2, name: "Harry Potter", email: "harrypotter@example.com" },
  { id: 3, name: "James Bond", email: "jamesbond@example.com" },
  { id: 4, name: "John Cena", email: "johncena@example.com" },
  { id: 5, name: "Willsmith", email: "willsmith@example.com" },
  { id: 6, name: "Jackson", email: "jackson@example.com" },
  { id: 7, name: "Larry Tom", email: "larrytom@example.com" },
  { id: 8, name: "Clian Morphy", email: "clianmorphy@example.com" },
];

const Dropdown = () => {
  const userInputRef = useRef(null);

  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [dropdownUsers] = useState(userList);
  const [inputValue, setInputValue] = useState("");
  const [highlightedUser, setHighLightedUser] = useState({});

  const selectUser = useCallback(
    (user) => {
      setSelectedUsers([...selectedUsers, user]);
      setHighLightedUser({});
      setInputValue("");
    },
    [selectedUsers]
  );

  const removeSelectedUser = useCallback(
    (user, deleteFromBackspace = false) => {
      const existing = selectedUsers;
      const remaining = existing?.filter((eUser) => eUser?.id !== user?.id);
      setSelectedUsers(remaining);

      if (deleteFromBackspace) {
        setHighLightedUser(remaining?.[remaining?.length - 1]);
      } else {
        userInputRef?.current?.focus();
        setHighLightedUser({});
      }
    },
    [selectedUsers]
  );

  const handleKeyInput = useCallback(
    (e) => {
      e?.stopPropagation();

      if (e?.keyCode === 8 && userInputRef?.current?.inputValue === "") {
        userInputRef?.current?.blur();
        if (highlightedUser?.id) {
          removeSelectedUser(highlightedUser, true);
        } else {
          setHighLightedUser(selectedUsers?.[selectedUsers?.length - 1]);
        }
      }
    },
    [selectedUsers, highlightedUser, removeSelectedUser]
  );

  const tagList = useCallback(
    (user) => (
      <SelectedTag
        key={user?.id}
        user={user}
        removeSelectedUser={removeSelectedUser}
        highlightedUser={highlightedUser}
      />
    ),
    [removeSelectedUser, highlightedUser]
  );

  const dropdownList = useCallback(
    (user) => (
      <DropdownList key={user?.id} user={user} selectUser={selectUser} />
    ),
    [selectUser]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyInput);

    return () => {
      window.removeEventListener("keydown", handleKeyInput);
    };
  }, [handleKeyInput]);

  return (
    <div className="dropdown-container">
      <div className="dropdown-storage">
        {selectedUsers?.map(tagList)}

        <div className="dropdown-input">
          <input
            ref={userInputRef}
            onFocus={() => setShowDropdown(true)}
            onBlur={() => setShowDropdown(false)}
            className="input-value"
            placeholder="Add new user..."
            value={inputValue}
            onChange={(e) => {
              setInputValue(e?.target?.value);
              setHighLightedUser({});
            }}
            onKeyDown={handleKeyInput}
          />

          {showDropdown ? (
            <div className="show-dropdown">
              {dropdownUsers?.map(dropdownList)}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
