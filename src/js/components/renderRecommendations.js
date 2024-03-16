import { createRecommendationElement } from "./createRecommendationElement.js";

// Function to render recommendations onto the recommendations widget
function renderRecommendations(recommendations, recommendationsWidget) {
  if (!recommendationsWidget) {
    console.error("Recommendations widget element not found.");
    return; // Exit early if recommendationsWidget is not found
  }

  // Create a wrapper element for recommendations
  const recommendationsWrapper = document.createElement("div");
  recommendationsWrapper.classList.add("recommendations-wrapper");

  // Iterate through each recommendation and render it
  recommendations.forEach((recommendation) => {
    try {
      const imageUrl = recommendation?.thumbnail?.[0]?.url;

      // Check if the image URL is available
      if (imageUrl) {
        const image = new Image();
        image.onload = function () {
          // Image loaded successfully, create recommendation element
          const recommendationElement = createRecommendationElement(recommendation, true);
          recommendationsWrapper.appendChild(recommendationElement);
        };

        image.onerror = function () {
          // Image failed to load, create recommendation element without thumbnail
          const recommendationElement = createRecommendationElement(recommendation, false);
          recommendationsWrapper.appendChild(recommendationElement);
        };

        image.src = imageUrl; // Start loading the image
      } else {
        console.error("Image URL not found for recommendation:", recommendation);
      }
    } catch (error) {
      console.error("An error occurred while rendering recommendation:", error);
    }
  });

  // Append the recommendations wrapper to the recommendations widget
  recommendationsWidget.appendChild(recommendationsWrapper);
}

export { renderRecommendations };
