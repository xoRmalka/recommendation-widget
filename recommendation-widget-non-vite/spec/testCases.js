describe("Sponsored Recommendation Tests", function () {
  it("should render sponsored recommendation correctly", function () {
    const recommendation = {
      thumbnail: [{ url: "https://www.example.com/" }],
      name: "Example Name",
      description: "Example Description",
      branding: "Example Branding",
    };

    // Create a div element to serve as the container for the rendered recommendation
    const element = document.createElement("div");

    // Render the sponsored recommendation onto the element
    renderSponsoredRecommendation(recommendation, element, false);

    // Assert that the rendered HTML contains the expected content
    expect(element.innerHTML).toContain("Example Name");
    expect(element.innerHTML).toContain("Example Description");
    expect(element.innerHTML).toContain("Example Branding");
  });
});

describe("Organic Recommendation Tests", function () {
  it("should render organic recommendation correctly", function () {
    const recommendation = {
      thumbnail: [{ url: "https://www.example.com/" }],
      name: "Example Name",
      description: "Example Description",
    };

    // Create a div element to serve as the container for the rendered recommendation
    const element = document.createElement("div");

    // Render the organic recommendation onto the element
    renderOrganicRecommendation(recommendation, element, false);

    // Assert that the rendered HTML contains the expected content
    expect(element.innerHTML).toContain("Example Name");
    expect(element.innerHTML).toContain("Example Description");
  });
});

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

    return new Promise((resolve) => {
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

describe("Event Listener Tests for Create Recommendation Element", function () {
  it("should open sponsored recommendation in a new tab when clicked", function () {
    // Mock recommendation data for sponsored recommendation
    const recommendation = {
      origin: "sponsored",
      url: "https://www.example.com/sponsored",
    };

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

    const element = createRecommendationElement(recommendation);

    // Mock window.open function
    spyOn(window, "open");

    // Simulate click event
    element.click();

    // Expect window.open to be called with the recommendation URL and '_self' target
    expect(window.open).toHaveBeenCalledWith(recommendation.url, "_self");
  });
});
