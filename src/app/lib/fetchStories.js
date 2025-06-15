// Removed fs and path imports

// Utility to fetch stories from the local JSON file
export async function fetchStories() {
  // Use dynamic import to load stories.json on the client side
  const stories = await import("./stories.json");
  // Shuffle stories for dynamic/random order
  const arr = stories.default || stories;
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
