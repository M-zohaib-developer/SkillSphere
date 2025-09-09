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

const courseImages: Record<string, string> = {
    "Intro to JavaScript": "https://almablog-media.s3.ap-south-1.amazonaws.com/Java_Script_Tutorial_d9e80eb94b.png",
    "React Basics": "https://images.pexels.com/photos/3184631/pexels-photo-3184631.jpeg",
    "Python Crash Course": "https://images.pexels.com/photos/3862132/pexels-photo-3862132.jpeg",
    "Startup Fundamentals": "https://images.pexels.com/photos/3861948/pexels-photo-3861948.jpeg",
    "UI/UX Essentials": "https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg",
    "Data Analysis 101": "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg",
    "SEO Basics": "https://images.pexels.com/photos/4458423/pexels-photo-4458423.jpeg",
    "Git & GitHub": "https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg",
    "Docker for Beginners": "https://images.pexels.com/photos/14206804/pexels-photo-14206804.jpeg",
    "AI Concepts": "https://images.pexels.com/photos/5473955/pexels-photo-5473955.jpeg",
    "Time Management": "https://images.pexels.com/photos/393008/pexels-photo-393008.jpeg",
    "Excel Essentials": "https://images.pexels.com/photos/669622/pexels-photo-669622.jpeg",
    "TypeScript Basics": "https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg",
    "Node.js Intro": "https://images.pexels.com/photos/540518/pexels-photo-540518.jpeg",
    "GraphQL Basics": "https://images.pexels.com/photos/5380664/pexels-photo-5380664.jpeg",
    "Kubernetes 101": "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg",
    "Figma for Starters": "https://images.pexels.com/photos/4348404/pexels-photo-4348404.jpeg",
    "PowerPoint Mastery": "https://images.pexels.com/photos/1181353/pexels-photo-1181353.jpeg",
    "Financial Literacy": "https://images.pexels.com/photos/4386370/pexels-photo-4386370.jpeg",
    "Public Speaking": "https://images.pexels.com/photos/1181391/pexels-photo-1181391.jpeg",
    "Java Fundamentals": "https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg",
    "C++ Basics": "https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg",
    "Android Basics": "https://images.pexels.com/photos/1181472/pexels-photo-1181472.jpeg",
    "iOS Basics": "https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg",
    "Next.js Intro": "https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg",
    "Tailwind CSS": "https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg",
    "Redux Toolkit": "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg",
    "Django Basics": "https://images.pexels.com/photos/574070/pexels-photo-574070.jpeg",
    "Flask Basics": "https://images.pexels.com/photos/3861979/pexels-photo-3861979.jpeg",
    "SQL for Beginners": "https://images.pexels.com/photos/669610/pexels-photo-669610.jpeg",
    "NoSQL Overview": "https://images.pexels.com/photos/1181313/pexels-photo-1181313.jpeg",
    "Cybersecurity Basics": "https://images.pexels.com/photos/5380658/pexels-photo-5380658.jpeg",
    "Cloud 101": "https://images.pexels.com/photos/1181216/pexels-photo-1181216.jpeg",
    "AWS Intro": "https://images.pexels.com/photos/507704/pexels-photo-507704.jpeg",
    "GCP Intro": "https://images.pexels.com/photos/3861950/pexels-photo-3861950.jpeg",
    "Azure Intro": "https://images.pexels.com/photos/1181253/pexels-photo-1181253.jpeg",
    "Linux Basics": "https://images.pexels.com/photos/574073/pexels-photo-574073.jpeg",
    "Networking 101": "https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg",
    "Agile & Scrum": "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg",
    "Product Management": "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg",
    "Email Marketing": "https://images.pexels.com/photos/1591060/pexels-photo-1591060.jpeg",
    "Content Marketing": "https://images.pexels.com/photos/3184460/pexels-photo-3184460.jpeg",
    "Copywriting Intro": "https://images.pexels.com/photos/3184464/pexels-photo-3184464.jpeg",
    "Video Editing": "https://images.pexels.com/photos/3206174/pexels-photo-3206174.jpeg",
    "Photography Basics": "https://images.pexels.com/photos/274973/pexels-photo-274973.jpeg",
    "3D Modeling Intro": "https://images.pexels.com/photos/4144097/pexels-photo-4144097.jpeg",
    "Blender Basics": "https://images.pexels.com/photos/4266923/pexels-photo-4266923.jpeg",
    "After Effects Basics": "https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg",
    "Machine Learning Intro": "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg",
    "Deep Learning Intro": "https://images.pexels.com/photos/3861954/pexels-photo-3861954.jpeg",
    "NLP Basics": "https://images.pexels.com/photos/3861966/pexels-photo-3861966.jpeg",
    "Computer Vision": "https://images.pexels.com/photos/1181407/pexels-photo-1181407.jpeg",
    "Pandas Basics": "https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg",
    "NumPy Basics": "https://images.pexels.com/photos/669622/pexels-photo-669622.jpeg",
    "Matplotlib Basics": "https://images.pexels.com/photos/669619/pexels-photo-669619.jpeg",
  };
  

