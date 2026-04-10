# Test Coverage Analysis - PharmVerify PWA

## Current State

The project previously had **zero test coverage** -- no test framework, no test files, no test configuration. This analysis sets up Vitest and provides initial unit tests for the most critical business logic, plus a roadmap for expanding coverage.

## Infrastructure Added

- **Framework**: Vitest (native Vite integration, fast ESM-based testing)
- **Environment**: jsdom (browser API simulation for localStorage, DOM)
- **Libraries**: `@testing-library/svelte`, `@testing-library/jest-dom`
- **Config**: `vite.config.js` test block, `src/tests/setup.js` (localStorage mock)
- **Scripts**: `npm test`, `npm run test:watch`, `npm run test:coverage`

## Tests Written (93 tests, 4 files)

### 1. `src/lib/utils/parser.test.js` (16 tests)
Case file parsing and validation -- the entry point for all user-uploaded content.
- Valid JSON parsing, markdown code fence stripping
- Error handling: invalid JSON, missing patients/orders, empty data
- Array-to-object patient normalization
- Default value population for optional fields
- Validation of required fields and cross-references (order -> patient)
- dx fallback logic, _instructions cleanup

### 2. `src/lib/stores/metrics.test.js` (28 tests)
Metrics tracking and all derived store calculations.
- `recordAttempt`: persistence, session creation, category mapping
- `clearMetrics`: full state reset
- `overallAccuracy`: percentage calculation, edge cases
- `firstTryAccuracy`: deduplication logic (only first attempt per order counts)
- `currentStreak`: consecutive correct streak from most recent
- `categoryPerformance`: grouping, accuracy calculation, sort order
- `difficultyBreakdown`: grouping, label formatting ("default" -> "Tutorial")
- `hardModeAvgGrade`: grade-to-number mapping, average calculation
- `recentAttempts`: last-20 window, reverse chronological
- `totalCompleted`: unique correct order deduplication

### 3. `src/lib/stores/app.test.js` (26 tests)
Core application state management.
- Initial state verification (demo data loaded)
- `updatePatient` / `updatePatientPath`: patching, nested dot-path updates, localStorage persistence
- `updateOrder` / `updateOrderPath`: patching, active order sync
- Navigation: `selectOrder`, `reviewOrder`, `goBack`, `goHome`
- `verifyOrder`: order removal, auto-advance, empty-queue handling
- `importCases`: merge behavior
- `clearAll` / `setDifficulty`: reset flows
- `createAccount` / `logout`: user lifecycle
- Derived stores: `patientCount`, `orderCount`

### 4. `src/lib/utils/clinical.test.js` (23 tests)
Clinical calculation logic extracted from VerifyTab.
- `getLatestLab`: null handling, scalar vs array lab values, multi-datetime
- `calcCrCl`: Cockcroft-Gault equation for male/female, missing data handling, edge cases (elderly, high SCr)
- `GRADE_CONFIG`: grade advancement rules
- `scoreRejectReasons`: perfect selection, missed reasons, false picks, edge cases

---

## Coverage Gaps & Recommended Improvements

### Priority 1: High-Impact, Moderate Effort

#### A. Data Integrity Tests (`src/lib/data/`)
The demo and disease case data files contain complex clinical data structures. Tests should validate:
- **All patient records** have required fields (name, mrn, age, hp, labs)
- **All orders** reference valid patient IDs
- **All orders with teaching** have valid `correctAction` values ("verify", "reject", "message")
- **Lab values** with flags use the correct `[value, flag]` array format
- **Medication lists** are consistent between home meds and inpatient meds
- **Disease case library** returns valid data for all implemented disease/difficulty/phase combos
- **`getOrdersForDifficulty()`** returns non-empty arrays for all difficulty levels

#### B. VerifyTab Integration Tests
The VerifyTab component (510 lines) contains the core verification workflow. While we extracted pure logic to `clinical.js`, the component integration should also be tested:
- `handleAction()` flow for verify/reject/message in standard vs. hard mode
- Feedback modal state transitions (action -> feedback -> close -> advance)
- Reject reasons modal flow (select reasons -> submit -> score -> feedback)
- Hard mode graded feedback with `detailedFeedback` config
- Review mode behavior (should not record attempts)

#### C. Service Worker Tests
The service worker (`src/service-worker.js`) manages offline caching:
- Cache-first strategy for static assets
- Network-first for navigation requests  
- Cache versioning and cleanup on activation
- Offline fallback to `index.html`

### Priority 2: Medium-Impact, Lower Effort

#### D. Component Rendering Tests
Using `@testing-library/svelte` (already installed), add render tests for key components:
- **Landing.svelte**: Renders feature sections, CTA buttons
- **Home.svelte**: Difficulty selector, disease state cards, stats display
- **Queue.svelte**: Order list rendering, empty state, order selection
- **MetricsView.svelte**: Chart rendering, empty state, stat cards
- **AccountCreation.svelte**: Form validation, submission

#### E. LocalStorage Persistence Edge Cases
- Corrupted localStorage data (invalid JSON)
- localStorage quota exceeded
- localStorage unavailable (private browsing in some browsers)
- Migration between data format versions

#### F. Accessibility Tests
- Keyboard navigation through order queue and chart tabs
- Screen reader compatibility (ARIA labels, roles)
- Focus management in modals (reject reasons, feedback, time edit)

### Priority 3: Lower Priority, Higher Effort

#### G. End-to-End Tests (Playwright)
Full user flows:
- New user: landing -> account creation -> tutorial -> first verification
- Case upload: upload JSON -> parse -> verify orders
- Complete session: verify all orders -> view metrics
- Edit mode: toggle edit -> modify patient data -> verify changes persist

#### H. Performance Tests
- Case import with large datasets (100+ patients, 500+ orders)
- Metrics derived store performance with 10,000 attempts
- localStorage read/write performance near quota

---

## Architecture Recommendations

### Extract More Pure Logic
The `VerifyTab.svelte` component mixes UI and business logic. Key candidates for extraction:
1. **`handleAction()`** decision tree -- extract to a pure function that returns the feedback state
2. **`submitRejectReasons()`** scoring -- already extracted to `scoreRejectReasons()` in `clinical.js`; the component should use this shared implementation
3. **Alert severity mapping** -- the `SEV` config object could be shared

### Test Data Factories
Create reusable test fixtures for patients, orders, and attempts to reduce duplication across test files. The `makeAttempt()` helper in `metrics.test.js` is a good pattern to expand.

---

## Running Tests

```bash
# Run all tests once
npm test

# Watch mode (re-run on file changes)
npm run test:watch

# With coverage report
npm run test:coverage
```
