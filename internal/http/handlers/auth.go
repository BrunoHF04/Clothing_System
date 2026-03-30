package handlers

import (
	"encoding/json"
	"net/http"
	"strings"
)

type AuthHandler struct{}

type loginRequest struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

func NewAuthHandler() *AuthHandler {
	return &AuthHandler{}
}

func (h *AuthHandler) Login(w http.ResponseWriter, r *http.Request) {
	var req loginRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "payload invalido"})
		return
	}

	username := strings.TrimSpace(strings.ToLower(req.Username))
	if username == "" || req.Password == "" {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "usuario e senha sao obrigatorios"})
		return
	}

	if req.Password != "123456" {
		writeJSON(w, http.StatusUnauthorized, map[string]string{"error": "credenciais invalidas"})
		return
	}

	role := "VENDEDOR"
	if username == "dono" || username == "admin" {
		role = "DONO"
	}

	writeJSON(w, http.StatusOK, map[string]string{
		"token": "local-dev-token",
		"name":  strings.ToUpper(username),
		"role":  role,
	})
}
