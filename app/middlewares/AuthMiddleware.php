<?php

namespace App\Middlewares;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Exception;

class AuthMiddleware {

    public static function checkAuth() {
        $token = $_COOKIE['erp_session'] ?? null;

        if (!$token) {
            header('Location: /login');
            exit;
        }

        try {
            $secret = $_ENV['JWT_SECRET'] ?? '';
            if (empty($secret)) {
                throw new Exception("JWT_SECRET não configurado.");
            }

            $decoded = JWT::decode($token, new Key($secret, 'HS256'));

            // Podemos salvar os dados do usuário globalmente para os controllers usarem
            global $currentUser;
            $currentUser = $decoded;

        } catch (Exception $e) {
            // Token inválido ou expirado
            setcookie('erp_session', '', time() - 3600, '/');
            header('Location: /login');
            exit;
        }
    }
}
