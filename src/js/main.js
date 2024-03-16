// main.js - Main module for fetching and rendering recommendations
import { renderSponsoredRecommendation } from "./recommendations/sponsored/sponsoredRecommendation.js";
import { renderOrganicRecommendation } from "./recommendations/organic/organicRecommendation.js";

// Find the recommendations widget element by its unique ID on the client website
const recommendationsWidget = document.getElementById("recommendations-widget");

// Function to fetch recommendations from the Taboola API
async function fetchRecommendations() {
  try {
    if (!recommendationsWidget) {
      throw new Error("Recommendations widget element not found.");
    }
    
    const publisherId = "taboola-templates";
    const appType = "desktop";
    const apiKey = "f9040ab1b9c802857aa783c469d0e0ff7e7366e4";
    const sourceId = "demo"; // Constant string for demonstration purposes

    // Construct the URL with dynamic parameters for fetching recommendations from Taboola API
    const url = `http://api.taboola.com/1.0/json/${publisherId}/recommendations.get?app.type=${appType}&app.apikey=${apiKey}&source.id=${sourceId}&count=10&source.type=video`;

    const response = await fetch(url);
    const data = await response.json();

    // Render the fetched recommendations
    renderRecommendations(data.list, recommendationsWidget);
  } catch (error) {
    console.error("Error fetching recommendations:", error);
  }
}

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

// Run fetchRecommendations when DOM content is loaded
document.addEventListener("DOMContentLoaded", fetchRecommendations);

export { createRecommendationElement, renderRecommendations };
