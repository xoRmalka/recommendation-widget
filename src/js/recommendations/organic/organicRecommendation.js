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

export { renderOrganicRecommendation };
