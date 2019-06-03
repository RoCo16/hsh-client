import React, { Component, Fragment } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Button, ButtonGroup, Col, Grid, Jumbotron, Row } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import "./EmailSys.css";

export default class EmailSys extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: null,
    };
  }

  render() {
    return (
        <div class="EmailSys">
            <div class="row">
                <div class="col">
                    <Jumbotron>
                        <h1>Emailer</h1>
                        <p>
                            <ButtonGroup vertical block>
                                <Fragment>
                                    <LinkContainer to="/email-sys/emails/new">
                                        <Button>Create emails to be sent</Button>
                                    </LinkContainer>
                                    <LinkContainer to="/email-sys/emails">
                                        <Button>Send emails</Button>
                                    </LinkContainer>
                                </Fragment>
                            </ButtonGroup>
                        </p>
                    </Jumbotron>
                </div>
                <div class="col">
                    <Jumbotron>
                        <h1>Templates</h1>
                        <p>
                            <ButtonGroup vertical block>
                                <Fragment>
                                    <LinkContainer to="/email-sys/template">
                                        <Button>Create or upload template.</Button>
                                    </LinkContainer>
                                    <LinkContainer to="/email-sys/template-fill">
                                        <Button>Fill a template for an email</Button>
                                    </LinkContainer>
                                </Fragment>
                            </ButtonGroup>
                        </p>
                    </Jumbotron>
                </div>
                <div class="col">
                    <Jumbotron>
                        <h1>Manager</h1>
                        <p>
                            <ButtonGroup vertical block>
                                <Fragment>
                                    <LinkContainer to="/email-sys/manager">
                                        <Button>Manage email campaigns and mailing lists.</Button>
                                    </LinkContainer>
                                    <LinkContainer to="/email-sys/manager">
                                        <Button>Resume saved work</Button>
                                    </LinkContainer>
                                </Fragment>
                            </ButtonGroup>
                        </p>
                    </Jumbotron>
                </div>
            </div>
        </div>
    );
  }
}