import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, PlusCircle, Search, Archive, CheckCircle, Trash2 } from 'lucide-react';
import ConfirmModal from '../components/ConfirmModal';

const LostAndFound = () => {
  const [items, setItems] = useState([]);
  const [user, setUser] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newItem, setNewItem] = useState({ itemName: '', description: '', locationFound: '', status: 'lost', photo: null });
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, id: null });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (!token || !userData) {
      navigate('/login');
      return;
    }

    setUser(JSON.parse(userData));
    fetchItems();
  }, [navigate]);

  const fetchItems = async () => {
    try {
      const res = await axios.get('/api/lost-items');
      setItems(res.data);
    } catch (err) {
      console.error('Failed to fetch items:', err);
    }
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('itemName', newItem.itemName);
      formData.append('description', newItem.description);
      formData.append('locationFound', newItem.locationFound);
      formData.append('status', newItem.status);
      if (newItem.photo) {
        formData.append('photo', newItem.photo);
      }

      const config = { 
        headers: { 
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data'
        } 
      };
      await axios.post('/api/lost-items', formData, config);
      setNewItem({ itemName: '', description: '', locationFound: '', status: 'lost', photo: null });
      setShowAddForm(false);
      fetchItems();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to add item');
      console.error('Failed to add item:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleResolve = async (id) => {
    try {
      const config = { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } };
      await axios.put(`/api/lost-items/${id}/resolve`, {}, config);
      fetchItems();
    } catch (err) {
      console.error('Failed to resolve item:', err);
    }
  };

  const handleDeleteClick = (id) => {
    setConfirmModal({ isOpen: true, id });
  };

  const handleDeleteConfirm = async () => {
    const id = confirmModal.id;
    setConfirmModal({ isOpen: false, id: null });
    try {
      const config = { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } };
      await axios.delete(`/api/lost-items/${id}`, config);
      fetchItems();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete item');
      console.error('Failed to delete item:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <ConfirmModal 
        isOpen={confirmModal.isOpen}
        title="Delete Item"
        message="Are you sure you want to delete this lost item? This action cannot be undone."
        confirmText="Yes, Delete"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setConfirmModal({ isOpen: false, id: null })}
      />
      <div className="bg-white shadow">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link to="/dashboard" className="text-gray-500 hover:text-primary transition-colors">
              <ArrowLeft size={24} />
            </Link>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Archive className="text-orange-500" /> Lost & Found
            </h1>
          </div>
          <button 
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors shadow-sm"
          >
            <PlusCircle size={18} /> Report Item
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {showAddForm && (
          <div className="bg-white p-6 rounded-xl shadow-md border border-orange-100 mb-8 animate-in slide-in-from-top-4">
            <h2 className="text-xl font-bold mb-4">Report a Lost or Found Item</h2>
            <form onSubmit={handleAddItem} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Item Name</label>
                  <input 
                    type="text" required
                    value={newItem.itemName} 
                    onChange={e => setNewItem({...newItem, itemName: e.target.value})}
                    className="w-full p-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-orange-500/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select 
                    value={newItem.status} 
                    onChange={e => setNewItem({...newItem, status: e.target.value})}
                    className="w-full p-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-orange-500/50"
                  >
                    <option value="lost">Lost</option>
                    <option value="found">Found</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location ({newItem.status === 'lost' ? 'last seen' : 'found'})</label>
                <input 
                  type="text" required
                  value={newItem.locationFound} 
                  onChange={e => setNewItem({...newItem, locationFound: e.target.value})}
                  className="w-full p-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-orange-500/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea 
                  required rows="3"
                  value={newItem.description} 
                  onChange={e => setNewItem({...newItem, description: e.target.value})}
                  className="w-full p-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-orange-500/50 resize-y"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Photo (Optional)</label>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={e => setNewItem({...newItem, photo: e.target.files[0]})}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-600 hover:file:bg-orange-100"
                />
              </div>
              <div className="flex justify-end mt-2">
                <button type="button" onClick={() => setShowAddForm(false)} className="px-4 py-2 text-gray-600 hover:text-gray-900 mr-2">Cancel</button>
                <button type="submit" disabled={loading} className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 shadow-sm disabled:opacity-50">
                  {loading ? 'Uploading...' : 'Submit Report'}
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.length === 0 ? (
            <div className="col-span-full text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
              <p className="text-gray-500">No items reported yet.</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item._id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow flex flex-col">
                <div className={`h-2 w-full ${item.resolved ? 'bg-green-500' : (item.status === 'lost' ? 'bg-red-500' : 'bg-blue-500')}`}></div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-gray-900 line-clamp-1" title={item.itemName}>{item.itemName}</h3>
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      item.resolved ? 'bg-green-100 text-green-700' : 
                      (item.status === 'lost' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700')
                    }`}>
                      {item.resolved ? 'RESOLVED' : item.status.toUpperCase()}
                    </span>
                  </div>
                  
                  {item.photoPath && (
                    <div className="mb-4 rounded-lg overflow-hidden border border-gray-100 bg-gray-50 flex justify-center">
                      <img src={item.photoPath} alt={item.itemName} className="max-h-48 object-contain" />
                    </div>
                  )}

                  <div className="text-sm text-gray-600 mb-4 bg-gray-50 p-3 rounded-lg border border-gray-100">
                    <p className="mb-1"><span className="font-semibold text-gray-700">Location:</span> {item.locationFound}</p>
                    <p><span className="font-semibold text-gray-700">Description:</span> {item.description}</p>
                  </div>
                  
                  <div className="mt-auto pt-4 border-t border-gray-100 flex flex-wrap gap-2 justify-between items-center text-sm">
                    <span className="text-gray-500">Reported by: <span className="font-medium text-gray-700">{item.reportedBy?.username || 'Unknown'}</span></span>
                    
                    <div className="flex gap-2">
                      {(!item.resolved && item.status === 'lost') && (user?.role === 'admin' || user?.id === item.reportedBy?._id || user?._id === item.reportedBy?._id) && (
                        <button 
                          onClick={() => handleResolve(item._id)}
                          className="flex items-center gap-1 text-green-600 hover:text-green-700 font-medium bg-green-50 px-3 py-1.5 rounded-md hover:bg-green-100 transition-colors"
                        >
                          <CheckCircle size={16} /> Mark as Found
                        </button>
                      )}
                      
                      {(user?.role === 'admin' || user?.id === item.reportedBy?._id || user?._id === item.reportedBy?._id) && (
                        <button 
                          onClick={() => handleDeleteClick(item._id)}
                          className="flex items-center gap-1 text-red-600 hover:text-red-700 font-medium bg-red-50 px-3 py-1.5 rounded-md hover:bg-red-100 transition-colors"
                        >
                          <Trash2 size={16} /> Delete
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default LostAndFound;