// ✅ Trusted course links
const courseLinks: Record<string, string> = {
    "Intro to JavaScript": "https://www.youtube.com/watch?v=EerdGm-ehJQ&t=64140s",
    "React Basics": "https://scrimba.com/learn/learnreact",
    "Python Crash Course": "https://www.youtube.com/watch?v=rfscVS0vtbw",
    "Startup Fundamentals": "https://www.ycombinator.com/library",
    "UI/UX Essentials": "https://www.youtube.com/watch?v=_MFBAtFLNKc&list=PLjiHFwhbHYlHSpAflJwjsKAyMaMhASm0F",
    "Data Analysis 101": "https://www.youtube.com/watch?v=r-uOLxNrNk8",
    "SEO Basics": "https://www.youtube.com/watch?v=xsVTqzratPs",
    "Git & GitHub": "https://www.youtube.com/watch?v=RGOj5yH7evk",
    "Docker for Beginners": "https://www.youtube.com/watch?v=pTFZFxd4hOI",
    "AI Concepts": "https://www.youtube.com/watch?v=JMUxmLyrhSk",
    "Time Management": "https://www.youtube.com/watch?v=iDbdXTMnOmE",
    "Excel Essentials": "https://www.youtube.com/watch?v=Vl0H-qTclOg",
    "TypeScript Basics": "https://www.youtube.com/watch?v=gieEQFIfgYc",
    "Node.js Intro": "https://www.youtube.com/watch?v=TlB_eWDSMt4",
    "GraphQL Basics": "https://www.youtube.com/watch?v=Y0lDGjwRYKw",
    "Kubernetes 101": "https://www.youtube.com/watch?v=X48VuDVv0do",
    "Figma for Starters": "https://www.youtube.com/watch?v=jk1T0CdLxwU",
    "PowerPoint Mastery": "https://www.youtube.com/watch?v=XF34-Wu6qWU",
    "Financial Literacy": "https://www.youtube.com/watch?v=SAeLHamafxw&list=PL7MuFnZAs4VTA97G9nYrxmSdSqyRr1BVA",
    "Public Speaking": "https://www.youtube.com/watch?v=tShavGuo0_E",
    "Java Fundamentals": "https://www.youtube.com/watch?v=grEKMHGYyns",
    "C++ Basics": "https://www.youtube.com/watch?v=vLnPwxZdW4Y",
    "Android Basics": "https://www.youtube.com/watch?v=fis26HvvDII",
    "iOS Basics": "https://www.youtube.com/watch?v=09TeUXjzpKs",
    "Next.js Intro": "https://www.youtube.com/watch?v=Y6KDk5iyrYE",
    "Tailwind CSS": "https://www.youtube.com/watch?v=ft30zcMlFao",
    "Redux Toolkit": "https://www.youtube.com/watch?v=poQXNp9ItL4",
    "Django Basics": "https://www.youtube.com/watch?v=F5mRW0jo-U4",
    "Flask Basics": "https://www.youtube.com/watch?v=Z1RJmh_OqeA",
    "SQL for Beginners": "https://www.youtube.com/watch?v=HXV3zeQKqGY",
    "NoSQL Overview": "https://www.youtube.com/watch?v=qEhNHOEa5sE&list=PLsyeobzWxl7r0bn6dzVA8bQNxcx7DRl5F",
    "Cybersecurity Basics": "https://www.youtube.com/watch?v=lpa8uy4DyMo",
    "Cloud 101": "https://www.youtube.com/watch?v=2LaAJq1lB1Q",
    "AWS Intro": "https://www.youtube.com/watch?v=rKNSc8RrwxA&list=PL6XT0grm_TfgtwtwUit305qS-HhDvb4du",
    "GCP Intro": "https://www.youtube.com/watch?v=OzwSBbuHY-0",
    "Azure Intro": "https://www.youtube.com/watch?v=3Arj5zlUPG4",
    "Linux Basics": "https://www.youtube.com/watch?v=IVquJh3DXUA",
    "Networking 101": "https://www.youtube.com/watch?v=qiQR5rTSshw",
    "Agile & Scrum": "https://www.youtube.com/watch?v=VFQtSqChlsk",
    "Product Management": "https://www.youtube.com/watch?v=ravLfnYuqmA&list=PLZkpiiuDw2b9kda_9r12PWxunQHcRBhW6",
    "Email Marketing": "https://www.mygreatlearning.com/academy/learn-for-free/courses/email-marketing",
    "Content Marketing": "https://academy.hubspot.com/courses/content-marketing",
    "Copywriting Intro": "https://www.youtube.com/watch?v=OC0nBt3nuDg",
    "Video Editing": "https://www.udemy.com/topic/video-editing/?couponCode=SIRIAN1&p=43&utm_source=adwords&utm_medium=udemyads&utm_campaign=Search_Keyword_Gamma_NonP_la.EN_cc.ROW-English_AI_Max_for_Search_TEST&campaigntype=Search&portfolio=ROW-English&language=EN&product=Course&test=&audience=Keyword&topic=Video_Editing&priority=Gamma&utm_content=deal4584&utm_term=_._ag_182096437377_._ad_696235500616_._kw_video%20editing%20course_._de_c_._dm__._pl__._ti_kwd-316999524875_._li_1011082_._pd__._&matchtype=b&gad_source=1&gad_campaignid=22929951016&gbraid=0AAAAADROdO1CQG9n0Hv-1M_r8e_q1953q&gclid=Cj0KCQjwoP_FBhDFARIsANPG24OKZV39i68o98LGBXuHsAjnuorlzpE5sHTDcOWaF1NSPhzXw8vB1BcaAue7EALw_wcB",
    "Photography Basics": "https://www.youtube.com/watch?v=V7z7BAZdt2M",
    "3D Modeling Intro": "https://www.youtube.com/watch?v=eNKrfLSWNec&list=PLNSuDi1DoGJz6sGYaHXgbYNQ_StJpY6m7",
    "Blender Basics": "https://www.youtube.com/watch?v=TPrnSACiTJ4",
    "After Effects Basics": "https://www.youtube.com/watch?v=uRdfvpQ5rcQ&list=PLYfCBK8IplO77FDDLnS06qEMoVLD7Qyib",
    "Machine Learning Intro": "https://www.youtube.com/watch?v=GwIo3gDZCVQ",
    "Deep Learning Intro": "https://www.youtube.com/watch?v=G1P2IaBcXx8",
    "NLP Basics": "https://www.youtube.com/watch?v=SNG7yLLh_lA",
    "Computer Vision": "https://www.youtube.com/watch?v=puB-4LuRNys",
    "Pandas Basics": "https://www.youtube.com/watch?v=vmEHCJofslg",
    "NumPy Basics": "https://www.youtube.com/watch?v=QUT1VHiLmmI",
    "Matplotlib Basics": "https://www.youtube.com/watch?v=DAQNHzOcO5A",
  };
  

  function generateFreeCourses(): FreeCourse[] {
    const titles: { title: string; category: string }[] = [
      { title: "Intro to JavaScript", category: "Programming" },
      { title: "React Basics", category: "Programming" },
      { title: "Python Crash Course", category: "Programming" },
      { title: "Startup Fundamentals", category: "Business" },
      { title: "UI/UX Essentials", category: "Design" },
      { title: "Data Analysis 101", category: "Data Science" },
      { title: "SEO Basics", category: "Marketing" },
      { title: "Git & GitHub", category: "DevOps" },
      { title: "Docker for Beginners", category: "DevOps" },
      { title: "AI Concepts", category: "AI" },
      { title: "Time Management", category: "Personal Development" },
      { title: "Excel Essentials", category: "Business" },
      { title: "TypeScript Basics", category: "Programming" },
      { title: "Node.js Intro", category: "Programming" },
      { title: "GraphQL Basics", category: "Programming" },
      { title: "Kubernetes 101", category: "DevOps" },
      { title: "Figma for Starters", category: "Design" },
      { title: "PowerPoint Mastery", category: "Business" },
      { title: "Financial Literacy", category: "Business" },
      { title: "Public Speaking", category: "Personal Development" },
      { title: "Java Fundamentals", category: "Programming" },
      { title: "C++ Basics", category: "Programming" },
      { title: "Android Basics", category: "Programming" },
      { title: "iOS Basics", category: "Programming" },
      { title: "Next.js Intro", category: "Programming" },
      { title: "Tailwind CSS", category: "Design" },
      { title: "Redux Toolkit", category: "Programming" },
      { title: "Django Basics", category: "Programming" },
      { title: "Flask Basics", category: "Programming" },
      { title: "SQL for Beginners", category: "Data Science" },
      { title: "NoSQL Overview", category: "Data Science" },
      { title: "Cybersecurity Basics", category: "DevOps" },
      { title: "Cloud 101", category: "DevOps" },
      { title: "AWS Intro", category: "DevOps" },
      { title: "GCP Intro", category: "DevOps" },
      { title: "Azure Intro", category: "DevOps" },
      { title: "Linux Basics", category: "DevOps" },
      { title: "Networking 101", category: "DevOps" },
      { title: "Agile & Scrum", category: "Business" },
      { title: "Product Management", category: "Business" },
      { title: "Email Marketing", category: "Marketing" },
      { title: "Content Marketing", category: "Marketing" },
      { title: "Copywriting Intro", category: "Marketing" },
      { title: "Video Editing", category: "Design" },
      { title: "Photography Basics", category: "Design" },
      { title: "3D Modeling Intro", category: "Design" },
      { title: "Blender Basics", category: "Design" },
      { title: "After Effects Basics", category: "Design" },
      { title: "Machine Learning Intro", category: "AI" },
      { title: "Deep Learning Intro", category: "AI" },
      { title: "NLP Basics", category: "AI" },
      { title: "Computer Vision", category: "AI" },
      { title: "Pandas Basics", category: "Data Science" },
      { title: "NumPy Basics", category: "Data Science" },
      { title: "Matplotlib Basics", category: "Data Science" },
    ];
  
    return titles.map((item, i) => ({
      id: `free-${i + 1}`,
      title: item.title,
      description:
        "Trusted free course covering core concepts with practical examples and resources.",
      image:
        (courseImages[item.title] || sampleImages[i % sampleImages.length]) +
        "?auto=compress&cs=tinysrgb&w=600",
      category: item.category, // ✅ direct use of category from object
      language: i % 4 === 0 ? "Hindi" : "English",
      durationHours: 1 + (i % 10) * 2,
      link:
        courseLinks[item.title] ||
        "https://www.google.com/search?q=" + encodeURIComponent(item.title + " free course"),
    }));
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
