import React, {Component} from 'react'
import {Navbar, MenuItem, NavItem, Nav, NavDropdown} from 'react-bootstrap'
import {Modal, Button, Form, FormGroup, FormControl, Col, ControlLabel, Checkbox} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import Login from '../../pages/Login'
import './Navbar.css'

export default class MyNavbar extends Component {
  render() {
    return (
      <div>
        <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">QuizIt</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>

            <Nav pullRight>
              <NavItem eventKey={1} href="#">
                <a onClick={this.props.showLogin}>login</a>
              </NavItem>
              <NavItem eventKey={2} href="#">
                <Link to="/signup">signup</Link>
              </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <div className="static-modal">
          <Modal show={this.props.loginVisible}>
            <Modal.Header>
              <Modal.Title>Log In</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <Login />
            </Modal.Body>

            <Modal.Footer>
              <Button type="submit" bsStyle="primary" onClick={this.props.login}>Sign in</Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    )
  }
}
