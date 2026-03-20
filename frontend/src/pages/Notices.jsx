import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Megaphone, MessageSquare, PlusCircle, Trash2, Calendar, Clock, User as UserIcon, X, Send, AlertCircle, CheckCircle, Edit } from 'lucide-react';
import ConfirmModal from '../components/ConfirmModal';

const Notices = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  
  // Form state
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: '', content: '' });
  const [formLoading, setFormLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [editingId, setEditingId] = useState(null);
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, id: null });

  const fetchNotices = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/notices', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotices(response.data);
    } catch (error) {
      console.error('Error fetching notices:', error);
      setMessage({ type: 'error', text: 'Failed to load notices.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    fetchNotices();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreateNotice = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.content) {
      setMessage({ type: 'error', text: 'Title and content are required.' });
      return;
    }

    setFormLoading(true);
    setMessage({ type: '', text: '' });

    // Type is determined by role backend-side in PHP, but here we must specify the type based on logic: admin -> official, CR -> unofficial.
    const noticeType = user.role === 'admin' ? 'official' : 'unofficial';

    try {
      const token = localStorage.getItem('token');
      if (editingId) {
        await axios.put(
          `/api/notices/${editingId}`,
          { title: formData.title, content: formData.content },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setMessage({ type: 'success', text: 'Notice updated successfully!' });
      } else {
        await axios.post(
          '/api/notices',
          { title: formData.title, content: formData.content, type: noticeType },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setMessage({ type: 'success', text: 'Notice added successfully!' });
      }
      setFormData({ title: '', content: '' });
      setShowForm(false);
      setEditingId(null);
      fetchNotices();
    } catch (error) {
      console.error('Error creating notice:', error);
      setMessage({ type: 'error', text: error.response?.data?.message || 'Error: Unable to add notice.' });
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteClick = (id) => {
    setConfirmModal({ isOpen: true, id });
  };

  const handleEditClick = (notice) => {
    setFormData({ title: notice.title, content: notice.content });
    setEditingId(notice._id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteConfirm = async () => {
    const id = confirmModal.id;
    setConfirmModal({ isOpen: false, id: null });
    
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/notices/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage({ type: 'success', text: 'Notice deleted successfully!' });
      setNotices(notices.filter(notice => notice._id !== id));
    } catch (error) {
      console.error('Error deleting notice:', error);
      setMessage({ type: 'error', text: 'Error: Unable to delete notice.' });
    }
  };

  // Split notices
  const officialNotices = notices.filter(n => n.type === 'official');
  const unofficialNotices = notices.filter(n => n.type === 'unofficial');

  const canAddNotice = user?.role === 'admin' || user?.role === 'class_representative';

  return (
    <div className="font-[Nunito] bg-[#f0f2f5] min-h-screen py-8 text-[#333]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <ConfirmModal 
          isOpen={confirmModal.isOpen}
          title="Delete Notice"
          message="Are you sure you want to delete this notice? This action cannot be undone."
          confirmText="Yes, Delete"
          onConfirm={handleDeleteConfirm}
          onCancel={() => setConfirmModal({ isOpen: false, id: null })}
        />
        
        <h1 className="text-[2rem] font-bold text-[#2c3e50] text-center mb-8 pb-4 relative after:content-['📢'] after:absolute after:-bottom-3 after:left-1/2 after:-translate-x-1/2 after:text-[1.5rem] animate-[fadeIn_0.5s_ease-in-out]">
          College Notices Board
        </h1>

        {/* Alerts */}
        {message.text && (
          <div className={`p-4 rounded-[10px] mb-6 shadow-md flex items-center justify-between animate-[fadeIn_0.5s_ease-in-out] ${message.type === 'error' ? 'bg-[#f8d7da] text-[#721c24] border-l-4 border-[#dc3545]' : 'bg-[#d4edda] text-[#155724] border-l-4 border-[#28a745]'}`}>
            <div className="flex items-center">
              {message.type === 'error' ? <AlertCircle className="mr-2" size={20} /> : <CheckCircle className="mr-2" size={20} />}
              {message.text}
            </div>
            <button onClick={() => setMessage({ type: '', text: '' })} className="text-current opacity-70 hover:opacity-100">
              <X size={20} />
            </button>
          </div>
        )}

        {/* Add Notice Button */}
        {canAddNotice && !showForm && (
          <div className="text-center mb-8">
            <button 
              onClick={() => setShowForm(true)}
              className="bg-gradient-to-br from-[#9b59b6] to-[#8e44ad] text-white rounded-full px-8 py-3 font-semibold shadow-[0_4px_15px_rgba(155,89,182,0.4)] hover:-translate-y-1 hover:shadow-[0_6px_20px_rgba(155,89,182,0.6)] hover:from-[#8e44ad] hover:to-[#9b59b6] transition-all duration-300 flex items-center justify-center mx-auto gap-2 animate-[fadeIn_0.5s_ease-in-out]"
            >
              <PlusCircle size={20} /> Add New Notice
            </button>
          </div>
        )}

        {/* Add Notice Form Container */}
        {showForm && (
          <div className="bg-white p-8 rounded-[15px] shadow-[0_10px_30px_rgba(0,0,0,0.1)] max-w-3xl mx-auto mb-10 border-t-[5px] border-[#9b59b6] animate-[fadeIn_0.5s_ease-in-out]">
            <h3 className="text-[#2c3e50] text-xl font-semibold text-center pb-4 mb-6 border-b border-gray-100 flex items-center justify-center gap-2">
              ✏️ {editingId ? 'Edit Notice' : (user?.role === 'admin' ? '✨ Add Official Notice' : '✨ Add Unofficial Notice')}
            </h3>
            
            <form onSubmit={handleCreateNotice}>
              <div className="mb-4">
                <label className="block font-medium text-[#34495e] mb-2 flex items-center gap-2">
                  <span className="font-bold">T</span> Title
                </label>
                <input 
                  type="text" 
                  name="title" 
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter notice title here..." 
                  required 
                  maxLength={255}
                  className="w-full border border-[#ddd] rounded-lg px-4 py-3 focus:border-[#9b59b6] focus:ring-4 focus:ring-[#9b59b6]/20 transition-all outline-none"
                />
              </div>
              <div className="mb-6">
                <label className="block font-medium text-[#34495e] mb-2 flex items-center gap-2">
                  <span className="font-bold">≡</span> Content
                </label>
                <textarea 
                  name="content" 
                  value={formData.content}
                  onChange={handleInputChange}
                  placeholder="Enter notice content here..." 
                  rows={5} 
                  required
                  className="w-full border border-[#ddd] rounded-lg px-4 py-3 focus:border-[#9b59b6] focus:ring-4 focus:ring-[#9b59b6]/20 transition-all outline-none resize-y min-h-[120px]"
                ></textarea>
              </div>
              <div className="flex justify-end gap-3">
                <button 
                  type="button" 
                  onClick={() => { setShowForm(false); setEditingId(null); setFormData({title: '', content: ''}); }}
                  className="bg-[#ecf0f1] hover:bg-[#dfe6e9] text-[#7f8c8d] hover:text-[#636e72] font-semibold px-6 py-2.5 rounded-lg flex items-center gap-2 transition-colors"
                >
                  <X size={18} /> Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={formLoading}
                  className="bg-gradient-to-br from-[#9b59b6] to-[#8e44ad] hover:from-[#8e44ad] hover:to-[#9b59b6] text-white font-semibold px-6 py-2.5 rounded-lg shadow-[0_4px_10px_rgba(155,89,182,0.3)] hover:-translate-y-0.5 hover:shadow-[0_6px_15px_rgba(155,89,182,0.4)] flex items-center gap-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {formLoading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Send size={18} />}
                  {editingId ? 'Update Notice' : 'Submit Notice'}
                </button>
              </div>
            </form>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center my-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#9b59b6]"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Official Notices */}
            <div className="bg-white rounded-[15px] shadow-[0_10px_20px_rgba(0,0,0,0.1)] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(0,0,0,0.15)] animate-[fadeIn_0.5s_ease-in-out]">
              <div className="bg-gradient-to-br from-[#3498db] to-[#2980b9] text-white p-4 font-semibold text-[1.2rem] flex items-center gap-2">
                <Megaphone size={20} /> Official Notices 📋
              </div>
              <div className="max-h-[600px] overflow-y-auto no-scrollbar scrollbar-custom p-0 m-0">
                {officialNotices.length > 0 ? (
                  officialNotices.map((notice) => (
                    <div key={notice._id} className="p-5 bg-white border-b-2 border-dashed border-gray-200 hover:bg-[#f8f9fa] transition-colors relative group">
                      <h5 className="font-semibold text-[#2c3e50] text-[1.1rem] mb-3 flex items-start gap-2">
                        <span>📌</span> {notice.title}
                      </h5>
                      <div className="bg-[#f8f9fa] p-4 rounded-[10px] border-l-4 border-[#3498db] text-[#555] mb-4 whitespace-pre-line leading-relaxed">
                        {notice.content}
                      </div>
                      <div className="flex justify-between items-center text-[0.85rem] text-[#7f8c8d]">
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                          <span className="flex items-center gap-1"><UserIcon size={14} /> {notice.createdBy?.username || 'Admin'}</span>
                          <span className="flex items-center gap-1"><Calendar size={14} /> {new Date(notice.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                          <span className="flex items-center gap-1"><Clock size={14} /> {new Date(notice.createdAt).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}</span>
                        </div>
                        {(user?.role === 'admin' || user?._id === notice.createdBy?._id || user?.id === notice.createdBy?._id) && (
                          <div className="flex items-center gap-2 shrink-0">
                            <button 
                              onClick={() => handleEditClick(notice)}
                              className="text-[#3498db] hover:bg-[#3498db]/10 hover:text-[#2980b9] px-2 py-1 rounded transition-colors flex items-center gap-1"
                            >
                              <Edit size={14} /> Edit
                            </button>
                            <button 
                              onClick={() => handleDeleteClick(notice._id)}
                              className="text-[#e74c3c] hover:bg-[#e74c3c]/10 hover:text-[#c0392b] px-2 py-1 rounded transition-colors flex items-center gap-1"
                            >
                              <Trash2 size={14} /> Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center text-[#7f8c8d]">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                      <Megaphone size={32} className="text-[#bdc3c7]" />
                    </div>
                    <p>No official notices found at this time.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Unofficial Notices */}
            <div className="bg-white rounded-[15px] shadow-[0_10px_20px_rgba(0,0,0,0.1)] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(0,0,0,0.15)] animate-[fadeIn_0.5s_ease-in-out_0.2s_both]">
              <div className="bg-gradient-to-br from-[#e67e22] to-[#d35400] text-white p-4 font-semibold text-[1.2rem] flex items-center gap-2">
                <MessageSquare size={20} /> Unofficial Notices 📝
              </div>
              <div className="max-h-[600px] overflow-y-auto no-scrollbar scrollbar-custom p-0 m-0">
                {unofficialNotices.length > 0 ? (
                  unofficialNotices.map((notice) => (
                    <div key={notice._id} className="p-5 bg-white border-b-2 border-dashed border-gray-200 hover:bg-[#f8f9fa] transition-colors relative group">
                      <h5 className="font-semibold text-[#2c3e50] text-[1.1rem] mb-3 flex items-start gap-2">
                        <span>📌</span> {notice.title}
                      </h5>
                      <div className="bg-[#f8f9fa] p-4 rounded-[10px] border-l-4 border-[#e67e22] text-[#555] mb-4 whitespace-pre-line leading-relaxed">
                        {notice.content}
                      </div>
                      <div className="flex justify-between items-center text-[0.85rem] text-[#7f8c8d]">
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                          <span className="flex items-center gap-1"><UserIcon size={14} /> {notice.createdBy?.username || 'User'}</span>
                          <span className="flex items-center gap-1"><Calendar size={14} /> {new Date(notice.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                          <span className="flex items-center gap-1"><Clock size={14} /> {new Date(notice.createdAt).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}</span>
                        </div>
                        {(user?.role === 'admin' || user?._id === notice.createdBy?._id || user?.id === notice.createdBy?._id) && (
                          <div className="flex items-center gap-2 shrink-0">
                            <button 
                              onClick={() => handleEditClick(notice)}
                              className="text-[#3498db] hover:bg-[#3498db]/10 hover:text-[#2980b9] px-2 py-1 rounded transition-colors flex items-center gap-1"
                            >
                              <Edit size={14} /> Edit
                            </button>
                            <button 
                              onClick={() => handleDeleteClick(notice._id)}
                              className="text-[#e74c3c] hover:bg-[#e74c3c]/10 hover:text-[#c0392b] px-2 py-1 rounded transition-colors flex items-center gap-1"
                            >
                              <Trash2 size={14} /> Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center text-[#7f8c8d]">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                      <MessageSquare size={32} className="text-[#bdc3c7]" />
                    </div>
                    <p>No unofficial notices found at this time.</p>
                  </div>
                )}
              </div>
            </div>

          </div>
        )}
      </div>
      
      {/* Custom Styles that Vite/Tailwind might not natively support cleanly without plugins */}
      <style dangerouslySetInnerHTML={{__html: `
        .scrollbar-custom::-webkit-scrollbar {
          width: 8px;
        }
        .scrollbar-custom::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .scrollbar-custom::-webkit-scrollbar-thumb {
          background-color: #bdc3c7;
          border-radius: 10px;
        }
      `}} />
    </div>
  );
};

export default Notices;
