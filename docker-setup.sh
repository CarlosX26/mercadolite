#!/bin/bash

echo "🚀 Setting up MercadoLite with Docker..."

# Build and start services
docker compose up --build -d

echo "⏳ Waiting for database to be ready..."
sleep 10

# Run database migrations
echo "🔄 Running database migrations..."
docker compose exec backend yarn typeorm migration:run -d src/data-source.ts

echo "✅ Setup complete!"
echo ""
echo "🌐 Services running at:"
echo "   Frontend: http://localhost:5173"
echo "   Backend:  http://localhost:3000"
echo "   API Docs: http://localhost:3000/api-docs"
echo "   Database: localhost:5432"
echo ""
echo "📋 To stop services: docker-compose down"
echo "📋 To view logs: docker compose logs -f"