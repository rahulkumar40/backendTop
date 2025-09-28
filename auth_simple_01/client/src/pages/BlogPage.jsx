import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, ThumbsUp, ThumbsDown, Edit, Trash2, Reply } from 'lucide-react';

// --- MOCK DATA (matches the API structure) ---
const MOCK_BLOG_DATA = {
    _id: "68d629664a692e28fa070242",
    title: "The Art of Full-Stack Development",
    content: "Building complex systems requires mastery of both frontend and backend technologies. This post dives into state management, API design, and performance optimization.",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop",
    author: {
        _id: "68caec6619cd969ac5844669",
        name: "Rahul Kumar",
        email: "rahul@test.com",
        role: "User"
    },
    likeCount: 15,
    disLikeCount: 2,
    comments: [
        {
            _id: "68d64abc8d2a323d9642b461",
            content: "Excellent overview! What library do you recommend for state management in React?",
            user: { _id: "68d54462e2c9183b5e37725b", name: "Priya Sharma" },
            createdAt: "2025-09-26T08:11:40.164Z",
            replies: [
                {
                    _id: "68d711d9a2e3f4g5h6i7j8k9",
                    content: "Thanks! I'm a fan of Zustand for simplicity and performance.",
                    user: { _id: "68caec6619cd969ac5844669", name: "Rahul Kumar" },
                    createdAt: "2025-09-26T09:00:00.000Z",
                }
            ]
        },
        // Another comment
        {
            _id: "68d655f4b0c1d2e3f4g5h6i7",
            content: "Great points on performance optimization. Loved the section on caching!",
            user: { _id: "69a1b2c3d4e5f6g7h8i9j0k1", name: "Michael J." },
            createdAt: "2025-09-27T01:00:00.000Z",
            replies: []
        }
    ]
};

