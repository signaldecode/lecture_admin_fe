// ─── Role Types ───
export type AdminRole = 'SUPER_ADMIN' | 'INSTRUCTOR' | 'CS_AGENT';

// ─── Auth Types ───
export interface AdminUser {
  id: number;
  email: string;
  name: string;
  role: AdminRole;
  profileImage?: string;
}

export interface AuthState {
  user: AdminUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

// ─── API Types ───
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  page: number;
  pageSize: number;
}

export interface ApiError {
  status: number;
  message: string;
  code?: string;
}

export interface PaginationParams {
  page: number;
  pageSize: number;
  sort?: string;
  query?: string;
}

// ─── Member Types ───
export type MemberGrade = 'BASIC' | 'SILVER' | 'GOLD' | 'PLATINUM';
export type MemberStatus = 'ACTIVE' | 'SUSPENDED' | 'WITHDRAWN';

export interface Member {
  id: number;
  email: string;
  name: string;
  phone?: string;
  grade: MemberGrade;
  status: MemberStatus;
  point: number;
  createdAt: string;
  lastLoginAt?: string;
}

// ─── Course Types ───
export type CourseStatus = 'DRAFT' | 'PENDING' | 'PUBLISHED' | 'UNPUBLISHED';
export type CourseDifficulty = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';

export interface Course {
  id: number;
  title: string;
  description: string;
  instructorId: number;
  instructorName: string;
  categoryId: number;
  categoryName: string;
  price: number;
  thumbnailUrl?: string;
  status: CourseStatus;
  difficulty: CourseDifficulty;
  duration?: number;
  studentCount: number;
  rating: number;
  createdAt: string;
  updatedAt: string;
}

export interface Section {
  id: number;
  courseId: number;
  title: string;
  order: number;
  lessons: Lesson[];
}

export interface Lesson {
  id: number;
  sectionId: number;
  title: string;
  type: 'VIDEO' | 'TEXT' | 'QUIZ';
  duration?: number;
  order: number;
  videoUrl?: string;
  isFree: boolean;
}

// ─── Dashboard Types ───
export interface DashboardSummary {
  totalMembers: number;
  totalRevenue: number;
  totalCourses: number;
  totalStudents: number;
  pendingTickets: number;
  pendingRefunds: number;
}

export interface InstructorDashboardSummary {
  myStudents: number;
  myRevenue: number;
  myCourses: number;
  completionRate: number;
}

export interface CsDashboardSummary {
  pendingTickets: number;
  todayTickets: number;
  answeredToday: number;
}

export interface TrendData {
  date: string;
  value: number;
}

// ─── Order Types ───
export type OrderStatus = 'COMPLETED' | 'CANCELLED' | 'REFUND_REQUESTED' | 'REFUNDED';

export interface Order {
  id: number;
  memberName: string;
  memberEmail: string;
  courseTitle: string;
  amount: number;
  status: OrderStatus;
  paymentMethod: string;
  createdAt: string;
}

// ─── Ticket Types ───
export type TicketStatus = 'PENDING' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';

export interface Ticket {
  id: number;
  memberName: string;
  memberEmail: string;
  title: string;
  status: TicketStatus;
  createdAt: string;
  updatedAt: string;
}

// ─── Instructor Types ───
export type QnaStatus = 'PENDING' | 'ANSWERED' | 'CLOSED';

export interface Qna {
  id: number;
  courseId: number;
  courseTitle: string;
  studentName: string;
  question: string;
  answer?: string;
  status: QnaStatus;
  createdAt: string;
  answeredAt?: string;
}

export interface InstructorStudent {
  id: number;
  courseId: number;
  courseTitle: string;
  studentName: string;
  email: string;
  progressRate: number;
  completionRate: number;
  enrolledAt: string;
}

export interface Review {
  id: number;
  courseId: number;
  courseTitle: string;
  studentName: string;
  rating: number;
  content: string;
  reply?: string;
  createdAt: string;
}

export interface Settlement {
  id: number;
  period: string;
  courseSales: number;
  commission: number;
  netAmount: number;
  status: 'PENDING' | 'SETTLED';
  settledAt?: string;
}

