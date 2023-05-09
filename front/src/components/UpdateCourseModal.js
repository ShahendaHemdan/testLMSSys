import { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useParams,useNavigate } from "react-router-dom";
import axios from "axios";
import { BaisUrl } from "../BaisUrl";
function UpdateCourseModal({ showModal, setShowModal, courseId }) {
   console.log(courseId, "courseId");
   const [name, setName] = useState("");
   const [code, setCode] = useState("");
   const [status, setStatus] = useState("");
   // get user from local storage
   const myData = JSON.parse(localStorage.getItem("user"));

   useEffect(() => {
      axios
         .get(`${BaisUrl}/admin/showCourse/${courseId}`, {
            headers: {
               token: myData.token,
            },
         })
         .then((response) => {
            console.log(response);
            setName(response.data.name);
            setCode(response.data.code);
            setStatus(response.data.status);
         })
         .catch((error) => {
            console.error(error);
         });
   }, [courseId]);

   const handleNameChange = (event) => {
      setName(event.target.value);
   };

   const handleCodeChange = (event) => {
      setCode(event.target.value);
   };

   const handleStatusChange = (event) => {
      setStatus(event.target.value);
   };

   const handleUpdate = () => {
      console.log(
         courseId,
         "courseId",
         name,
         "name",
         code,
         "code",
         status,
         "status",
         myData.token
      );
      axios
         .put(
            `${BaisUrl}/admin/updateCourse/${courseId}`,
            {
               name: name,
               code: code,
               status: status,
            },
            {
               headers: {
                  token: myData.token, // TODO: fix this
               },
            }
         )

         .then((response) => {
            console.log(response);
            setShowModal(false);
            window.location.reload();
         })
         .catch((error) => {
            console.error(error);
         });
   };

   return (
      <Modal show={showModal} onHide={() => setShowModal(false)}>
         <Modal.Header closeButton>
            <Modal.Title>Update Course</Modal.Title>
         </Modal.Header>
         <Modal.Body>
            <Form>
               <Form.Group controlId="formCourseName">
                  <Form.Label>Course Name</Form.Label>
                  <Form.Control
                     type="text"
                     placeholder="Enter course name"
                     value={name || "koko"}
                     onChange={handleNameChange}
                  />
               </Form.Group>

               <Form.Group controlId="formCourseCode">
                  <Form.Label>Course Code</Form.Label>
                  <Form.Control
                     type="text"
                     placeholder="Enter course code"
                     value={code || "koko2"} // TODO: fix this
                     onChange={handleCodeChange}
                  />
               </Form.Group>

               <Form.Group controlId="formCourseStatus">
                  <Form.Label>Course Status</Form.Label>
                  <Form.Control
                     as="select"
                     value={status || "active"} // TODO: fix this
                     onChange={handleStatusChange}
                  >
                     <option value="active">Active</option>
                     <option value="inactive">Inactive</option>
                  </Form.Control>
               </Form.Group>
            </Form>
         </Modal.Body>
         <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
               Close
            </Button>
            <Button variant="primary" onClick={handleUpdate}>
               Update
            </Button>
         </Modal.Footer>
      </Modal>
   );
}

export default UpdateCourseModal;
