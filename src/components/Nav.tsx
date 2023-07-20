import React from "react";
import { NavLink } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

export default function TopNav() {
  return (
    <Navbar expand="lg" bg="light" variant="light">
      <Container fluid>
        <NavLink className="navbar-brand" to="/">Job Hunter</NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            <Nav.Link href="https://ca.indeed.com/jobs?q=front+end+developer&l=British+Columbia&fromage=1">
              Indeed (BC)
            </Nav.Link>
            <Nav.Link href="https://ca.indeed.com/jobs?q=front+end+developer&fromage=1">
              Indeed (CA)
            </Nav.Link>
            <Nav.Link href="https://www.linkedin.com/jobs/">LinkedIn</Nav.Link>
            <NavLink to="skills" className="nav-link">Skills</NavLink>
            <NavLink to="notes" className="nav-link">Notes</NavLink>
            <NavLink to="posting" className="nav-link">Add New Posting</NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
