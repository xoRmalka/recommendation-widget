// main.js - Main module for bringing together components, fetching and rendering recommendations.
import { fetchRecommendations } from "./components/fetchRecommendations.js";
import { renderRecommendations } from "./components/renderRecommendations.js";

// Find the recommendations widget element by its unique ID on the client website
const recommendationsWidget = document.getElementById("recommendations-widget");

// Run fetchRecommendations then renderRecommendations when DOM content is loaded
document.addEventListener("DOMContentLoaded", async () => {
  try {
    const recommendations = await fetchRecommendations(recommendationsWidget);
    
    // Render the fetched recommendations
    renderRecommendations(recommendations, recommendationsWidget);
  } catch (error) {
    console.error("Error:", error);
  }
});
