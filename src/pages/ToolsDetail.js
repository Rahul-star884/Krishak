




import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import axios from 'axios';

const ToolsDetail = () => {
  const [formOpen, setFormOpen] = useState(false);
  const [tools, setTools] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    contact: '',
    image: null,
  });
  const [preview, setPreview] = useState('');
  const [editId, setEditId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      const file = files[0];
      setFormData({ ...formData, image: file });
      setPreview(URL.createObjectURL(file));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const uploadToCloudinary = async (file) => {
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'myproject'); 
    data.append('cloud_name', 'dswgi5zt7'); 

    const res = await axios.post('https://api.cloudinary.com/v1_1/dswgi5zt7/image/upload', data);
    return res.data.secure_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imageUrl = preview;
      if (formData.image) {
        imageUrl = await uploadToCloudinary(formData.image);
      }

      if (editId) {
        const ref = doc(db, 'tools', editId);
        await updateDoc(ref, {
          name: formData.name,
          description: formData.description,
          contact: formData.contact,
          image: imageUrl,
        });
        alert('Tool Updated!');
      } else {
        await addDoc(collection(db, 'tools'), {
          name: formData.name,
          description: formData.description,
          contact: formData.contact,
          image: imageUrl,
        });
        alert('Tool Added!');
      }

      resetForm();
      fetchTools();
    } catch (err) {
      console.error(err);
      alert('Error submitting data');
    }
  };

  const fetchTools = async () => {
    const snapshot = await getDocs(collection(db, 'tools'));
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setTools(data);
  };

  const handleEdit = (tool) => {
    setFormOpen(true);
    setFormData({ name: tool.name, description: tool.description, contact: tool.contact, image: null });
    setPreview(tool.image);
    setEditId(tool.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this tool?')) {
      await deleteDoc(doc(db, 'tools', id));
      fetchTools();
    }
  };

  const resetForm = () => {
    setFormOpen(false);
    setFormData({ name: '', description: '', contact: '', image: null });
    setPreview('');
    setEditId(null);
  };

  useEffect(() => {
    fetchTools();
  }, []);

  return (
    <div style={{ padding: '2rem', maxWidth: '1000px', margin: 'auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Tool Renting</h2>
        <button
          onClick={() => {
            if (formOpen) resetForm();
            else setFormOpen(true);
          }}
          style={{
            background: '#28a745',
            color: 'white',
            padding: '8px 16px',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          {formOpen ? 'Close Form' : 'Add Tool'}
        </button>
      </div>

      {formOpen && (
        <form onSubmit={handleSubmit} style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <input type="text" name="name" placeholder="Tool Name" value={formData.name} onChange={handleInputChange} required />
          <input type="text" name="description" placeholder="Description" value={formData.description} onChange={handleInputChange} required />
          <input type="text" name="contact" placeholder="Contact Info" value={formData.contact} onChange={handleInputChange} required />
          <input type="file" name="image" accept="image/*" onChange={handleInputChange} />
          {preview && <img src={preview} alt="Preview" style={{ height: '150px', objectFit: 'cover' }} />}
          <button type="submit" style={{
            background: '#007bff', color: 'white', padding: '10px',
            border: 'none', borderRadius: '6px', cursor: 'pointer'
          }}>
            {editId ? 'Update' : 'Submit'}
          </button>
        </form>
      )}

      <hr style={{ margin: '2rem 0' }} />

      <h3>Available Tools</h3>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1.5rem'
      }}>
        {tools.map(tool => (
          <div key={tool.id} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '1rem', position: 'relative' }}>
            <img src={tool.image} alt={tool.name} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
            <h4 style={{ marginTop: '10px' }}>{tool.name}</h4>
            <p>{tool.description}</p>
            <p><strong>Contact:</strong> {tool.contact}</p>
            <details style={{ position: 'absolute', top: '10px', right: '10px' }}>
              <summary style={{ cursor: 'pointer' }}>⋮</summary>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', background: '#fff', padding: '5px' }}>
                <button onClick={() => handleEdit(tool)} style={{ background: '#ffc107', border: 'none', padding: '5px', cursor: 'pointer' }}>Edit</button>
                <button onClick={() => handleDelete(tool.id)} style={{ background: '#dc3545', color: 'white', border: 'none', padding: '5px', cursor: 'pointer' }}>Delete</button>
              </div>
            </details>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToolsDetail;