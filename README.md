# Welcome to the Disney Clone Project

Welcome to our cutting-edge web application! This project leverages modern full-stack technologies to deliver an optimal developer and user experience. Below you'll find detailed information about the system design, architecture, and the key libraries and tools powering the project.

[Demo On Netlify](https://disney-clone-min.netlify.app/)

[Demo On Vercel](https://disney-clone-kohl-five.vercel.app/)

<img width="637" alt="image" src="https://github.com/user-attachments/assets/f5f60656-e42a-4bf9-b4e6-5230e1b3a095" />


---

## How to run the code
1. Clone the repository:
2. Install dependencies:
```pnpm install (recommended) or yarn install or npm install```

3. create .env file and add the following variables:
```
API_URL=https://api.themoviedb.org/3
API_KEY=<your-api-key>
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXT_PUBLIC_IMAGE_URL=https://image.tmdb.org
```

4. Start the development server:
```pnpm dev or yarn dev or npm run dev```

---

## Architecture & System Design

For a deep dive into the overall architecture, please refer to our [Architecture Wiki](https://github.com/ryusuf11/disney-clone/wiki/System-Design).

### Key Architectural Decisions

- **Next.js 15 App Router:**  
  Centralizes application routing, leverages SSR and streaming server rendering, and integrates React Server Components for a modern development experience.

- **Incremental Static Regeneration (ISR):**  
  Uses Next.js's built-in `fetch` with revalidate options to serve static content that is periodically updated, ensuring fast page loads and up-to-date data.

- **Domain-Driven Module Pattern:**  
  Organizes code by domain (e.g., products, TV series, movies) to enforce clear data contracts, improve testability, and simplify service mocking.

- **State Management with Zustand:**  
  Provides a lightweight, type-safe, and minimal-boilerplate solution for managing both local and global state.

- **Component-Driven UI:**  
  Adopts an atomic design approach for UI components with Sass modules for encapsulated styling and independent testability.

---

## Libraries & Tools

Below is a detailed overview of the main libraries and tools used in this project along with their primary features:

### Next.js 15

**Main Features:**
- **Server-Side Rendering (SSR) & Static Generation:**  
  Automatically renders pages on the server for optimal SEO and performance.
- **Incremental Static Regeneration (ISR):**  
  Supports revalidation of static pages to serve fresh content without rebuilding the entire site.
- **App Router & File-based Routing:**  
  Simplifies route management and supports dynamic, nested, and parallel routes.
- **Edge Middleware:**  
  Enables custom logic (e.g., authentication, redirects) to run at the edge for improved performance.
- **React Server Components:**  
  Facilitates a modern, performance-optimized data fetching and rendering paradigm.

### date-fns

**Main Features:**
- **Modular Functions:**  
  Import only the functions you need, keeping bundle sizes minimal.
- **Comprehensive Date Manipulation:**  
  Provides a wide range of utilities for formatting, parsing, and calculating dates.
- **Immutable and Pure Functions:**  
  Promotes predictable behavior and easy testing.
- **Tree-Shakable:**  
  Optimizes bundle sizes by eliminating unused code during the build.

### Zustand

**Main Features:**
- **Minimal Boilerplate:**  
  A simple API that allows you to manage state with very little setup.
- **TypeScript First:**  
  Offers strong typing and integrates seamlessly with TypeScript projects.
- **Flexible Middleware & Persistence:**  
  Easily add persistence, logging, and other middleware to your state.
- **Lightweight and Performant:**  
  Has a very small bundle footprint, ensuring fast load times and minimal overhead.

### react-icons

**Main Features:**
- **Unified Icon Library:**  
  Access a wide variety of popular icon sets with a consistent API.
- **Easy Integration:**  
  Import only the icons you need and style them with standard React props.
- **SVG-Based:**  
  Scalable and customizable icons that integrate well with modern web design.
- **Consistent Design Language:**  
  Maintains uniformity across different icon sets, making styling predictable.

### @testing-library/react

**Main Features:**
- **User-Focused Testing:**  
  Encourages writing tests that mimic user interactions rather than implementation details.
- **Intuitive API:**  
  Provides clear and semantic queries (e.g., `getByRole`, `getByText`) for accessing elements.
- **Asynchronous Utilities:**  
  Supports waiting for async operations to resolve, making it easier to test dynamic UIs.
- **Improved Accessibility:**  
  Promotes best practices by encouraging accessible queries and element roles.

### Jest

**Main Features:**
- **Integrated Testing Framework:**  
  Provides a complete suite for running, mocking, and asserting tests.
- **Snapshot Testing:**  
  Allows you to capture and compare UI snapshots to track changes over time.
- **Parallel Test Execution:**  
  Runs tests in parallel, reducing overall test execution time.
- **Extensible & Configurable:**  
  Supports custom configuration, transformers (e.g., babel-jest), and a rich plugin ecosystem.
- **TypeScript Compatibility:**  
  Works seamlessly with TypeScript through proper transformers and configuration.

### Biome

**Main Features:**
- **Modern Linting and Formatting:**  
  Enforces code quality through integrated linting and automatic code formatting.
- **Streamlined Configuration:**  
  Offers simple configuration to enforce consistent code style across the project.
- **Fast and Efficient:**  
  Optimized for performance so that it runs quickly even in large codebases.
- **Developer Friendly:**  
  Provides actionable feedback and quick fixes to improve overall code health.

### Lefthook

**Main Features:**
- **Git Hooks Manager:**  
  Easily configure pre-commit, pre-push, and other Git hooks to run tests, linters, or other scripts.
- **Customizable Workflows:**  
  Define and tailor hooks to your project’s specific requirements.
- **Boosts Code Quality:**  
  Prevents bad code from being committed, ensuring a consistent and high-quality codebase.
- **Low Overhead:**  
  Executes quickly to minimize delays during Git operations.

### Sass

**Main Features:**
- **Advanced CSS Capabilities:**  
  Use variables, nesting, mixins, and functions to write more maintainable CSS.
- **Modular and Scalable:**  
  Break your styles into reusable partials that can be imported as needed.
- **CSS Modules Integration:**  
  Scope your styles locally to avoid global conflicts while still using powerful Sass features.
- **Wide Community Support:**  
  Mature tooling and plugins make it a reliable choice for modern web projects.

### TypeScript

**Main Features:**
- **Static Type Checking:**  
  Catches errors at compile time, improving code reliability and maintainability.
- **Enhanced Developer Experience:**  
  Offers features like autocompletion, type inference, and inline documentation.
- **Scalable Codebase:**  
  Facilitates collaboration on large projects with clear type contracts.
- **Improved Code Quality:**  
  Reduces runtime errors by enforcing type safety and consistency across the code.


### pnpm

**Main Features:**
- **Efficient Disk Space Usage:**  
  Uses a content-addressable storage mechanism to store packages globally and creates symlinks in your projects, reducing duplication and saving disk space.
- **Fast Installations:**  
  Leverages a global cache and optimized dependency resolution to significantly speed up package installations.
- **Strict Dependency Isolation:**  
  Enforces exact version matching and prevents phantom dependency issues by isolating each package, ensuring a predictable dependency tree.
- **Consistency and Determinism:**  
  With a dedicated lockfile and deterministic symlink structure, pnpm guarantees that every developer and CI/CD pipeline uses the same dependency versions.
- **Monorepo-Friendly:**  
  Provides powerful workspace features that simplify managing shared dependencies across multiple projects within a monorepo.
- **Enhanced Security:**  
  Minimizes risks by reducing unintended dependency hoisting and enforcing strict module resolution.

---

## Conclusion

This project combines the power of Next.js 15, TypeScript, and a suite of modern libraries and tools to deliver a scalable, maintainable, and high-performance application. The selected libraries have been chosen for their strengths and the value they bring to the overall development process—from enhanced SEO and dynamic rendering with Next.js, to efficient state management with Zustand and comprehensive testing with Jest and Testing Library.

We encourage you to explore the documentation for each of these tools to fully understand their capabilities and how they contribute to the success of this project.

Happy coding!

---
