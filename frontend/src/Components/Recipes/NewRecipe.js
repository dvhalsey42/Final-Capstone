import { useState } from "react";

export default function RecipeList(props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="collapsible">
      <button className="toggle" onClick={() => setIsOpen(!isOpen)}>
        My Recipe Library
      </button>
      {isOpen && (
        <div className="content">
          <ul>
            <li>Ingredient</li>
            <li>Ingredient</li>
            <li>Ingredient</li>
            <li>Ingredient</li>
            <li>Cooking Instructions</li>
          </ul>
        </div>
      )}
    </div>
  );
}
