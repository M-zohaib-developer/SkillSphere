// ------------------- Course & Progress -------------------

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

/**
 * Load user progress from localStorage.
 * Always returns safe defaults for new/invalid users.
 */
export function getProgress(): UserProgressState {
  try {
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
    return JSON.parse(raw) as UserProgressState;
  } catch {
    // fallback for corrupted storage
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

/**
 * Enroll a course (max 4 allowed).
 */
export function enrollCourse(course: PaidCourse): { success: boolean; message: string } {
  const state = getProgress();

  // Restrict to 4 enrollments
  if (state.enrolledCourses.length >= 4) {
    return { success: false, message: "⚠️ You can only enroll in up to 4 courses." };
  }

  const exists = state.enrolledCourses.some((c) => c.id === course.id);
  if (exists) {
    return { success: false, message: "Course already enrolled." };
  }

  state.enrolledCourses.unshift(course);
  state.totalHours += Number(course.durationHours || 0);
  saveProgress(state);

  return { success: true, message: "✅ Course enrolled successfully." };
}

/**
 * Cancel a course enrollment.
 */
export function cancelEnrollment(courseId: string): { success: boolean; message: string } {
  const state = getProgress();
  const before = state.enrolledCourses.length;

  state.enrolledCourses = state.enrolledCourses.filter((c) => c.id !== courseId);

  if (state.enrolledCourses.length < before) {
    // Recalculate total hours after removing
    state.totalHours = state.enrolledCourses.reduce(
      (sum, c) => sum + Number(c.durationHours || 0),
      0
    );
    saveProgress(state);
    return { success: true, message: "❌ Enrollment cancelled." };
  }

  return { success: false, message: "Course not found in enrollments." };
}

/**
 * Increment or decrement certifications.
 */
export function addCertification(increment: number = 1) {
  const state = getProgress();
  state.certifications += increment;

  if (state.certifications < 0) state.certifications = 0; // never negative
  saveProgress(state);
}

/**
 * Get all enrolled courses.
 */
export function getEnrolledCourses(): PaidCourse[] {
  return getProgress().enrolledCourses;
}

// ------------------- Projects -------------------

export interface StoredProject {
  id: string;
  title: string;
  description: string;
  status: "in-progress" | "completed" | "paused";
  createdDate: string;
  dueDate?: string;
  thumbnail?: string;
  tags: string[];
  progress: number; // 0-100%
}

export function loadProjects(): StoredProject[] {
  try {
    const raw = localStorage.getItem(PROJECTS_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as StoredProject[];
  } catch {
    return [];
  }
}

export function saveProjects(projects: StoredProject[]) {
  localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
}
