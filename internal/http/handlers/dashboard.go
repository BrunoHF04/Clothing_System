package handlers

import (
	"context"
	"net/http"
	"time"

	"github.com/jackc/pgx/v5/pgxpool"
)

type DashboardHandler struct {
	db *pgxpool.Pool
}

type dashboardSummary struct {
	FaturamentoDiario      float64 `json:"faturamentoDiario"`
	Inadimplencia          float64 `json:"inadimplencia"`
	ItensEmConsignacao     int64   `json:"itensEmConsignacao"`
	CaixaAberto            bool    `json:"caixaAberto"`
	ConsignacoesAtrasadas  int64   `json:"consignacoesAtrasadas"`
}

func NewDashboardHandler(db *pgxpool.Pool) *DashboardHandler {
	return &DashboardHandler{db: db}
}

func (h *DashboardHandler) GetSummary(w http.ResponseWriter, r *http.Request) {
	ctx, cancel := context.WithTimeout(r.Context(), 3*time.Second)
	defer cancel()

	summary := dashboardSummary{}

	_ = h.db.QueryRow(ctx, `
		SELECT COALESCE(SUM(total_amount), 0)
		FROM sales
		WHERE created_at::date = CURRENT_DATE
		  AND status = 'COMPLETED'
	`).Scan(&summary.FaturamentoDiario)

	_ = h.db.QueryRow(ctx, `
		SELECT COALESCE(SUM((principal_amount + interest_amount) - paid_amount), 0)
		FROM credit_installments
		WHERE status = 'OPEN' AND due_date < CURRENT_DATE
	`).Scan(&summary.Inadimplencia)

	_ = h.db.QueryRow(ctx, `
		SELECT COALESCE(SUM(quantity_sent - quantity_returned - quantity_sold), 0)
		FROM consignment_items
	`).Scan(&summary.ItensEmConsignacao)

	_ = h.db.QueryRow(ctx, `
		SELECT EXISTS(SELECT 1 FROM cash_sessions WHERE status = 'OPEN')
	`).Scan(&summary.CaixaAberto)

	_ = h.db.QueryRow(ctx, `
		SELECT COUNT(1)
		FROM consignments
		WHERE status = 'OPEN' AND due_date < CURRENT_DATE
	`).Scan(&summary.ConsignacoesAtrasadas)

	writeJSON(w, http.StatusOK, summary)
}
