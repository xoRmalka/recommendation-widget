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

// Create a recommendation element based on its origin
function createRecommendationElement(recommendation, hasThumbnail) {
  
  // Ensure recommendation origin exists
  if(!recommendation.origin) {    
    console.error("Recommendations widget element not found.");
  return; 
  }
  
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

function renderSponsoredRecommendation(recommendation, element, hasThumbnail) {
  // Construct the HTML content for the sponsored recommendation
  let innerHTML = `
    ${hasThumbnail ? ` <div class="thumbnail"> <img src="${recommendation.thumbnail[0].url}" alt="Thumbnail"> </div>`: ""}
    <div class="info">
     ${recommendation.name ? `<h3>${recommendation.name}</h3>` : ""}
     ${recommendation.description ? `<p>${recommendation.description}</p>` : ""}
     ${ recommendation.branding ? `<div class="ad-label" ><p title="${recommendation.branding}">Ad</p></div>`: "" }
    </div>
  `;

  element.innerHTML = innerHTML;
}


function renderOrganicRecommendation(recommendation, element, hasThumbnail) {  
  // Construct the HTML content for the organic recommendation
  let innerHTML = `
    ${hasThumbnail ? ` <div class="thumbnail"> <img src="${recommendation.thumbnail[0].url}" alt="Thumbnail"> </div>`: ""}
    <div class="info">
    ${recommendation.name ? `<h3>${recommendation.name}</h3>` : ""}
    ${recommendation.description ? `<p>${recommendation.description}</p>` : ""}
    </div>
  `;

  element.innerHTML = innerHTML;
}