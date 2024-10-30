import React, { useState, useEffect } from "react";
import { db, collection, addDoc, deleteDoc, doc, getDocs, updateDoc } from "../firebaseConfig"; // Import Firebase functions
import "./AddProject.css";
import { FaEdit, FaTrash } from "react-icons/fa"; // Import icons for edit and delete
import { Modal, Button, Table } from 'react-bootstrap'; // Import Bootstrap components
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

export const AddProject = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [link, setLink] = useState(""); // State for project link
  const [category, setCategory] = useState("Digital Marketing");
  const [projects, setProjects] = useState([]); // State for projects
  const [editingId, setEditingId] = useState(null); // State to track editing project
  const [showModal, setShowModal] = useState(false); // State to control modal visibility

  // Function to fetch projects from Firebase
  const fetchProjects = async () => {
    const projectsCollection = collection(db, "projects");
    const projectSnapshot = await getDocs(projectsCollection);
    const projectList = projectSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    setProjects(projectList);
  };

  useEffect(() => {
    fetchProjects(); // Fetch projects on component mount
  }, []);

  const handleAddProject = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        // Update existing project
        const projectRef = doc(db, "projects", editingId);
        await updateDoc(projectRef, {
          title,
          description,
          imgUrl,
          link, // Include link when updating
          category,
        });
        setEditingId(null); // Reset editing state
        alert("Project updated successfully!");
      } else {
        // Add new project
        await addDoc(collection(db, "projects"), {
          title,
          description,
          imgUrl,
          link, // Include link when adding
          category,
        });
        alert("Project added successfully!");
      }

      // Reset form fields
      resetForm();
      fetchProjects(); // Refresh project list
    } catch (error) {
      console.error("Error saving project:", error);
      alert("There was an error saving the project.");
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setImgUrl("");
    setLink(""); // Reset link field
    setCategory("Digital Marketing");
    setShowModal(false); // Close the modal
  };

  const handleDeleteProject = async (id) => {
    try {
      await deleteDoc(doc(db, "projects", id));
      alert("Project deleted successfully!");
      fetchProjects(); // Refresh project list
    } catch (error) {
      console.error("Error deleting project:", error);
      alert("There was an error deleting the project.");
    }
  };

  const handleEditProject = (project) => {
    setEditingId(project.id);
    setTitle(project.title);
    setDescription(project.description);
    setImgUrl(project.imgUrl);
    setLink(project.link); // Set link for editing
    setCategory(project.category);
    setShowModal(true); // Open modal for editing
  };

  const handleOpenModal = () => {
    resetForm(); // Reset form when opening modal for adding a project
    setShowModal(true);
  };

  return (
    <section className="add-project">
      <h2>Project Management</h2>
      <Button variant="primary" onClick={handleOpenModal}>
        Add New Project
      </Button>

      <Modal show={showModal} onHide={resetForm} className="modal-custom">
        <Modal.Header closeButton>
          <Modal.Title>{editingId ? "Edit Project" : "Add New Project"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleAddProject}>
            <div className="mb-3">
              <label>Project Title:</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label>Project Description:</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="form-control"
                rows={3}
              />
            </div>

            <div className="mb-3">
              <label>Image URL:</label>
              <input
                type="url"
                value={imgUrl}
                onChange={(e) => setImgUrl(e.target.value)}
                required
                className="form-control"
              />
              {imgUrl && (
                <div className="image-preview mt-2">
                  <img src={imgUrl} alt="Project Preview" className="img-fluid" />
                </div>
              )}
            </div>

            <div className="mb-3">
              <label>Project Link:</label> {/* New field for project link */}
              <input
                type="url"
                value={link}
                onChange={(e) => setLink(e.target.value)} // Set link value
                required
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label>Category:</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="form-control">
                <option value="Digital Marketing">Digital Marketing</option>
                <option value="Web Development">Web Development</option>
                <option value="Graphics Design">Graphics Design</option>
              </select>
            </div>

            <div className="d-flex justify-content-between">
              <Button type="submit" variant="primary">
                {editingId ? "Save Changes" : "Add Project"}
              </Button>
              <Button variant="secondary" onClick={resetForm}>
                Cancel
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>

      <h2 className="mt-4">Project List</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id}>
              <td>{project.title}</td>
              <td>{project.description}</td>
              <td>{project.category}</td>
              <td>
                <div className="btn-group">
                  <Button variant="outline-primary" onClick={() => handleEditProject(project)} className="me-2">
                    <FaEdit /> Edit
                  </Button>
                  <Button variant="outline-danger" onClick={() => handleDeleteProject(project.id)}>
                    <FaTrash /> Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </section>
  );
};
