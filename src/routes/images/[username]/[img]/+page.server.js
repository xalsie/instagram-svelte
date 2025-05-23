import { users } from '../../../mockData.js';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
  const { username, img } = params;
  const user = users.find(u => u.username === username);
  if (!user) {
    return { status: 404, error: 'User not found' };
  }
  const imgIndex = parseInt(img) - 1;
  if (isNaN(imgIndex) || imgIndex < 0 || imgIndex >= user.images.length) {
    return { status: 404, error: 'Image not found' };
  }
  return {
    user,
    imgIndex
  };
}
