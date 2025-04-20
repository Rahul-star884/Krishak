
import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import axios from 'axios';

const SellingDetail = () => {
  const [formOpen, setFormOpen] = useState(false);
  const [sellingData, setSellingData] = useState([]);
  const [formData, setFormData] = useState({
    productName: '',
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
        const ref = doc(db, 'sellingItems', editId);
        await updateDoc(ref, {
          productName: formData.productName,
          contact: formData.contact,
          imageUrl,
        });
        alert('Item Updated!');
      } else {
        await addDoc(collection(db, 'sellingItems'), {
          productName: formData.productName,
          contact: formData.contact,
          imageUrl,
        });
        alert('Item Listed!');
      }

      resetForm();
      fetchSellingData();
    } catch (err) {
      console.error(err);
      alert('Something went wrong');
    }
  };

  const fetchSellingData = async () => {
    const snapshot = await getDocs(collection(db, 'sellingItems'));
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setSellingData(data);
  };

  const handleEdit = (item) => {
    setFormOpen(true);
    setFormData({ productName: item.productName, contact: item.contact, image: null });
    setPreview(item.imageUrl);
    setEditId(item.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure to delete this item?')) {
      await deleteDoc(doc(db, 'sellingItems', id));
      fetchSellingData();
    }
  };

  const resetForm = () => {
    setFormOpen(false);
    setFormData({ productName: '', contact: '', image: null });
    setPreview('');
    setEditId(null);
  };

  useEffect(() => {
    fetchSellingData();
  }, []);

  return (
    <div style={{ padding: '2rem', maxWidth: '1000px', margin: 'auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Items for Sale</h2>
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
          {formOpen ? 'Close Form' : 'Add Item'}
        </button>
      </div>

      {formOpen && (
        <form onSubmit={handleSubmit} style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <input
            type="text"
            name="productName"
            placeholder="Product Name"
            value={formData.productName}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="contact"
            placeholder="Contact Details and Description of Product"
            value={formData.contact}
            onChange={handleInputChange}
            required
          />
          <input type="file" name="image" accept="image/*" onChange={handleInputChange} />

          {preview && <img src={preview} alt="Preview" style={{ height: '150px', objectFit: 'cover' }} />}

          <button
            type="submit"
            style={{
              background: '#007bff',
              color: 'white',
              padding: '10px',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              marginTop: '10px'
            }}
          >
            {editId ? 'Update' : 'Submit'}
          </button>
        </form>
      )}

      <hr style={{ margin: '2rem 0' }} />

      <h3>Available Items</h3>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1.5rem'
      }}>
        {sellingData.map(item => (
          <div key={item.id} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '1rem', position: 'relative' }}>
            <img src={item.imageUrl} alt={item.productName} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
            <h4 style={{ marginTop: '10px' }}>{item.productName}</h4>
            <p><strong>Contact:</strong> {item.contact}</p>
            <details style={{ position: 'absolute', top: 10, right: 10 }}>
              <summary style={{ cursor: 'pointer', fontSize: '20px' }}>⋮</summary>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <button onClick={() => handleEdit(item)} style={{ background: '#ffc107', border: 'none', padding: '5px 10px', cursor: 'pointer' }}>
                  Edit
                </button>
                <button onClick={() => handleDelete(item.id)} style={{ background: '#dc3545', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}>
                  Delete
                </button>
              </div>
            </details>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SellingDetail;