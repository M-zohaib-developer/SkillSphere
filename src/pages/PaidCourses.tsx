import React, { useMemo, useState } from "react";
import {
  ExternalLink,
  Search,
  Filter,
  Clock,
  Layers,
  Globe,
} from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import {
  enrollCourse,
  addCertification,
  PaidCourse,
} from "../utils/storage";

interface Course extends PaidCourse {
  price: string;
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
  "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg",
  "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg",
  "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg",
  "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg",
  "https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg",
  "https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg",
];

function generatePaidCourses(): Course[] {
  const titles = [
    "Complete React Developer",
    "Advanced Node.js",
    "Data Science Bootcamp",
    "Digital Marketing Mastery",
    "UI/UX Professional",
    "Cloud Architect Path",
    "DevOps from Zero to Hero",
    "AI Engineer Path",
  ];
  const links = [
    "https://www.udemy.com",
    "https://www.coursera.org",
    "https://www.edx.org",
    "https://www.pluralsight.com",
  ];
  const items: Course[] = [];
  for (let i = 0; i < 24; i++) {
    const duration = 10 + (i % 10) * 3;
    items.push({
      id: `paid-${i + 1}`,
      title: titles[i % titles.length],
      instructor: "Top Instructor",
      category: categories[i % categories.length],
      language: i % 3 === 0 ? "Hindi" : "English",
      durationHours: duration,
      image:
        sampleImages[i % sampleImages.length] +
        "?auto=compress&cs=tinysrgb&w=600",
      link: links[i % links.length],
      price: `$${49 + (i % 6) * 10}`,
    });
  }
  return items;
}

const PaidCourses: React.FC = () => {
  const { theme } = useTheme();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<"All" | string>("All");
  const [language, setLanguage] = useState<"All" | "English" | "Hindi">("All");

  const allCourses = useMemo(() => generatePaidCourses(), []);

  // 🔹 Track enrolled courses from localStorage
  const [enrolledIds, setEnrolledIds] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem("enrolledCourses");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const filtered = allCourses.filter((c) => {
    const s = search.trim().toLowerCase();
    const matchesSearch =
      !s ||
      c.title.toLowerCase().includes(s) ||
      (c.instructor || "").toLowerCase().includes(s) ||
      (c.category || "").toLowerCase().includes(s);
    const matchesCategory = category === "All" || c.category === category;
    const matchesLanguage = language === "All" || c.language === language;
    return matchesSearch && matchesCategory && matchesLanguage;
  });

  const handleEnroll = (course: Course) => {
    if (enrolledIds.includes(course.id)) return; // already enrolled
  
    // ✅ Prevent enrolling more than 4 courses
    if (enrolledIds.length >= 4) {
      alert("⚠️ You can only enroll in up to 4 courses.");
      return;
    }
  
    const confirmed = window.confirm(
      "Are you sure you want to enroll in this course?"
    );
    if (!confirmed) return;
  
    enrollCourse(course);
  
    const updated = [...enrolledIds, course.id];
    setEnrolledIds(updated);
    localStorage.setItem("enrolledCourses", JSON.stringify(updated));
  };
    
  const askCertification = () => {
    const confirmed = window.confirm("Do you want to certify this course?");
    if (confirmed) addCertification(1);
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
            Paid Courses
          </h1>
          <p
            className={`${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            High-quality courses from the best teachers worldwide (English &
            Hindi)
          </p>
        </div>

        {/* 🔍 Filter section */}
        <div
          className={`${
            theme === "dark"
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          } rounded-lg shadow-sm border p-6 mb-8`}
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            {/* Search Box */}
            <div className="md:col-span-2">
              <label
                className={`block mb-2 text-sm font-medium ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Search
              </label>
              <div className="relative">
                <Search
                  className={`absolute left-3 top-3 h-5 w-5 text-gray-400`}
                />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search paid courses..."
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
                className={`flex items-center space-x-2 mb-2 text-sm font-medium ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}
              >
                <Filter className="h-4 w-4" />
                <span>Category</span>
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
                className={`flex items-center space-x-2 mb-2 text-sm font-medium ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}
              >
                <Globe className="h-4 w-4" />
                <span>Language</span>
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as any)}
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

        {/* 📚 Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((course) => {
            const isEnrolled = enrolledIds.includes(course.id);
            return (
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
                  <div className="absolute top-2 left-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        theme === "dark"
                          ? "bg-blue-900/30 text-blue-300"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      Paid
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
                    by {course.instructor}
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
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`text-2xl font-bold ${
                        theme === "dark" ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {course.price}
                    </span>
                    <button
                      onClick={() => handleEnroll(course)}
                      disabled={isEnrolled}
                      className={`px-4 py-2 font-medium rounded-md transition-colors duration-200 ${
                        isEnrolled
                          ? "bg-gray-400 text-white cursor-not-allowed"
                          : "bg-blue-600 hover:bg-blue-700 text-white"
                      }`}
                    >
                      {isEnrolled ? "Enrolled" : "Enroll"}
                    </button>
                  </div>
                  <button
                    onClick={askCertification}
                    className={`w-full inline-flex items-center justify-center px-3 py-2 border rounded-md text-sm ${
                      theme === "dark"
                        ? "border-gray-600 text-gray-300 hover:bg-gray-700"
                        : "border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    I finished, certify this
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PaidCourses;
