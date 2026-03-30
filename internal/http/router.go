package http

import (
	"net/http"

	"clothing-system/internal/http/handlers"
	"github.com/jackc/pgx/v5/pgxpool"
)

func NewRouter(db *pgxpool.Pool) http.Handler {
	mux := http.NewServeMux()

	healthHandler := handlers.NewHealthHandler(db)
	authHandler := handlers.NewAuthHandler()
	dashboardHandler := handlers.NewDashboardHandler(db)

	mux.HandleFunc("GET /health", healthHandler.Get)
	mux.HandleFunc("POST /auth/login", authHandler.Login)
	mux.HandleFunc("GET /dashboard/summary", dashboardHandler.GetSummary)

	return withCORS(mux)
}

func withCORS(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusNoContent)
			return
		}

		next.ServeHTTP(w, r)
	})
}
