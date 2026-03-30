package http

import (
	"net/http"

	"clothing-system/internal/http/handlers"
	"github.com/jackc/pgx/v5/pgxpool"
)

func NewRouter(db *pgxpool.Pool) http.Handler {
	mux := http.NewServeMux()

	healthHandler := handlers.NewHealthHandler(db)
	mux.HandleFunc("GET /health", healthHandler.Get)

	return mux
}
