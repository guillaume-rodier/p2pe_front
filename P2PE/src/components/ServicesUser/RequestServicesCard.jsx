import React, { Component } from "react";
import { Modal, Row, Col, Button } from "react-bootstrap";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import {
  postServiceUser,
  putUpdateService,
  putUpdateServicePro,
  splitIdentity
} from "../../Provider/Api";
export class RequestServicesCard extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleValidate = this.handleValidate.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.buttonModal = this.buttonModal.bind(this);
    this.modalContent = this.modalContent.bind(this);
    this.btnUpdate = this.btnUpdate.bind(this);
    this.borderState = this.borderState.bind(this);
    this.borderNoState = this.borderNoState.bind(this);
    

    this.state = {
      show: false,
      address: "",
      updateDescription: this.props.service.location,
      updateTitle: this.props.service.title,
      updatePrix: this.props.service.prix,
      updateLocation: this.props.service.location,
      updateState: this.props.service.state
    };
  }

  handleClose() {
    this.setState({ show: false });
  }
  btnUpdate() {
    this.setState({ show: false });
  }

  buttonModal() {
    if (localStorage.getItem("roleUser")) {
      return (
        <Button variant="primary" onClick={this.handleShow}>
          Réserver le service !
        </Button>
      );
    } else if (
      localStorage.getItem("rolePro") &&
      this.props.service.pro == splitIdentity()
    ) {
      return (
        <Button variant="primary" onClick={this.handleShow}>
          Modifier le service !
        </Button>
      );
    }
  }
  borderState() {
    if (this.state.updateState) {
      return "red ";
    }
  }
  borderNoState() {
    if (!this.state.updateState) {
      return "red ";
    }
  }
  modalContent() {
    if (localStorage.getItem("roleUser")) {
      return (
        <div>
          <Modal.Header closeButton>
            <Modal.Title>Réservez le service</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {" "}
            <FormInputs
              ncols={["col-md-12"]}
              proprieties={[
                {
                  label: "Veuillez rentrer votre adresse",
                  type: "text",
                  id: "address",
                  bsClass: "form-control",
                  placeholder: "Saisir votre addresse ici",
                  onChange: this.handleChange,
                  value: this.state.address
                }
              ]}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Fermez
            </Button>

            <Button variant="primary" onClick={this.handleValidate}>
              Validez votre adresse !
            </Button>
          </Modal.Footer>
        </div>
      );
    } 
  }

  handleValidate() {
    console.log(this.props.id);
    postServiceUser(this.props.id, this.state.address).then(() => {
      this.setState({ show: false });
    });
  }
  handleUpdate() {
    console.log(this.props);
    let service = {
      location: this.state.updateLocation,
      title: this.state.updateTitle,
      description: this.state.updateDescription,
      prix: this.state.updatePrix,
      state: this.state.updateState
    };
    console.log(service);

    putUpdateServicePro(service, this.props.id).then(() => {
      this.setState({ show: false });
      //window.location.reload();
    });
  }

  handleShow() {
    this.setState({ show: true });
  }
  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
    console.log(this.state);
  }

  render() {
    return (
      <div className={"card" + (this.props.plain ? " card-plain" : "")}>
        <Modal show={this.state.show} onHide={this.handleClose}>
          {this.modalContent()}
        </Modal>
        <Col md={9}>
          <div
            className={"header" + (this.props.hCenter ? " text-center" : "")}
          >
            <h4 className="title">{this.props.title}</h4>
            <p className="category">{this.props.category}</p>
          </div>
        </Col>
        <Col md={3}>
          <Row>
            <Col md={12}>{this.props.topRight}</Col>
          </Row>
          <Row>
            <Col md={12}> {this.buttonModal()}</Col>
          </Row>
        </Col>
        <Row />

        <div
          className={
            "content" +
            (this.props.ctAllIcons ? " all-icons" : "") +
            (this.props.ctTableFullWidth ? " table-full-width" : "") +
            (this.props.ctTableResponsive ? " table-responsive" : "") +
            (this.props.ctTableUpgrade ? " table-upgrade" : "")
          }
        >
          {this.props.content}

          <div className="footer">
            {this.props.legend}
            {this.props.stats != null ? <hr /> : ""}
            <div className="stats">
              <i className={this.props.statsIcon} /> {this.props.stats}
            </div>
          </div>
        </div>
      </div>
    );
  }
}