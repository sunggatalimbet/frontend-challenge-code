# E-commerce Frontend Challenge

This project was created as a challenge for job interview to the Greyball startup. As a result, a modern minimalistic e-commerce frontend application built with Next.js 15, React 18, and TypeScript.

## Features

### Product Listing

-   ✅ Server-side rendered product grid using Next.js
-   ✅ Responsive grid layout of products
-   ✅ Product cards with:
    -   Product image
    -   Product name
    -   Truncated description (100 characters)
    -   Formatted price with currency
    -   Rating display (stars and numerical)
-   ✅ Lazy loading of product images
-   ✅ Loading states and animations
-   ✅ Pagination with 10 products per page
-   ✅ SEO metadata for product pages

### Search & Filtering

-   ✅ Real-time case-insensitive search functionality
-   ✅ Product filtering by category
-   ✅ Sort products by:
    -   Price (low to high)
    -   Rating (high to low)
    -   Name

### Shopping Cart

-   ✅ Add/remove products
-   ✅ Persistent cart state using Redux Toolkit
-   ✅ Cart total calculation
-   ✅ Cart item count badge
-   ✅ Fixed header with cart summary
-   ✅ Display total items and price

### UI/UX

-   ✅ Responsive design (mobile-first)
-   ✅ Dark/Light theme support
-   ✅ Loading skeletons and error boundaries
-   ✅ Multi-language support using next-intl: Russian, Kazakh and English
-   ✅ Next.js Parallel Routes for each product with modal and dynamic page

### Technical Features

-   ✅ TypeScript for type safety
-   ✅ Redux Toolkit for state management
-   ✅ Server-side data fetching
-   ✅ Jest and React Testing Library for testing
-   ✅ TailwindCSS for styling
-   ✅ Shadcn UI components
-   ✅ Feature-Sliced Design architecture for scalable project structure

## Known Issues

1. **Server Performance**:
    - Initial response times may be slower due to serverless architecture cold starts
    - Possible solution: Implementing caching strategies to improve performance or using a more powerful backend like Next API routes with MongoDB.

2. **Setup**:
    - React 19 compatibility issues with testing libraries
    - Solution: Downgraded to React 18 as a workaround solution

3. **Testing**:
    - Some test suites may fail due to first-time experience with Jest testing
    - Solution: Working on improving test writing skills and diving deeper into testing libraries

## Local Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/e-commerce-frontend.git
cd e-commerce-frontend
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Project Structure

The project follows a feature-sliced architecture with the following directory structure:

```bash
src/
├── app/
├── screens/
├── widgets/
├── features/
└── entities/
└── shared/
    ├── lib/
    │   ├── api/
    │   ├── i18n/
    │   ├── store/
    │   ├── types/
    │   ├── utils/
    └── ui/
```

## API Integration

The application fetches product data from a JSON API endpoint with server-side rendering. The data structure includes:

-   Product ID
-   Title
-   Description
-   Price
-   Rating
-   Image URL
-   Category

## Testing

The project includes comprehensive testing using Jest and React Testing Library:

-   Unit tests for components
-   Integration tests for features
-   Redux store testing
-   API integration testing
