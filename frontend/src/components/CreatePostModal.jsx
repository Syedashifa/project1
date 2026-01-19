import { useState } from "react";

function CreatePostModal({ onClose, onCreate }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleCreate = () => {
    if (!title.trim() || !content.trim()) return;

    onCreate({
      title,
      content,
    });

    setTitle("");
    setContent("");
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Create New Post</h2>

        <input
          type="text"
          placeholder="Blog title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Blog content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <div className="modal-actions">
          <button className="primary-btn" onClick={handleCreate}>
            CREATE
          </button>
          <button className="secondary-btn" onClick={onClose}>
            CANCEL
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreatePostModal;
