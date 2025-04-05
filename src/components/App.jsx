import { lazy, Suspense } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";

const HomePage = lazy(() => import("../pages/HomePage/HomePage"));

function App() {
  return (
    <div>
      <Suspense fallback={<div>Loading page...</div>}>
        <Routes>
          <Route path="/" element={<HomePage/>}  />
            
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
