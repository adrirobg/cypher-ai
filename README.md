# Task Master POC

A full-stack task management application with AI-powered features for development workflows.

## Project Structure

```
poc_taskmaster/
├── backend/
│   └── app/
│       ├── __init__.py
│       ├── main.py           # FastAPI application entry point
│       ├── dependencies.py   # Common dependencies
│       ├── routers/         # API route modules
│       │   └── __init__.py
│       └── internal/        # Internal modules
│           └── __init__.py
├── frontend/                # React + TypeScript + Vite
│   ├── src/
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── assets/
│   ├── public/
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
├── docs/                    # Project documentation
└── .taskmaster/            # Task Master configuration and tasks
```

## Technology Stack

### Backend
- **Framework**: FastAPI (Python 3.11+)
- **Database**: SQLite 3.40+ with WAL mode and FTS5
- **ORM**: SQLAlchemy 2.0
- **Validation**: Pydantic v2
- **Architecture**: Controller-Service-Repository pattern

### Frontend
- **Framework**: React 18+
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: TBD (Tailwind CSS / Material-UI)

## Getting Started

### Prerequisites
- Python 3.11 or higher
- Node.js 18 or higher
- npm, yarn, or pnpm

### Backend Setup

```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
pip install -r requirements.txt
python -m uvicorn app.main:app --reload
```

### Frontend Setup

```bash
cd frontend
npm install  # or yarn install / pnpm install
npm run dev  # or yarn dev / pnpm dev
```

## Development

### Running Tests

Backend:
```bash
cd backend
pytest
```

Frontend:
```bash
cd frontend
npm test
```

### API Documentation

Once the backend is running, visit:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Project Management

This project uses Task Master AI for task management. See `.taskmaster/tasks/` for current tasks and progress.

## License

TBD

## Contributing

TBD