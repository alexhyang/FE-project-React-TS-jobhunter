import React from "react";
import { Routes, Route } from "react-router-dom";
import Container from "react-bootstrap/Container";

import { Nav, Footer } from "components";
import { Home, Skills, Notes, Posting, NewPosting } from "pages";

function App() {
  return (
    <div className="App">
      <Nav />
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/postings" element={<NewPosting />} />
          <Route path="/postings/:id" element={<Posting />} />
        </Routes>
      </Container>
      <Footer />
    </div>
  );
}

export default App;
