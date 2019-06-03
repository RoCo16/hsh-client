import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import config from "../config";
import { API } from "aws-amplify";
import { s3Upload } from "../libs/awsLib";
import "./NewEmail.css";

export default class NewEmail extends Component {
  constructor(props) {
    super(props);

    this.htmlfile = null;
    this.mailfile = null;

    this.state = {
      isLoading: null,
      content: "",
      title: ""
    };
  }

  validateForm() {
    return this.state.content.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleHTMLFileChange = event => {
    this.htmlfile = event.target.files[0];
  }

  handleMailFileChange = event => {
    this.mailfile = event.target.files[0];
  }

  handleSubmit = async event => {
    event.preventDefault();
  
    if (this.htmlfile && this.htmlfile.size > config.MAX_ATTACHMENT_SIZE) {
      alert(`Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE/1000000} MB.`);
      return;
    }

    if (this.mailfile && this.mailfile.size > config.MAX_ATTACHMENT_SIZE) {
      alert(`Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE/1000000} MB.`);
      return;
    }
    
  
    this.setState({ isLoading: true });
  
    try {

      const htmlfile = this.htmlfile
        ? await s3Upload(this.htmlfile)
        : null;

      const mailfile = this.mailfile
        ? await s3Upload(this.mailfile)
        : null;


      await this.createEmail({
        htmlfile,
        mailfile,
        title: this.state.title,
        content: this.state.content
      });
      this.props.history.push("/email-sys");
    } catch (e) {
      alert(e);
      this.setState({ isLoading: false });
    }
  }
  
  
  createEmail(email) {
    return API.post("emails", "/emails", {
      body: email
    });
  }  

  render() {
    return (
      <div className="NewEmail">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="title">
            <ControlLabel>Email title</ControlLabel>
            <FormControl
              onChange={this.handleChange}
              value={this.state.title}
              type="title"
            />
          </FormGroup>
          <FormGroup controlId="content">
            <ControlLabel>Text content</ControlLabel>
            <FormControl
              onChange={this.handleChange}
              value={this.state.content}
              componentClass="textarea"
            />
          </FormGroup>
          <FormGroup controlId="htmlfile">
            <ControlLabel>html content</ControlLabel>
            <FormControl onChange={this.handleHTMLFileChange} type="file" />
          </FormGroup>
          <FormGroup controlId="mailinglist">
            <ControlLabel>Mailing list</ControlLabel>
            <FormControl onChange={this.handleMailFileChange} type="file" />
          </FormGroup>
          <LoaderButton
            block
            bsStyle="primary"
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
            isLoading={this.state.isLoading}
            text="Create"
            loadingText="Creating…"
          />
        </form>
      </div>
    );
  }
}
