import {renderOrganicRecommendation} from '../src/components/recommendations/organicRecommendation.js';

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



