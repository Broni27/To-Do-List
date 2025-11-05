# Advanced To-Do Application

A modern, feature-rich To-Do application built with React, TypeScript, and modern web technologies. This application demonstrates best practices in state management, UI/UX design, and accessibility.

## ✨ Features

### Core Functionality
- ✅ **Add, Edit, and Delete Todos** - Full CRUD operations for managing your tasks
- ✅ **Mark as Complete** - Toggle todo completion status
- ✅ **Filter Todos** - Filter by All, Active, or Completed tasks
- ✅ **Search Functionality** - Real-time search through all todos
- ✅ **Drag & Drop** - Reorder todos by dragging and dropping
- ✅ **Local Storage** - All data persists in browser localStorage
- ✅ **Dark/Light Theme** - Toggle between themes with smooth transitions

### UI/UX Features
- 🎨 **Modern Design** - Clean, intuitive interface with smooth animations
- 📱 **Responsive Layout** - Works seamlessly on desktop, tablet, and mobile
- ♿ **Accessibility** - ARIA labels, keyboard navigation, and semantic HTML
- 🎭 **Smooth Animations** - Transitions and animations for better user experience
- 🎯 **Focus Management** - Proper focus handling for keyboard users

## 🚀 Technologies Used

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Fast build tool and dev server
- **Zustand** - Lightweight state management with persistence
- **React Router** - Routing (configured for future expansion)
- **React Query** - Data fetching and caching (configured for future API integration)
- **React Beautiful DnD** - Drag and drop functionality
- **CSS Modules** - Scoped styling
- **clsx** - Conditional class names

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Fronnt_1
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── Header/
│   ├── TodoInput/
│   ├── TodoList/
│   ├── TodoItem/
│   ├── FilterBar/
│   ├── SearchBar/
│   └── ThemeToggle/
├── store/              # Zustand store
│   └── todoStore.ts
├── styles/             # CSS Modules (separate from components)
│   ├── index.css
│   ├── App.module.css
│   ├── Header.module.css
│   ├── TodoInput.module.css
│   ├── TodoList.module.css
│   ├── TodoItem.module.css
│   ├── FilterBar.module.css
│   ├── SearchBar.module.css
│   └── ThemeToggle.module.css
├── types/              # TypeScript type definitions
│   └── todo.ts
├── utils/              # Utility functions
│   └── storage.ts
├── App.tsx             # Main App component
└── main.tsx            # Application entry point
```

## 🎯 Key Features Explained

### State Management
The application uses Zustand for state management with built-in localStorage persistence. The store manages:
- Todos array
- Filter state (all/active/completed)
- Search query
- Theme preference

### Local Storage
All todos and theme preferences are automatically saved to localStorage and restored on page load using Zustand's persist middleware.

### Drag & Drop
Implemented using React Beautiful DnD. Users can drag todos to reorder them, and the new order is persisted to localStorage.

### Theme System
The application supports light and dark themes with CSS custom properties. The theme preference is stored in localStorage and applied to the document root.

### Responsive Design
The application is fully responsive with mobile-first design principles:
- Touch-friendly controls on mobile
- Adaptive layouts for different screen sizes
- Optimized spacing and typography

### Accessibility
- ARIA labels on all interactive elements
- Keyboard navigation support
- Focus management
- Semantic HTML structure
- Screen reader friendly

## 🔧 Customization

### Adding New Features
The application is structured to easily add new features:
- Add new actions to the Zustand store
- Create new components in the `components/` folder
- Add corresponding CSS Modules in the `styles/` folder

### Styling
All styles are in CSS Modules located in the `styles/` folder. The theme system uses CSS custom properties that can be customized in `index.css`.

### Extending with API
React Query is already configured and ready for API integration. You can add API calls and use React Query hooks for data fetching.

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📧 Contact

For questions or suggestions, please open an issue in the repository.

---

**Built with ❤️ using React and TypeScript**

