import React, { Component } from "react";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import { API } from "aws-amplify";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import "./SendEmails.css";

export default class ListEmails extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        isLoading: true,
        emails: []
      };
    }

    async componentDidMount() {
        if (!this.props.isAuthenticated) {
          return;
        }
      
        try {
          const emails = await this.emails();
          this.setState({ emails });
        } catch (e) {
          alert(e);
        }
      
        this.setState({ isLoading: false });
    }
      
    emails() {
        return API.get("emails", "/emails");
    }
  
    renderEmailsList(emails) {
        return [{}].concat(emails).map(
          (email, i) =>
            i !== 0
              ? <LinkContainer
                  key={email.emailId}
                  to={`/email-sys/emails/send`}
                >
                  <ListGroupItem header={email.title.trim().split("\n")[0]}>
                    {"Created: " + new Date(email.createdAt).toLocaleString()}
                  </ListGroupItem>
                </LinkContainer>
              : <LinkContainer
                  key="new"
                  to="/email-sys/emails/new"
                >
                  <ListGroupItem>
                    <h4>
                      <b>{"\uFF0B"}</b> Create a new email
                    </h4>
                  </ListGroupItem>
                </LinkContainer>
        );
      }
  
    renderEmails() {
      return (
        <div className="emails">
          <PageHeader>Emails</PageHeader>
          <ListGroup>
            {!this.state.isLoading && this.renderEmailsList(this.state.emails)}
          </ListGroup>
        </div>
      );
    }
  
    render() {
      return (
        <div className="ListEmails">
          { this.props.isAuthenticated ? this.renderEmails() : null }
        </div>
      );
    }
}