import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { LocalForm, Control, Errors } from 'react-redux-form';

const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length >= len);

  function RenderCampsite({campsite}) {
    return (
      <div className ="col-md-5 m-1">
        <Card>
          <CardImg top src={campsite.image} alt={campsite.name} />
          <CardBody>
            <CardText>{campsite.description}</CardText>
          </CardBody>
        </Card>
      </div>
    );
  }

  function RenderComments({comments}) {
    if (comments) {
      return (
        <div className='col-md-5 m-1'>
         <h4>Comments</h4>
          {comments.map(comment => <p key={comment.id}>{comment.text}
          <br/>
           --{comment.author} ,
          {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
          </p>)
          }
          <CommentForm />
        </div>
      )
    };
    return <div/>
  }


  function CampsiteInfo(props) {
    if (props.campsite) {
      return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <h2>{props.campsite.name}</h2>
                    <hr />
                </div>
            </div>
            <div className="row">
                <RenderCampsite campsite={props.campsite} />
                <RenderComments comments={props.comments} />
            </div>
        </div>
      );
    }
    return <div />
  }

  class CommentForm extends Component {
    constructor(props) {
      super(props);

      this.state = {
        isModalOpen: false
      };

      this.toggleModal = this.toggleModal.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal() {
      this.setState({
          isModalOpen: !this.state.isModalOpen
      });
  }

    handleSubmit(values) {
      console.log("Current state is: " + JSON.stringify(values));
      alert("Current state is: " + JSON.stringify(values));
    }


    render() {

      return (
          <React.Fragment>
            <div>
              <Button onClick={this.toggleModal} className="fa fa-pencil fa-lg" outline type="submit">Submit Comment</Button>
            </div>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
              <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
              <ModalBody>
              <LocalForm  onSubmit={values => this.handleSubmit(values)}>
                <div className="form-group">
                  <Label htmlFor="rating" md={2}>Rating</Label>
                    <Control.select model=".rating" id="rating" type="select">
                      <option value="true">1</option>
                      <option value="false">2</option>
                      <option value="false">3</option>
                      <option value="false">4</option>
                      <option value="false">5</option>
                    </Control.select>
                </div>
                <div className="form-group">
                    <Label  htmlFor="author" md={2}>Your Name</Label>
                    <Control.text model=".author" id="author"
                      placeholder="Your Name"
                      className="form-control"
                      validators={{
                        minLength: minLength(2),
                        maxLength: maxLength(15)
                      }}
                    />
                    <Errors show="touched"
                      className="text-danger"
                      model=".author"
                      component="div"
                      messages={{
                        minLength: 'Must be at least 2 characters!',
                        maxLength: 'Must be less than 15 characters!'
                  
                      }}
                    />
                 </div>
                 <div className="form-group">
                  <Label  htmlFor="text" md={2}>Comment</Label>
                    <Control.textarea model=".text" id="text"
                      placeholder="Comment"
                      className="form-control"
                  />
                  </div>
                  <div className="form-group">
                    <Button onClick={this.toggleModal} type="submit" value="submit" color="primary">Submit</Button>
                  </div>
                </LocalForm>
              </ModalBody>
            </Modal>
          </React.Fragment>
      );
    }

      
  }

export default CampsiteInfo;