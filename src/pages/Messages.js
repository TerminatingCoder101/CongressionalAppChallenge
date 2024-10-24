import React, { useState } from 'react';
import { faReply, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faUserMd, faUsers, faEnvelope, faPills, faFileAlt, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const Messages = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      doctor: 'Dr. Smith',
      subject: 'Follow-up Consultation',
      content: 'Please come for a follow-up appointment next week.',
      date: 'October 12, 2024',
      replies: [],
    },
    {
      id: 2,
      doctor: 'Dr. Johnson',
      subject: 'Lab Results',
      content: 'Your lab results are ready. Please check your patient portal.',
      date: 'October 11, 2024',
      replies: [], 
    },
  ]);

  const [reply, setReply] = useState({ id: null, content: '' });
  const [newMessage, setNewMessage] = useState({
    doctor: '',
    subject: '',
    content: ''
  });

  const doctors = ['Dr. Smith', 'Dr. Johnson', 'Dr. Lee', 'Dr. Williams'];

  const handleReplyChange = (e) => {
    setReply({ ...reply, content: e.target.value });
  };

  const sendReply = (id) => {
    if (reply.content.trim() !== '') {
      const updatedMessages = messages.map((message) =>
        message.id === id
          ? {
              ...message,
              replies: [...message.replies, { content: reply.content, date: new Date().toLocaleString() }],
            }
          : message
      );

      setMessages(updatedMessages);
      setReply({ id: null, content: '' });
    }
  };

  const deleteReply = (messageId, replyIndex) => {
    const updatedMessages = messages.map((message) =>
      message.id === messageId
        ? {
            ...message,
            replies: message.replies.filter((_, index) => index !== replyIndex),
          }
        : message
    );
    setMessages(updatedMessages);
  };

  const startReply = (id) => {
    setReply({ id, content: '' });
  };

  const handleNewMessageChange = (e) => {
    setNewMessage({ ...newMessage, [e.target.name]: e.target.value });
  };

  const sendMessage = () => {
    if (newMessage.doctor && newMessage.subject && newMessage.content) {
      const newId = messages.length + 1;
      const newMsg = {
        id: newId,
        doctor: newMessage.doctor,
        subject: newMessage.subject,
        content: newMessage.content,
        date: new Date().toLocaleString(),
        replies: []
      };
      
      setMessages([newMsg, ...messages]);
      
      setNewMessage({ doctor: '', subject: '', content: '' });
    }
  };

  const { user, logOut } = UserAuth();

  const handleLogout = async () => {
    try {
      await logOut();
      console.log('User has been logged out!');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-1/5 bg-blue-950 text-white shadow-lg h-screen flex flex-col rounded-r-lg overflow-y-auto">
        <div className="p-6 flex-grow">
          <h2 className="text-4xl font-extrabold mb-8">SmartSympto</h2>
          <nav className="space-y-4">
            <Link to="/dashboard" className="py-3 px-5 bg-blue-800 hover:bg-blue-700 rounded-lg flex items-center space-x-4 transition-all duration-300">
              <FontAwesomeIcon icon={faTachometerAlt} className="w-6 h-6" />
              <span className="font-medium">Dashboard</span>
            </Link>
            <Link to="/clinics" className="py-3 px-5 bg-blue-800 hover:bg-blue-700 rounded-lg flex items-center space-x-4 transition-all duration-300">
              <FontAwesomeIcon icon={faUserMd} className="w-6 h-6" />
              <span className="font-medium">Clinics</span>
            </Link>
            <Link to="/appointments" className="py-3 px-5 bg-blue-800 hover:bg-blue-700 rounded-lg flex items-center space-x-4 transition-all duration-300">
              <FontAwesomeIcon icon={faUsers} className="w-6 h-6" />
              <span className="font-medium">Appointments</span>
            </Link>
            <Link to="/messages" className="py-3 px-5 bg-blue-800 hover:bg-blue-700 rounded-lg flex items-center space-x-4 transition-all duration-300">
              <FontAwesomeIcon icon={faEnvelope} className="w-6 h-6" />
              <span className="font-medium">Messages</span>
            </Link>
            <Link to="/medications" className="py-3 px-5 bg-blue-800 hover:bg-blue-700 rounded-lg flex items-center space-x-4 transition-all duration-300">
              <FontAwesomeIcon icon={faPills} className="w-6 h-6" />
              <span className="font-medium">Diagnosis & Aid</span>
            </Link>
            <Link to="/documents" className="py-3 px-5 bg-blue-800 hover:bg-blue-700 rounded-lg flex items-center space-x-4 transition-all duration-300">
              <FontAwesomeIcon icon={faFileAlt} className="w-6 h-6" />
              <span className="font-medium">Documents</span>
            </Link>
            <Link to="/settings" className="py-3 px-5 bg-blue-800 hover:bg-blue-700 rounded-lg flex items-center space-x-4 transition-all duration-300">
              <FontAwesomeIcon icon={faCog} className="w-6 h-6" />
              <span className="font-medium">Settings</span>
            </Link>
          </nav>
        </div>

        {user?.displayName && (
          <button
            onClick={handleLogout}
            className="w-auto px-6 bg-red-500 hover:bg-red-600 transition-all duration-300 text-white py-3 rounded-lg flex items-center justify-center space-x-2 mb-6 mx-4">
            <FontAwesomeIcon icon={faSignOutAlt} className="w-6 h-6" />
            <span>Log Out</span>
          </button>
        )}
      </aside>

      {/* Main Content */}
      <div className="w-4/5 h-screen overflow-y-auto bg-gradient-to-br from-purple-100 to-pink-200 p-8">
        <div className="container mx-auto px-4 py-8 bg-white shadow-lg rounded-lg">
          <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">Draft a New Message</h1>

          {/* Compose New Message Form */}
          <div className="mb-8 p-4 bg-gray-100 rounded-lg shadow-md">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-gray-700">Select Doctor:</label>
                <select
                  name="doctor"
                  value={newMessage.doctor}
                  onChange={handleNewMessageChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="">-- Select a Doctor --</option>
                  {doctors.map((doctor, index) => (
                    <option key={index} value={doctor}>
                      {doctor}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-700">Subject:</label>
                <input
                  type="text"
                  name="subject"
                  value={newMessage.subject}
                  onChange={handleNewMessageChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter subject"
                />
              </div>

              <div>
                <label className="block text-gray-700">Message:</label>
                <textarea
                  name="content"
                  value={newMessage.content}
                  onChange={handleNewMessageChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Write your message here..."
                />
              </div>

              <button
                onClick={sendMessage}
                className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md shadow-md"
              >
                Send Message
              </button>
            </div>
          </div>

          {/* Existing Messages */}
          <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">Your Messages</h1>
          <div className="space-y-6">
            {messages.map((message) => (
              <div key={message.id} className="p-4 bg-gray-100 rounded-lg shadow-md">
                <div className="mb-4">
                  <h2 className="text-xl font-semibold">{message.doctor}</h2>
                  <p className="text-gray-600">{message.subject}</p>
                  <p>{message.content}</p>
                  <p className="text-sm text-gray-400">{message.date}</p>
                </div>

                {message.replies.length > 0 && (
                  <div className="ml-6 space-y-2">
                    <h3 className="text-sm font-medium text-gray-600">Replies:</h3>
                    {message.replies.map((reply, index) => (
                      <div key={index} className="p-2 bg-gray-200 rounded-lg">
                        <p>{reply.content}</p>
                        <p className="text-xs text-gray-500">{reply.date}</p>
                        <button
                          onClick={() => deleteReply(message.id, index)}
                          className="text-xs text-red-500 hover:underline"
                        >
                          Delete Reply
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {reply.id === message.id ? (
                  <div className="mt-4">
                    <textarea
                      value={reply.content}
                      onChange={handleReplyChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      placeholder="Type your reply here..."
                    />
                    <button
                      onClick={() => sendReply(message.id)}
                      className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md mt-2"
                    >
                      Send Reply
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => startReply(message.id)}
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md mt-4"
                  >
                    Reply
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