// --- UTILITY COMPONENT: COMMENT/REPLY CARD ---
const CommentCard = ({ item, currentUserId, isReply = false, onEdit, onDelete, onReply }) => {
    const isOwner = item.user._id === currentUserId;
    
    // Fallback for avatar (same logic used in UserProfileDashboard)
    const initials = item.user.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

    return (
        <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            className={`p-4 rounded-lg transition-all ${isReply ? 'ml-8 bg-gray-50 border-l-4 border-indigo-200' : 'bg-white shadow-md mb-4'}`}
        >
            <div className="flex justify-between items-start">
                <div className="flex items-center">
                    <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white text-xs font-bold mr-3 flex-shrink-0">
                        {initials}
                    </div>
                    <div>
                        <p className="font-semibold text-gray-800">{item.user.name}</p>
                        <p className="text-xs text-gray-500">
                            {new Date(item.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                </div>
                
                {/* Actions */}
                <div className="flex gap-2">
                    {isOwner && (
                        <>
                            <button onClick={() => onEdit(item._id, item.content, isReply)} className="text-blue-500 hover:text-blue-700 p-1 rounded">
                                <Edit className="w-4 h-4" />
                            </button>
                            <button onClick={() => onDelete(item._id, isReply)} className="text-red-500 hover:text-red-700 p-1 rounded">
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </>
                    )}
                    {!isReply && (
                        <button onClick={() => onReply(item._id, item.user.name)} className="text-green-500 hover:text-green-700 p-1 rounded">
                            <Reply className="w-4 h-4" />
                        </button>
                    )}
                </div>
            </div>
            
            <p className={`mt-3 text-gray-700 ${isReply ? 'pl-0' : 'pl-0'}`}>{item.content}</p>

            {/* Render Replies Recursively (if not a reply itself) */}
            {!isReply && item.replies && item.replies.length > 0 && (
                <div className="mt-4 border-t pt-4">
                    {item.replies.map(reply => (
                        <CommentCard 
                            key={reply._id} 
                            item={reply} 
                            currentUserId={currentUserId} 
                            isReply={true} 
                            onEdit={onEdit}
                            onDelete={onDelete}
                        />
                    ))}
                </div>
            )}
        </motion.div>
    );
};


// --- MAIN BLOG PAGE COMPONENT ---
export default function BlogPage({ blogData = MOCK_BLOG_DATA, currentUserId = "68caec6619cd969ac5844669" }) {
    const [commentText, setCommentText] = useState('');
    const [replyingTo, setReplyingTo] = useState(null); // { commentId: string, username: string }
    const [editingComment, setEditingComment] = useState(null); // { id: string, content: string, isReply: boolean }

    // --- Action Handlers (API calls would go here) ---

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (!commentText.trim()) return;

        console.log(`Submitting ${replyingTo ? 'Reply' : 'Comment'}:`, commentText);
        
        // In a real app:
        // 1. Determine API endpoint (comment or reply)
        // 2. Data payload: { content: commentText, blogId: blogData._id, parentId: replyingTo?.commentId }
        // 3. Reset form states on success
        
        setCommentText('');
        setReplyingTo(null);
    };

    const startEdit = (id, content, isReply) => {
        setEditingComment({ id, content, isReply });
        setCommentText(content);
        setReplyingTo(null); // Clear reply mode
    };

    const handleUpdate = () => {
        if (!commentText.trim() || !editingComment) return;
        
        console.log(`Updating ${editingComment.isReply ? 'Reply' : 'Comment'} ${editingComment.id} to: ${commentText}`);
        
        // In a real app: Call API for PUT/PATCH request
        
        setEditingComment(null);
        setCommentText('');
    };

    const handleDelete = (id, isReply) => {
        if (window.confirm(`Are you sure you want to delete this ${isReply ? 'reply' : 'comment'}?`)) {
            console.log(`Deleting ${isReply ? 'Reply' : 'Comment'} ID: ${id}`);
            // In a real app: Call API for DELETE request
        }
    };
    
    const handleStartReply = (commentId, username) => {
        setReplyingTo({ commentId, username });
        setEditingComment(null); // Clear edit mode
        setCommentText(`@${username} `);
    };
    

    return (
        <div className="min-h-screen bg-gray-100 py-10">
            <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl p-6 sm:p-10"
            >
                {/* --- BLOG HEADER --- */}
                <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{blogData.title}</h1>
                <p className="text-sm text-gray-500 mb-6">
                    By <span className="font-semibold text-indigo-600">{blogData.author.name}</span> | Published: {new Date(blogData.createdAt).toLocaleDateString()}
                </p>

                {/* --- IMAGE --- */}
                {blogData.image && (
                    <img 
                        src={blogData.image} 
                        alt={blogData.title} 
                        className="w-full h-96 object-cover rounded-lg mb-8 shadow-md"
                    />
                )}

                {/* --- CONTENT --- */}
                <div className="prose max-w-none text-gray-700 mb-10 border-b pb-8">
                    <p className="whitespace-pre-line">{blogData.content}</p>
                </div>

                {/* --- ACTIONS & STATS --- */}
                <div className="flex items-center justify-between border-b pb-4 mb-8">
                    <div className="flex space-x-4 text-gray-600">
                        <div className="flex items-center space-x-1">
                            <button className="hover:text-blue-500 transition"><ThumbsUp className="w-5 h-5" /></button>
                            <span>{blogData.likeCount} Likes</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <button className="hover:text-red-500 transition"><ThumbsDown className="w-5 h-5" /></button>
                            <span>{blogData.disLikeCount} Dislikes</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <MessageSquare className="w-5 h-5" />
                            <span>{blogData.comments.length} Comments</span>
                        </div>
                    </div>
                    {/* Share Button Placeholder */}
                    <button className="text-sm font-semibold text-indigo-600 hover:text-indigo-800">Share</button>
                </div>

                {/* --- COMMENT SECTION --- */}
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                    <MessageSquare className="w-6 h-6 mr-2 text-indigo-500"/>
                    Comments ({blogData.comments.length})
                </h2>

                {/* Comment/Reply/Edit Form */}
                <motion.form 
                    onSubmit={editingComment ? handleUpdate : handleCommentSubmit} 
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    className="mb-8 p-4 bg-gray-50 rounded-lg shadow-inner"
                >
                    {replyingTo && (
                        <p className="text-sm text-indigo-600 mb-2">
                            Replying to: **{replyingTo.username}** <button type="button" onClick={() => setReplyingTo(null)} className="ml-2 text-red-500 hover:text-red-700">
                                (Cancel)
                            </button>
                        </p>
                    )}
                    {editingComment && (
                        <p className="text-sm text-blue-600 mb-2">
                            Editing {editingComment.isReply ? 'Reply' : 'Comment'} 
                            <button type="button" onClick={() => {setEditingComment(null); setCommentText('');}} className="ml-2 text-red-500 hover:text-red-700">
                                (Cancel Edit)
                            </button>
                        </p>
                    )}

                    <textarea
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        placeholder="Join the discussion..."
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition"
                        rows="3"
                        required
                    />
                    <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`mt-3 px-6 py-2 rounded-lg text-white font-semibold transition ${editingComment ? 'bg-blue-600 hover:bg-blue-700' : 'bg-indigo-600 hover:bg-indigo-700'}`}
                    >
                        {editingComment ? 'Save Changes' : replyingTo ? 'Post Reply' : 'Post Comment'}
                    </motion.button>
                </motion.form>


                {/* List of Comments */}
                <div className="space-y-4">
                    {blogData.comments.map(comment => (
                        <CommentCard 
                            key={comment._id} 
                            item={comment} 
                            currentUserId={currentUserId} 
                            onEdit={startEdit}
                            onDelete={handleDelete}
                            onReply={handleStartReply}
                        />
                    ))}
                </div>

            </motion.div>
        </div>
    );
}