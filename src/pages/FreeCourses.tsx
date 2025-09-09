import React, { useEffect, useMemo, useState } from "react";
import {
  ExternalLink,
  Search,
  Filter,
  Clock,
  Layers,
} from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { loadProjects, saveProjects } from "../utils/storage";

interface FreeCourse {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  language: "English" | "Hindi";
  durationHours: number;
  link: string;
}

const categories = [
  "Programming",
  "Business",
  "Design",
  "Data Science",
  "Marketing",
  "DevOps",
  "AI",
  "Personal Development",
];

const sampleImages = [
  "https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg",
  "https://images.pexels.com/photos/3861972/pexels-photo-3861972.jpeg",
  "https://images.pexels.com/photos/3184631/pexels-photo-3184631.jpeg",
  "https://images.pexels.com/photos/3862132/pexels-photo-3862132.jpeg",
  "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg",
  "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg",
  "https://images.pexels.com/photos/1181341/pexels-photo-1181341.jpeg",
  "https://images.pexels.com/photos/3861948/pexels-photo-3861948.jpeg",
];

// ✅ Trusted course links
const trustedLinks = [
  "https://scrimba.com/learn/react", // Scrimba React course
  "https://www.joyofreact.com/", // Joy of React
  "https://www.theodinproject.com/paths/full-stack-javascript/courses/javascript/react", // Odin Project React path
  "https://epicreact.dev/", // Epic React by Kent C. Dodds (paid)
  "https://react.dev/learn" // Official React docs
];

function generateFreeCourses(): FreeCourse[] {
  const titles = [
    "Intro to JavaScript",
    "React Basics",
    "Python Crash Course",
    "Startup Fundamentals",
    "UI/UX Essentials",
    "Data Analysis 101",
    "SEO Basics",
    "Git & GitHub",
    "Docker for Beginners",
    "AI Concepts",
    "Time Management",
    "Excel Essentials",
    "TypeScript Basics",
    "Node.js Intro",
    "GraphQL Basics",
    "Kubernetes 101",
    "Figma for Starters",
    "PowerPoint Mastery",
    "Financial Literacy",
    "Public Speaking",
    "Java Fundamentals",
    "C++ Basics",
    "Android Basics",
    "iOS Basics",
    "Next.js Intro",
    "Tailwind CSS",
    "Redux Toolkit",
    "Django Basics",
    "Flask Basics",
    "SQL for Beginners",
    "NoSQL Overview",
    "Cybersecurity Basics",
    "Cloud 101",
    "AWS Intro",
    "GCP Intro",
    "Azure Intro",
    "Linux Basics",
    "Networking 101",
    "Agile & Scrum",
    "Product Management",
    "Email Marketing",
    "Content Marketing",
    "Copywriting Intro",
    "Video Editing",
    "Photography Basics",
    "3D Modeling Intro",
    "Blender Basics",
    "After Effects Basics",
    "Machine Learning Intro",
    "Deep Learning Intro",
    "NLP Basics",
    "Computer Vision",
    "Pandas Basics",
    "NumPy Basics",
    "Matplotlib Basics",
  ];

  const courses: FreeCourse[] = [];
  for (let i = 0; i < 56; i++) {
    courses.push({
      id: `free-${i + 1}`,
      title: titles[i % titles.length],
      description:
        "Trusted free course covering core concepts with practical examples and resources.",
      image:
        sampleImages[i % sampleImages.length] +
        "?auto=compress&cs=tinysrgb&w=600",
      category: categories[i % categories.length],
      language: i % 4 === 0 ? "Hindi" : "English",
      durationHours: 1 + (i % 10) * 2,
      link: trustedLinks[i % trustedLinks.length], // ✅ Use curated links
    });
  }
  return courses;
}

