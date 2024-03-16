import { renderSponsoredRecommendation } from "../recommendations/sponsored/sponsoredRecommendation.js";
import { renderOrganicRecommendation } from "../recommendations/organic/organicRecommendation.js";

// Function to create a recommendation element based on its origin
function createRecommendationElement(recommendation, hasThumbnail) {
  const recommendationElement = document.createElement("div");
  recommendationElement.classList.add("recommendation-card");

  // Add additional class based on whether it has an image or not
  recommendationElement.classList.add(hasThumbnail ? "have-image" : "no-image");

  // Render the recommendation based on its origin (sponsored or organic; additional types may be added in the future)
  switch (recommendation.origin) {
    case "sponsored":
      renderSponsoredRecommendation(recommendation, recommendationElement, hasThumbnail);
      recommendationElement.addEventListener("click", () => {
        window.open(recommendation.url, "_blank");
      });
      break;
    case "organic":
      renderOrganicRecommendation(recommendation, recommendationElement, hasThumbnail);
      recommendationElement.addEventListener("click", () => {
        window.open(recommendation.url, "_self");
      });
      break;
    default:
      console.error("Unknown recommendation origin:", recommendation.origin);
      break;
  }

  return recommendationElement;
}

export { createRecommendationElement };
