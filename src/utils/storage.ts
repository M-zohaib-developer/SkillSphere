export interface PaidCourse {
  id: string;
  title: string;
  instructor?: string;
  category?: string;
  language?: "English" | "Hindi";
  durationHours: number;
  image?: string;
  link: string;
}

export interface UserProgressState {
  enrolledCourses: PaidCourse[];
  totalHours: number;
  certifications: number;
}

const PROGRESS_KEY = "ss_user_progress_v1";
const PROJECTS_KEY = "ss_user_projects_v1";

export function getProgress(): UserProgressState {
  const raw = localStorage.getItem(PROGRESS_KEY);
  if (!raw) {
    const init: UserProgressState = {
      enrolledCourses: [],
      totalHours: 0,
      certifications: 0,
    };
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(init));
    return init;
  }
  try {
    return JSON.parse(raw) as UserProgressState;
  } catch {
    const init: UserProgressState = {
      enrolledCourses: [],
      totalHours: 0,
      certifications: 0,
    };
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(init));
    return init;
  }
}

function saveProgress(state: UserProgressState) {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(state));
}

export function enrollCourse(course: PaidCourse) {
  const state = getProgress();
  const exists = state.enrolledCourses.some((c) => c.id === course.id);
  if (!exists) {
    state.enrolledCourses.unshift(course);
    state.totalHours += Number(course.durationHours || 0);
    saveProgress(state);
  }
}

export function addCertification(increment: number = 1) {
  const state = getProgress();
  state.certifications += increment;
  if (state.certifications < 0) state.certifications = 0;
  saveProgress(state);
}

export function getEnrolledCourses(): PaidCourse[] {
  return getProgress().enrolledCourses;
}

// Projects persistence
export interface StoredProject {
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

export function loadProjects(): StoredProject[] {
  const raw = localStorage.getItem(PROJECTS_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as StoredProject[];
  } catch {
    return [];
  }
}

export function saveProjects(projects: StoredProject[]) {
  localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
}
