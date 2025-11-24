# University Dashboard Design Guidelines

## Design Approach
**Utility-Focused Application Dashboard** - Clean, modern interface prioritizing navigation efficiency and content organization with a professional academic aesthetic.

## Core Layout Structure

### Sidebar Navigation (Fixed Left)
- **Width**: 280px fixed
- **Background**: Pure white (#FFFFFF)
- **Border Radius**: 24px on all corners
- **Height**: Full viewport with margin spacing
- **Shadow**: Soft, subtle shadow for depth and elevation
- **Position**: Fixed to left side of viewport

### Main Content Area
- **Background**: Soft gradient (teal → light blue/green)
- **Padding**: Generous padding on right side for breathing room
- **Layout**: Fills remaining viewport space after sidebar

## Typography & Spacing System

### Tailwind Spacing Primitives
Use consistent spacing units: **4, 5, 6** (e.g., p-4, mt-5, mb-6, space-y-5)

### University Branding
- University name: "OAK University"
- Clean, modern font treatment
- Positioned below logo with appropriate spacing

## Component Library

### Sidebar Sections

**Top Section (Branding)**
- University logo: Simple icon or letter "A" with green gradient
- University name display below logo
- Padding top: 40px for top spacing

**Middle Section (Primary Navigation)**
Icons in vertical stack:
1. Home (house/filled icon)
2. Search (magnifying glass)
3. Users (people icon)
4. Analytics (chart/graph)

**Icon Specifications**:
- Size: 24px
- Default color: Gray
- Vertical spacing: 20px between icons
- Hover state: Scale 1.1 + blue color transition
- Active state: Blue circular background behind icon
- Icon library: Lucide React

**Bottom Section (Secondary Actions)**
- Settings icon (gear)
- Logout icon (exit arrow)
- Same styling as middle section icons
- Padding bottom: 40px

### Cards & Containers
- Border radius: 24px for all card elements
- Consistent rounded corner treatment throughout

## Interaction Patterns

### Icon Navigation Behavior
- **Default**: Gray icons at 24px
- **Hover**: Smooth scale to 1.1 + color change to blue
- **Active**: Blue circular background indicator behind icon
- All transitions should be smooth and subtle

### Navigation Feedback
- Clear visual indication of current page/section
- Consistent hover and active states across all interactive elements

## Visual Hierarchy
1. **Primary**: Sidebar navigation with branding
2. **Secondary**: Main content area with gradient background
3. **Tertiary**: Icon states and interactive feedback

## Images
No hero images required - this is a utility dashboard focused on navigation and content organization.