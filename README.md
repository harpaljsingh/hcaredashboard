# Healthcare Analytics Dashboard ⚕️

**Full-stack TypeScript dashboard built from scratch in under 12 hours — zero prior TypeScript experience → live production app**

Live Demo → [https://hcaredashboard-harpaljsingh.vercel.app  ](https://hcaredashboard-3i83.vercel.app/)
Backend API → [https://hcaredashboard.onrender.com ](https://hcaredashboard.onrender.com/) 
GitHub → https://github.com/harpaljsingh/hcaredashboard

![Dashboard Preview] 
<img width="467" height="617" alt="image" src="https://github.com/user-attachments/assets/02c95305-8325-4f36-80bc-1c569300ce39" />


## Why I Built This
Most modern Data Engineering / Analytics Engineering roles now expect TypeScript fluency.  
Instead of just saying “I learn fast”, I shipped a **production-grade full-stack TypeScript application in one day** to prove it.

## Features
- 30-day admission trend (Line Chart)
- Top claim denial reasons (Bar Chart)
- Real-time bed occupancy by ward (Pie Chart + detail table)
- Fully typed end-to-end (interfaces, DTOs, no `any`)
- Responsive, Tailwind-styled UI that looks great on mobile & desktop

## Tech Stack (100% TypeScript)
| Layer       | Technology                                      |
|-------------|-------------------------------------------------|
| Frontend    | React 18 + Vite + TypeScript + Tailwind + Recharts |
| Backend     | NestJS + TypeScript                             |
| Deployment  | Vercel (frontend) + Render (backend)            |

## Quick Start (Clone & Run Locally)

```bash
# Clone the repo
git clone https://github.com/harpaljsingh/hcaredashboard.git
cd hcaredashboard

# Backend
cd backend
npm install
npm run start:dev        # → http://localhost:3000

# Frontend (in another terminal)
cd ../frontend
npm install
npm run dev -- --host    # → http://localhost:5173
