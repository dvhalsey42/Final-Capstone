import { useState } from "react";

export default function Ingredientlist(props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="collapsible">
      <button className="toggle" onClick={() => setIsOpen(!isOpen)}>
        Show Ingredients
      </button>
      {isOpen && <div className="content">{props.children}</div>}
    </div>
  );
}
