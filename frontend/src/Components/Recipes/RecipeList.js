import { useState } from "react";

export default function RecipeList() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="collapsible">
      <button className="toggle" onClick={() => setIsOpen(!isOpen)}>
        Show Recipe
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
