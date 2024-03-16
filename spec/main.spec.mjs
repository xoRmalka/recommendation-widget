import {
  createRecommendationElement,
  renderRecommendations,
} from "../src/js/main.js";

describe("renderRecommendations Function Test", function () {
  let container;

  beforeAll(function () {
    // Create a container element to render recommendations
    container = document.createElement("div");
    container.id = "recommendations-widget";
    container.style.display = "none"; // Hide the container
    document.body.appendChild(container);
  });

  afterAll(function () {
    // Remove the container element after all tests are done
    document.body.removeChild(container);
  });

  it("should render two recommendation items when provided with two items", function (done) {
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

    // Call the function
    renderRecommendations(recommendations, container);

    // Wait for recommendations to be rendered
    setTimeout(function () {
      // Check if two recommendation cards are rendered
      const recommendationsWrapper = document.querySelector(
        ".recommendations-wrapper"
      );
      const recommendationCards = recommendationsWrapper.querySelectorAll(
        ".recommendation-card"
      );
      expect(recommendationCards.length).toBe(2);

      done(); // Indicate that the test is done
    }, 400); // Timeout value
  });
});

describe("Event Listener Tests for Create Recommendation Element", function () {
  it("should open sponsored recommendation in a new tab when clicked", function () {
    // Mock recommendation data for sponsored recommendation
    const recommendation = {
      origin: "sponsored",
      url: "https://www.example.com/sponsored",
    };

    // Create recommendation element
    const element = createRecommendationElement(recommendation);

    // Mock window.open function
    spyOn(window, "open");

    // Simulate click event
    element.click();

    // Expect window.open to be called with the recommendation URL and '_blank' target
    expect(window.open).toHaveBeenCalledWith(recommendation.url, "_blank");
  });

  it("should open organic recommendation in the same tab when clicked", function () {
    // Mock recommendation data for organic recommendation
    const recommendation = {
      origin: "organic",
      url: "https://www.example.com/organic",
    };

    // Create recommendation element
    const element = createRecommendationElement(recommendation);

    // Mock window.open function
    spyOn(window, "open");

    // Simulate click event
    element.click();

    // Expect window.open to be called with the recommendation URL and '_self' target
    expect(window.open).toHaveBeenCalledWith(recommendation.url, "_self");
  });
});
