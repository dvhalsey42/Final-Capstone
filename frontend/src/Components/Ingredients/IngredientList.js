import { useState } from "react";

export default function Ingredientlist(props) {
  const [viewIsOpen, setViewIsOpen] = useState(false);
  

  return (
    <div>
      <div className="mb-3 mx-auto">
        <button
          className="toggle"
          style={{ backgroundColor: "#F0EAE1", textDecorationColor: "#92AB75" }}
          onClick={() => setViewIsOpen(!viewIsOpen)}
        >
          View My Pantry
        </button>
        {viewIsOpen && <div className="content">{props.children}</div>}
      </div>
    </div>
  );
}
