# 🔧 Backoffice

The internal operations platform where **Monto's team** manages invoices, exceptions, and tasks.

## Overview

| Metric | Count |
|--------|-------|
| Personas | 3 |
| User Flows | 5 |
| Pages | 18 |
| Components | 52 |
| Edge Cases | 31 |

## Personas

| Persona | Description | Frequency |
|---------|-------------|-----------|
| [BO Agent](./personas/bo-agent) | Daily operations, processing tasks | All day |
| [BO Manager](./personas/bo-manager) | Oversight, escalations | Daily |
| [Admin](./personas/admin) | System configuration | Weekly |

## Key Flows

| Flow | Persona | Trigger |
|------|---------|---------|
| [Daily Review](./flows/daily-review) | Agent | Morning start |
| [Exception Management](./flows/exception-management) | Agent | New exception |
| [Task Processing](./flows/task-processing) | Agent | Task queue |
| [Portal Submission](./flows/portal-submission) | Agent | Ready invoice |
| [Escalation](./flows/escalation) | Manager | Critical issue |

## Pages

See full inventory: [Pages](./inventory/pages)

### Main Pages
- Dashboard
- Task Queue
- Exceptions List
- Exception Detail
- Invoices
- Invoice Detail
- Connections
- Portals
- Settings
- Reports

---

::: info 🤖 Auto-Generated
This documentation is extracted from the codebase automatically.
:::
