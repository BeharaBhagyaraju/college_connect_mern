import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Shield, ArrowLeft, Trash2, UserPlus, Users } from 'lucide-react';
import ConfirmModal from '../components/ConfirmModal';

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [showAddAdmin, setShowAddAdmin] = useState(false);
  const [newAdmin, setNewAdmin] = useState({ username: '', password: '' });
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, id: null });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      navigate('/login');
      return;
    }

    const parsedUser = JSON.parse(userData);
    if (parsedUser.role !== 'admin') {
      navigate('/dashboard'); // Access denied
      return;
    }

    setCurrentUser(parsedUser);
    fetchUsers();
  }, [navigate]);

  const fetchUsers = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } };
      const res = await axios.get('/api/users', config);
      setUsers(res.data);
    } catch (err) {
      console.error('Failed to fetch users:', err);
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
      await axios.delete(`/api/users/${id}`, config);
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete user');
    }
  };

  const handleCreateAdmin = async (e) => {
    e.preventDefault();
    try {
      const config = { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } };
      await axios.post('/api/users/admin', newAdmin, config);
      setNewAdmin({ username: '', password: '' });
      setShowAddAdmin(false);
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to add admin');
    }
  };

  const handleRoleChange = async (id, newRole) => {
    try {
      const config = { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } };
      await axios.put(`/api/users/${id}/role`, { role: newRole }, config);
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update role');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <ConfirmModal 
        isOpen={confirmModal.isOpen}
        title="Delete User"
        message="Are you sure you want to delete this user? This action cannot be undone."
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
              <Shield className="text-red-500" /> Admin Management
            </h1>
          </div>
          <button 
            onClick={() => setShowAddAdmin(!showAddAdmin)}
            className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors shadow-sm"
          >
            <UserPlus size={18} /> Add New Admin
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {showAddAdmin && (
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 mb-8">
            <h2 className="text-xl font-bold mb-4">Promote or Create New Admin</h2>
            <form onSubmit={handleCreateAdmin} className="flex flex-col gap-4 max-w-md">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Username (Existing or New)</label>
                <input 
                  type="text" required
                  value={newAdmin.username} 
                  onChange={e => setNewAdmin({...newAdmin, username: e.target.value})}
                  className="w-full p-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-gray-900/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password (Required if creating new)</label>
                <input 
                  type="password"
                  value={newAdmin.password} 
                  onChange={e => setNewAdmin({...newAdmin, password: e.target.value})}
                  className="w-full p-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-gray-900/50"
                  placeholder="Leave empty if promoting existing user"
                />
              </div>
              <div className="flex justify-end mt-2">
                <button type="button" onClick={() => setShowAddAdmin(false)} className="px-4 py-2 text-gray-600 hover:text-gray-900 mr-2">Cancel</button>
                <button type="submit" className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800">Save Admin</button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex items-center gap-2">
            <Users size={20} className="text-gray-500" />
            <h2 className="text-lg font-bold">All Registered Users ({users.length})</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-500 text-sm">
                <tr>
                  <th className="px-6 py-3 font-medium">Username</th>
                  <th className="px-6 py-3 font-medium">Role</th>
                  <th className="px-6 py-3 font-medium">Contact</th>
                  <th className="px-6 py-3 font-medium">Created On</th>
                  <th className="px-6 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {users.map(u => (
                  <tr key={u._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900">{u.username}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        u.role === 'admin' ? 'bg-red-100 text-red-700' : 
                        u.role === 'class_representative' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {u.role.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500 text-sm">{u.contact || 'N/A'}</td>
                    <td className="px-6 py-4 text-gray-500 text-sm">{new Date(u.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-right">
                      {currentUser?.id !== u._id ? (
                        <div className="flex items-center justify-end gap-3">
                          <select 
                            value={u.role}
                            onChange={(e) => handleRoleChange(u._id, e.target.value)}
                            className="border border-gray-200 rounded-md p-1.5 text-sm bg-white text-gray-700 outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100 transition-shadow"
                          >
                            <option value="regular_user">User</option>
                            <option value="class_representative">Class Rep</option>
                            <option value="admin">Admin</option>
                          </select>
                          <button 
                            onClick={() => handleDeleteClick(u._id)}
                            className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition-colors"
                            title="Delete User"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-400 italic">You / Cannot modify</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
