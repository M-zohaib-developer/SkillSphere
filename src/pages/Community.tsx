import React, { useState } from "react";
import {
  Heart,
  MessageCircle,
  Share,
  Send,
  User,
  Clock,
  ThumbsUp,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";

interface Post {
  id: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  content: string;
  timestamp: string;
  likes: number;
  comments: Comment[];
  isLiked: boolean;
}

interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: string;
}

const Community: React.FC = () => {
  const { user } = useAuth();
  const { theme } = useTheme();
  const [newPost, setNewPost] = useState("");
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [pollOptions, setPollOptions] = useState<string[]>([]);
  const [pollVotes, setPollVotes] = useState<{ [key: string]: number }>({});
  const [newComment, setNewComment] = useState<{ [key: string]: string }>({});
  const [posts, setPosts] = useState<Post[]>([
    {
      id: "1",
      author: {
        name: "Sarah Chen",
        avatar:
          "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150",
        role: "React Instructor",
      },
      content:
        "Just finished updating my React course with the latest hooks patterns! 🚀 The new useCallback optimization techniques are game-changing. Who else has been experimenting with these patterns?",
      timestamp: "2 hours ago",
      likes: 24,
      comments: [
        {
          id: "1",
          author: "Mike Johnson",
          content:
            "Love the new patterns! The performance improvements are incredible.",
          timestamp: "1 hour ago",
        },
        {
          id: "2",
          author: "Emily Rodriguez",
          content:
            "Thanks for sharing! Can't wait to implement these in my projects.",
          timestamp: "45 minutes ago",
        },
      ],
      isLiked: true,
    },
    {
      id: "2",
      author: {
        name: "Alex Thompson",
        avatar:
          "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150",
        role: "Digital Marketing Expert",
      },
      content:
        "Hot take: The future of digital marketing is in personalization and AI-driven content. Traditional mass marketing is becoming less effective every day. What are your thoughts on this trend?",
      timestamp: "4 hours ago",
      likes: 18,
      comments: [
        {
          id: "3",
          author: "Lisa Chen",
          content: "Absolutely agree! Personalization is key to engagement.",
          timestamp: "3 hours ago",
        },
      ],
      isLiked: false,
    },
    {
      id: "3",
      author: {
        name: "Dr. Emily Rodriguez",
        avatar:
          "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150",
        role: "Data Science Professor",
      },
      content:
        "Exciting news! Just published a new research paper on machine learning interpretability. The techniques we've developed can help make ML models more transparent and trustworthy. Link in bio! 📊",
      timestamp: "6 hours ago",
      likes: 42,
      comments: [
        {
          id: "4",
          author: "James Wilson",
          content:
            "This is groundbreaking work! Can't wait to read the full paper.",
          timestamp: "5 hours ago",
        },
        {
          id: "5",
          author: "Rachel Martinez",
          content:
            "Amazing research! This addresses a huge problem in the industry.",
          timestamp: "4 hours ago",
        },
      ],
      isLiked: true,
    },
    {
      id: "4",
      author: {
        name: "Mike Johnson",
        avatar:
          "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150",
        role: "UI/UX Designer",
      },
      content:
        "Design tip of the day: White space is not wasted space! It helps create visual hierarchy, improves readability, and makes your designs feel more premium. Less is often more in design. ✨",
      timestamp: "8 hours ago",
      likes: 31,
      comments: [
        {
          id: "6",
          author: "David Kim",
          content:
            "So true! White space is one of the most underutilized design elements.",
          timestamp: "7 hours ago",
        },
      ],
      isLiked: false,
    },
    {
      id: "5",
      author: {
        name: "James Wilson",
        avatar:
          "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150",
        role: "Full-Stack Developer",
      },
      content:
        "Just deployed my first application using serverless architecture! The scalability and cost-effectiveness are impressive. Sharing my journey and lessons learned in a detailed blog post coming soon. 🚀",
      timestamp: "1 day ago",
      likes: 27,
      comments: [
        {
          id: "7",
          author: "Sarah Chen",
          content: "Serverless is amazing! Looking forward to your blog post.",
          timestamp: "1 day ago",
        },
      ],
      isLiked: true,
    },
  ]);

  const handleLike = (postId: string) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            }
          : post
      )
    );
  };

  const handleAddPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    const post: Post = {
      id: Date.now().toString(),
      author: {
        name: user?.name || "Anonymous",
        avatar:
          "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150",
        role: "Learner",
      },
      content:
        newPost +
        (photoUrl ? `\n[photo](${photoUrl})` : "") +
        (videoUrl ? `\n[video](${videoUrl})` : "") +
        (pollOptions.length ? `\n[poll:${pollOptions.join("|")}]` : ""),
      timestamp: "Just now",
      likes: 0,
      comments: [],
      isLiked: false,
    };

    setPosts((prev) => [post, ...prev]);
    setNewPost("");
    setPhotoUrl(null);
    setVideoUrl(null);
    setPollOptions([]);
  };

  const handleAddComment = (postId: string) => {
    const commentContent = newComment[postId];
    if (!commentContent?.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      author: user?.name || "Anonymous",
      content: commentContent,
      timestamp: "Just now",
    };

    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? { ...post, comments: [...post.comments, comment] }
          : post
      )
    );

    setNewComment((prev) => ({ ...prev, [postId]: "" }));
  };

  return (
    <div
      className={`min-h-screen ${
        theme === "dark" ? "bg-gray-900" : "bg-gray-50"
      } transition-colors duration-200`}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1
            className={`text-3xl font-bold ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            Community Feed
          </h1>
          <p
            className={`mt-2 ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Connect, share, and learn together with fellow learners
          </p>
        </div>

        {/* Create Post */}
        <div
          className={`${
            theme === "dark"
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          } rounded-lg shadow-sm border p-6 mb-8`}
        >
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </div>
            <form onSubmit={handleAddPost} className="flex-1">
              <textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="Share your thoughts, ask questions, or celebrate your achievements..."
                rows={3}
                className={`w-full px-4 py-3 border ${
                  theme === "dark"
                    ? "border-gray-600 bg-gray-700 text-white placeholder-gray-400"
                    : "border-gray-300 bg-gray-50 text-gray-900 placeholder-gray-500"
                } rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 resize-none transition-colors duration-200`}
              />
              <div className="flex justify-between items-center mt-4">
                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => {
                      const url = prompt("Paste image URL");
                      if (url) setPhotoUrl(url);
                    }}
                    className={`text-sm ${
                      theme === "dark"
                        ? "text-gray-400 hover:text-gray-300"
                        : "text-gray-500 hover:text-gray-700"
                    } transition-colors duration-200`}
                  >
                    📷 Photo
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const url = prompt("Paste video URL (YouTube, etc.)");
                      if (url) setVideoUrl(url);
                    }}
                    className={`text-sm ${
                      theme === "dark"
                        ? "text-gray-400 hover:text-gray-300"
                        : "text-gray-500 hover:text-gray-700"
                    } transition-colors duration-200`}
                  >
                    📹 Video
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const raw = prompt(
                        "Enter poll options separated by commas"
                      );
                      if (!raw) return;
                      const opts = raw
                        .split(",")
                        .map((o) => o.trim())
                        .filter(Boolean);
                      setPollOptions(opts);
                      setPollVotes(Object.fromEntries(opts.map((o) => [o, 0])));
                    }}
                    className={`text-sm ${
                      theme === "dark"
                        ? "text-gray-400 hover:text-gray-300"
                        : "text-gray-500 hover:text-gray-700"
                    } transition-colors duration-200`}
                  >
                    💭 Poll
                  </button>
                </div>
                <button
                  type="submit"
                  disabled={!newPost.trim()}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Post
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Posts */}
        <div className="space-y-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className={`${
                theme === "dark"
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200"
              } rounded-lg shadow-sm border p-6`}
            >
              {/* Post Header */}
              <div className="flex items-start space-x-4 mb-4">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h3
                      className={`font-semibold ${
                        theme === "dark" ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {post.author.name}
                    </h3>
                    <span
                      className={`text-sm px-2 py-1 rounded-full ${
                        theme === "dark"
                          ? "bg-blue-900/20 text-blue-400"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {post.author.role}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Clock className="h-4 w-4" />
                    <span>{post.timestamp}</span>
                  </div>
                </div>
              </div>

              {/* Post Content */}
              <div className="mb-4 space-y-3">
                {post.content.split("\n").map((line, idx) => {
                  const photoMatch = line.match(/\[photo\]\((.*)\)/);
                  const videoMatch = line.match(/\[video\]\((.*)\)/);
                  const pollMatch = line.match(/\[poll:([^\]]+)\]/);
                  if (photoMatch)
                    return (
                      <img
                        key={idx}
                        src={photoMatch[1]}
                        alt="attachment"
                        className="rounded-lg max-h-72 object-cover"
                      />
                    );
                  if (videoMatch)
                    return (
                      <a
                        key={idx}
                        href={videoMatch[1]}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        Watch video
                      </a>
                    );
                  if (pollMatch) {
                    const opts = pollMatch[1].split("|");
                    return (
                      <div
                        key={idx}
                        className={`${
                          theme === "dark" ? "bg-gray-700" : "bg-gray-100"
                        } p-3 rounded-lg`}
                      >
                        <p
                          className={`text-sm mb-2 ${
                            theme === "dark" ? "text-white" : "text-gray-900"
                          }`}
                        >
                          Poll
                        </p>
                        <div className="space-y-2">
                          {opts.map((opt) => (
                            <button
                              key={opt}
                              onClick={() =>
                                setPollVotes((prev) => ({
                                  ...prev,
                                  [opt]: (prev[opt] || 0) + 1,
                                }))
                              }
                              className={`w-full text-left px-3 py-2 rounded-md ${
                                theme === "dark"
                                  ? "bg-gray-800 hover:bg-gray-600 text-gray-200"
                                  : "bg-white hover:bg-gray-50 text-gray-800"
                              } border ${
                                theme === "dark"
                                  ? "border-gray-600"
                                  : "border-gray-300"
                              }`}
                            >
                              {opt}
                              <span className="float-right text-xs text-gray-500">
                                {pollVotes[opt] || 0} votes
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  }
                  return (
                    <p
                      key={idx}
                      className={`${
                        theme === "dark" ? "text-gray-300" : "text-gray-700"
                      } leading-relaxed`}
                    >
                      {line}
                    </p>
                  );
                })}
              </div>

              {/* Post Actions */}
              <div className="flex items-center space-x-6 pb-4 border-b border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => handleLike(post.id)}
                  className={`flex items-center space-x-2 text-sm font-medium transition-colors duration-200 ${
                    post.isLiked
                      ? "text-red-600 hover:text-red-700"
                      : theme === "dark"
                      ? "text-gray-400 hover:text-red-500"
                      : "text-gray-500 hover:text-red-600"
                  }`}
                >
                  <Heart
                    className={`h-5 w-5 ${post.isLiked ? "fill-current" : ""}`}
                  />
                  <span>{post.likes}</span>
                </button>

                <button
                  className={`flex items-center space-x-2 text-sm font-medium transition-colors duration-200 ${
                    theme === "dark"
                      ? "text-gray-400 hover:text-blue-400"
                      : "text-gray-500 hover:text-blue-600"
                  }`}
                >
                  <MessageCircle className="h-5 w-5" />
                  <span>{post.comments.length}</span>
                </button>

                <button
                  className={`flex items-center space-x-2 text-sm font-medium transition-colors duration-200 ${
                    theme === "dark"
                      ? "text-gray-400 hover:text-green-400"
                      : "text-gray-500 hover:text-green-600"
                  }`}
                >
                  <Share className="h-5 w-5" />
                  <span>Share</span>
                </button>
              </div>

              {/* Comments */}
              {post.comments.length > 0 && (
                <div className="mt-4 space-y-3">
                  {post.comments.map((comment) => (
                    <div
                      key={comment.id}
                      className="flex items-start space-x-3"
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-500 to-gray-600 flex items-center justify-center text-white text-sm font-semibold">
                        {comment.author.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1">
                        <div
                          className={`${
                            theme === "dark"
                              ? "bg-gray-700 border-gray-600"
                              : "bg-gray-50 border-gray-200"
                          } rounded-lg p-3 border`}
                        >
                          <div className="flex items-center space-x-2 mb-1">
                            <span
                              className={`text-sm font-medium ${
                                theme === "dark"
                                  ? "text-white"
                                  : "text-gray-900"
                              }`}
                            >
                              {comment.author}
                            </span>
                            <span className="text-xs text-gray-500">
                              {comment.timestamp}
                            </span>
                          </div>
                          <p
                            className={`text-sm ${
                              theme === "dark"
                                ? "text-gray-300"
                                : "text-gray-700"
                            }`}
                          >
                            {comment.content}
                          </p>
                        </div>
                        <button
                          className={`text-xs mt-1 ${
                            theme === "dark"
                              ? "text-gray-400 hover:text-blue-400"
                              : "text-gray-500 hover:text-blue-600"
                          } transition-colors duration-200`}
                        >
                          Reply
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Add Comment */}
              <div className="mt-4 flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-semibold">
                  {user?.name?.charAt(0).toUpperCase() || "U"}
                </div>
                <div className="flex-1 flex space-x-2">
                  <input
                    type="text"
                    value={newComment[post.id] || ""}
                    onChange={(e) =>
                      setNewComment((prev) => ({
                        ...prev,
                        [post.id]: e.target.value,
                      }))
                    }
                    placeholder="Write a comment..."
                    className={`flex-1 px-4 py-2 border ${
                      theme === "dark"
                        ? "border-gray-600 bg-gray-700 text-white placeholder-gray-400"
                        : "border-gray-300 bg-gray-50 text-gray-900 placeholder-gray-500"
                    } rounded-full focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200`}
                  />
                  <button
                    onClick={() => handleAddComment(post.id)}
                    disabled={!newComment[post.id]?.trim()}
                    className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <button
            className={`px-6 py-3 border font-medium rounded-lg transition-colors duration-200 ${
              theme === "dark"
                ? "border-gray-600 text-gray-300 hover:bg-gray-700"
                : "border-gray-300 text-gray-700 hover:bg-gray-50"
            }`}
          >
            Load More Posts
          </button>
        </div>
      </div>
    </div>
  );
};

export default Community;
