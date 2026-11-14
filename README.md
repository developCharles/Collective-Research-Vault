
```
Collective-Research-Vault
├─ client
│  ├─ eslint.config.js
│  ├─ index.html
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ public
│  │  ├─ favicon.svg
│  │  ├─ icons.svg
│  │  └─ _redirects
│  ├─ README.md
│  ├─ src
│  │  ├─ App.css
│  │  ├─ App.jsx
│  │  ├─ assets
│  │  │  ├─ hero.png
│  │  │  ├─ react.svg
│  │  │  └─ vite.svg
│  │  ├─ components
│  │  │  ├─ dashboard
│  │  │  │  ├─ constants.js
│  │  │  │  ├─ DashboardHeader.jsx
│  │  │  │  ├─ icons.jsx
│  │  │  │  ├─ NotificationsPanel.jsx
│  │  │  │  ├─ PaperCard.jsx
│  │  │  │  ├─ Sidebar.jsx
│  │  │  │  ├─ StartDraftCard.jsx
│  │  │  │  └─ StatusPill.jsx
│  │  │  ├─ gallery
│  │  │  │  ├─ FilterPanel.jsx
│  │  │  │  ├─ GalleryCard.jsx
│  │  │  │  └─ GalleryNavbar.jsx
│  │  │  ├─ Logo.jsx
│  │  │  ├─ Navbar.jsx
│  │  │  ├─ notifications
│  │  │  │  ├─ NotificationIcon.jsx
│  │  │  │  ├─ NotificationRow.jsx
│  │  │  │  ├─ NotificationSection.jsx
│  │  │  │  └─ RichMessage.jsx
│  │  │  ├─ paper
│  │  │  │  ├─ AddPostModal.jsx
│  │  │  │  ├─ AttachField.jsx
│  │  │  │  ├─ AuthorsCard.jsx
│  │  │  │  ├─ Avatar.jsx
│  │  │  │  ├─ FeedbackNotes.jsx
│  │  │  │  ├─ ForumSection.jsx
│  │  │  │  ├─ PaperSummaryCard.jsx
│  │  │  │  ├─ SectionHeading.jsx
│  │  │  │  └─ VersionHistory.jsx
│  │  │  ├─ ProtectedRoute.jsx
│  │  │  └─ StatusBadge.jsx
│  │  ├─ context
│  │  │  ├─ AuthContext.jsx
│  │  │  ├─ forumContext.js
│  │  │  ├─ ForumProvider.jsx
│  │  │  ├─ useAuth.js
│  │  │  └─ useForum.js
│  │  ├─ hooks
│  │  │  ├─ useNotifications.js
│  │  │  ├─ usePaperDetail.js
│  │  │  ├─ useResearchGallery.js
│  │  │  └─ useStudentDashboard.js
│  │  ├─ index.css
│  │  ├─ main.jsx
│  │  ├─ pages
│  │  │  ├─ admin
│  │  │  │  ├─ AdminDashboard.jsx
│  │  │  │  ├─ AdminLayout.jsx
│  │  │  │  ├─ AuditTrail.jsx
│  │  │  │  ├─ ManageStorage.jsx
│  │  │  │  └─ ManageUsers.jsx
│  │  │  ├─ coordinator
│  │  │  │  ├─ CoordinatorDashboard.jsx
│  │  │  │  ├─ CoordinatorLayout.jsx
│  │  │  │  ├─ CoordinatorNotif.jsx
│  │  │  │  ├─ FacultyAssignment.jsx
│  │  │  │  ├─ ManageGroups.jsx
│  │  │  │  └─ ManageSubmissions.jsx
│  │  │  ├─ faculty
│  │  │  │  ├─ AssignmentsList.jsx
│  │  │  │  ├─ FacultyDashboard.jsx
│  │  │  │  ├─ FacultyLayout.jsx
│  │  │  │  └─ SubmissionDetail.jsx
│  │  │  ├─ forum
│  │  │  │  ├─ ForumPostCard.jsx
│  │  │  │  ├─ LinkifiedText.jsx
│  │  │  │  └─ NotificationsPreview.jsx
│  │  │  ├─ Login.jsx
│  │  │  ├─ ResearchGallery.jsx
│  │  │  └─ student
│  │  │     ├─ ActivityHistory.jsx
│  │  │     ├─ Forum.jsx
│  │  │     ├─ PaperDetail.jsx
│  │  │     ├─ StudentDashboard.jsx
│  │  │     ├─ StudentDashboardOld.jsx
│  │  │     ├─ StudentLayout.jsx
│  │  │     └─ UploadForm.jsx
│  │  ├─ services
│  │  │  ├─ adminService.js
│  │  │  ├─ api.js
│  │  │  ├─ authService.js
│  │  │  ├─ dashboardMocks.js
│  │  │  ├─ forumPlaceholder.js
│  │  │  ├─ galleryData.js
│  │  │  ├─ notificationService.js
│  │  │  └─ paperService.js
│  │  └─ utils
│  │     ├─ avatarColors.js
│  │     ├─ formatDate.js
│  │     ├─ helpers.js
│  │     └─ roleHome.js
│  └─ vite.config.js
├─ database
│  ├─ migrations
│  │  └─ 001_research_papers_research_id.sql
│  ├─ package-lock.json
│  ├─ schema.sql
│  ├─ seed.sql
│  └─ setup.js
├─ netlify.toml
├─ package-lock.json
├─ package.json
├─ README.md
├─ server
│  ├─ ca.pem
│  ├─ config
│  │  └─ db.js
│  ├─ constants
│  │  └─ rbac.js
│  ├─ controllers
│  │  ├─ adminController.js
│  │  ├─ authController.js
│  │  ├─ coordinatorController.js
│  │  ├─ facultyController.js
│  │  ├─ notificationController.js
│  │  ├─ paperController.js
│  │  └─ reviewController.js
│  ├─ generateHash.js
│  ├─ index.js
│  ├─ middleware
│  │  ├─ auditMiddleware.js
│  │  ├─ authMiddleware.js
│  │  ├─ permissionMiddleware.js
│  │  ├─ roleMiddleware.js
│  │  └─ uploadMiddleware.js
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ routes
│  │  ├─ admin.routes.js
│  │  ├─ auth.routes.js
│  │  ├─ coordinator.routes.js
│  │  ├─ coordinatorSubmission.routes.js
│  │  ├─ faculty.routes.js
│  │  ├─ notification.routes.js
│  │  ├─ paper.routes.js
│  │  └─ review.routes.js
│  ├─ scripts
│  │  ├─ db-check.js
│  │  └─ db-setup.js
│  └─ utils
│     └─ auditLogger.js
└─ SUPABASE_SETUP.md

```