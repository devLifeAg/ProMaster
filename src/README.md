# Project Folder Structure

## Overview
The project is organized using a modular architecture with clearly separated folders by functionality.

## Folder Structure

### `/components`
Contains all React components organized by functional groups:

#### `/components/ui`
Reusable basic UI components:
- `Button/` - Button component with multiple variants
- `Input/` - Input component with validation
- `Card/` - Card layout component
- `Checkbox/` - Checkbox component

#### `/components/charts`
Chart components:
- `CircleChart/` - Pie chart
- `ResponsiveBarChart/` - Responsive bar chart
- `ChartCarousel/` - Chart carousel

#### `/components/dialogs`
Dialog/modal components:
- `DashboardDialog/` - Dashboard dialog
- `GroupDialog/` - Group management dialog
- `SelectDialog/` - Selection dialog

#### `/components/layout`
Layout components:
- `StatusCard/` - Status display card
- `SkeletonBox/` - Loading skeleton

#### `/components/feedback`
Feedback components:
- `ToastService/` - Notification service
- `MobileNoticeModal/` - Mobile notification modal

### `/pages`
Main application pages:
- `Dashboard/` - Dashboard page with its own components and hooks
- `Login/` - Login page
- `ShowCase/` - Showcase page

### `/hooks`
Reusable custom hooks:
- `useLocalStorage.ts` - LocalStorage management hook
- `useDebounce.ts` - Debounce value hook

### `/services`
API services:
- `api.ts` - General API service
- `authService.ts` - Authentication service
- `dashboardService.ts` - Dashboard service

### `/types`
TypeScript type definitions:
- `common.types.ts` - Common types
- `api.types.ts` - API types

### `/utils`
Utility functions:
- `/helpers/formatUtils.ts` - Data formatting functions
- `/validators/validationUtils.ts` - Validation functions
- `/formatters/` - Other formatting functions

### `/styles`
Global styles:
- `globals.css` - Global CSS
- `colors.css` - Color definitions
- `fonts.css` - Font definitions

### `/contexts`
React contexts:
- `UserContext.tsx` - User management context
- `ThemeContext.tsx` - Theme management context

## Naming Conventions

### Components
- Use PascalCase: `Button.tsx`, `UserProfile.tsx`
- Each component has its own folder with the structure:
  ```
  ComponentName/
  ├── ComponentName.tsx
  ├── ComponentName.types.ts
  └── index.ts
  ```

### Hooks
- Use camelCase with the `use` prefix: `useLocalStorage.ts`
- Export hook functions with PascalCase: `export function useLocalStorage()`

### Services
- Use camelCase with the `Service` suffix: `authService.ts`
- Export class or object: `export const authService = new AuthService()`

### Types
- Use PascalCase: `User.types.ts`, `ApiResponse.types.ts`
- Interfaces use PascalCase: `UserProps`, `ButtonVariants`

## Best Practices

### 1. Separation of Concerns
- Each component has a single responsibility
- Complex logic is separated into custom hooks
- API calls are separated into services

### 2. Type Safety
- Use TypeScript for all files
- Clearly define types for props and state
- Use generic types when necessary

### 3. Reusability
- Components are designed for reuse
- Props are designed to be flexible
- Use the composition pattern

### 4. Performance
- Use React.memo for components
- Lazy load large pages
- Debounce for search inputs

### 5. Error Handling
- Use try-catch for API calls
- Error boundaries for components
- Validation for user inputs

## Import/Export

### Barrel Exports
Use index.ts for exports:
```typescript
// components/ui/Button/index.ts
export { Button } from './Button';
export type { ButtonProps } from './Button.types';
```

### Import Paths
Use absolute imports:
```typescript
import { Button } from '@/components/ui/Button';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { apiService } from '@/services/api';
```
