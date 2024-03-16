import { renderSponsoredRecommendation } from "../src/js/recommendations/sponsored/sponsoredRecommendation.js";

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
