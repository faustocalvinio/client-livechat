import { createRoot } from "react-dom/client";
import { ChatApp } from "./ChatApp";

// Access to the Target HTML Element
const rootElement = document.getElementById("root");
// Create the Root Point of our App with the Root Element
const root = createRoot(rootElement);
// Render the App Component
root.render(<ChatApp />);
