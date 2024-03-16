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

export { renderSponsoredRecommendation };
