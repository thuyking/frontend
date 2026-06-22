import { getAuth } from "./authStorage";

const GUEST_KEY = "guestId";

export function getGuestId() {
  let guestId = localStorage.getItem(GUEST_KEY);
  if (!guestId) {
    guestId = `guest_${Date.now()}`;
    localStorage.setItem(GUEST_KEY, guestId);
  }
  return guestId;
}

export function getUserId() {
  const auth = getAuth();
  return auth?.user?._id;
}
