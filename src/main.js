import { fetchRecommendations } from "./components/fetchRecommendations.js";
import { renderRecommendations } from "./components/renderRecommendations.js";

// Locate the recommendations widget element by its unique ID on the client's website
const recommendationsWidget = document.getElementById("recommendations-widget");

// Ensure the recommendations widget element is found
if (recommendationsWidget) {
  // Fetch Recommendations then render them when DOM content is loaded
  document.addEventListener("DOMContentLoaded", async () => {
    try {
      const recommendations = await fetchRecommendations(recommendationsWidget);

      renderRecommendations(recommendations, recommendationsWidget);
    } catch (error) {
      console.error("Error:", error);
    }
  });
} else {
  console.error("Recommendations widget element not found.");
}
