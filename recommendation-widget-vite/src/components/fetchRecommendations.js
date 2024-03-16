// Fetch recommendations from the Taboola API
async function fetchRecommendations() {
  try {
    // Define parameters for the URL
    const publisherId = "taboola-templates";
    const appType = "desktop";
    const apiKey = "f9040ab1b9c802857aa783c469d0e0ff7e7366e4";
    const sourceId = "demo"; // Constant string for demonstration purposes

    // Construct the URL with dynamic parameters for fetching recommendations from Taboola API
    const url = `http://api.taboola.com/1.0/json/${publisherId}/recommendations.get?app.type=${appType}&app.apikey=${apiKey}&source.id=${sourceId}&count=10&source.type=video`;

    const response = await fetch(url);
    const data = await response.json();

    return data.list;
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    return [];
  }
}

export { fetchRecommendations };
