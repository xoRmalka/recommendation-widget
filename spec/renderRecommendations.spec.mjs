import { renderRecommendations } from "../src/components/renderRecommendations.js";

describe("renderRecommendations Function Test", function () {
  let container;

  beforeAll(function () {
    // Create a container element to render recommendations
    container = document.createElement("div");
    container.id = "recommendations-widget";
    container.style.display = "none";
    document.body.appendChild(container);
  });

  afterAll(function () {
    document.body.removeChild(container);
  });

  it("should render two recommendation items when provided with two items", function () {
    // Mock recommendations data with two items
    const recommendations = [
      {
        origin: "sponsored",
        thumbnail: [{ url: "https://example.com/sponsored-thumbnail.jpg" }],
        name: "Sponsored Recommendation",
        description: "This is a sponsored recommendation.",
        branding: "Sponsored Brand",
      },
      {
        origin: "organic",
        thumbnail: [{ url: "https://example.com/organic-thumbnail.jpg" }],
        name: "Organic Recommendation",
        description: "This is an organic recommendation.",
      },
    ];

    return new Promise(resolve => {
      renderRecommendations(recommendations, container, () => {
        // Check if two recommendation cards are rendered
        const recommendationsWrapper = document.querySelector(
          ".recommendations-wrapper"
        );
        const recommendationCards = recommendationsWrapper.querySelectorAll(
          ".recommendation-card"
        );
        expect(recommendationCards.length).toBe(2);
        resolve();
      });
    });
  });
});
