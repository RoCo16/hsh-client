import React, { Component } from "react";
import { API, Storage } from "aws-amplify";
import { FormGroup, FormControl, ControlLabel, Row, Col } from "react-bootstrap";
import { s3Upload } from "../libs/awsLib";
import LoaderButton from "../components/LoaderButton";
import config from "../config";
import "./Emails.css";


export default class Emails extends Component {
  constructor(props) {
    super(props);

    this.htmlfile = null;
    this.mailfile = null;

    this.state = {
      isLoading: null,
      isDeleting: null,
      email: null,
      content: "",
      title: "",
      htmlfileURL: "",
      mailfileURL: "",
      test: ""
    };
  }

  async componentDidMount() {
    try {
      let htmlfileURL;
      let mailfileURL;
      const email = await this.getEmail();
      const { content, htmlfile, mailfile, title } = email;

      if (htmlfile) {
        htmlfileURL = await Storage.vault.get(htmlfile);
      }

      if (mailfile) {
        mailfileURL = await Storage.vault.get(mailfile);
      }

      this.setState({
        email,
        content,
        title,
        htmlfileURL,
        mailfileURL
      });
    } catch (e) {
      alert(e);
    }
  }

  getEmail() {
    return API.get("emails", `/emails/${this.props.match.params.id}`);
  }

  validateForm() {
    return this.state.content.length > 0;
  }
  
  formatFilename(str) {
    return str.replace(/^\w+-/, "");
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

  TestEmail(email) {
    return API.post("emails", `/emails/send`, {
      body: email
    });
  }
  
  handleTest = async event => {
    let htmlfile;
    let mailfile;

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
      if (this.htmlfile) {
        htmlfile = await s3Upload(this.htmlfile);
      }

      if (this.mailfile) {
        mailfile = await s3Upload(this.mailfile);
      }
      const confirmed = window.confirm(
        "Confrim to send this test email."
      );

      var emails = this.state.test + '';
      var testlst = emails.split(" ");
      testlst = testlst.map(x => {
        return({email: x});
      });

      await this.TestEmail({
        //htmlfile: htmlfile || this.state.email.htmlfile,
        //mailfile: mailfile || this.state.email.mailfile,
        title: this.state.title,
        htmlfileURL: this.state.htmlfileURL,
        mailfileURL: "",
        content: this.state.content,
        testlist: JSON.stringify(testlst)
      });
      
      this.props.history.push("/email-sys");
    } catch (e) {
      alert(e);
      this.setState({ isLoading: false });
    }
  }

  SendEmail(email) {
    return API.post("emails", `/emails/send`, {
      body: email
    });
  }
  
  handleSend = async event => {
    event.preventDefault();
    
    let testlst = this.state.test.split(" ");
    testlst = testlst.map(x => {
      return({email: x});
    });
    const confirmed = window.confirm(
      `${JSON.stringify(testlst)}`
    );
  
    if (!confirmed) {
      return;
    }
  
    this.setState({ isSending: true });

    try {
      await this.SendEmail();
      this.props.history.push("/email-sys");
    } catch (e) {
      alert(e);
      this.setState({ isSending: false });
    }
  }
  
  render() {
    return (
      <div className="Emails">
        {this.state.email &&
          <form onSubmit={this.handleSubmit}>
            <FormGroup as={Row} controlId="title">
              <Col sm>
                <ControlLabel>Title</ControlLabel>
              </Col>
              <Col sm>
                <FormControl plaintext readOnly defaultValue={this.state.title}/>
              </Col>
            </FormGroup>
            <FormGroup controlId="content">
            <ControlLabel>Text content</ControlLabel>
              <FormControl
                plaintext
                readOnly
                value={this.state.content}
              />
            </FormGroup>
            {this.state.email.htmlfile &&
              <FormGroup>
                <ControlLabel>HTML content</ControlLabel>
                <FormControl.Static>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={this.state.htmlfileURL}
                  >
                    {this.formatFilename(this.state.email.htmlfile)}
                  </a>
                </FormControl.Static>
            </FormGroup>}
            {this.state.email.mailfile &&
              <FormGroup>
                <ControlLabel>Mailing list</ControlLabel>
                <FormControl.Static>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={this.state.mailfileURL}
                  >
                    {this.formatFilename(this.state.email.mailfile)}
                  </a>
                </FormControl.Static>
            </FormGroup>}
            <FormGroup as={Row} controlId="test">
              <ControlLabel>
                Test email addresses
              </ControlLabel>
              <Col>
                <FormControl
                onChange={this.handleChange}
                value={this.state.test}
                type="emails"
                placeholder="Test Emails"
                />
              </Col>
            </FormGroup>
            <LoaderButton
              block
              bsStyle="primary"
              bsSize="large"
              disabled={!this.validateForm()}
              type="submit"
              isLoading={this.state.isSending}
              onClick={this.handleTest}
              text="Test"
              loadingText="Sending…"
            />
            <LoaderButton
              block
              bsStyle="danger"
              bsSize="large"
              isLoading={this.state.isSending}
              onClick={this.handleSend}
              text="Send"
              loadingText="Sending…"
            />
          </form>}
      </div>
    );
  }
}
