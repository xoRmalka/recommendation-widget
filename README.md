# Vanilla JS - Recommendation Widget

## Introduction
The Vanilla JS Recommendation Widget project aims to create a versatile recommendation widget using the Taboola REST API. The widget displays both organic and sponsored recommendations, allowing users to interact with them seamlessly.

## Objective
The primary goal was to design and implement a recommendation widget using Vanilla JavaScript. Leveraging the Taboola REST API, the widget fetches recommendations and presents them in an intuitive interface. The widget is responsive, functional, and easily extendable for future enhancements, such as adding new recommendation types.

## Implementation on Client Website
The script needs to be implemented on the client's website, along with a designated `<div>` element where the widget will be displayed. Here's how the implementation process works:

1. **Placement of Script:** The client embeds the script into their website. Upon loading, the script identifies the designated `<div>` element by its ID.

2. **Fetching Data:** Once the website's DOM is loaded, the script triggers and fetches the recommendation data from the Taboola REST API.

3. **Widget Creation:** After retrieving the recommendation data, the script dynamically creates HTML elements for each recommendation.

4. **Integration with Website DOM:** Finally, the script integrates the recommendation widget into the client's website DOM, displaying it within the designated `<div>` element as specified by the client.

## Getting Started
There are two folders for the project, one using Vite and the other without Vite.

### For the non-Vite project:
1. Clone the repository to your local machine.
2. Open the project directory `recommendation-widget/recommendation-widget-non-vite`.
3. Open the `index.html` file in your browser to view the widget.
4. For testing, open `AppUnitTest.html` located in `recommendation-widget/recommendation-widget-non-vite/spec` in your browser.

### For the Vite project:
1. Clone the repository to your local machine.
2. Open the project directory `recommendation-widget/recommendation-widget-vite/` in your preferred code editor.
3. Install dependencies by running `npm install` in the terminal.
4. Start the development server by running `npm run dev`, then navigate to `http://localhost:5173/`.
5. For testing, run `npm test` and navigate to `http://localhost:8888`.
