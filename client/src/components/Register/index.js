import React, {Component} from 'react'
import {Modal, Button, Form, FormGroup, FormControl, Col, ControlLabel, Checkbox} from 'react-bootstrap'
import './register.css'


export default class Login extends Component {
  render() {
    return (
      <Form horizontal>
        <FormGroup controlId="formHorizontal">
          <Col componentClass={ControlLabel} sm={2}>
            Username
          </Col>
          <Col sm={10}>
            <FormControl type="email" placeholder="Username" />
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalPassword">
          <Col componentClass={ControlLabel} sm={2}>
            Password
          </Col>
          <Col sm={10}>
            <FormControl type="password" placeholder="Password" />
          </Col>
        </FormGroup>

        <FormGroup>
          <Col smOffset={2} sm={10}>
            <Checkbox>Remember me</Checkbox>
          </Col>
        </FormGroup>

      </Form>
    )
  }
}
