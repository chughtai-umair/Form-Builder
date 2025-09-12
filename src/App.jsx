import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { HomePage } from "@/pages/home-page";
import { Playground } from "@/pages/playground";

function App() {
  return (
    <ThemeProvider>
      <Router>
        {/* <div className="min-h-screen bg-background overflow-x-hidden"> */}
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/playground" element={<Playground />} />
        </Routes>
        {/* </div> */}
      </Router>
    </ThemeProvider>
  );
}

export default App;
