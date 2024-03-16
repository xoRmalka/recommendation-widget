import { createRecommendationElement } from "../src/components/createRecommendationElement.js";

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
