# Invoice Submission Flow

::: tip Core Flow
This is the **primary user journey** — the main reason users come to Monto.
:::

## Overview

| Attribute | Value |
|-----------|-------|
| **Persona** | All (primarily Solo Supplier) |
| **Trigger** | New invoice to submit |
| **Goal** | Submit invoice to buyer portal |
| **Frequency** | 2-5 times per week |
| **Duration** | 2-5 minutes |

## Flow Diagram

```
┌─────────┐     ┌──────────┐     ┌───────────┐     ┌──────────┐     ┌─────────┐
│ Dashboard│ ──▶ │ Invoices │ ──▶ │ Upload    │ ──▶ │ Review   │ ──▶ │ Submit  │
│         │     │ List     │     │ Invoice   │     │ Details  │     │ to Portal│
└─────────┘     └──────────┘     └───────────┘     └───────────┘     └─────────┘
                                                          │
                                                          ▼
                                                   ┌───────────┐
                                                   │ Exception?│
                                                   └───────────┘
                                                    ╱         ╲
                                                   ▼           ▼
                                            ┌─────────┐   ┌─────────┐
                                            │ Resolve │   │ Success │
                                            │ Exception│   │ ✓       │
                                            └─────────┘   └─────────┘
```

## Steps

| Step | Page | Action | What Happens | Data Changed |
|------|------|--------|--------------|--------------|
| 1 | Dashboard | View status | See pending/exceptions | — |
| 2 | Dashboard | Click "Invoices" | Navigate to list | — |
| 3 | Invoices | Click "Upload" | Open upload modal | — |
| 4 | Upload Modal | Select file | File staged | Local state |
| 5 | Upload Modal | Click "Upload" | Invoice created | `Invoice` created |
| 6 | Invoice Detail | Review data | Verify extraction | — |
| 7 | Invoice Detail | Edit if needed | Fix any errors | `Invoice` updated |
| 8 | Invoice Detail | Click "Submit" | Send to portal | `Submission` created |
| 9 | Submission | View result | See status | — |

## Decision Points

### Decision 1: Which portal?
- **Location**: Invoice Detail page
- **Options**: List of connected portals
- **Default**: Auto-selected if only one
- **User needs**: Portal name, last submission status

### Decision 2: Submit now or save?
- **Location**: Invoice Detail page
- **Options**: "Submit" or "Save Draft"
- **Default**: None (user must choose)
- **User needs**: Confidence that data is correct

## Happy Path

```
User uploads invoice
    → System extracts data
    → User reviews (looks good!)
    → User clicks Submit
    → Portal accepts
    → User sees success ✓
    → Done
```

**Time**: ~2 minutes
**Clicks**: ~5

## Error Scenarios

### Error 1: Invalid file format
| Aspect | Detail |
|--------|--------|
| **When** | Step 4 (file selection) |
| **Cause** | User uploads non-PDF or corrupt file |
| **Current Behavior** | Error toast message |
| **Recovery** | User selects different file |

### Error 2: Extraction fails
| Aspect | Detail |
|--------|--------|
| **When** | Step 5 (after upload) |
| **Cause** | Can't read invoice data |
| **Current Behavior** | Partial data, user must fill gaps |
| **Recovery** | Manual data entry |

### Error 3: Portal rejection
| Aspect | Detail |
|--------|--------|
| **When** | Step 8 (submit) |
| **Cause** | Portal validation fails |
| **Current Behavior** | Exception created |
| **Recovery** | [Exception Resolution Flow](./exception-resolution) |

## Edge Cases

::: warning Handle These
| Edge Case | Current Status | Risk |
|-----------|----------------|------|
| Very large file (>10MB) | ⚠️ Timeout risk | High |
| Duplicate invoice | ⚠️ No warning | Medium |
| Portal is down | ✅ Handled | Low |
| Session expires mid-flow | ⚠️ Data lost | Medium |
:::

## Data Requirements

### Input Data (what user provides)
- Invoice file (PDF)
- Portal selection
- Optional: PO number, notes

### System Data (what we need)
- Portal connection details
- Supplier profile
- Previous submissions (for duplicate check)

### Output Data (what gets created)
- `Invoice` record
- `Submission` record
- Optional: `Exception` record

## API Calls

| Step | Endpoint | Method | Purpose |
|------|----------|--------|---------|
| 5 | `/api/invoices` | POST | Create invoice |
| 6 | `/api/invoices/:id` | GET | Get details |
| 7 | `/api/invoices/:id` | PATCH | Update data |
| 8 | `/api/submissions` | POST | Submit to portal |

## Components Used

| Component | Purpose | Design System? |
|-----------|---------|----------------|
| `FileUpload` | File selection | ✅ Yes |
| `InvoiceForm` | Data display/edit | ❌ Custom |
| `PortalSelector` | Portal dropdown | ❌ Custom |
| `Button` | Actions | ✅ Yes |
| `Toast` | Feedback | ✅ Yes |
| `Modal` | Upload dialog | ✅ Yes |

## Metrics

What to measure:

| Metric | Target | Current |
|--------|--------|---------|
| Completion rate | >90% | ? |
| Time to complete | <3 min | ? |
| First-try success | >80% | ? |
| Exception rate | <20% | ? |

## Improvement Opportunities

::: tip Suggestions from Analysis
1. **Add duplicate detection** — Warn before creating duplicate
2. **Save draft automatically** — Don't lose work on timeout
3. **Show portal status** — Before submission, show if portal is healthy
4. **Streamline for repeat submissions** — Remember previous choices
:::

---

::: details 🤖 Generation Details
- **Source**: Traced from user-platform routes + components
- **Method**: Flow Agent analysis
- **Confidence**: High
- **Last Updated**: Auto-generated
:::