export type PublishRequestStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export interface PublishRequest {
  id: number;
  courseId: number;
  courseTitle: string;
  status: PublishRequestStatus;
  requestedAt: string;
  reviewedAt?: string;
  rejectReason?: string;
}

export interface InstructorProfile {
  id: number;
  name: string;
  bio: string;
  profileImage?: string;
  linkedin?: string;
  twitter?: string;
  homepage?: string;
}

// ─── Coupon Types ───
export type CouponType = 'PERCENT' | 'FIXED';
export type CouponStatus = 'ACTIVE' | 'EXPIRED' | 'USED_OUT';

export interface Coupon {
  id: number;
  code: string;
  name: string;
  type: CouponType;
  discountValue: number;
  maxDiscount?: number;
  minPurchase?: number;
  usageLimit?: number;
  usedCount: number;
  expiresAt: string;
  status: CouponStatus;
  createdAt: string;
}

// ─── Community Types ───
export type PostStatus = 'PUBLISHED' | 'UNPUBLISHED' | 'DELETED';
export type ReportStatus = 'PENDING' | 'PROCESSED';
export type ReportAction = 'WARN' | 'DELETE' | 'SUSPEND';

export interface CommunityPost {
  id: number;
  title: string;
  authorName: string;
  categoryName: string;
  commentCount: number;
  reportCount: number;
  status: PostStatus;
  createdAt: string;
}

export interface CommunityReport {
  id: number;
  postId: number;
  postTitle: string;
  reason: string;
  reporterName: string;
  status: ReportStatus;
  action?: ReportAction;
  createdAt: string;
}

export interface CommunityCategory {
  id: number;
  name: string;
  slug: string;
  postCount: number;
  order: number;
}

// ─── Support Types (extended) ───
export interface SupportTicket {
  id: number;
  memberName: string;
  memberEmail: string;
  title: string;
  content: string;
  status: TicketStatus;
  createdAt: string;
  resolvedAt?: string;
}

export interface Notice {
  id: number;
  title: string;
  content: string;
  isPinned: boolean;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Faq {
  id: number;
  categoryName: string;
  question: string;
  answer: string;
  order: number;
}

// ─── Content Types ───
export interface Banner {
  id: number;
  title: string;
  imageUrl: string;
  linkUrl?: string;
  position: 'TOP' | 'MIDDLE' | 'BOTTOM';
  startDate: string;
  endDate: string;
  isActive: boolean;
  order: number;
}

export interface Popup {
  id: number;
  title: string;
  content: string;
  imageUrl?: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

export interface Terms {
  id: number;
  type: 'TERMS_OF_SERVICE' | 'PRIVACY_POLICY';
  version: string;
  content: string;
  effectiveDate: string;
  createdAt: string;
}

// ─── Analytics Types ───
export interface MemberStats {
  date: string;
  newMembers: number;
  totalMembers: number;
}

export interface CourseStats {
  courseId: number;
  courseTitle: string;
  studentCount: number;
  completionRate: number;
  revenue: number;
}

export interface RevenueStats {
  date: string;
  revenue: number;
  orderCount: number;
}

// ─── Settings Types ───
export interface AdminAccount {
  id: number;
  name: string;
  email: string;
  role: AdminRole;
  lastLoginAt?: string;
  createdAt: string;
}

export interface ApprovalItem {
  id: number;
  courseId: number;
  courseTitle: string;
  instructorName: string;
  requestedAt: string;
}

export interface ActivityLog {
  id: number;
  adminName: string;
  action: string;
  targetType: string;
  targetId: number;
  details?: string;
  createdAt: string;
}

// ─── Sidebar Types ───
export interface SidebarMenuItem {
  key: string;
  label: string;
  path: string;
  icon: string;
  roles: AdminRole[];
  children?: SidebarMenuItem[];
}

// ─── Permission Types ───
export interface RoutePermission {
  path: string;
  roles: AdminRole[];
}

export interface ActionPermission {
  action: string;
  roles: AdminRole[];
}
