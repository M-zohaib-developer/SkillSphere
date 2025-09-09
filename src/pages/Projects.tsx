import React, { useEffect, useMemo, useState } from "react";
import {
  Plus,
  Calendar,
  Edit,
  Trash2,
  Eye,
  Clock,
  Target,
  CheckCircle,
} from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import LoadingSpinner from "../components/LoadingSpinner";
import { loadProjects, saveProjects } from "../utils/storage";

interface Project {
  id: string;
  title: string;
  description: string;
  status: "in-progress" | "completed" | "paused";
  createdDate: string;
  dueDate?: string;
  thumbnail?: string;
  tags: string[];
  progress: number;
}

const Projects: React.FC = () => {
  const { theme } = useTheme();
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const demoProjects: Project[] = [
    {
      id: "1",
      title: "E-commerce Website",
      description:
        "A full-featured online store built with React and Node.js, featuring user authentication, payment processing, and inventory management.",
      status: "in-progress",
      createdDate: "2024-01-15",
      dueDate: "2024-03-15",
      thumbnail:
        "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=300",
      tags: ["React", "Node.js", "MongoDB"],
      progress: 75,
    },
    {
      id: "2",
      title: "Mobile App UI Design",
      description:
        "Complete UI/UX design for a fitness tracking mobile application with modern design principles.",
      status: "completed",
      createdDate: "2024-01-01",
      dueDate: "2024-02-01",
      thumbnail:
        "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=300",
      tags: ["Figma", "UI/UX", "Mobile"],
      progress: 100,
    },
    {
      id: "3",
      title: "Data Analysis Dashboard",
      description:
        "Interactive dashboard for analyzing sales data with charts, graphs, and real-time updates.",
      status: "paused",
      createdDate: "2023-12-20",
      dueDate: "2024-04-01",
      thumbnail:
        "https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=300",
      tags: ["Python", "Django", "Chart.js"],
      progress: 45,
    },
    {
      id: "4",
      title: "Portfolio Website",
      description:
        "Personal portfolio website showcasing my projects and skills with modern design and animations.",
      status: "completed",
      createdDate: "2023-11-15",
      thumbnail:
        "https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg?auto=compress&cs=tinysrgb&w=300",
      tags: ["HTML", "CSS", "JavaScript"],
      progress: 100,
    },
    {
      id: "5",
      title: "Machine Learning Model",
      description:
        "Predictive model for customer behavior analysis using various ML algorithms and techniques.",
      status: "in-progress",
      createdDate: "2024-02-01",
      dueDate: "2024-05-01",
      thumbnail:
        "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=300",
      tags: ["Python", "Scikit-learn", "Pandas"],
      progress: 30,
    },
  ];
  const stored = useMemo(() => loadProjects() as unknown as Project[], []);
  const initialProjects: Project[] = stored.length > 0 ? stored : demoProjects;
  const [projects, setProjects] = useState<Project[]>(initialProjects);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "in-progress" as Project["status"],
    dueDate: "",
    tags: "",
  });

  useEffect(() => {
    // Hide demos once user has their own projects
    const nonDemo = projects.filter(
      (p) => !["1", "2", "3", "4", "5"].includes(p.id)
    );
    const toSave = nonDemo.length > 0 ? nonDemo : projects;
    saveProjects(toSave as any);
  }, [projects]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const newProject: Project = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      status: formData.status,
      createdDate: new Date().toISOString().split("T")[0],
      dueDate: formData.dueDate || undefined,
      tags: formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag),
      progress: 0,
    };

    setProjects((prev) => [
      newProject,
      ...prev.filter((p) => !["1", "2", "3", "4", "5"].includes(p.id)),
    ]);
    setFormData({
      title: "",
      description: "",
      status: "in-progress",
      dueDate: "",
      tags: "",
    });
    setShowModal(false);
    setIsLoading(false);
  };

  const handleDelete = (id: string) => {
    setProjects((prev) => prev.filter((project) => project.id !== id));
  };

  const [viewProject, setViewProject] = useState<Project | null>(null);
  const [editProject, setEditProject] = useState<Project | null>(null);
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    status: "in-progress" as Project["status"],
    dueDate: "",
    tags: "",
  });

  const getStatusColor = (status: Project["status"]) => {
    switch (status) {
      case "completed":
        return "text-green-600 bg-green-100 dark:bg-green-900/20 dark:text-green-400";
      case "in-progress":
        return "text-blue-600 bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400";
      case "paused":
        return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-400";
      default:
        return "text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  const getStatusIcon = (status: Project["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4" />;
      case "in-progress":
        return <Clock className="h-4 w-4" />;
      case "paused":
        return <Target className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div
      className={`min-h-screen ${
        theme === "dark" ? "bg-gray-900" : "bg-gray-50"
      } transition-colors duration-200`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1
              className={`text-3xl font-bold ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              My Projects
            </h1>
            <p
              className={`mt-2 ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Manage and track your learning projects
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
          >
            <Plus className="h-5 w-5" />
            <span>New Project</span>
          </button>
        </div>

        {/* Project Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            {
              label: "Total Projects",
              value: projects.length,
              color: "text-blue-600",
            },
            {
              label: "Completed",
              value: projects.filter((p) => p.status === "completed").length,
              color: "text-green-600",
            },
            {
              label: "In Progress",
              value: projects.filter((p) => p.status === "in-progress").length,
              color: "text-yellow-600",
            },
          ].map((stat, index) => (
            <div
              key={index}
              className={`${
                theme === "dark"
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200"
              } p-6 rounded-lg shadow-sm border`}
            >
              <p
                className={`text-sm font-medium ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {stat.label}
              </p>
              <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className={`${
                theme === "dark"
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200"
              } rounded-lg shadow-sm border hover:shadow-lg transition-shadow duration-200`}
            >
              {/* Project Image */}
              {project.thumbnail && (
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <span
                      className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        project.status
                      )}`}
                    >
                      {getStatusIcon(project.status)}
                      <span>{project.status.replace("-", " ")}</span>
                    </span>
                  </div>
                </div>
              )}

              {/* Project Content */}
              <div className="p-6">
                <h3
                  className={`text-lg font-semibold mb-2 ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}
                >
                  {project.title}
                </h3>

                <p
                  className={`text-sm mb-4 line-clamp-3 ${
                    theme === "dark" ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {project.description}
                </p>

                {/* Progress Bar */}
                {project.progress > 0 && (
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span
                        className={`${
                          theme === "dark" ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        Progress
                      </span>
                      <span
                        className={`${
                          theme === "dark" ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        {project.progress}%
                      </span>
                    </div>
                    <div
                      className={`h-2 ${
                        theme === "dark" ? "bg-gray-600" : "bg-gray-200"
                      } rounded-full overflow-hidden`}
                    >
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, index) => (
                    <span
                      key={index}
                      className={`px-2 py-1 text-xs rounded-full ${
                        theme === "dark"
                          ? "bg-gray-700 text-gray-300"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Dates */}
                <div
                  className={`flex items-center justify-between text-sm mb-4 ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>
                      Created:{" "}
                      {new Date(project.createdDate).toLocaleDateString()}
                    </span>
                  </div>
                  {project.dueDate && (
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>
                        Due: {new Date(project.dueDate).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <button
                    onClick={() => setViewProject(project)}
                    className={`flex items-center space-x-1 px-3 py-2 text-sm rounded-md transition-colors duration-200 ${
                      theme === "dark"
                        ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    <Eye className="h-4 w-4" />
                    <span>View</span>
                  </button>
                  <button
                    onClick={() => {
                      setEditProject(project);
                      setEditForm({
                        title: project.title,
                        description: project.description,
                        status: project.status,
                        dueDate: project.dueDate || "",
                        tags: project.tags.join(", "),
                      });
                    }}
                    className={`flex items-center space-x-1 px-3 py-2 text-sm rounded-md transition-colors duration-200 ${
                      theme === "dark"
                        ? "bg-blue-900/20 text-blue-400 hover:bg-blue-900/30"
                        : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                    }`}
                  >
                    <Edit className="h-4 w-4" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className={`flex items-center space-x-1 px-3 py-2 text-sm rounded-md transition-colors duration-200 ${
                      theme === "dark"
                        ? "bg-red-900/20 text-red-400 hover:bg-red-900/30"
                        : "bg-red-100 text-red-700 hover:bg-red-200"
                    }`}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {projects.length === 0 && (
          <div className="text-center py-12">
            <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3
              className={`text-lg font-medium mb-2 ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              No projects yet
            </h3>
            <p
              className={`${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              } mb-6`}
            >
              Start your learning journey by creating your first project.
            </p>
            <button
              onClick={() => setShowModal(true)}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
            >
              Create Your First Project
            </button>
          </div>
        )}
      </div>

      {/* Add Project Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div
            className={`${
              theme === "dark" ? "bg-gray-800" : "bg-white"
            } rounded-lg p-6 w-full max-w-md`}
          >
            <h2
              className={`text-xl font-semibold mb-4 ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              Add New Project
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    theme === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Project Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, title: e.target.value }))
                  }
                  required
                  className={`w-full px-3 py-2 border ${
                    theme === "dark"
                      ? "border-gray-600 bg-gray-700 text-white placeholder-gray-400"
                      : "border-gray-300 bg-white text-gray-900 placeholder-gray-500"
                  } rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                  placeholder="Enter project title"
                />
              </div>

              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    theme === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  required
                  rows={3}
                  className={`w-full px-3 py-2 border ${
                    theme === "dark"
                      ? "border-gray-600 bg-gray-700 text-white placeholder-gray-400"
                      : "border-gray-300 bg-white text-gray-900 placeholder-gray-500"
                  } rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 resize-none`}
                  placeholder="Describe your project"
                />
              </div>

              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    theme === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      status: e.target.value as Project["status"],
                    }))
                  }
                  className={`w-full px-3 py-2 border ${
                    theme === "dark"
                      ? "border-gray-600 bg-gray-700 text-white"
                      : "border-gray-300 bg-white text-gray-900"
                  } rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                >
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="paused">Paused</option>
                </select>
              </div>

              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    theme === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Due Date (Optional)
                </label>
                <input
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      dueDate: e.target.value,
                    }))
                  }
                  className={`w-full px-3 py-2 border ${
                    theme === "dark"
                      ? "border-gray-600 bg-gray-700 text-white"
                      : "border-gray-300 bg-white text-gray-900"
                  } rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                />
              </div>

              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    theme === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, tags: e.target.value }))
                  }
                  className={`w-full px-3 py-2 border ${
                    theme === "dark"
                      ? "border-gray-600 bg-gray-700 text-white placeholder-gray-400"
                      : "border-gray-300 bg-white text-gray-900 placeholder-gray-500"
                  } rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                  placeholder="React, JavaScript, CSS"
                />
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 disabled:opacity-50"
                >
                  {isLoading ? (
                    <LoadingSpinner size="small" />
                  ) : (
                    <>
                      <Plus className="h-4 w-4" />
                      <span>Add Project</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className={`flex-1 px-4 py-2 border font-medium rounded-lg transition-colors duration-200 ${
                    theme === "dark"
                      ? "border-gray-600 text-gray-300 hover:bg-gray-700"
                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Modal */}
      {viewProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div
            className={`${
              theme === "dark" ? "bg-gray-800" : "bg-white"
            } rounded-lg p-6 w-full max-w-lg`}
          >
            <h2
              className={`text-xl font-semibold mb-4 ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              {viewProject.title}
            </h2>
            <p
              className={`${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              } mb-4`}
            >
              {viewProject.description}
            </p>
            <div className="flex items-center justify-between text-sm mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}">
              <span>Status: {viewProject.status}</span>
              <span>
                Created:{" "}
                {new Date(viewProject.createdDate).toLocaleDateString()}
              </span>
              {viewProject.dueDate && (
                <span>
                  Due: {new Date(viewProject.dueDate).toLocaleDateString()}
                </span>
              )}
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {viewProject.tags.map((tag, i) => (
                <span
                  key={i}
                  className={`${
                    theme === "dark"
                      ? "bg-gray-700 text-gray-300"
                      : "bg-gray-100 text-gray-600"
                  } px-2 py-1 text-xs rounded-full`}
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="text-right">
              <button
                onClick={() => setViewProject(null)}
                className={`px-4 py-2 border rounded-md ${
                  theme === "dark"
                    ? "border-gray-600 text-gray-300 hover:bg-gray-700"
                    : "border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div
            className={`${
              theme === "dark" ? "bg-gray-800" : "bg-white"
            } rounded-lg p-6 w-full max-w-md`}
          >
            <h2
              className={`text-xl font-semibold mb-4 ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              Edit Project
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const updated: Project = {
                  ...editProject,
                  title: editForm.title,
                  description: editForm.description,
                  status: editForm.status,
                  dueDate: editForm.dueDate || undefined,
                  tags: editForm.tags
                    .split(",")
                    .map((t) => t.trim())
                    .filter(Boolean),
                };
                setProjects((prev) =>
                  prev.map((p) => (p.id === updated.id ? updated : p))
                );
                setEditProject(null);
              }}
              className="space-y-4"
            >
              <input
                value={editForm.title}
                onChange={(e) =>
                  setEditForm((prev) => ({ ...prev, title: e.target.value }))
                }
                className={`w-full px-3 py-2 border ${
                  theme === "dark"
                    ? "border-gray-600 bg-gray-700 text-white"
                    : "border-gray-300 bg-white text-gray-900"
                } rounded-md`}
              />
              <textarea
                value={editForm.description}
                onChange={(e) =>
                  setEditForm((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                rows={3}
                className={`w-full px-3 py-2 border ${
                  theme === "dark"
                    ? "border-gray-600 bg-gray-700 text-white"
                    : "border-gray-300 bg-white text-gray-900"
                } rounded-md`}
              />
              <select
                value={editForm.status}
                onChange={(e) =>
                  setEditForm((prev) => ({
                    ...prev,
                    status: e.target.value as Project["status"],
                  }))
                }
                className={`w-full px-3 py-2 border ${
                  theme === "dark"
                    ? "border-gray-600 bg-gray-700 text-white"
                    : "border-gray-300 bg-white text-gray-900"
                } rounded-md`}
              >
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="paused">Paused</option>
              </select>
              <input
                type="date"
                value={editForm.dueDate}
                onChange={(e) =>
                  setEditForm((prev) => ({ ...prev, dueDate: e.target.value }))
                }
                className={`w-full px-3 py-2 border ${
                  theme === "dark"
                    ? "border-gray-600 bg-gray-700 text-white"
                    : "border-gray-300 bg-white text-gray-900"
                } rounded-md`}
              />
              <input
                value={editForm.tags}
                onChange={(e) =>
                  setEditForm((prev) => ({ ...prev, tags: e.target.value }))
                }
                placeholder="tags, comma, separated"
                className={`w-full px-3 py-2 border ${
                  theme === "dark"
                    ? "border-gray-600 bg-gray-700 text-white"
                    : "border-gray-300 bg-white text-gray-900"
                } rounded-md`}
              />
              <div className="flex space-x-3 pt-2">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setEditProject(null)}
                  className={`px-4 py-2 border rounded-md ${
                    theme === "dark"
                      ? "border-gray-600 text-gray-300 hover:bg-gray-700"
                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
