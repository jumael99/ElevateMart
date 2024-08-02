import React from 'react';
import { useGetMessagesQuery, useDeleteMessageMutation } from '../../store/slices/api/contactApiSlice';

const Contacts = () => {
    const { data: messages, error, isLoading } = useGetMessagesQuery();
    const [deleteMessage] = useDeleteMessageMutation();

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this message?')) {
            try {
                await deleteMessage(id).unwrap();
                alert('Message deleted successfully');
            } catch (err) {
                console.error('Failed to delete message: ', err);
            }
        }
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading messages</div>;

    return (
        <div>
            <h1>Contact Messages</h1>
            {messages.length === 0 ? (
                <div>No messages found</div>
            ) : (
                <ul>
                    {messages.map((message) => (
                        <li key={message._id}>
                            <p><strong>Name:</strong> {message.fullName}</p>
                            <p><strong>Email:</strong> {message.email}</p>
                            <p><strong>Message:</strong> {message.message}</p>
                            <button onClick={() => handleDelete(message._id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Contacts;