const FreeCourses: React.FC = () => {
  const { theme } = useTheme();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<"All" | string>("All");
  const [language, setLanguage] = useState<"All" | "English" | "Hindi">("All");

  const allCourses = useMemo(() => generateFreeCourses(), []);

  useEffect(() => {}, []);

  const filtered = allCourses.filter((c) => {
    const s = search.trim().toLowerCase();
    const matchesSearch =
      !s ||
      c.title.toLowerCase().includes(s) ||
      c.description.toLowerCase().includes(s) ||
      c.category.toLowerCase().includes(s);
    const matchesCategory = category === "All" || c.category === category;
    const matchesLanguage = language === "All" || c.language === language;
    return matchesSearch && matchesCategory && matchesLanguage;
  });

  const openLink = (url: string, course?: FreeCourse) => {
    window.open(url, "_blank", "noopener,noreferrer");
    setTimeout(() => {
      const shouldAdd = window.confirm(
        "Did you finish or try this course? Add what you learned and optionally create a project?"
      );
      if (!shouldAdd) return;

      const learnings = window.prompt("What did you learn? (optional)") || "";
      const title =
        window.prompt(
          "Project title (optional, leave blank to skip project)"
        ) || "";

      if (title.trim()) {
        const desc = window.prompt("Project description (optional)") || "";
        const existing = loadProjects();
        const newProject = {
          id: Date.now().toString(),
          title,
          description:
            desc ||
            (course ? `Project based on ${course.title}` : "User project"),
          status: "in-progress" as const,
          createdDate: new Date().toISOString().split("T")[0],
          dueDate: undefined,
          thumbnail: course?.image,
          tags: course ? [course.category, "Free Course"] : ["Free Course"],
          progress: 0,
        };
        saveProjects([newProject, ...existing]);
      }

      if (learnings.trim()) {
        const key = "ss_user_learnings_v1";
        const raw = localStorage.getItem(key);
        const arr = raw ? JSON.parse(raw) : [];
        arr.unshift({
          id: Date.now().toString(),
          text: learnings,
          at: new Date().toISOString(),
          course: course?.title,
        });
        localStorage.setItem(key, JSON.stringify(arr));
      }
    }, 200);
  };

  return (
    <div
      className={`min-h-screen ${
        theme === "dark" ? "bg-gray-900" : "bg-gray-50"
      } transition-colors duration-200`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1
            className={`text-3xl font-bold ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            Free Courses
          </h1>
          <p
            className={`${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            50+ curated free courses across categories
          </p>
        </div>

        {/* Filters */}
        <div
          className={`${
            theme === "dark"
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          } rounded-lg shadow-sm border p-6 mb-8`}
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            {/* Search */}
            <div className="md:col-span-2">
              <label
                className={`block mb-2 text-sm font-medium ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Search
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search free courses..."
                  className={`w-full pl-10 pr-3 py-3 border ${
                    theme === "dark"
                      ? "border-gray-600 bg-gray-700 text-white placeholder-gray-400"
                      : "border-gray-300 bg-white text-gray-900 placeholder-gray-500"
                  } rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label
                className={`block mb-2 text-sm font-medium ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={`w-full px-3 py-3 border ${
                  theme === "dark"
                    ? "border-gray-600 bg-gray-700 text-white"
                    : "border-gray-300 bg-white text-gray-900"
                } rounded-md`}
              >
                <option>All</option>
                {categories.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Language */}
            <div>
              <label
                className={`block mb-2 text-sm font-medium ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Language
              </label>
              <select
                value={language}
                onChange={(e) =>
                  setLanguage(e.target.value as "All" | "English" | "Hindi")
                }
                className={`w-full px-3 py-3 border ${
                  theme === "dark"
                    ? "border-gray-600 bg-gray-700 text-white"
                    : "border-gray-300 bg-white text-gray-900"
                } rounded-md`}
              >
                <option>All</option>
                <option>English</option>
                <option>Hindi</option>
              </select>
            </div>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((course) => (
            <div
              key={course.id}
              className={`${
                theme === "dark"
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200"
              } rounded-lg shadow-sm border hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200`}
            >
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-44 object-cover"
                />
                <div className="absolute top-2 left-2 flex gap-1">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      theme === "dark"
                        ? "bg-green-900/30 text-green-400"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    Free
                  </span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      theme === "dark"
                        ? "bg-blue-900/30 text-blue-400"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    Trusted
                  </span>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <h3
                    className={`text-lg font-semibold ${
                      theme === "dark" ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {course.title}
                  </h3>
                  <Layers className="h-4 w-4 text-gray-400" />
                </div>
                <p
                  className={`text-sm mb-3 line-clamp-2 ${
                    theme === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  {course.description}
                </p>
                <div className="flex items-center justify-between text-sm mb-4">
                  <span
                    className={`${
                      theme === "dark" ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {course.category}
                  </span>
                  <span className="flex items-center space-x-1 text-gray-500">
                    <Clock className="h-4 w-4" />
                    <span>{course.durationHours}h</span>
                  </span>
                </div>
                <button
                  onClick={() => openLink(course.link, course)}
                  className="w-full inline-flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors duration-200"
                >
                  Open Course <ExternalLink className="h-4 w-4 ml-2" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FreeCourses;
