import { Appointment, TESTIMONIALS } from '../data/salonData';

const APPOINTMENTS_KEY = 'aura_noor_appointments';
const REVIEWS_KEY = 'aura_noor_reviews';

export function getStoredAppointments(): Appointment[] {
  try {
    const raw = localStorage.getItem(APPOINTMENTS_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to parse appointments', e);
    return [];
  }
}

export function saveAppointment(appointment: Appointment): Appointment[] {
  const existing = getStoredAppointments();
  const updated = [appointment, ...existing];
  try {
    localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save appointment', e);
  }
  return updated;
}

export function cancelAppointment(id: string): Appointment[] {
  const existing = getStoredAppointments();
  const updated = existing.map(item => item.id === id ? { ...item, status: 'cancelled' as const } : item);
  try {
    localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to cancel appointment', e);
  }
  return updated;
}

export interface ReviewItem {
  id: string;
  name: string;
  eventEn: string;
  eventHi: string;
  rating: number;
  textEn: string;
  textHi: string;
  date?: string;
}

export function getStoredReviews(): ReviewItem[] {
  try {
    const raw = localStorage.getItem(REVIEWS_KEY);
    if (!raw) return TESTIMONIALS;
    return JSON.parse(raw);
  } catch (e) {
    return TESTIMONIALS;
  }
}

export function addStoredReview(review: ReviewItem): ReviewItem[] {
  const current = getStoredReviews();
  const updated = [review, ...current];
  try {
    localStorage.setItem(REVIEWS_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save review', e);
  }
  return updated;
}
