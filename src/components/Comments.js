import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaSave } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Comments.css';

const Comments = ({ employeeId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [editingComment, setEditingComment] = useState(null);
  const [editedText, setEditedText] = useState('');

  useEffect(() => {
    const savedComments = localStorage.getItem(`comments-${employeeId}`);
    if (savedComments) {
      setComments(JSON.parse(savedComments));
    }
  }, [employeeId]);

  useEffect(() => {
    if (comments.length > 0) {
      localStorage.setItem(`comments-${employeeId}`, JSON.stringify(comments));
    }
  }, [comments, employeeId]);

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([...comments, { id: Date.now(), text: newComment, employeeId }]);
      setNewComment('');
    }
  };

  const handleDeleteComment = (id) => {
    setComments(comments.filter(comment => comment.id !== id));
  };

  const handleEditComment = (comment) => {
    setEditingComment(comment.id);
    setEditedText(comment.text);
  };

  const handleSaveEdit = (id) => {
    setComments(comments.map(comment => (comment.id === id ? { ...comment, text: editedText } : comment)));
    setEditingComment(null);
    setEditedText('');
  };

  return (
    <div className="comments-section mt-4">
      <h5>Comments</h5>
      <div className="mb-3">
        <textarea
          className="form-control"
          rows="3"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button className="btn btn-primary mt-2" onClick={handleAddComment}>Add Comment</button>
      </div>
      <ul className="list-group">
        {comments.filter(comment => comment.employeeId === employeeId).map(comment => (
          <li key={comment.id} className="list-group-item">
            {editingComment === comment.id ? (
              <div>
                <textarea
                  className="form-control"
                  rows="2"
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                />
                <button className="btn btn-success mt-2 me-2" onClick={() => handleSaveEdit(comment.id)}>
                  <FaSave /> Save
                </button>
                <button className="btn btn-secondary mt-2" onClick={() => setEditingComment(null)}>
                  Cancel
                </button>
              </div>
            ) : (
              <div>
                <p className="mb-1">{comment.text}</p>
                <button className="btn btn-warning btn-sm me-2" onClick={() => handleEditComment(comment)}>
                  <FaEdit /> Edit
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDeleteComment(comment.id)}>
                  <FaTrash /> Delete
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Comments;
