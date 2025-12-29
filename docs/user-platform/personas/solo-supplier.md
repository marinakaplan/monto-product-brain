# Solo Supplier

::: tip Primary Persona
This persona represents **~60%** of User Platform users.
:::

## Identity

| Attribute | Value |
|-----------|-------|
| **Role** | Owner / Finance Manager |
| **Company Size** | Small (1-10 employees) |
| **Tech Comfort** | Medium |
| **Frequency** | Daily |

## Profile

The Solo Supplier is typically a small business owner or finance manager who handles **all invoice submissions personally**. They don't have a team to delegate to, so efficiency is critical.

### Characteristics
- Time-poor, needs things to work quickly
- Submits invoices to 2-5 different buyer portals
- Handles 10-50 invoices per month
- Works alone, no backup

## Goals (Jobs to be Done)

### Primary Job
> **Submit invoices correctly the first time** so they get paid without delays.

### Secondary Jobs
- Track submission status across all portals
- Resolve exceptions quickly when they occur
- Maintain connection health with portals

### Success = 
- Invoices accepted by portals without rejection
- Payment received on time
- Minimal time spent on invoice admin

## Typical Workflow

```
1. Check Dashboard (exceptions? pending items?)
       ↓
2. Review any exceptions → Resolve
       ↓
3. Upload new invoices
       ↓
4. Submit to portals
       ↓
5. Verify submission status
       ↓
6. Done for the day
```

## Pages They Use Most

| Rank | Page | Why |
|------|------|-----|
| 1 | **Dashboard** | First thing they see, need quick status |
| 2 | **Exceptions** | Must resolve to get paid |
| 3 | **Invoices** | Upload and manage |
| 4 | **Submissions** | Track what's been sent |

## Actions They Take

| Action | Frequency | Page |
|--------|-----------|------|
| View dashboard | Every login | Dashboard |
| Check exceptions | Every login | Exceptions |
| Upload invoice | 2-3x per week | Invoices |
| Submit to portal | 2-3x per week | Invoice Detail |
| Resolve exception | As needed | Exception Detail |

## Pain Points (Inferred)

::: warning Frustrations
1. **Unclear exception messages** — Don't know how to fix
2. **Slow portal submission** — Waiting is frustrating
3. **Missing status updates** — "Did it work?"
4. **Too many clicks** — Just want to submit and go
:::

## Mental Model

How they think about the product:

```
Monto = "The thing that sends my invoices to my customers"

Invoice → Monto → Portal → Customer pays me
```

They don't think about:
- APIs, connections, data mapping
- Technical details of portal integration
- Why exceptions happen

They just want: **Invoice in → Money out**

## Triggers

What causes them to open Monto?

| Trigger | Response |
|---------|----------|
| 📧 Email: "New exception" | Open Monto → Fix it |
| 📅 End of week | Batch upload invoices |
| 💰 Payment due soon | Check status |
| 🔔 Portal notification | Verify submission |

## Opportunities

Based on this persona, consider:

::: info Suggestions
- **Quick actions on dashboard** — Let them resolve simple exceptions without navigating
- **Clearer exception guidance** — Tell them exactly what to do
- **Batch operations** — Upload/submit multiple invoices at once
- **Status notifications** — Push notifications when things complete
:::

---

::: details 🤖 Generation Details
- **Source**: Extracted from user-platform codebase
- **Method**: Persona Agent analysis
- **Confidence**: High (based on page structure + actions)
- **Last Updated**: Auto-generated
:::
