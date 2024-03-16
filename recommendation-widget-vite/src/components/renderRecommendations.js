import { createRecommendationElement } from "./createRecommendationElement.js";

// Render recommendations onto the recommendations widget
function renderRecommendations(recommendations, recommendationsWidget, callback) {
  if (!recommendationsWidget) {
    console.error("Recommendations widget element not found.");
    return; 
  }

  // Create a wrapper element for recommendations
  const recommendationsWrapper = document.createElement("div");
  recommendationsWrapper.classList.add("recommendations-wrapper");

  let loadedCount = 0;
  const totalCount = recommendations.length;

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

          loadedCount++;
          if (loadedCount === totalCount) {
            // All recommendations are loaded, execute the callback
            recommendationsWidget.appendChild(recommendationsWrapper);
            callback ? callback() : null;
          }
        };

        image.onerror = function () {
          // Image failed to load, create recommendation element without thumbnail
          const recommendationElement = createRecommendationElement(recommendation, false);
          recommendationsWrapper.appendChild(recommendationElement);

          loadedCount++;
          if (loadedCount === totalCount) {
            // All recommendations are loaded, execute the callback
            recommendationsWidget.appendChild(recommendationsWrapper);
            callback ? callback() : null;
          }
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
  if (totalCount === 0 && callback) {
    // If there are no recommendations, execute the callback immediately
    recommendationsWidget.appendChild(recommendationsWrapper);
    callback();
  }

  // Append the recommendations wrapper to the recommendations widget if there are no recommendations and a callback is provided
  (totalCount === 0 && callback) && (recommendationsWidget.appendChild(recommendationsWrapper), callback());
}

export { renderRecommendations };
