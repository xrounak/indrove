# TaskDetailModal Component

A comprehensive modal component for displaying detailed task information in the client dashboard.

## Component Structure

```
TaskDetailModal/
├── index.js                    # Main exports
├── TaskDetailModal.jsx         # Main modal component
├── TaskDetailModal.module.css  # Main modal styles
├── StatusBadge/                # Status badge component
├── TaskInfoBlock/              # Task information display
├── OwnershipInfo/              # User ownership information
├── TimelineStatus/             # Task progress timeline
├── ApplicantList/              # Freelancer applicants list
├── SubmissionViewer/           # File submissions display
└── FeedbackForm/               # Rating and review form
```

## Features

### 🎨 Modal Sections

1. **Header**
   - Task title
   - Status badge (Open, Assigned, Submitted, Completed)
   - Category tag
   - Close button

2. **Task Info Block**
   - Description with icon
   - Budget with icon
   - Deadline with icon

3. **Ownership Info**
   - Posted by (client name and email)
   - Assigned to (freelancer name and email, or "Not assigned yet")

4. **Timeline Section**
   - Created timestamp
   - Assigned timestamp
   - Submitted timestamp
   - Completed timestamp
   - Visual progress indicators

5. **Applicants List** (when status is "open")
   - Freelancer name, rating, experience
   - Application message
   - View Profile and Assign buttons

6. **Submissions** (when status is "submitted" or "completed")
   - File preview with icons
   - Download functionality
   - Freelancer notes

7. **Feedback Form** (when status is "completed")
   - 5-star rating system
   - Optional review message
   - Submit review functionality

### ✅ Action Buttons

- **Assign Freelancer**: When status is "open" and applicants exist
- **Mark as Completed**: When status is "submitted"
- **Download Submission**: When status is "submitted/completed" and files exist
- **Give Feedback**: When status is "completed" and no review exists

## Usage

```jsx
import { TaskDetailModal } from '../components/TaskDetailModal';

// In your component
{selectedTask && (
  <TaskDetailModal
    task={selectedTask}
    users={users}
    applications={applications}
    onClose={() => setSelectedTask(null)}
    onAssign={handleAssign}
    onComplete={handleComplete}
    onDownload={handleDownload}
    onFeedback={handleFeedback}
  />
)}
```

## Props

| Prop | Type | Description |
|------|------|-------------|
| `task` | Object | Task object with all details |
| `users` | Object | User objects mapped by ID |
| `applications` | Array | Application objects for the task |
| `onClose` | Function | Callback when modal is closed |
| `onAssign` | Function | Callback when freelancer is assigned |
| `onComplete` | Function | Callback when task is marked complete |
| `onDownload` | Function | Callback when files are downloaded |
| `onFeedback` | Function | Callback when feedback is submitted |

## Task Object Structure

```javascript
{
  id: string,
  title: string,
  description: string,
  budget: number,
  deadline: string,
  category: string,
  status: 'open' | 'assigned' | 'submitted' | 'completed',
  postedBy: string, // user ID
  assignedTo: string | null, // user ID
  createdAt: Date,
  assignedAt: Date | null,
  submittedAt: Date | null,
  completedAt: Date | null,
  submission: {
    files: Array,
    notes: string,
    submittedAt: Date
  } | null,
  review: {
    rating: number,
    message: string,
    submittedAt: Date
  } | null
}
```

## Responsive Design

The modal is fully responsive and adapts to different screen sizes:
- Mobile: Stacked layout with full-width buttons
- Tablet: Optimized spacing and touch targets
- Desktop: Full modal with side-by-side layouts

## Styling

All components use CSS modules for scoped styling:
- Modern design with rounded corners and shadows
- Consistent color scheme using Tailwind-like colors
- Smooth transitions and hover effects
- Accessible focus states and keyboard navigation

## Integration

The modal integrates seamlessly with the existing dashboard:
- Uses the same routing structure (`/task/{taskId}`)
- Maintains consistent styling with other components
- Follows the established component hierarchy 