import { useState } from "react";

export default function EditIngredient(props) {
  const [editIsOpen, setEditIsOpen] = useState(false);

  return (
    <div>
      <div className="collapsible">
        <button
          className="toggle"
          style={{ backgroundColor: "#F0EAE1", textDecorationColor: "#92AB75" }}
          onClick={() => setEditIsOpen(!editIsOpen)}
        >
          Edit My Pantry
        </button>
        {editIsOpen && <div className="content">{props.children}</div>}
      </div>
    </div>
  );
}
